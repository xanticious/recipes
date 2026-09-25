# Weber County restaurants

Plan for adding Ogden and the rest of Weber County to the restaurant catalog. Checked September 24, 2026.

Ogden and the other Weber County cities are in the catalog. `scripts/export-weber-restaurants.ts` writes the inspection CSV, the license CSV, the Ogden review list, and the city files. Eat Out orders still point at Davis County locations. Morgan County stays out.

The Davis County list was seeded from public food-inspection records (name and address), then hand-authored into typed catalog rows. Weber County can be seeded the same way. The health department publishes a searchable inspection directory. It is a different system than Davis County’s Accela portal, and the export needs the same cleanup the Davis CSV already needed.

## Can we use food-inspection data?

Yes. Weber-Morgan Health Department links **Food Inspection Reports** from [Food Services Protection](https://www.webermorganhealth.gov/services/environmental-health/food-services-protection/) to:

https://www.inspectionsonline.us/foodsafety/utweberogden/search.htm

That page is a public search (establishment name or street). The form refuses an empty search, but the underlying directory query does not. A query for the food program returns every indexed establishment:

`https://www.inspectionsonline.us/ut/weberogden/inspect.nsf/SearchEstabNT?SearchView&Query=[fld_Program]+CONTAINS+kw_Food&SearchOrder=4&SearchMax=0`

Each hit is a name, a street address with city and ZIP, and a facility id in the link (`RestrictToCategory=`). On September 24, 2026 that query returned **1,000 rows**, and `Start=1001` returned **27 more**, about **1,027** food-program records. The index covers Weber County and Morgan County, because one health department inspects both.

Rough city counts from the first 1,000 rows (city text is messy; these are unnormalized):

| City text     | Rows |
| ------------- | ---: |
| Ogden         |  490 |
| Roy           |   89 |
| Riverdale     |   65 |
| South Ogden   |   51 |
| West Haven    |   41 |
| North Ogden   |   38 |
| Pleasant View |   33 |
| Morgan        |   33 |
| Eden          |   28 |
| Farr West     |   22 |
| Harrisville   |   16 |
| Hooper        |   12 |
| Huntsville    |   11 |
| Plain City    |    9 |

Washington Terrace, Marriott-Slaterville, Uintah, Liberty, Mountain Green, and a handful of typos and out-of-county addresses make up the rest. The second page of 27 was not broken out by city.

This is the same shape of source as `design/food-inspections-in-davis-county.csv`: a public name-and-address list, not a finished catalog. Davis County’s current portal is Accela Citizen Access (`aca-prod.accela.com/DAVISCO`), and the county has published inspection reports online since 2006. Weber-Morgan’s Board of Health voted in March 2019 to publish inspections (same contractor as Bear River). The search above is that publication. Older write-ups that say Weber has no public database are out of date.

What the hit list does not include:

- Cuisine, menu, or a useful description
- A facility type on the search row itself. Schools, church kitchens, hospital cafeterias, convenience stores, mobiles, and restaurants are mixed together. A facility page loads type separately (`fld_EstType`, `fld_EstTypeAlt`, plus street number, street, and city). Fetching type means one extra request per facility.
- A bulk CSV. Two HTTP queries cover the directory.
- Inspection scores. The catalog does not need them. The site’s own disclaimer treats a report as a snapshot, not a rating.

The 2024 Weber-Morgan annual report says the department inspected 1,773 food establishments and permitted 111 new ones that year. That count is inspections (and includes Morgan), so it is larger than the ~1,027 names in the current search index.

## Ogden business licenses (cross-check)

Ogden City publishes active business licenses on a public ArcGIS layer:

https://arcgis.ogdencity.com/arcgis/rest/services/Secured/EnerGOV_BusinessLicenses/MapServer/0

The service name says Secured. A query without a login still returns records. On September 24, 2026, active licenses in food NAICS groups were:

| NAICS | Description                         | Active licenses |
| ----- | ----------------------------------- | --------------: |
| 7225  | Restaurants and Other Eating Places |             304 |
| 44512 | Convenience Stores                  |              30 |
| 7224  | Drinking Places                     |              19 |
| 4451  | Grocery Stores                      |              15 |
| 7223  | Special Food Services               |               7 |
| 3118  | Bakeries and Tortilla Manufacturing |               2 |

All 304 restaurant-class licenses geocode to Ogden. Useful fields: DBA, street, NAICS code and description, license status, and a short free-text description (“FAST FOOD RESTAURANT”, “SEAFOOD RESTAURANT W/ BEER”, “Ice Cream Parlor”).

The same records include owner name and email. Leave those out of any export and out of the catalog.

Weber County GIS (maps.webercountyutah.gov) has parcels and addresses, not business licenses. Roy, South Ogden, Riverdale, and the other cities do not have an equivalent public license layer. For those cities the inspection directory is the list. Ogden is the one city where the two lists can be joined.

## What not to use as the source

- **Google Places or Yelp.** Their terms do not allow storing and republishing a directory. Fine for a human to look up one description. Not a seed file.
- **Paid “all restaurants in Ogden” datasets.** Ogden’s license layer and the health-department search already cover this.
- **Utah DABS licensee list.** Alcohol licenses only, and the public PDF found in search is a 2023 snapshot. It misses most family restaurants.
- **Salt Lake County’s CDP portal** (`public.cdpehs.com/UTEnvPbl`). That index is Salt Lake County.
- **OpenStreetMap.** Useful as a spot check. The Open Database License is a poor fit for copying a wholesale list into this catalog.
- **The invoice portal** (`inspectionsonline.us/.../frm_WebAcctSrch`). That page wants an operator account number. It is not the public directory.

A GRAMA request is a fallback if the search index is retired. Weber County takes records requests through NextRequest; Environmental Health is 801-399-7160. Ask only for current permitted food establishments: name, DBA, street, city, and permit category. Do not ask for owner contact or violation narratives. The 2019 board vote treated online publication as a way to avoid those requests, so the public search should stay the first path.

## Recommended scope

Do **Ogden first**, then the other Weber County cities, from the same export. Leave Morgan County out (Morgan, Mountain Green, and any Morgan-only places). The health department’s index mixes the two counties; the catalog should not.

Ogden alone is on the order of **300 restaurants** after dropping non-restaurants, against 304 active restaurant-class city licenses. The full inspection index is about 1,027 food facilities across both counties, and a large share of those are not places we would list (school cafeterias, mobiles, commissaries, gas-station counters). A Weber-wide restaurant list, after that filter, is likely in the same range as today’s Davis catalog (446 places in seven cities), not a 1,000-row dump.

Match the current catalog rules when a row is written:

- One typed row per location: `id`, `name`, `city`, `description`, `cuisines` (first value is the group), up to five `popularMenuItems`, `isFavorite: false`.
- Cuisine buckets stay as they are: American, Mexican, Italian, Asian, Mediterranean, Indian, BBQ, Breakfast & Cafe, Fast Food, Dessert, Drinks, Grocery, Other.
- Chain menus already live in `src/data/restaurants/popularMenus.ts`. Reuse those for a brand we already list in Davis County.
- Inspection names are legal names (`Chick-fil-A Ogden #3007`, `ONCE UPON A TIME CAFE DBA RILEY RESTAURANT GROUP`). Catalog names should be the name on the door, same as Davis. Franchise matching in `restaurantIdsByName` depends on that.
- Eat Out orders currently point at every Davis County location of a chain. Adding Ogden locations to those id lists is a separate decision. Do it only when we want an Ogden stop to count as “where we order this.”

City filter today is an exclusive list: All, Bountiful, Centerville, Farmington, Kaysville, Layton, North Salt Lake, Woods Cross. Weber cities need the same treatment. A county toggle is optional and not required for a first Ogden pass.

## Filter rules for the seed file

Keep a row when it is a place a person can walk in and eat: restaurant, fast food, cafe, bakery, ice cream, grocery or deli we would actually browse, bar that serves food.

Drop, or hold for a later pass:

- School, daycare, hospital, jail, and church kitchens
- Mobile units and commissaries with no storefront
- Seasonal or temporary event booths
- Closed or duplicate permits (same brand, same address)
- Morgan County
- Convenience stores, unless we explicitly want them in Grocery

Ogden join: if a license is active NAICS 7225, keep it even when the inspection name looks odd. If it is only in the inspection index, decide from the name and, when needed, `fld_EstType`. License descriptions are a hint for Fast Food, Dessert, and Drinks. They are not a cuisine tag.

## Plan

1. **Export the directory.** Run the food-program query and the `Start=1001` query. Save `design/weber-food-establishments.csv` with facility id, name, street, city, ZIP. Normalize city spellings (`N. OGDEN`, `WASHINGTON TERR`, `RIVERDALE ROAD` used as a city, stray ZIPs).
2. **Export Ogden licenses.** Query the ArcGIS layer for active NAICS 7225, 7224, 7223, 4451, and 3118. Save `design/ogden-food-licenses.csv` with DBA, street, NAICS, description, and status. Omit owner name and email.
3. **Join and filter.** Match Ogden rows on normalized street plus a loose name match. Apply the keep/drop rules above. Produce a review list, not catalog TypeScript.
4. **Author Ogden.** Add `src/data/restaurants/ogden.ts` in the same style as the Davis city files. Write a one-line description and a primary cuisine per place. Reuse `popularMenus.ts` for chains. Leave `popularMenuItems` empty and `isFavorite` false otherwise.
5. **Widen the city enum.** Add `ogden` to `RestaurantCity`, `RESTAURANT_CITIES`, and `RESTAURANT_CITY_LABELS`. Register the array in `src/data/restaurants/index.ts`. Update the design document’s city list and the test that requires every city in `RESTAURANT_CITIES` to appear in the catalog (`src/data/restaurantBrowse.test.ts`). `isRestaurantCity("clearfield")` stays false.
6. **Photos later.** `scripts/fetch-restaurant-photos.ts` already saves Street View stills. Ogden is a few hundred images. Run it after the rows exist, and keep the name placeholder when Street View has no coverage. Davis is still 345 placeholders out of 446, so photos are not a blocker for listing the city.
7. **Other Weber cities.** Repeat step 4 per city from the same CSV: Roy, South Ogden, Riverdale, North Ogden, West Haven, Pleasant View, Harrisville, Washington Terrace, Farr West, Hooper, Plain City, Marriott-Slaterville, Uintah, Huntsville, Eden. Eden and Huntsville are small; they can share a pass. Do not add a city enum value until that city file has rows, or the “every city is present” test fails.
8. **Eat Out ids.** After Ogden (or Weber) chain locations exist, decide which household orders should list those ids. Default is to leave Davis-only id lists unchanged until someone asks.

## Code touched when this is implemented

- `src/data/types.ts` — `RestaurantCity`
- `src/data/restaurantBrowse.ts` — city list and labels
- `src/data/restaurants/ogden.ts` and later city files
- `src/data/restaurants/index.ts`
- `src/data/restaurantBrowse.test.ts`
- `design/DESIGN_DOCUMENT.md` — Restaurants is documented as Davis County only (§6.4, §7.6, routes)

No machine changes are required for a new city beyond the existing `setRestaurantCity` event, as long as the city union type grows in one place.
