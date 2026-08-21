import { restaurantPhotoCredit, restaurantPhotoUrl } from "../data/index.ts";
import { CatalogImage } from "./CatalogImage.tsx";

export function RestaurantPhoto({
  id,
  name,
  width,
  height,
  fill = false,
}: {
  id: string;
  name: string;
  width: number;
  height: number;
  fill?: boolean;
}) {
  return (
    <CatalogImage
      id={id}
      name={name}
      width={width}
      height={height}
      src={restaurantPhotoUrl(id)}
      photo={restaurantPhotoCredit(id)}
      decorative={fill}
      showCredit={!fill}
      fill={fill}
    />
  );
}
