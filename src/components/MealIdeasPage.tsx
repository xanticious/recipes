import { useSelector } from "@xstate/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useAppActor } from "../actors.tsx";
import {
  CATALOG_IMAGE_PANEL,
  filterMealIdeas,
  groupMealIdeas,
  MEAL_IDEA_DISPLAYS,
  MEAL_IDEA_DISPLAY_LABELS,
  MEAL_IDEA_OCCASION_FILTERS,
  MEAL_IDEA_OCCASION_FILTER_LABELS,
  MEAL_IDEA_OCCASION_LABELS,
  MEAL_IDEA_REGION_FILTERS,
  MEAL_IDEA_REGION_FILTER_LABELS,
  MEAL_IDEA_REGION_ABBREVS,
  MEAL_IDEA_REGION_LABELS,
  MEAL_IDEA_REGIONS,
  mealIdeaHasHaRecipes,
  mealIdeaLookup,
  mealIdeaMatchesFilters,
  mealIdeaPinSize,
  relatedMealIdeas,
  resolveMealIdeaRecipes,
  mealIdeas,
  recipes,
  type MealIdea,
} from "../data/index.ts";
import { MealIdeaPhoto } from "./MealIdeaPhoto.tsx";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import styles from "./MealIdeasPage.module.css";

const lookup = mealIdeaLookup(mealIdeas);
const recipeById = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const mealIdeasWithHaRecipes = new Set(
  mealIdeas.filter((idea) => mealIdeaHasHaRecipes(idea, recipeById)).map((idea) => idea.id),
);

function mealIdeaCardId(id: string) {
  return `meal-idea-${id}`;
}

function scrollMealIdeaCardIntoView(card: HTMLElement) {
  const header = document.querySelector("[data-app-bar]");
  const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = window.scrollY + card.getBoundingClientRect().top - headerHeight - 8;
  window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? "auto" : "smooth" });
}

export function MealIdeasPage() {
  const appActor = useAppActor();
  const browse = useSelector(appActor, (snapshot) => snapshot.context.mealIdeas);
  const matches = filterMealIdeas(mealIdeas, browse);
  const grouped = groupMealIdeas(matches);
  const pictures = browse.display === "pictures";
  const openIdea = browse.expandedId ? lookup.get(browse.expandedId) : undefined;
  const hasFilters =
    browse.occasion !== "all" || browse.region !== "all" || browse.query.trim().length > 0;
  const pendingScrollId = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (pictures) {
      return;
    }
    const id = pendingScrollId.current;
    if (!id || browse.expandedId !== id) {
      return;
    }
    const card = document.getElementById(mealIdeaCardId(id));
    if (!card) {
      return;
    }
    pendingScrollId.current = null;
    scrollMealIdeaCardIntoView(card);
    card.querySelector<HTMLButtonElement>("[aria-expanded='true']")?.focus({ preventScroll: true });
  }, [browse.expandedId, browse.occasion, browse.region, browse.query, pictures]);

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
    if (browse.region !== "all" && !idea.regions.includes(browse.region)) {
      appActor.send({ type: "setMealIdeasRegion", region: "all" });
    }
    if (
      browse.query.trim() &&
      !mealIdeaMatchesFilters(idea, {
        occasion: "all",
        region: "all",
        query: browse.query,
      })
    ) {
      appActor.send({ type: "setMealIdeasQuery", query: "" });
    }
    if (!pictures) {
      pendingScrollId.current = id;
    }
    appActor.send({ type: "openMealIdea", id });
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Meal Ideas</h1>
        <p className={styles.lede}>
          Full plates, not single recipes. Open one for a short story about the plate, what usually
          sits with it, easy swaps, and any recipes we already have for the parts.
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

        <fieldset className={styles.group}>
          <legend>Region</legend>
          <div className={styles.chips}>
            {MEAL_IDEA_REGION_FILTERS.map((region) => (
              <button
                key={region}
                type="button"
                className={styles.chip}
                aria-pressed={browse.region === region}
                onClick={() => {
                  appActor.send({ type: "setMealIdeasRegion", region });
                }}
              >
                {MEAL_IDEA_REGION_FILTER_LABELS[region]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend>Display</legend>
          <div className={styles.chips}>
            {MEAL_IDEA_DISPLAYS.map((display) => (
              <button
                key={display}
                type="button"
                className={styles.chip}
                aria-pressed={browse.display === display}
                onClick={() => {
                  appActor.send({ type: "setMealIdeasDisplay", display });
                }}
              >
                {MEAL_IDEA_DISPLAY_LABELS[display]}
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
        <p className={styles.empty}>Nothing matches. Loosen the occasion, region, or search.</p>
      ) : (
        <>
          <p className={styles.count}>
            {matches.length} {matches.length === 1 ? "idea" : "ideas"}
          </p>
          <div className={styles.results}>
            {grouped.map((group) => (
              <section key={group.occasion} className={styles.section}>
                <h2>{MEAL_IDEA_OCCASION_LABELS[group.occasion]}</h2>
                {pictures ? (
                  <ul className={styles.masonry}>
                    {group.ideas.map((idea) => {
                      const pin = mealIdeaPinSize(idea.id);
                      const open = browse.expandedId === idea.id;
                      return (
                        <li key={idea.id} className={styles.pin} id={mealIdeaCardId(idea.id)}>
                          <button
                            type="button"
                            className={styles.pinButton}
                            aria-expanded={open}
                            onClick={() => {
                              appActor.send({ type: "toggleMealIdea", id: idea.id });
                            }}
                          >
                            <MealIdeaPhoto
                              id={idea.id}
                              name={idea.title}
                              width={pin.width}
                              height={pin.height}
                              fill
                            />
                            <span className={styles.pinName}>
                              <span>{idea.title}</span>
                              <MealIdeaHaCheck show={mealIdeasWithHaRecipes.has(idea.id)} />
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
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
                )}
              </section>
            ))}
          </div>
        </>
      )}

      {pictures && openIdea ? (
        <div
          className={styles.backdrop}
          onClick={() => {
            appActor.send({ type: "closeMealIdea" });
          }}
        >
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="meal-idea-title"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className={styles.dialogBar}>
              <h2 id="meal-idea-title" className={styles.dialogTitle}>
                <span>{openIdea.title}</span>
                <MealIdeaHaCheck show={mealIdeasWithHaRecipes.has(openIdea.id)} />
                <MealIdeaRegionTags idea={openIdea} />
              </h2>
              <button
                type="button"
                className={styles.close}
                onClick={() => {
                  appActor.send({ type: "closeMealIdea" });
                }}
              >
                Close
              </button>
            </div>
            <MealIdeaDetails idea={openIdea} onRelated={openRelated} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MealIdeaHaCheck({ show }: { show: boolean }) {
  if (!show) {
    return null;
  }
  return (
    <abbr className={styles.haCheck} title="Has House Approved recipes">
      ✓
    </abbr>
  );
}

function MealIdeaRegionTags({ idea }: { idea: MealIdea }) {
  return (
    <span className={styles.regionTags} aria-hidden="true">
      {MEAL_IDEA_REGIONS.filter((region) => idea.regions.includes(region)).map((region) => (
        <abbr key={region} className={styles.regionTag} title={MEAL_IDEA_REGION_LABELS[region]}>
          {MEAL_IDEA_REGION_ABBREVS[region]}
        </abbr>
      ))}
    </span>
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
  const detailsId = `${idea.id}-details`;

  return (
    <li className={styles.card} id={mealIdeaCardId(idea.id)} data-open={open ? "true" : "false"}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        <span className={styles.titleRow}>
          <span className={styles.title}>{idea.title}</span>
          <MealIdeaHaCheck show={mealIdeasWithHaRecipes.has(idea.id)} />
          <MealIdeaRegionTags idea={idea} />
        </span>
        <span className={styles.hint}>{open ? "Hide" : "Details"}</span>
      </button>
      {open ? (
        <div className={styles.details} id={detailsId}>
          <MealIdeaDetails idea={idea} onRelated={onRelated} />
        </div>
      ) : null}
    </li>
  );
}

function MealIdeaDetails({ idea, onRelated }: { idea: MealIdea; onRelated: (id: string) => void }) {
  const appActor = useAppActor();
  const related = relatedMealIdeas(idea, lookup);
  const recipeLinks = resolveMealIdeaRecipes(idea, recipes);

  return (
    <div className={styles.detailBlocks}>
      <MealIdeaPhoto
        id={idea.id}
        name={idea.title}
        width={CATALOG_IMAGE_PANEL.width}
        height={CATALOG_IMAGE_PANEL.height}
      />
      <section className={styles.block} aria-labelledby={`${idea.id}-description`}>
        <h3 id={`${idea.id}-description`}>Description</h3>
        <p className={styles.description}>{idea.description}</p>
      </section>
      <section className={styles.block} aria-labelledby={`${idea.id}-regions`}>
        <h3 id={`${idea.id}-regions`}>Common in</h3>
        <p className={styles.regions}>
          {idea.regions.map((region) => MEAL_IDEA_REGION_LABELS[region]).join(", ")}
        </p>
      </section>

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
  );
}
