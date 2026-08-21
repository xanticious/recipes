import { useAppActor } from "../actors.tsx";
import { MEAL_TYPES, MEAL_TYPE_LABELS } from "../data/index.ts";
import { goOpenEatOut, goOpenExplore, goToRoute } from "../navigation.ts";
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
          kitchen guide.
        </p>
        <p className={styles.lede}>
          HA means House Approved: we can serve it without interfering with our food allergies, and
          it does not taste bad to any of us :) .
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

      <section className={styles.section} aria-labelledby="eat-out-heading">
        <h2 id="eat-out-heading">Eat out</h2>
        <p>Restaurant and takeout orders we actually get.</p>
        <div className={styles.mealRow}>
          <button
            type="button"
            className={styles.mealLink}
            onClick={() => {
              goOpenEatOut(appActor);
            }}
          >
            Open eat out
          </button>
          <button
            type="button"
            className={styles.mealLink}
            onClick={() => {
              goToRoute(appActor, { name: "restaurants" });
            }}
          >
            Davis County restaurants
          </button>
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
        <p>What House Approved means, and the substitutions we use.</p>
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
