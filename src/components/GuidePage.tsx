import { useAppActor } from "../actors.tsx";
import {
  DIET_TAG_LABELS,
  filterRecipes,
  getGuide,
  GUIDE_CATEGORY_META,
  GUIDE_DISCLAIMER,
  ingredientLookup,
  recipes,
} from "../data/index.ts";
import type { DietTag } from "../data/types.ts";
import { goOpenExploreWithTag, handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import { MarkdownText } from "./MarkdownText.tsx";
import styles from "./Guides.module.css";

export function GuidePage({ tag }: { tag: DietTag }) {
  const appActor = useAppActor();
  const guide = getGuide(tag);
  const categoryMeta = GUIDE_CATEGORY_META[guide.category];
  const examples = guide.exampleRecipeIds.flatMap((id) => {
    const recipe = recipes.find((item) => item.id === id);
    return recipe ? [recipe] : [];
  });
  const matchCount = filterRecipes(recipes, ingredientLookup, { tags: [tag] }).length;

  return (
    <article className={styles.page}>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <a
          className={styles.crumbLink}
          href={routeToHash({ name: "guides" })}
          onClick={(event) => {
            handleRouteClick(event, appActor, { name: "guides" });
          }}
        >
          Guides
        </a>
        <span aria-hidden="true">/</span>
        <a
          className={styles.crumbLink}
          href={routeToHash({ name: "guideList", category: guide.category })}
          onClick={(event) => {
            handleRouteClick(event, appActor, {
              name: "guideList",
              category: guide.category,
            });
          }}
        >
          {categoryMeta.title}
        </a>
        <span aria-hidden="true">/</span>
        <span>{DIET_TAG_LABELS[tag]}</span>
      </nav>

      <header className={styles.header}>
        <h1>{guide.title}</h1>
        <p className={styles.lede}>{guide.blurb}</p>
      </header>

      <p className={styles.disclaimer}>{GUIDE_DISCLAIMER}</p>

      <section className={styles.section} aria-labelledby="life-heading">
        <h2 id="life-heading">What this looks like day to day</h2>
        {guide.lifeIsLike.map((paragraph) => (
          <p key={paragraph}>
            <MarkdownText text={paragraph} />
          </p>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="swaps-heading">
        <h2 id="swaps-heading">The swaps that help most</h2>
        <ul className={styles.swaps}>
          {guide.swaps.map((swap) => (
            <li key={swap.insteadOf}>
              <span className={styles.swapFrom}>Instead of {swap.insteadOf}</span>
              <span className={styles.swapTo}>{swap.use}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="baseline-heading">
        <h2 id="baseline-heading">A simple starting plate</h2>
        <ul className={styles.baseline}>
          {guide.baseline.map((group) => (
            <li key={group.heading}>
              <dl>
                <dt>{group.heading}</dt>
                <dd>{group.foods}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="recipes-heading">
        <h2 id="recipes-heading">Recipes to start with</h2>
        <p>
          These are already in this cookbook. Open one when you want dinner to be a known quantity.
        </p>
        <ul className={styles.recipes}>
          {examples.map((recipe) => (
            <li key={recipe.id}>
              <a
                className={styles.recipeLink}
                href={routeToHash({ name: "recipe", id: recipe.id, fromRandom: false })}
                onClick={(event) => {
                  handleRouteClick(event, appActor, {
                    name: "recipe",
                    id: recipe.id,
                    fromRandom: false,
                  });
                }}
              >
                {recipe.title}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.exploreBtn}
          onClick={() => {
            goOpenExploreWithTag(appActor, tag);
          }}
        >
          {matchCount === 1
            ? "See the 1 matching recipe in Explore"
            : `See all ${String(matchCount)} matching recipes in Explore`}
        </button>
      </section>

      <section className={styles.section} aria-labelledby="steps-heading">
        <h2 id="steps-heading">A gentle first week</h2>
        <ol className={styles.steps}>
          {guide.firstSteps.map((step) => (
            <li key={step}>
              <MarkdownText text={step} />
            </li>
          ))}
        </ol>
      </section>

      {guide.relatedTags && guide.relatedTags.length > 0 ? (
        <section className={styles.section} aria-labelledby="related-heading">
          <h2 id="related-heading">Related guides</h2>
          <ul className={styles.related}>
            {guide.relatedTags.map((related) => (
              <li key={related}>
                <a
                  className={styles.relatedLink}
                  href={routeToHash({ name: "guide", tag: related })}
                  onClick={(event) => {
                    handleRouteClick(event, appActor, { name: "guide", tag: related });
                  }}
                >
                  {DIET_TAG_LABELS[related]}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
