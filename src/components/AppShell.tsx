import { useSelector } from "@xstate/react";
import type { ReactNode } from "react";
import { useAppActor, usePrefsActor } from "../actors.tsx";
import type { FontSize, Theme } from "../data/types.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import styles from "./AppShell.module.css";

const FONT_SIZES: readonly FontSize[] = ["small", "medium", "large"];
const FONT_SIZE_LABELS: Record<FontSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

export function AppShell({ children }: { children: ReactNode }) {
  const appActor = useAppActor();
  const prefsActor = usePrefsActor();
  const route = useSelector(appActor, (snapshot) => snapshot.context.route);
  const theme = useSelector(prefsActor, (snapshot) => snapshot.context.theme);
  const fontSize = useSelector(prefsActor, (snapshot) => snapshot.context.fontSize);

  const onLanding = route.name === "landing";
  const onExplore = route.name === "explore";
  const onRandom = route.name === "random";

  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <a
          className={styles.brand}
          href={routeToHash({ name: "landing" })}
          aria-current={onLanding ? "page" : undefined}
          onClick={(event) => {
            handleRouteClick(event, appActor, { name: "landing" });
          }}
        >
          Family Recipes
        </a>
        <nav className={styles.nav} aria-label="Primary">
          <a
            className={styles.navLink}
            href={routeToHash({ name: "explore" })}
            aria-current={onExplore ? "page" : undefined}
            onClick={(event) => {
              handleRouteClick(event, appActor, { name: "explore" });
            }}
          >
            Explore Recipes
          </a>
          <a
            className={styles.navLink}
            href={routeToHash({ name: "random" })}
            aria-current={onRandom ? "page" : undefined}
            onClick={(event) => {
              handleRouteClick(event, appActor, { name: "random" });
            }}
          >
            Random
          </a>
        </nav>
        <div className={styles.fonts} role="group" aria-label="Font size">
          {FONT_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              className={styles.chip}
              aria-pressed={fontSize === size}
              onClick={() => {
                prefsActor.send({ type: "setFontSize", fontSize: size });
              }}
            >
              {FONT_SIZE_LABELS[size]}
            </button>
          ))}
        </div>
        <div className={styles.theme} role="group" aria-label="Theme">
          {(["light", "dark"] as const satisfies readonly Theme[]).map((value) => (
            <button
              key={value}
              type="button"
              className={styles.chip}
              aria-pressed={theme === value}
              onClick={() => {
                prefsActor.send({ type: "setTheme", theme: value });
              }}
            >
              {value === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
