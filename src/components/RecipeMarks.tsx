import {
  HA_LABEL,
  HEALTH_RATING_LABELS,
  INGREDIENT_HA_TAG_LABELS,
  INGREDIENT_HA_TAG_TITLES,
  type HealthRating,
  type Recipe,
} from "../data/index.ts";
import styles from "./RecipeMarks.module.css";

const THERMOMETER_FILL_TOP: Record<HealthRating, number> = {
  healthy: 3.15,
  moderate: 9.2,
  unhealthy: 15.4,
};

function HealthThermometer({ rating }: { rating: HealthRating }) {
  const fillTop = THERMOMETER_FILL_TOP[rating];
  const bulbCy = 17.27;

  return (
    <svg className={styles.thermometer} viewBox="0 0 18 24" aria-hidden="true" focusable="false">
      <circle cx="8" cy={bulbCy} r="3.55" fill="currentColor" />
      <rect
        x="6.75"
        y={fillTop}
        width="2.5"
        height={bulbCy - fillTop}
        rx="1.25"
        fill="currentColor"
      />
      <path
        d="M6 4a2 2 0 0 0 4 0v9.35a4.4 4.4 0 1 1-4 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 5.6h2.2M11.5 8.15h1.5M11.5 10.7h2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RecipeMarks({ recipe, compact = false }: { recipe: Recipe; compact?: boolean }) {
  return (
    <span className={compact ? styles.compact : styles.row}>
      <span
        className={styles.ha}
        data-status={recipe.ha}
        title={INGREDIENT_HA_TAG_TITLES[recipe.ha]}
      >
        {recipe.ha === "yes" ? HA_LABEL : INGREDIENT_HA_TAG_LABELS[recipe.ha]}
      </span>
      <span
        className={styles.health}
        data-rating={recipe.healthRating}
        title={HEALTH_RATING_LABELS[recipe.healthRating]}
      >
        <HealthThermometer rating={recipe.healthRating} />
        {compact ? (
          <span className={styles.srOnly}>{HEALTH_RATING_LABELS[recipe.healthRating]}</span>
        ) : (
          HEALTH_RATING_LABELS[recipe.healthRating]
        )}
      </span>
    </span>
  );
}
