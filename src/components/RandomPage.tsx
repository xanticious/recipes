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
import { CollapsibleFilters, FilterChip, FilterGroup } from "./CollapsibleFilters.tsx";
import styles from "./RandomPage.module.css";

export function RandomPage() {
  const appActor = useAppActor();
  const random = useSelector(appActor, (snapshot) => snapshot.context.random);
  const filtersOpen = useSelector(appActor, (snapshot) => snapshot.context.filtersOpen);
  const hasFilters =
    random.mealType !== null ||
    random.cuisine !== null ||
    random.eatOut !== "all" ||
    random.ha !== "all";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Random</h1>
        <p className={styles.lede}>
          Leave filters open, or pick meal type, cuisine, home vs eat-out, and House approval. We
          skip the last recipe when another match exists.
        </p>
      </header>

      <CollapsibleFilters
        id="random-filters"
        expanded={filtersOpen}
        onToggle={() => {
          appActor.send({ type: "toggleFilters" });
        }}
        hasFilters={hasFilters}
        onClear={() => {
          appActor.send({ type: "clearRandomFilters" });
        }}
        end={
          <button
            type="button"
            className={styles.roll}
            onClick={() => {
              openRandomFromFilters(appActor);
            }}
          >
            Random
          </button>
        }
      >
        <FilterGroup legend="Meal type">
          <FilterChip
            pressed={random.mealType === null}
            onClick={() => {
              appActor.send({ type: "setRandomMealType", mealType: null });
            }}
          >
            Any
          </FilterChip>
          {MEAL_TYPES.map((mealType) => (
            <FilterChip
              key={mealType}
              pressed={random.mealType === mealType}
              onClick={() => {
                appActor.send({ type: "setRandomMealType", mealType });
              }}
            >
              {MEAL_TYPE_LABELS[mealType]}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup legend="Where">
          {TERNARY_FILTERS.map((value) => (
            <FilterChip
              key={value}
              pressed={random.eatOut === value}
              onClick={() => {
                appActor.send({ type: "setRandomEatOut", eatOut: value });
              }}
            >
              {EAT_OUT_FILTER_LABELS[value]}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup legend="House approval">
          {HA_FILTERS.map((value) => (
            <FilterChip
              key={value}
              pressed={random.ha === value}
              onClick={() => {
                appActor.send({ type: "setRandomHa", ha: value });
              }}
            >
              {HA_FILTER_LABELS[value]}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup legend="Cuisine">
          <FilterChip
            pressed={random.cuisine === null}
            onClick={() => {
              appActor.send({ type: "setRandomCuisine", cuisine: null });
            }}
          >
            Any
          </FilterChip>
          {CUISINES.map((cuisine) => (
            <FilterChip
              key={cuisine}
              pressed={random.cuisine === cuisine}
              onClick={() => {
                appActor.send({ type: "setRandomCuisine", cuisine });
              }}
            >
              {CUISINE_LABELS[cuisine]}
            </FilterChip>
          ))}
        </FilterGroup>
      </CollapsibleFilters>

      {random.noMatch ? (
        <p className={styles.miss} role="status">
          Nothing matches these filters. Leave them as they are and loosen one.
        </p>
      ) : null}
    </div>
  );
}
