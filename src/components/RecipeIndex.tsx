import { useAppActor } from "../actors.tsx";
import {
  CUISINES,
  CUISINE_LABELS,
  filterRecipes,
  groupRecipes,
  HA_FILTER_LABELS,
  HA_FILTERS,
  MEAL_TYPES,
  MEAL_TYPE_LABELS,
  type Cuisine,
  type HaFilter,
  type MealType,
  type Recipe,
} from "../data/index.ts";
import type { CatalogFilters } from "../machines/appMachine.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import styles from "./ExplorePage.module.css";
import { RecipeMarks } from "./RecipeMarks.tsx";

type RecipeIndexProps = {
  title: string;
  lede: string;
  catalog: readonly Recipe[];
  filters: CatalogFilters;
  eatOut: "yes" | "no";
  searchPlaceholder: string;
  onQuery: (query: string) => void;
  onToggleMealType: (mealType: MealType) => void;
  onToggleCuisine: (cuisine: Cuisine) => void;
  onSetHa: (ha: HaFilter) => void;
  onClear: () => void;
};

export function RecipeIndex({
  title,
  lede,
  catalog,
  filters,
  eatOut,
  searchPlaceholder,
  onQuery,
  onToggleMealType,
  onToggleCuisine,
  onSetHa,
  onClear,
}: RecipeIndexProps) {
  const appActor = useAppActor();
  const matches = filterRecipes(catalog, {
    mealTypes: filters.mealTypes,
    cuisines: filters.cuisines,
    eatOut,
    ha: filters.ha,
    query: filters.query,
  });
  const grouped = groupRecipes(matches);
  const hasFilters =
    filters.mealTypes.length > 0 ||
    filters.cuisines.length > 0 ||
    filters.ha !== "all" ||
    filters.query.trim().length > 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{title}</h1>
        <p className={styles.lede}>{lede}</p>
      </header>

      <div className={styles.filters}>
        <label className={styles.searchLabel}>
          <span className={styles.searchCaption}>Search by name</span>
          <input
            className={styles.search}
            type="search"
            value={filters.query}
            placeholder={searchPlaceholder}
            aria-label={`Search ${title.toLowerCase()} by name`}
            onChange={(event) => {
              onQuery(event.target.value);
            }}
          />
        </label>

        <fieldset className={styles.group}>
          <legend>Meal type</legend>
          <div className={styles.chips}>
            {MEAL_TYPES.map((mealType) => (
              <button
                key={mealType}
                type="button"
                className={styles.chip}
                aria-pressed={filters.mealTypes.includes(mealType)}
                onClick={() => {
                  onToggleMealType(mealType);
                }}
              >
                {MEAL_TYPE_LABELS[mealType]}
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
                aria-pressed={filters.ha === value}
                onClick={() => {
                  onSetHa(value);
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
            {CUISINES.map((cuisine) => (
              <button
                key={cuisine}
                type="button"
                className={styles.chip}
                aria-pressed={filters.cuisines.includes(cuisine)}
                onClick={() => {
                  onToggleCuisine(cuisine);
                }}
              >
                {CUISINE_LABELS[cuisine]}
              </button>
            ))}
          </div>
        </fieldset>

        <button type="button" className={styles.clear} disabled={!hasFilters} onClick={onClear}>
          Clear filters
        </button>
      </div>

      {matches.length === 0 ? (
        <p className={styles.empty} role="status">
          No recipes match these filters. Clear a filter or broaden the search.
        </p>
      ) : (
        <div className={styles.results}>
          <p className={styles.count}>
            {matches.length === 1 ? "1 recipe" : `${String(matches.length)} recipes`}
          </p>
          {grouped.map((mealGroup) => (
            <section key={mealGroup.mealType} className={styles.mealSection}>
              <h2>{MEAL_TYPE_LABELS[mealGroup.mealType]}</h2>
              {mealGroup.cuisines.map((cuisineGroup) => (
                <div key={cuisineGroup.cuisine} className={styles.cuisineBlock}>
                  <h3>{CUISINE_LABELS[cuisineGroup.cuisine]}</h3>
                  <ul className={styles.list}>
                    {cuisineGroup.recipes.map((recipe) => (
                      <li key={recipe.id}>
                        <a
                          className={styles.recipeLink}
                          href={routeToHash({
                            name: "recipe",
                            id: recipe.id,
                            fromRandom: false,
                          })}
                          onClick={(event) => {
                            handleRouteClick(event, appActor, {
                              name: "recipe",
                              id: recipe.id,
                              fromRandom: false,
                            });
                          }}
                        >
                          <span>{recipe.title}</span>
                          {recipe.specialOccasion ? (
                            <abbr className={styles.star} title="Special occasion">
                              *
                            </abbr>
                          ) : null}
                          <RecipeMarks recipe={recipe} compact />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
