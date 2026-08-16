import { useSelector } from "@xstate/react";
import { useAppActor } from "../actors.tsx";
import { recipes } from "../data/index.ts";
import { RecipeIndex } from "./RecipeIndex.tsx";

export function EatOutPage() {
  const appActor = useAppActor();
  const eatOutCatalog = useSelector(appActor, (snapshot) => snapshot.context.eatOutCatalog);

  return (
    <RecipeIndex
      title="Eat Out"
      lede="The restaurant and takeout orders we actually get."
      catalog={recipes}
      filters={eatOutCatalog}
      eatOut="yes"
      searchPlaceholder="Nuggets, pizza…"
      onQuery={(query) => {
        appActor.send({ type: "setEatOutQuery", query });
      }}
      onToggleMealType={(mealType) => {
        appActor.send({ type: "toggleEatOutMealType", mealType });
      }}
      onToggleCuisine={(cuisine) => {
        appActor.send({ type: "toggleEatOutCuisine", cuisine });
      }}
      onSetHa={(ha) => {
        appActor.send({ type: "setEatOutHa", ha });
      }}
      onClear={() => {
        appActor.send({ type: "clearEatOutFilters" });
      }}
    />
  );
}
