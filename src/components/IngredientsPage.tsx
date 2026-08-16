import { useSelector } from "@xstate/react";
import { useAppActor } from "../actors.tsx";
import {
  filterIngredients,
  groupIngredients,
  HA_FILTERS,
  INGREDIENT_HA_FILTER_LABELS,
  INGREDIENT_HA_TAG_LABELS,
  INGREDIENT_HA_TAG_TITLES,
  INGREDIENT_SECTION_LABELS,
  INGREDIENT_SECTIONS,
  ingredientHaStatus,
  ingredients,
  isIngredientSection,
  recipes,
  recipesByIngredientId,
  recipesUsingIngredient,
} from "../data/index.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import styles from "./IngredientsPage.module.css";
import { RecipeMarks } from "./RecipeMarks.tsx";

const usage = recipesByIngredientId(recipes);

export function IngredientsPage() {
  const appActor = useAppActor();
  const browse = useSelector(appActor, (snapshot) => snapshot.context.ingredients);

  const matches = filterIngredients(ingredients, {
    ha: browse.ha,
    query: browse.query,
    section: browse.section,
  });
  const grouped = groupIngredients(matches);
  const hasFilters =
    browse.ha !== "all" || browse.query.trim().length > 0 || browse.section !== null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Ingredients</h1>
        <p className={styles.lede}>
          Browse the kitchen catalog by section. Open an ingredient to see which recipes use it.
        </p>
      </header>

      <div className={styles.filters}>
        <label className={styles.searchLabel}>
          <span className={styles.searchCaption}>Category</span>
          <select
            className={styles.combobox}
            value={browse.section ?? ""}
            aria-label="Filter ingredients by category"
            onChange={(event) => {
              const value = event.target.value;
              appActor.send({
                type: "setIngredientsSection",
                section: isIngredientSection(value) ? value : null,
              });
            }}
          >
            <option value="">All categories</option>
            {INGREDIENT_SECTIONS.map((section) => (
              <option key={section} value={section}>
                {INGREDIENT_SECTION_LABELS[section]}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.searchLabel}>
          <span className={styles.searchCaption}>Search by name</span>
          <input
            className={styles.search}
            type="search"
            value={browse.query}
            placeholder="Garlic, cheddar…"
            aria-label="Search ingredients by name"
            onChange={(event) => {
              appActor.send({ type: "setIngredientsQuery", query: event.target.value });
            }}
          />
        </label>

        <fieldset className={styles.group}>
          <legend>House approval</legend>
          <div className={styles.chips}>
            {HA_FILTERS.map((value) => (
              <button
                key={value}
                type="button"
                className={styles.chip}
                aria-pressed={browse.ha === value}
                onClick={() => {
                  appActor.send({ type: "setIngredientsHa", ha: value });
                }}
              >
                {INGREDIENT_HA_FILTER_LABELS[value]}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          className={styles.clear}
          disabled={!hasFilters}
          onClick={() => {
            appActor.send({ type: "clearIngredientsFilters" });
          }}
        >
          Clear filters
        </button>
      </div>

      {matches.length === 0 ? (
        <p className={styles.empty} role="status">
          No ingredients match these filters. Clear a filter or broaden the search.
        </p>
      ) : (
        <div className={styles.results}>
          <p className={styles.count}>
            {matches.length === 1 ? "1 ingredient" : `${String(matches.length)} ingredients`}
          </p>
          {grouped.map((group) => (
            <section key={group.section} className={styles.section}>
              <h2>{INGREDIENT_SECTION_LABELS[group.section]}</h2>
              <ul className={styles.list}>
                {group.ingredients.map((ingredient) => {
                  const open = browse.expandedId === ingredient.id;
                  const usedIn = recipesUsingIngredient(ingredient.id, usage);
                  const haStatus = ingredientHaStatus(ingredient);
                  return (
                    <li key={ingredient.id} className={styles.item}>
                      <button
                        type="button"
                        className={styles.toggle}
                        aria-expanded={open}
                        onClick={() => {
                          appActor.send({ type: "toggleIngredient", id: ingredient.id });
                        }}
                      >
                        <span className={styles.name}>{ingredient.name}</span>
                        <span
                          className={styles.haTag}
                          data-status={haStatus}
                          title={INGREDIENT_HA_TAG_TITLES[haStatus]}
                        >
                          {INGREDIENT_HA_TAG_LABELS[haStatus]}
                        </span>
                        <span className={styles.usage}>
                          {usedIn.length === 0
                            ? "No recipes yet"
                            : usedIn.length === 1
                              ? "1 recipe"
                              : `${String(usedIn.length)} recipes`}
                        </span>
                      </button>
                      {open ? (
                        <div className={styles.panel}>
                          {usedIn.length === 0 ? (
                            <p className={styles.none}>No recipes yet.</p>
                          ) : (
                            <ul className={styles.recipes}>
                              {usedIn.map((recipe) => (
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
                                    <RecipeMarks recipe={recipe} compact />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
