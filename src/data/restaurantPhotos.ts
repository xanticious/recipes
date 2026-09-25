import { publicCatalogUrl, type CatalogPhotoCredit } from "./catalogImage.ts";
import {
  RESTAURANT_PHOTO_SOURCE_LABELS,
  RESTAURANT_PHOTOS,
  type RestaurantPhoto,
} from "./restaurantPhotos.data.ts";

export type { RestaurantPhoto, RestaurantPhotoSource } from "./restaurantPhotos.data.ts";
export { RESTAURANT_PHOTOS, RESTAURANT_PHOTO_SOURCE_LABELS } from "./restaurantPhotos.data.ts";

export function restaurantPhoto(id: string): RestaurantPhoto | undefined {
  return RESTAURANT_PHOTOS[id];
}

export function restaurantPhotoCredit(id: string): CatalogPhotoCredit | undefined {
  const photo = RESTAURANT_PHOTOS[id];
  if (!photo) {
    return undefined;
  }
  if (photo.source === "generated") {
    return {
      photographer: "",
      url: "",
      source: RESTAURANT_PHOTO_SOURCE_LABELS.generated,
    };
  }
  return {
    photographer: photo.photographer,
    url: photo.creditUrl,
    source: RESTAURANT_PHOTO_SOURCE_LABELS.streetview,
  };
}

export function restaurantPhotoFileId(id: string): string | undefined {
  const photo = RESTAURANT_PHOTOS[id];
  if (!photo) {
    return undefined;
  }
  if (photo.source === "generated" && photo.imageId) {
    return photo.imageId;
  }
  return id;
}

export function restaurantPhotoUrl(id: string): string | undefined {
  const fileId = restaurantPhotoFileId(id);
  if (!fileId) {
    return undefined;
  }
  return publicCatalogUrl("restaurants", `${fileId}.jpg`);
}
