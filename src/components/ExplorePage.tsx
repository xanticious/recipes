import { useSelector } from "@xstate/react";
import { useAppActor } from "../actors.tsx";
import {
  CUISINES,
  CUISINE_LABELS,
  EAT_OUT_FILTER_LABELS,
  filterRecipes,
  groupRecipes,
  HA_FILTER_LABELS,
  MEAL_TYPES,
  MEAL_TYPE_LABELS,
  recipes,
  TERNARY_FILTERS,
} from "../data/index.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import styles from "./ExplorePage.module.css";
import { RecipeMarks } from "./RecipeMarks.tsx";

export function ExplorePage() {
  const appActor = useAppActor();
  const explore = useSelector(appActor, (snapshot) => snapshot.context.explore);

  const matches = filterRecipes(recipes, {
    mealTypes: explore.mealTypes,
    cuisines: explore.cuisines,
    eatOut: explore.eatOut,
    ha: explore.ha,
    query: explore.query,
  });
  const grouped = groupRecipes(matches);
  const hasFilters =
    explore.mealTypes.length > 0 ||
    explore.cuisines.length > 0 ||
    explore.eatOut !== "all" ||
    explore.ha !== "all" ||
    explore.query.trim().length > 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Explore Recipes</h1>
        <p className={styles.lede}>
          Filter by home cooking or eat-out, HA or not, and cuisine. Browse is still grouped by
          meal.
        </p>
      </header>

      <div className={styles.filters}>
        <label className={styles.searchLabel}>
          <span className={styles.searchCaption}>Search by name</span>
          <input
            className={styles.search}
            type="search"
            value={explore.query}
            placeholder="Chili, oatmeal…"
            aria-label="Search recipes by name"
            onChange={(event) => {
              appActor.send({ type: "setExploreQuery", query: event.target.value });
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
                aria-pressed={explore.mealTypes.includes(mealType)}
                onClick={() => {
                  appActor.send({ type: "toggleExploreMealType", mealType });
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
                aria-pressed={explore.eatOut === value}
                onClick={() => {
                  appActor.send({ type: "setExploreEatOut", eatOut: value });
                }}
              >
                {EAT_OUT_FILTER_LABELS[value]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend>HA</legend>
          <div className={styles.chips}>
            {TERNARY_FILTERS.map((value) => (
              <button
                key={value}
                type="button"
                className={styles.chip}
                aria-pressed={explore.ha === value}
                onClick={() => {
                  appActor.send({ type: "setExploreHa", ha: value });
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
                aria-pressed={explore.cuisines.includes(cuisine)}
                onClick={() => {
                  appActor.send({ type: "toggleExploreCuisine", cuisine });
                }}
              >
                {CUISINE_LABELS[cuisine]}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          className={styles.clear}
          disabled={!hasFilters}
          onClick={() => {
            appActor.send({ type: "clearExploreFilters" });
          }}
        >
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
