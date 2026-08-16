import { HA_LABEL, HEALTH_RATING_LABELS, isEatOutRecipe, type Recipe } from "../data/index.ts";
import styles from "./RecipeMarks.module.css";

export function RecipeMarks({ recipe, compact = false }: { recipe: Recipe; compact?: boolean }) {
  return (
    <span className={compact ? styles.compact : styles.row}>
      {recipe.ha ? (
        <span className={styles.ha} title="Fits this household’s usual diet constraints">
          {HA_LABEL}
        </span>
      ) : null}
      {isEatOutRecipe(recipe) ? <span className={styles.eatOut}>Eat out</span> : null}
      <span
        className={styles.health}
        data-rating={recipe.healthRating}
        title={HEALTH_RATING_LABELS[recipe.healthRating]}
      >
        {compact ? (
          <span className={styles.dot} aria-hidden="true" />
        ) : (
          HEALTH_RATING_LABELS[recipe.healthRating]
        )}
        {compact ? (
          <span className={styles.srOnly}>{HEALTH_RATING_LABELS[recipe.healthRating]}</span>
        ) : null}
      </span>
    </span>
  );
}
