# Restaurant storefront generation

Replace Google Street View stills with generated storefront pictures for the Restaurants catalog.

Street View was the first photo source (`scripts/fetch-restaurant-photos.ts`). It often frames the road, a neighbor, or the side of the building, and the stills are soft. The catalog has about 374 restaurants and about 100 Street View JPEGs in `public/restaurants/`. Cards without a file stay on the colored name placeholder.

## What the generator can and cannot do

This workspace can generate an image from a written prompt. Optional inputs are one or more reference images and an aspect ratio of `1:1`, `4:3`, `3:4`, `16:9`, or `9:16`. Generation is interactive: one prompt at a time inside an agent session. It is not an npm script and it does not read `GOOGLE_MAPS_API_KEY`.

A generated picture is a new facade invented from the prompt. It is not a sharper photo of that street address, and it will not match the real building, sign, or parking lot. That is the trade for a straight-on, evenly lit storefront on every card.

Do not pass existing Street View JPEGs in as reference images. Those files are Google imagery, and the new picture should not be a derivative of them.

The model renders words on signs unreliably. The restaurant name already sits under the card and in the details title, so the picture must not depend on readable lettering.

## Picture style

One style for the whole catalog, so Bountiful and Layton do not look like different photoshoots.

- Straight-on facade, camera at sidewalk height, building filling the frame.
- Daylight, soft shadow, sharp focus, natural color. No dusk, no neon bloom, no tilt-shift, no people, no cars in front of the door.
- Building type comes from the catalog description: diner, cafe, counter, strip-mall suite, standalone, food truck, grocery.
- Materials and planting can suggest the primary cuisine (tile and a patio for Mexican, a simple noodle-shop front for Asian, a bright counter for fast food) without copying a chain’s logo, colors-as-trademark, mascot, or trade dress.
- No letters, numbers, or logos on the sign band, windows, or awning. A blank sign panel is fine.
- No watermarks and no collage borders.

Chains share one picture. Costa Vida in five cities is the same facade copied to each location file. The card title already adds the city when a name repeats. Independent restaurants each get their own picture.

## Prompt

Keep the style paragraph identical every time. Swap only the building sentence, written from that entry’s `name` is not used as sign text, `description`, primary cuisine, and whether it is a counter, dining room, cafe, or grocery.

Example shape:

> Professional daylight photograph of a restaurant storefront, straight-on from the sidewalk, facade centered and filling the frame, sharp focus, natural color, no people, no vehicles blocking the entrance. Single-story casual dining room with a simple awning and a blank sign panel. Warm brick and large front windows, the kind of room used for sit-down Chinese dinners. No letters, numbers, logos, or watermarks.

Reject and regenerate when the facade is oblique, the door is blocked, text or a logo appears, the crop cuts off the building, or the result looks like a different cuisine than the entry.

## Files and credit

Save accepted pictures as `public/restaurants/{id}.jpg`, same path `restaurantPhotoUrl` already uses. Export at 4:3, at least 1200×900, JPEG. Cards are square (`320×320`) and the details panel is 4:3 (`720×540`); both use `object-fit: cover`, so a centered facade survives the square crop.

`RestaurantPhotoSource` is only `"streetview"` today, and the details caption always reads “Photo by {photographer} on {source}”. Generated pictures need a second source, `"generated"`, and different caption copy: these are illustrations, not photographs of the address and not Street View. Do not invent a photographer or a Google panorama URL. `creditUrl` can stay required for Street View and be omitted for generated entries; update `restaurantPhotos.test.ts` so a generated entry still requires the JPEG on disk.

Leave `scripts/fetch-restaurant-photos.ts` in the repo. Stop writing new Street View stills over files that already have `source: "generated"`. A missing generated file keeps the colored placeholder, same as a missing Street View still.

When the first batch is accepted, update Design Document §6.4 so it describes generated storefronts plus leftover Street View stills, not Street View as the only photo source.

## Rollout

1. **Pilot.** Generate eight pictures before touching the catalog: one independent dining room, one cafe, one counter taco shop, one Asian restaurant, one Indian or Mediterranean restaurant, one grocery or bakery, and one chain used for two location ids (same JPEG copied). Include at least two ids that already have Street View so the replacement is obvious.
2. **Review in the app.** Open Restaurants on a phone-width layout and on a desktop layout. Check the card crop, the details panel, light and dark theme, and the caption. Reject the style here if the set looks like clip art or like fake photos of the real buildings.
3. **Lock the style paragraph** from the pictures that passed review. Do not drift it in later batches.
4. **Fill by city**, smallest first (Woods Cross, then North Salt Lake, Kaysville, Centerville, Farmington, Bountiful, Layton). Copy chain masters instead of generating them again. Keep the current Street View JPEG when a generation fails review twice.
5. **Catalog bookkeeping after each city.** Add or replace that city’s rows in `src/data/restaurantPhotos.data.ts`, run `npm run validate`, and confirm the Restaurants page still groups and filters as before.

Do not generate all 374 pictures in one pass. Review is the slow part, and a drifted prompt is expensive to redo.
