import { useSelector } from "@xstate/react";
import { useAppActor } from "../actors.tsx";
import {
  CUISINE_LABELS,
  deriveTags,
  deriveTagsForSelections,
  DIET_TAG_ABBREVS,
  DIET_TAG_LABELS,
  DIET_TAGS,
  fillRecipeSteps,
  getIngredient,
  groupForTag,
  ingredientLookup,
  MEAL_TYPE_LABELS,
  optionLabel,
  recipes,
  recipeTotalMinutes,
  resolveRecipeLines,
  substitutionTags,
} from "../data/index.ts";
import type { DietTag, IngredientLine } from "../data/types.ts";
import { handleRouteClick, openRandomFromFilters } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import { MarkdownText } from "./MarkdownText.tsx";
import styles from "./RecipePage.module.css";

const FRACTIONS: Record<string, string> = {
  "0.125": "1/8",
  "0.25": "1/4",
  "0.33": "1/3",
  "0.333": "1/3",
  "0.5": "1/2",
  "0.67": "2/3",
  "0.75": "3/4",
};

function formatAmount(amount: number): string {
  const whole = Math.floor(amount);
  const fraction = amount - whole;
  if (fraction === 0) {
    return String(whole);
  }
  const key = String(Math.round(fraction * 1000) / 1000);
  const glyph = FRACTIONS[key];
  if (glyph) {
    return whole > 0 ? `${String(whole)} ${glyph}` : glyph;
  }
  return String(amount);
}

function formatIngredientLine(line: IngredientLine): string {
  const name = getIngredient(ingredientLookup, line.ingredientId).name;
  const quantity =
    line.amount === null
      ? (line.unit ?? "")
      : line.unit
        ? `${formatAmount(line.amount)} ${line.unit}`
        : formatAmount(line.amount);
  const prep = line.preparation ? `, ${line.preparation}` : "";
  const optional = line.optional ? " (optional)" : "";
  return quantity ? `${quantity} ${name}${prep}${optional}` : `${name}${prep}${optional}`;
}

function formatResolved(resolved: ReturnType<typeof resolveRecipeLines>[number]): string {
  if (resolved.omitted) {
    return resolved.label;
  }
  return formatIngredientLine(resolved.line);
}

function TagList({ tags }: { tags: DietTag[] }) {
  if (tags.length === 0) {
    return <p className={styles.noTags}>None of these tags as written.</p>;
  }
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag}>{DIET_TAG_LABELS[tag]}</li>
      ))}
    </ul>
  );
}

function RecipeNotFound() {
  const appActor = useAppActor();
  return (
    <div className={styles.missing}>
      <h1>Recipe not found</h1>
      <p>That recipe is not in the catalog.</p>
      <p className={styles.missingLinks}>
        <a
          href={routeToHash({ name: "landing" })}
          onClick={(event) => {
            handleRouteClick(event, appActor, { name: "landing" });
          }}
        >
          Home
        </a>
        <a
          href={routeToHash({ name: "explore" })}
          onClick={(event) => {
            handleRouteClick(event, appActor, { name: "explore" });
          }}
        >
          Explore Recipes
        </a>
      </p>
    </div>
  );
}

export function RecipePage({ id, fromRandom }: { id: string; fromRandom: boolean }) {
  const appActor = useAppActor();
  const recipeView = useSelector(appActor, (snapshot) => snapshot.context.recipeView);
  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return <RecipeNotFound />;
  }

  const selections = recipeView.recipeId === id ? recipeView.selections : {};
  const expanded = recipeView.recipeId === id ? recipeView.expanded : null;
  const resolved = resolveRecipeLines(recipe, selections, ingredientLookup);
  const steps = fillRecipeSteps(recipe, resolved);

  const asWritten = new Set(deriveTags(recipe, ingredientLookup, "as-written"));
  const withAlterations = new Set(deriveTags(recipe, ingredientLookup, "with-alterations"));
  const thisVersion = new Set(deriveTagsForSelections(recipe, ingredientLookup, selections));

  const standardTags = DIET_TAGS.filter((tag) => asWritten.has(tag));
  const alterationTags = DIET_TAGS.filter((tag) => withAlterations.has(tag));
  const versionTags = DIET_TAGS.filter((tag) => thisVersion.has(tag));
  const showAlterations = alterationTags.some((tag) => !asWritten.has(tag));
  const hasSelections = Object.keys(selections).length > 0;
  const total = recipeTotalMinutes(recipe);

  return (
    <article className={styles.page}>
      {fromRandom ? (
        <p className={styles.randomBar}>
          <button
            type="button"
            className={styles.randomAgain}
            onClick={() => {
              openRandomFromFilters(appActor);
            }}
          >
            Random again
          </button>
        </p>
      ) : null}

      <header className={styles.header}>
        <h1>
          {recipe.title}
          {recipe.specialOccasion ? (
            <abbr className={styles.star} title="Special occasion">
              *
            </abbr>
          ) : null}
        </h1>
        {recipe.specialOccasion ? <p className={styles.occasion}>Special occasion</p> : null}

        <div className={styles.tagBlock}>
          <div>
            <h2 className={styles.tagHeading}>Standard recipe</h2>
            <TagList tags={standardTags} />
          </div>
          {showAlterations ? (
            <div>
              <h2 className={styles.tagHeading}>With alterations</h2>
              <TagList tags={alterationTags} />
            </div>
          ) : null}
          {hasSelections ? (
            <div>
              <h2 className={styles.tagHeading}>This version</h2>
              <TagList tags={versionTags} />
            </div>
          ) : null}
        </div>

        <p className={styles.meta}>
          {MEAL_TYPE_LABELS[recipe.mealType]} · {CUISINE_LABELS[recipe.cuisine]}
        </p>
        <dl className={styles.times}>
          <div>
            <dt>Prep</dt>
            <dd>{recipe.prepMinutes} min</dd>
          </div>
          <div>
            <dt>Cook</dt>
            <dd>{recipe.cookMinutes} min</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{total} min</dd>
          </div>
          <div>
            <dt>Servings</dt>
            <dd>{recipe.servings}</dd>
          </div>
        </dl>
      </header>

      <div className={styles.layout}>
        <section className={styles.ingredients} aria-labelledby="ingredients-heading">
          <h2 id="ingredients-heading">Ingredients</h2>
          <ul>
            {resolved.map((item, index) => {
              const original = recipe.ingredients[index];
              if (!original) {
                return null;
              }
              const tags = substitutionTags(original);
              const panelOpen = expanded?.slot === item.slot;
              const openTag = panelOpen ? expanded.tag : null;
              const group = openTag ? groupForTag(original, openTag) : undefined;

              return (
                <li
                  key={`${item.slot}-${String(index)}`}
                  className={item.selected ? styles.swapped : undefined}
                >
                  <div className={styles.lineRow}>
                    <span>{formatResolved(item)}</span>
                    {tags.length > 0 ? (
                      <span className={styles.subChips}>
                        {tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={styles.subChip}
                            aria-expanded={openTag === tag}
                            aria-label={`Substitutions for ${DIET_TAG_LABELS[tag]}`}
                            title={DIET_TAG_LABELS[tag]}
                            onClick={() => {
                              appActor.send({
                                type: "toggleSubPanel",
                                recipeId: recipe.id,
                                slot: item.slot,
                                tag,
                              });
                            }}
                          >
                            {DIET_TAG_ABBREVS[tag]}
                          </button>
                        ))}
                      </span>
                    ) : null}
                    {item.selected ? (
                      <button
                        type="button"
                        className={styles.reset}
                        onClick={() => {
                          appActor.send({
                            type: "clearSubstitution",
                            recipeId: recipe.id,
                            slot: item.slot,
                          });
                        }}
                      >
                        Original
                      </button>
                    ) : null}
                  </div>
                  {group && openTag ? (
                    <div className={styles.subPanel}>
                      <p className={styles.subLead}>
                        For {DIET_TAG_LABELS[openTag]} you can substitute:
                      </p>
                      <ul>
                        <li>
                          <button
                            type="button"
                            className={styles.subOption}
                            onClick={() => {
                              appActor.send({
                                type: "clearSubstitution",
                                recipeId: recipe.id,
                                slot: item.slot,
                              });
                            }}
                          >
                            Use original
                          </button>
                        </li>
                        {group.options.map((option, optionIndex) => (
                          <li key={`${openTag}-${String(optionIndex)}`}>
                            <button
                              type="button"
                              className={styles.subOption}
                              aria-pressed={
                                item.selected?.tag === openTag &&
                                item.selected.optionIndex === optionIndex
                              }
                              onClick={() => {
                                appActor.send({
                                  type: "selectSubstitution",
                                  recipeId: recipe.id,
                                  slot: item.slot,
                                  tag: openTag,
                                  optionIndex,
                                });
                              }}
                            >
                              {optionLabel(option, ingredientLookup)}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        className={styles.collapse}
                        onClick={() => {
                          appActor.send({ type: "collapseSubPanel" });
                        }}
                      >
                        Collapse
                      </button>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
        <section className={styles.steps} aria-labelledby="steps-heading">
          <h2 id="steps-heading">Steps</h2>
          <ol>
            {steps.map((step, index) => (
              <li key={String(index)}>
                <MarkdownText text={step} />
              </li>
            ))}
          </ol>
          {recipe.notes ? (
            <div className={styles.notes}>
              <h3>Notes</h3>
              <p>
                <MarkdownText text={recipe.notes} />
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </article>
  );
}
