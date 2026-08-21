import {
  CATALOG_IMAGE_PANEL,
  popularMenuSlots,
  RESTAURANT_CITY_LABELS,
  RESTAURANT_CUISINE_LABELS,
  type Restaurant,
} from "../data/index.ts";
import { RestaurantPhoto } from "./RestaurantPhoto.tsx";
import styles from "./RestaurantDetails.module.css";

export function RestaurantDetails({ restaurant }: { restaurant: Restaurant }) {
  const slots = popularMenuSlots(restaurant.popularMenuItems);

  return (
    <div className={styles.details}>
      <RestaurantPhoto
        id={restaurant.id}
        name={restaurant.name}
        width={CATALOG_IMAGE_PANEL.width}
        height={CATALOG_IMAGE_PANEL.height}
      />
      <p className={styles.meta}>
        <span>{RESTAURANT_CITY_LABELS[restaurant.city]}</span>
        <span aria-hidden="true">·</span>
        <span>
          {restaurant.cuisines.map((cuisine) => RESTAURANT_CUISINE_LABELS[cuisine]).join(", ")}
        </span>
      </p>
      <p className={styles.favorite} data-on={restaurant.isFavorite ? "true" : "false"}>
        {restaurant.isFavorite ? "Favorite" : "Not marked as a favorite"}
      </p>
      <p className={styles.description}>{restaurant.description}</p>
      <div className={styles.menuBlock}>
        <p className={styles.heading}>5 most popular menu items</p>
        <ol className={styles.menu}>
          {slots.map((item, index) => (
            <li key={`menu-${String(index + 1)}`} className={item ? undefined : styles.emptyItem}>
              {item ?? "Not listed yet"}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
