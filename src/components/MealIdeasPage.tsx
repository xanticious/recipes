import { useSelector } from "@xstate/react";
import { useEffect } from "react";
import { useAppActor } from "../actors.tsx";
import {
  filterMealIdeas,
  groupMealIdeas,
  MEAL_IDEA_OCCASION_FILTERS,
  MEAL_IDEA_OCCASION_FILTER_LABELS,
  MEAL_IDEA_OCCASION_LABELS,
  mealIdeaLookup,
  mealIdeaMatchesFilters,
  relatedMealIdeas,
  resolveMealIdeaRecipes,
  mealIdeas,
  recipes,
} from "../data/index.ts";
import type { MealIdea } from "../data/index.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import styles from "./MealIdeasPage.module.css";

const lookup = mealIdeaLookup(mealIdeas);

export function MealIdeasPage() {
  const appActor = useAppActor();
  const browse = useSelector(appActor, (snapshot) => snapshot.context.mealIdeas);
  const matches = filterMealIdeas(mealIdeas, browse);
  const grouped = groupMealIdeas(matches);
  const hasFilters = browse.occasion !== "all" || browse.query.trim().length > 0;

  useEffect(() => {
    if (!browse.expandedId) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        appActor.send({ type: "closeMealIdea" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [appActor, browse.expandedId]);

  function openRelated(id: string) {
    const idea = lookup.get(id);
    if (!idea) {
      return;
    }
    if (browse.occasion !== "all" && browse.occasion !== idea.occasion) {
      appActor.send({ type: "setMealIdeasOccasion", occasion: idea.occasion });
    }
    if (
      browse.query.trim() &&
      !mealIdeaMatchesFilters(idea, { occasion: "all", query: browse.query })
    ) {
      appActor.send({ type: "setMealIdeasQuery", query: "" });
    }
    appActor.send({ type: "openMealIdea", id });
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Meal Ideas</h1>
        <p className={styles.lede}>
          Full plates, not single recipes. Open one for what usually sits with it, easy swaps, and
          any recipes we already have for the parts.
        </p>
      </header>

      <div className={styles.filters}>
        <label className={styles.searchLabel}>
          <span className={styles.searchCaption}>Search by name</span>
          <input
            className={styles.search}
            type="search"
            value={browse.query}
            placeholder="Pork chops, cereal, taco…"
            aria-label="Search meal ideas by name"
            onChange={(event) => {
              appActor.send({ type: "setMealIdeasQuery", query: event.target.value });
            }}
          />
        </label>

        <fieldset className={styles.group}>
          <legend>Occasion</legend>
          <div className={styles.chips}>
            {MEAL_IDEA_OCCASION_FILTERS.map((occasion) => (
              <button
                key={occasion}
                type="button"
                className={styles.chip}
                aria-pressed={browse.occasion === occasion}
                onClick={() => {
                  appActor.send({ type: "setMealIdeasOccasion", occasion });
                }}
              >
                {MEAL_IDEA_OCCASION_FILTER_LABELS[occasion]}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          className={styles.clear}
          disabled={!hasFilters}
          onClick={() => {
            appActor.send({ type: "clearMealIdeasFilters" });
          }}
        >
          Clear filters
        </button>
      </div>

      {matches.length === 0 ? (
        <p className={styles.empty}>Nothing matches. Loosen the occasion or search.</p>
      ) : (
        <>
          <p className={styles.count}>
            {matches.length} {matches.length === 1 ? "idea" : "ideas"}
          </p>
          <div className={styles.results}>
            {grouped.map((group) => (
              <section key={group.occasion} className={styles.section}>
                <h2>{MEAL_IDEA_OCCASION_LABELS[group.occasion]}</h2>
                <ul className={styles.list}>
                  {group.ideas.map((idea) => (
                    <MealIdeaCard
                      key={idea.id}
                      idea={idea}
                      open={browse.expandedId === idea.id}
                      onToggle={() => {
                        appActor.send({ type: "toggleMealIdea", id: idea.id });
                      }}
                      onRelated={openRelated}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MealIdeaCard({
  idea,
  open,
  onToggle,
  onRelated,
}: {
  idea: MealIdea;
  open: boolean;
  onToggle: () => void;
  onRelated: (id: string) => void;
}) {
  const appActor = useAppActor();
  const related = relatedMealIdeas(idea, lookup);
  const recipeLinks = resolveMealIdeaRecipes(idea, recipes);
  const detailsId = `${idea.id}-details`;

  return (
    <li className={styles.card} data-open={open ? "true" : "false"}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        <span className={styles.title}>{idea.title}</span>
        <span className={styles.hint}>{open ? "Hide" : "Details"}</span>
      </button>
      {open ? (
        <div className={styles.details} id={detailsId}>
          <section className={styles.block} aria-labelledby={`${idea.id}-pairings`}>
            <h3 id={`${idea.id}-pairings`}>Frequently paired with</h3>
            {idea.pairings.length > 0 ? (
              <ul>
                {idea.pairings.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.none}>Nothing usual.</p>
            )}
          </section>

          <section className={styles.block} aria-labelledby={`${idea.id}-subs`}>
            <h3 id={`${idea.id}-subs`}>Common substitutions</h3>
            {idea.substitutions && idea.substitutions.length > 0 ? (
              <ul>
                {idea.substitutions.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.none}>None noted.</p>
            )}
          </section>

          <section className={styles.block} aria-labelledby={`${idea.id}-related`}>
            <h3 id={`${idea.id}-related`}>Related meals</h3>
            {related.length > 0 ? (
              <ul>
                {related.map((other) => (
                  <li key={other.id}>
                    <button
                      type="button"
                      className={styles.relatedButton}
                      onClick={() => {
                        onRelated(other.id);
                      }}
                    >
                      {other.title}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.none}>None. This plate stands on its own.</p>
            )}
          </section>

          <section className={styles.block} aria-labelledby={`${idea.id}-recipes`}>
            <h3 id={`${idea.id}-recipes`}>Linked recipes</h3>
            {recipeLinks.length > 0 ? (
              <ul>
                {recipeLinks.map((link) => {
                  const recipeId = link.recipeId;
                  return (
                    <li key={`${link.label}-${recipeId ?? "missing"}`}>
                      {link.missing || recipeId === undefined ? (
                        <span className={styles.missing}>
                          {link.label}
                          <span className={styles.missingMark}>Not in the book yet</span>
                        </span>
                      ) : (
                        <a
                          className={styles.recipeLink}
                          href={routeToHash({ name: "recipe", id: recipeId, fromRandom: false })}
                          onClick={(event) => {
                            handleRouteClick(event, appActor, {
                              name: "recipe",
                              id: recipeId,
                              fromRandom: false,
                            });
                          }}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className={styles.none}>None. This is simple enough without a recipe.</p>
            )}
          </section>
        </div>
      ) : null}
    </li>
  );
}
