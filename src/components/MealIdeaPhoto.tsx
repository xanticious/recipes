import { mealIdeaPhotoCredit, mealIdeaPhotoUrl } from "../data/index.ts";
import { CatalogImage } from "./CatalogImage.tsx";

export function MealIdeaPhoto({
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
      src={mealIdeaPhotoUrl(id)}
      photo={mealIdeaPhotoCredit(id)}
      decorative={fill}
      showCredit={!fill}
      fill={fill}
    />
  );
}
