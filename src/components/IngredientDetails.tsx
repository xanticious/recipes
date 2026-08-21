import { useAppActor } from "../actors.tsx";
import {
  CATALOG_IMAGE_PANEL,
  describeIngredient,
  type Ingredient,
  type Recipe,
} from "../data/index.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import { IngredientDietDetails } from "./IngredientDietDetails.tsx";
import { IngredientPhoto } from "./IngredientPhoto.tsx";
import { RecipeMarks } from "./RecipeMarks.tsx";
import styles from "./IngredientDetails.module.css";

export function IngredientDetails({
  ingredient,
  usedIn,
  showPhoto = true,
  showFodmapSummary = false,
}: {
  ingredient: Ingredient;
  usedIn: readonly Recipe[];
  showPhoto?: boolean;
  showFodmapSummary?: boolean;
}) {
  const appActor = useAppActor();
  const info = describeIngredient(ingredient, usedIn);

  return (
    <div className={styles.details}>
      {showPhoto ? (
        <IngredientPhoto
          id={ingredient.id}
          name={ingredient.name}
          width={CATALOG_IMAGE_PANEL.width}
          height={CATALOG_IMAGE_PANEL.height}
        />
      ) : null}
      <p className={styles.description}>{info.what}</p>
      {showFodmapSummary ? (
        <p className={styles.fodmap} data-level={info.diet.fodmap.overall}>
          {info.fodmap.label}
        </p>
      ) : null}
      <IngredientDietDetails diet={info.diet} />
      {info.notes ? <p className={styles.notes}>{info.notes}</p> : null}
      {usedIn.length === 0 ? (
        <p className={styles.none}>No recipes yet.</p>
      ) : (
        <div className={styles.recipeBlock}>
          <p className={styles.recipeHeading}>Recipes:</p>
          <ul className={styles.recipes}>
            {usedIn.map((recipe) => (
              <li key={recipe.id}>
                <a
                  className={styles.recipeLink}
                  href={routeToHash({
                    name: "recipe",
                    id: recipe.id,
                    fromRandom: false,
                  })}
                  onClick={(event) => {
                    handleRouteClick(event, appActor, {
                      name: "recipe",
                      id: recipe.id,
                      fromRandom: false,
                    });
                  }}
                >
                  <span>{recipe.title}</span>
                  <RecipeMarks recipe={recipe} compact />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
