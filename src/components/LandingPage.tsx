import { useAppActor } from "../actors.tsx";
import { DIET_TAG_LABELS, MEAL_TYPES, MEAL_TYPE_LABELS, TAG_LEGEND } from "../data/index.ts";
import { goOpenExplore } from "../navigation.ts";
import styles from "./LandingPage.module.css";

const fodmapEntries = TAG_LEGEND.filter((entry) => entry.group === "fodmap");

export function LandingPage() {
  const appActor = useAppActor();

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <h1>Welcome to Family Recipes</h1>
        <p className={styles.lede}>
          This is our family cookbook for weeknight dinners and the occasional special-occasion
          meal. Practical food, grocery-store ingredients, and honest tags for the diet constraints
          we actually cook around.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="how-to-use">
        <h2 id="how-to-use">How to use the site</h2>
        <ol className={styles.steps}>
          <li>
            <strong>Explore Recipes</strong> to browse by meal, cuisine, or diet tag, or search by
            name.
          </li>
          <li>Open a recipe for ingredients, times, and numbered steps you can cook from.</li>
          <li>
            Use <strong>Random</strong> when you want the catalog to pick a matching dish for you.
          </li>
        </ol>
      </section>

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

      <section className={styles.section} aria-labelledby="legend-heading">
        <h2 id="legend-heading">Allergy and FODMAP legend</h2>
        <p>
          Tags describe what a recipe <em>supports</em> — what it is safe for as written — not every
          ingredient it happens to contain.
        </p>

        <h3>What FODMAP means</h3>
        <p>
          FODMAP stands for Fermentable Oligosaccharides, Disaccharides, Monosaccharides, And
          Polyols. Those are groups of carbohydrates that can be hard to digest. We tag the six
          types people actually react to.
        </p>

        <h3>The six types we tag</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Means</th>
                <th scope="col">Example foods</th>
              </tr>
            </thead>
            <tbody>
              {fodmapEntries.map((entry) => (
                <tr key={entry.tag}>
                  <th scope="row">{DIET_TAG_LABELS[entry.tag]}</th>
                  <td>{entry.meaning}</td>
                  <td>{entry.examples ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Gluten-free is separate</h3>
        <p>
          We track <strong>gluten-free</strong> on its own. Wheat can be a fructan problem{" "}
          <em>and</em> a gluten problem, so a recipe may need both tags. Gluten-free flours are
          allowed. Sourdough bread is treated as acceptable for this household.
        </p>

        <h3>Low FODMAP</h3>
        <p>
          <strong>Low FODMAP</strong> means the recipe clears every FODMAP subgroup, including
          lactose.
        </p>

        <h3>Low FOP</h3>
        <p>
          <strong>Low FOP</strong> means it clears fructose, oligosaccharides, and polyols — the
          cluster that matters most here. Lactose is not required.
        </p>

        <h3>Filters are AND</h3>
        <p>
          If you select lactose-free <em>and</em> gluten-free, only recipes that have both tags
          appear.
        </p>

        <h3>Household exceptions</h3>
        <ul className={styles.exceptions}>
          <li>
            <strong>Sourdough</strong> is acceptable. Recipes that use it may still be tagged
            gluten-free for this family.
          </li>
          <li>
            <strong>Inulin</strong> is a problem even when it hides in probiotics and "fiber"
            additives, not only as a named vegetable fiber.
          </li>
        </ul>
      </section>
    </article>
  );
}
