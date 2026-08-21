import { useSelector } from "@xstate/react";
import { useEffect } from "react";
import { useAppActor } from "../actors.tsx";
import {
  CATALOG_IMAGE_CARD,
  capitalizeIngredientName,
  filterBrowsedIngredients,
  FODMAP_BROWSE_LEVELS,
  FODMAP_BROWSE_LEVEL_LABELS,
  FODMAP_BROWSE_TYPES,
  FODMAP_BROWSE_TYPE_LABELS,
  groupFodmapIngredients,
  INGREDIENT_HA_FILTERS,
  INGREDIENT_HA_FILTER_LABELS,
  INGREDIENT_HA_TAG_LABELS,
  INGREDIENT_HA_TAG_TITLES,
  INGREDIENT_SECTION_LABELS,
  INGREDIENT_SECTIONS,
  ingredientHaStatus,
  ingredientLookup,
  ingredients,
  isIngredientSection,
  recipes,
  recipesByIngredientId,
  recipesUsingIngredient,
  showsFodmapTypeRow,
} from "../data/index.ts";
import { IngredientDetails } from "./IngredientDetails.tsx";
import { IngredientPhoto } from "./IngredientPhoto.tsx";
import styles from "./IngredientsPage.module.css";

const usage = recipesByIngredientId(recipes);

export function IngredientsPage() {
  const appActor = useAppActor();
  const browse = useSelector(appActor, (snapshot) => snapshot.context.ingredients);
  const matches = filterBrowsedIngredients(ingredients, {
    ha: browse.ha,
    query: browse.query,
    section: browse.section,
    level: browse.level,
    type: browse.type,
  });
  const grouped = groupFodmapIngredients(matches);
  const openIngredient = browse.expandedId ? ingredientLookup.get(browse.expandedId) : undefined;
  const openHaStatus = openIngredient ? ingredientHaStatus(openIngredient) : null;
  const showTypes = showsFodmapTypeRow(browse.level);
  const hasFilters =
    browse.ha !== "all" ||
    browse.query.trim().length > 0 ||
    browse.section !== null ||
    browse.level !== "all" ||
    browse.type !== "all";

  useEffect(() => {
    if (!browse.expandedId) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        appActor.send({ type: "closeIngredient" });
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
        <h1>Ingredients</h1>
        <p className={styles.lede}>
          Browse the kitchen catalog. Open a card for diet notes and which recipes use that
          ingredient.
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
            {INGREDIENT_HA_FILTERS.map((value) => (
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

        <fieldset className={styles.group}>
          <legend>FODMAP level</legend>
          <div className={styles.chips}>
            {FODMAP_BROWSE_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                className={styles.chip}
                aria-pressed={browse.level === level}
                onClick={() => {
                  appActor.send({ type: "setIngredientsFodmapLevel", level });
                }}
              >
                {FODMAP_BROWSE_LEVEL_LABELS[level]}
              </button>
            ))}
          </div>
        </fieldset>

        {showTypes ? (
          <fieldset className={styles.group}>
            <legend>{browse.level === "medium" ? "Medium Fodmap type" : "High Fodmap type"}</legend>
            <div className={styles.chips}>
              {FODMAP_BROWSE_TYPES.map((fodmapType) => (
                <button
                  key={fodmapType}
                  type="button"
                  className={styles.chip}
                  aria-pressed={browse.type === fodmapType}
                  onClick={() => {
                    appActor.send({ type: "setIngredientsFodmapType", fodmapType });
                  }}
                >
                  {FODMAP_BROWSE_TYPE_LABELS[fodmapType]}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

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
              <ul className={styles.grid}>
                {group.ingredients.map((ingredient) => {
                  const open = browse.expandedId === ingredient.id;
                  return (
                    <li key={ingredient.id}>
                      <button
                        type="button"
                        className={styles.card}
                        aria-expanded={open}
                        onClick={() => {
                          appActor.send({ type: "toggleIngredient", id: ingredient.id });
                        }}
                      >
                        <IngredientPhoto
                          id={ingredient.id}
                          name={ingredient.name}
                          width={CATALOG_IMAGE_CARD.width}
                          height={CATALOG_IMAGE_CARD.height}
                          fill
                        />
                        <span className={styles.cardName}>
                          {capitalizeIngredientName(ingredient.name)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      {openIngredient ? (
        <div
          className={styles.backdrop}
          onClick={() => {
            appActor.send({ type: "closeIngredient" });
          }}
        >
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ingredient-title"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className={styles.dialogBar}>
              <h2 id="ingredient-title">
                <span>{capitalizeIngredientName(openIngredient.name)}</span>
                {openHaStatus ? (
                  <span
                    className={styles.haTag}
                    data-status={openHaStatus}
                    title={INGREDIENT_HA_TAG_TITLES[openHaStatus]}
                  >
                    {INGREDIENT_HA_TAG_LABELS[openHaStatus]}
                  </span>
                ) : null}
              </h2>
              <button
                type="button"
                className={styles.close}
                onClick={() => {
                  appActor.send({ type: "closeIngredient" });
                }}
              >
                Close
              </button>
            </div>
            <IngredientDetails
              ingredient={openIngredient}
              usedIn={recipesUsingIngredient(openIngredient.id, usage)}
              showFodmapSummary
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
