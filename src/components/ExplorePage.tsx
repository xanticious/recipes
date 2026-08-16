import { useSelector } from "@xstate/react";
import { useAppActor } from "../actors.tsx";
import { recipes } from "../data/index.ts";
import { RecipeIndex } from "./RecipeIndex.tsx";

export function ExplorePage() {
  const appActor = useAppActor();
  const explore = useSelector(appActor, (snapshot) => snapshot.context.explore);

  return (
    <RecipeIndex
      title="Recipes"
      lede="Home cooking, grouped by meal. Filter by House approval and cuisine."
      catalog={recipes}
      filters={explore}
      eatOut="no"
      searchPlaceholder="Chili, oatmeal…"
      onQuery={(query) => {
        appActor.send({ type: "setExploreQuery", query });
      }}
      onToggleMealType={(mealType) => {
        appActor.send({ type: "toggleExploreMealType", mealType });
      }}
      onToggleCuisine={(cuisine) => {
        appActor.send({ type: "toggleExploreCuisine", cuisine });
      }}
      onSetHa={(ha) => {
        appActor.send({ type: "setExploreHa", ha });
      }}
      onClear={() => {
        appActor.send({ type: "clearExploreFilters" });
      }}
    />
  );
}
