import { useSelector } from "@xstate/react";
import { useAppActor } from "./actors.tsx";
import { AppShell } from "./components/AppShell.tsx";
import { EatOutPage } from "./components/EatOutPage.tsx";
import { ExplorePage } from "./components/ExplorePage.tsx";
import { GuidePage } from "./components/GuidePage.tsx";
import { IngredientCategorizerPage } from "./components/IngredientCategorizerPage.tsx";
import { IngredientsPage } from "./components/IngredientsPage.tsx";
import { LandingPage } from "./components/LandingPage.tsx";
import { RandomPage } from "./components/RandomPage.tsx";
import { RecipePage } from "./components/RecipePage.tsx";
import styles from "./app.module.css";

export function App() {
  const appActor = useAppActor();
  const route = useSelector(appActor, (snapshot) => snapshot.context.route);

  return (
    <AppShell>
      <div className={styles.page}>
        {route.name === "landing" ? <LandingPage /> : null}
        {route.name === "explore" ? <ExplorePage /> : null}
        {route.name === "eatOut" ? <EatOutPage /> : null}
        {route.name === "recipe" ? (
          <RecipePage id={route.id} fromRandom={route.fromRandom} />
        ) : null}
        {route.name === "random" ? <RandomPage /> : null}
        {route.name === "guide" ? <GuidePage /> : null}
        {route.name === "ingredients" ? <IngredientsPage /> : null}
        {route.name === "ingredientCategorizer" ? <IngredientCategorizerPage /> : null}
      </div>
    </AppShell>
  );
}
