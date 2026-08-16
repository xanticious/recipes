import { useAppActor } from "../actors.tsx";
import {
  CUISINE_LABELS,
  getIngredient,
  HA_LABEL,
  HEALTH_RATING_LABELS,
  ingredientLookup,
  isEatOutRecipe,
  isHomeRecipe,
  MEAL_TYPE_LABELS,
  recipes,
  recipeTotalMinutes,
  relatedRecipes,
  type IngredientLine,
  type Recipe,
} from "../data/index.ts";
import { handleRouteClick, openRandomFromFilters } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import { MarkdownText } from "./MarkdownText.tsx";
import { RecipeMarks } from "./RecipeMarks.tsx";
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

function RelatedRecipes({ recipe }: { recipe: Recipe }) {
  const appActor = useAppActor();
  const related = relatedRecipes(recipe, recipes);
  if (related.length === 0) {
    return null;
  }

  return (
    <section className={styles.related} aria-labelledby="related-heading">
      <h2 id="related-heading">Related recipes</h2>
      <ul>
        {related.map((item) => (
          <li key={item.id}>
            <a
              href={routeToHash({ name: "recipe", id: item.id, fromRandom: false })}
              onClick={(event) => {
                handleRouteClick(event, appActor, {
                  name: "recipe",
                  id: item.id,
                  fromRandom: false,
                });
              }}
            >
              {item.title}
            </a>
            <RecipeMarks recipe={item} compact />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RecipePage({ id, fromRandom }: { id: string; fromRandom: boolean }) {
  const appActor = useAppActor();
  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return <RecipeNotFound />;
  }

  const home = isHomeRecipe(recipe) ? recipe : null;
  const eatOut = isEatOutRecipe(recipe) ? recipe : null;
  const total = home ? recipeTotalMinutes(home) : null;

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

        <div className={styles.marks}>
          <RecipeMarks recipe={recipe} />
        </div>
        {!recipe.ha ? (
          <p className={styles.haNote}>
            Not marked {HA_LABEL}. See the kitchen guide if you want to convert it.
          </p>
        ) : null}

        <p className={styles.meta}>
          {MEAL_TYPE_LABELS[recipe.mealType]} · {CUISINE_LABELS[recipe.cuisine]} ·{" "}
          {HEALTH_RATING_LABELS[recipe.healthRating]}
        </p>
        {home && total !== null ? (
          <dl className={styles.times}>
            <div>
              <dt>Prep</dt>
              <dd>{home.prepMinutes} min</dd>
            </div>
            <div>
              <dt>Cook</dt>
              <dd>{home.cookMinutes} min</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{total} min</dd>
            </div>
            <div>
              <dt>Servings</dt>
              <dd>{home.servings}</dd>
            </div>
          </dl>
        ) : null}
      </header>

      {eatOut ? (
        <section className={styles.order} aria-labelledby="order-heading">
          <h2 id="order-heading">The order</h2>
          <p>
            <MarkdownText text={eatOut.description} />
          </p>
          {eatOut.notes ? (
            <div className={styles.notes}>
              <h3>Notes</h3>
              <p>
                <MarkdownText text={eatOut.notes} />
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      {home ? (
        <div className={styles.layout}>
          <section className={styles.ingredients} aria-labelledby="ingredients-heading">
            <h2 id="ingredients-heading">Ingredients</h2>
            <ul>
              {home.ingredients.map((line, index) => (
                <li key={`${line.ingredientId}-${String(index)}`}>{formatIngredientLine(line)}</li>
              ))}
            </ul>
          </section>
          <section className={styles.steps} aria-labelledby="steps-heading">
            <h2 id="steps-heading">Steps</h2>
            <ol>
              {home.steps.map((step, index) => (
                <li key={String(index)}>
                  <MarkdownText text={step} />
                </li>
              ))}
            </ol>
            {home.notes ? (
              <div className={styles.notes}>
                <h3>Notes</h3>
                <p>
                  <MarkdownText text={home.notes} />
                </p>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}

      <RelatedRecipes recipe={recipe} />
    </article>
  );
}
