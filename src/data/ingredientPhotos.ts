import { publicCatalogUrl, type CatalogPhotoCredit } from "./catalogImage.ts";
import { INGREDIENT_PHOTOS, type IngredientPhoto } from "./ingredientPhotos.data.ts";

export type { IngredientPhoto } from "./ingredientPhotos.data.ts";
export { INGREDIENT_PHOTOS } from "./ingredientPhotos.data.ts";
export { placeholderHue as ingredientPlaceholderHue } from "./catalogImage.ts";

export function ingredientPhoto(id: string): IngredientPhoto | undefined {
  return INGREDIENT_PHOTOS[id];
}

export function ingredientPhotoCredit(id: string): CatalogPhotoCredit | undefined {
  const photo = INGREDIENT_PHOTOS[id];
  if (!photo) {
    return undefined;
  }
  return {
    photographer: photo.photographer,
    url: `https://unsplash.com/@${photo.username}`,
    source: "Unsplash",
  };
}

export function ingredientPhotoUrl(id: string): string | undefined {
  if (!INGREDIENT_PHOTOS[id]) {
    return undefined;
  }
  return publicCatalogUrl("ingredients", `${id}.jpg`);
}

export function ingredientPlaceholderLabel(ingredient: { name: string }): string {
  if (ingredient.name.length === 0) {
    return ingredient.name;
  }
  return ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
}
