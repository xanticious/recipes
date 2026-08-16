import { useSelector } from "@xstate/react";
import { useAppActor } from "../actors.tsx";
import {
  CUISINES,
  CUISINE_LABELS,
  EAT_OUT_FILTER_LABELS,
  HA_FILTER_LABELS,
  HA_FILTERS,
  MEAL_TYPES,
  MEAL_TYPE_LABELS,
  TERNARY_FILTERS,
} from "../data/index.ts";
import { openRandomFromFilters } from "../navigation.ts";
import styles from "./RandomPage.module.css";

export function RandomPage() {
  const appActor = useAppActor();
  const random = useSelector(appActor, (snapshot) => snapshot.context.random);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Random</h1>
        <p className={styles.lede}>
          Leave filters open, or pick meal type, cuisine, home vs eat-out, and House approval. We
          skip the last recipe when another match exists.
        </p>
      </header>

      <fieldset className={styles.group}>
        <legend>Meal type</legend>
        <div className={styles.chips}>
          <button
            type="button"
            className={styles.chip}
            aria-pressed={random.mealType === null}
            onClick={() => {
              appActor.send({ type: "setRandomMealType", mealType: null });
            }}
          >
            Any
          </button>
          {MEAL_TYPES.map((mealType) => (
            <button
              key={mealType}
              type="button"
              className={styles.chip}
              aria-pressed={random.mealType === mealType}
              onClick={() => {
                appActor.send({ type: "setRandomMealType", mealType });
              }}
            >
              {MEAL_TYPE_LABELS[mealType]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>Where</legend>
        <div className={styles.chips}>
          {TERNARY_FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              className={styles.chip}
              aria-pressed={random.eatOut === value}
              onClick={() => {
                appActor.send({ type: "setRandomEatOut", eatOut: value });
              }}
            >
              {EAT_OUT_FILTER_LABELS[value]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>House approval</legend>
        <div className={styles.chips}>
          {HA_FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              className={styles.chip}
              aria-pressed={random.ha === value}
              onClick={() => {
                appActor.send({ type: "setRandomHa", ha: value });
              }}
            >
              {HA_FILTER_LABELS[value]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>Cuisine</legend>
        <div className={styles.chips}>
          <button
            type="button"
            className={styles.chip}
            aria-pressed={random.cuisine === null}
            onClick={() => {
              appActor.send({ type: "setRandomCuisine", cuisine: null });
            }}
          >
            Any
          </button>
          {CUISINES.map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              className={styles.chip}
              aria-pressed={random.cuisine === cuisine}
              onClick={() => {
                appActor.send({ type: "setRandomCuisine", cuisine });
              }}
            >
              {CUISINE_LABELS[cuisine]}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        className={styles.roll}
        onClick={() => {
          openRandomFromFilters(appActor);
        }}
      >
        Random
      </button>

      {random.noMatch ? (
        <p className={styles.miss} role="status">
          Nothing matches these filters. Leave them as they are and loosen one.
        </p>
      ) : null}
    </div>
  );
}
