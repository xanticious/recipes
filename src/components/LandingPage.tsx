import { useAppActor } from "../actors.tsx";
import { MEAL_TYPES, MEAL_TYPE_LABELS } from "../data/index.ts";
import { goOpenExplore, goToRoute } from "../navigation.ts";
import styles from "./LandingPage.module.css";

export function LandingPage() {
  const appActor = useAppActor();

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <h1>Family Recipes</h1>
        <p className={styles.lede}>
          This is our family cookbook: weeknight dinners, a few special-occasion meals, and the
          takeout orders we actually get. Practical food, grocery-store ingredients, and a short
          kitchen guide when we need to convert a dish.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="browse-meals">
        <h2 id="browse-meals">Browse by meal</h2>
        <div className={styles.mealRow}>
          {MEAL_TYPES.map((mealType) => (
            <button
              key={mealType}
              type="button"
              className={styles.mealLink}
              onClick={() => {
                goOpenExplore(appActor, mealType);
              }}
            >
              {MEAL_TYPE_LABELS[mealType]}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="browse-ingredients">
        <h2 id="browse-ingredients">Browse ingredients</h2>
        <div className={styles.mealRow}>
          <button
            type="button"
            className={styles.mealLink}
            onClick={() => {
              goToRoute(appActor, { name: "ingredients" });
            }}
          >
            Open the ingredient catalog
          </button>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="guide-heading">
        <h2 id="guide-heading">Kitchen guide</h2>
        <p>
          Substitutions, fiber and protein ideas, and how to turn a regular recipe into one that
          fits this household.
        </p>
        <div className={styles.mealRow}>
          <button
            type="button"
            className={styles.mealLink}
            onClick={() => {
              goToRoute(appActor, { name: "guide" });
            }}
          >
            Open the guide
          </button>
        </div>
      </section>
    </article>
  );
}
