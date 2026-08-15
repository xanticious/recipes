import { useSelector } from "@xstate/react";
import { useAppActor } from "./actors.tsx";
import { AppShell } from "./components/AppShell.tsx";
import { ExplorePage } from "./components/ExplorePage.tsx";
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
        {route.name === "recipe" ? (
          <RecipePage id={route.id} fromRandom={route.fromRandom} />
        ) : null}
        {route.name === "random" ? <RandomPage /> : null}
      </div>
    </AppShell>
  );
}
