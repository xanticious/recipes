import { useSelector } from "@xstate/react";
import { useEffect, useLayoutEffect } from "react";
import { useAppActor } from "../actors.tsx";
import {
  CATALOG_IMAGE_CARD,
  duplicateRestaurantNames,
  filterRestaurants,
  getRestaurant,
  groupRestaurants,
  DAVIS_RESTAURANT_CITIES,
  RESTAURANT_CITY_LABELS,
  RESTAURANT_DISPLAYS,
  RESTAURANT_DISPLAY_LABELS,
  RESTAURANT_DISPLAY_SHORT_LABELS,
  WEBER_RESTAURANT_CITIES,
  RESTAURANT_CUISINE_LABELS,
  restaurantDisplayName,
  restaurants,
} from "../data/index.ts";
import type { Restaurant, RestaurantCity, RestaurantCityFilter } from "../data/index.ts";
import { RestaurantDetails } from "./RestaurantDetails.tsx";
import { RestaurantPhoto } from "./RestaurantPhoto.tsx";
import {
  CollapsibleFilters,
  FilterChip,
  FilterGroup,
  FilterSegmentedToggle,
} from "./CollapsibleFilters.tsx";
import styles from "./RestaurantsPage.module.css";

function restaurantCardId(id: string) {
  return `restaurant-${id}`;
}

function scrollRestaurantCardIntoView(card: HTMLElement) {
  const header = document.querySelector("[data-app-bar]");
  const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
  const rect = card.getBoundingClientRect();
  const visibleTop = headerHeight + 8;
  if (rect.top >= visibleTop && rect.bottom <= window.innerHeight - 8) {
    return;
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = window.scrollY + rect.top - headerHeight - 8;
  window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? "auto" : "smooth" });
}

function CityChips({
  cities,
  selected,
  onSelect,
}: {
  cities: readonly RestaurantCity[];
  selected: RestaurantCityFilter;
  onSelect: (city: RestaurantCity) => void;
}) {
  return cities.map((city) => (
    <FilterChip
      key={city}
      pressed={selected === city}
      onClick={() => {
        onSelect(city);
      }}
    >
      {RESTAURANT_CITY_LABELS[city]}
    </FilterChip>
  ));
}

export function RestaurantsPage() {
  const appActor = useAppActor();
  const browse = useSelector(appActor, (snapshot) => snapshot.context.restaurants);
  const filtersOpen = useSelector(appActor, (snapshot) => snapshot.context.filtersOpen);
  const matches = filterRestaurants(restaurants, { city: browse.city, query: browse.query });
  const grouped = groupRestaurants(matches);
  const duplicateNames = duplicateRestaurantNames(restaurants);
  const pictures = browse.display === "pictures";
  const openRestaurant = browse.expandedId ? getRestaurant(browse.expandedId) : undefined;
  const openRestaurantName = openRestaurant
    ? restaurantDisplayName(openRestaurant, duplicateNames)
    : undefined;
  const hasFilters = browse.city !== "all" || browse.query.trim().length > 0;

  useLayoutEffect(() => {
    if (pictures || !browse.expandedId) {
      return;
    }
    const card = document.getElementById(restaurantCardId(browse.expandedId));
    if (!card) {
      return;
    }
    scrollRestaurantCardIntoView(card);
  }, [browse.expandedId, pictures]);

  useEffect(() => {
    if (!browse.expandedId) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        appActor.send({ type: "closeRestaurant" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [appActor, browse.expandedId]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Restaurants</h1>
        <p className={styles.lede}>
          Places to eat in Davis County and Weber County, grouped by cuisine. Open one for the city,
          a short description, and a glimpse at some favorite dishes.
        </p>
      </header>

      <CollapsibleFilters
        id="restaurants-filters"
        search={{
          value: browse.query,
          placeholder: "Chick-fil-A, taco, cafe…",
          ariaLabel: "Search restaurants by name",
          onChange: (query) => {
            appActor.send({ type: "setRestaurantQuery", query });
          },
        }}
        toolbar={
          <FilterSegmentedToggle
            value={browse.display}
            options={RESTAURANT_DISPLAYS.map((display) => ({
              value: display,
              label: RESTAURANT_DISPLAY_SHORT_LABELS[display],
              name: RESTAURANT_DISPLAY_LABELS[display],
            }))}
            ariaLabel="Display"
            onChange={(display) => {
              appActor.send({ type: "setRestaurantDisplay", display });
            }}
          />
        }
        expanded={filtersOpen}
        onToggle={() => {
          appActor.send({ type: "toggleFilters" });
        }}
        hasFilters={hasFilters}
        onClear={() => {
          appActor.send({ type: "clearRestaurantFilters" });
        }}
      >
        <FilterGroup>
          <FilterChip
            pressed={browse.city === "all"}
            onClick={() => {
              appActor.send({ type: "setRestaurantCity", city: "all" });
            }}
          >
            All
          </FilterChip>
        </FilterGroup>
        <FilterGroup legend="Davis County">
          <CityChips
            cities={DAVIS_RESTAURANT_CITIES}
            selected={browse.city}
            onSelect={(city) => {
              appActor.send({ type: "setRestaurantCity", city });
            }}
          />
        </FilterGroup>
        <FilterGroup legend="Weber County">
          <CityChips
            cities={WEBER_RESTAURANT_CITIES}
            selected={browse.city}
            onSelect={(city) => {
              appActor.send({ type: "setRestaurantCity", city });
            }}
          />
        </FilterGroup>
      </CollapsibleFilters>

      {matches.length === 0 ? (
        <p className={styles.empty} role="status">
          No restaurants match.
        </p>
      ) : (
        <div className={styles.results}>
          <p className={styles.count}>
            {matches.length === 1 ? "1 restaurant" : `${String(matches.length)} restaurants`}
          </p>
          {grouped.map((group) => (
            <section key={group.cuisine} className={styles.section}>
              <h2>{RESTAURANT_CUISINE_LABELS[group.cuisine]}</h2>
              {pictures ? (
                <ul className={styles.grid}>
                  {group.restaurants.map((restaurant) => {
                    const open = browse.expandedId === restaurant.id;
                    const displayName = restaurantDisplayName(restaurant, duplicateNames);
                    return (
                      <li key={restaurant.id}>
                        <button
                          type="button"
                          className={styles.card}
                          aria-expanded={open}
                          onClick={() => {
                            appActor.send({ type: "toggleRestaurant", id: restaurant.id });
                          }}
                        >
                          <RestaurantPhoto
                            id={restaurant.id}
                            name={displayName}
                            width={CATALOG_IMAGE_CARD.width}
                            height={CATALOG_IMAGE_CARD.height}
                            fill
                          />
                          <span className={styles.cardName}>{displayName}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className={styles.list}>
                  {group.restaurants.map((restaurant) => (
                    <RestaurantListCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      open={browse.expandedId === restaurant.id}
                      onToggle={() => {
                        appActor.send({ type: "toggleRestaurant", id: restaurant.id });
                      }}
                    />
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}

      {pictures && openRestaurant ? (
        <div
          className={styles.backdrop}
          onClick={() => {
            appActor.send({ type: "closeRestaurant" });
          }}
        >
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="restaurant-title"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className={styles.dialogBar}>
              <h2 id="restaurant-title">{openRestaurantName}</h2>
              <button
                type="button"
                className={styles.close}
                onClick={() => {
                  appActor.send({ type: "closeRestaurant" });
                }}
              >
                Close
              </button>
            </div>
            <RestaurantDetails restaurant={openRestaurant} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RestaurantListCard({
  restaurant,
  open,
  onToggle,
}: {
  restaurant: Restaurant;
  open: boolean;
  onToggle: () => void;
}) {
  const detailsId = `${restaurant.id}-details`;

  return (
    <li
      className={styles.listCard}
      id={restaurantCardId(restaurant.id)}
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        <span className={styles.titleRow}>
          <span className={styles.title}>{restaurant.name}</span>
          <span className={styles.city}>{RESTAURANT_CITY_LABELS[restaurant.city]}</span>
        </span>
        <span className={styles.hint}>{open ? "Hide" : "Details"}</span>
      </button>
      {open ? (
        <div className={styles.details} id={detailsId}>
          <RestaurantDetails restaurant={restaurant} />
        </div>
      ) : null}
    </li>
  );
}
