import { useSelector } from "@xstate/react";
import { useAppActor } from "../actors.tsx";
import {
  CUISINES,
  CUISINE_LABELS,
  ALLERGY_TAGS,
  DIET_TAG_LABELS,
  PATTERN_TAGS,
  MEAL_TYPES,
  MEAL_TYPE_LABELS,
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
          Leave meal type and cuisine open, or pick one of each. Diet tags combine with AND. We skip
          the last recipe when another match exists.
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

      <fieldset className={styles.group}>
        <legend>Diet tags</legend>
        <div className={styles.chips}>
          {ALLERGY_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={styles.chip}
              aria-pressed={random.tags.includes(tag)}
              onClick={() => {
                appActor.send({ type: "toggleRandomTag", tag });
              }}
            >
              {DIET_TAG_LABELS[tag]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>Eating patterns</legend>
        <div className={styles.chips}>
          {PATTERN_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={styles.chip}
              aria-pressed={random.tags.includes(tag)}
              onClick={() => {
                appActor.send({ type: "toggleRandomTag", tag });
              }}
            >
              {DIET_TAG_LABELS[tag]}
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
          Nothing matches these filters. Leave them as they are and loosen a tag or pick Any.
        </p>
      ) : null}
    </div>
  );
}
