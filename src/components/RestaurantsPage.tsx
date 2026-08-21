import { useSelector } from "@xstate/react";
import { useEffect } from "react";
import { useAppActor } from "../actors.tsx";
import {
  CATALOG_IMAGE_CARD,
  duplicateRestaurantNames,
  filterRestaurants,
  getRestaurant,
  groupRestaurants,
  RESTAURANT_CITIES,
  RESTAURANT_CITY_LABELS,
  RESTAURANT_CUISINE_LABELS,
  restaurantDisplayName,
  restaurants,
} from "../data/index.ts";
import { RestaurantDetails } from "./RestaurantDetails.tsx";
import { RestaurantPhoto } from "./RestaurantPhoto.tsx";
import styles from "./RestaurantsPage.module.css";

const CITY_FILTERS = ["all", ...RESTAURANT_CITIES] as const;

export function RestaurantsPage() {
  const appActor = useAppActor();
  const browse = useSelector(appActor, (snapshot) => snapshot.context.restaurants);
  const matches = filterRestaurants(restaurants, { city: browse.city });
  const grouped = groupRestaurants(matches);
  const duplicateNames = duplicateRestaurantNames(restaurants);
  const openRestaurant = browse.expandedId ? getRestaurant(browse.expandedId) : undefined;
  const openRestaurantName = openRestaurant
    ? restaurantDisplayName(openRestaurant, duplicateNames)
    : undefined;

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
          Davis County places to eat, grouped by cuisine. Open a card for the city, a short
          description, and room for favorite dishes.
        </p>
      </header>

      <div className={styles.filters}>
        <fieldset className={styles.group}>
          <legend>City</legend>
          <div className={styles.chips}>
            {CITY_FILTERS.map((city) => (
              <button
                key={city}
                type="button"
                className={styles.chip}
                aria-pressed={browse.city === city}
                onClick={() => {
                  appActor.send({ type: "setRestaurantCity", city });
                }}
              >
                {city === "all" ? "All" : RESTAURANT_CITY_LABELS[city]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {matches.length === 0 ? (
        <p className={styles.empty} role="status">
          No restaurants match this city filter.
        </p>
      ) : (
        <div className={styles.results}>
          <p className={styles.count}>
            {matches.length === 1 ? "1 restaurant" : `${String(matches.length)} restaurants`}
          </p>
          {grouped.map((group) => (
            <section key={group.cuisine} className={styles.section}>
              <h2>{RESTAURANT_CUISINE_LABELS[group.cuisine]}</h2>
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
            </section>
          ))}
        </div>
      )}

      {openRestaurant ? (
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
