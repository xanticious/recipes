import { publicCatalogUrl, type CatalogPhotoCredit } from "./catalogImage.ts";
import { MEAL_IDEA_PHOTOS, type MealIdeaPhoto } from "./mealIdeaPhotos.data.ts";

export type { MealIdeaPhoto } from "./mealIdeaPhotos.data.ts";
export { MEAL_IDEA_PHOTOS } from "./mealIdeaPhotos.data.ts";
export { placeholderHue as mealIdeaPlaceholderHue } from "./catalogImage.ts";

export function mealIdeaPhoto(id: string): MealIdeaPhoto | undefined {
  return MEAL_IDEA_PHOTOS[id];
}

export function mealIdeaPhotoCredit(id: string): CatalogPhotoCredit | undefined {
  const photo = MEAL_IDEA_PHOTOS[id];
  if (!photo) {
    return undefined;
  }
  return {
    photographer: photo.photographer,
    url: `https://unsplash.com/@${photo.username}`,
    source: "Unsplash",
  };
}

export function mealIdeaPhotoUrl(id: string): string | undefined {
  if (!MEAL_IDEA_PHOTOS[id]) {
    return undefined;
  }
  return publicCatalogUrl("meal-ideas", `${id}.jpg`);
}
