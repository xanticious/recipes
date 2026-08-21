import {
  FODMAP_LEVEL_LABELS,
  fodmapTypeLines,
  GLUTEN_LABELS,
  LACTOSE_LABELS,
  type IngredientDiet,
} from "../data/index.ts";
import styles from "./IngredientDietDetails.module.css";

export function IngredientDietDetails({ diet }: { diet: IngredientDiet }) {
  const overallLabel = (): string => {
    if (diet.fodmap.overall === "unknown") {
      return "Unknown";
    }
    if (diet.fodmap.overall === "watch" && diet.fodmap.servingSize) {
      return `${FODMAP_LEVEL_LABELS.watch} (${diet.fodmap.servingSize})`;
    }
    return FODMAP_LEVEL_LABELS[diet.fodmap.overall];
  };

  return (
    <div className={styles.meta}>
      <p>Lactose: {LACTOSE_LABELS[diet.lactose]}</p>
      <p>Gluten: {GLUTEN_LABELS[diet.gluten]}</p>
      <p data-level={diet.fodmap.overall}>FODMAPs: {overallLabel()}</p>
      <ul className={styles.types}>
        {fodmapTypeLines(diet.fodmap).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
