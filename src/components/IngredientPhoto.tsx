import {
  ingredientPhotoCredit,
  ingredientPhotoUrl,
  ingredientPlaceholderLabel,
} from "../data/index.ts";
import { CatalogImage } from "./CatalogImage.tsx";

export function IngredientPhoto({
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
  const photo = ingredientPhotoCredit(id);
  const src = ingredientPhotoUrl(id);
  const label = ingredientPlaceholderLabel({ name });
  return (
    <CatalogImage
      id={id}
      name={label}
      width={width}
      height={height}
      src={src}
      photo={photo}
      decorative={fill}
      showCredit={!fill}
      fill={fill}
    />
  );
}
