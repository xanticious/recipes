import { useSelector } from "@xstate/react";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useAppActor, usePrefsActor } from "../actors.tsx";
import type { FontSize, Theme } from "../data/types.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import { navItemIsCurrent, PRIMARY_NAV, sectionTitle } from "../siteNav.ts";
import styles from "./AppShell.module.css";

const FONT_SIZES: readonly FontSize[] = ["small", "medium", "large"];
const FONT_SIZE_LABELS: Record<FontSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};
const THEMES: readonly Theme[] = ["light", "dark"];
const PANEL_ID = "app-nav-panel";

function inlineNavFits(input: {
  barWidth: number;
  paddingLeft: number;
  paddingRight: number;
  gap: number;
  menuWidth: number;
  brandWidth: number;
  navWidth: number;
}): boolean {
  const needed =
    input.paddingLeft +
    input.paddingRight +
    input.menuWidth +
    input.brandWidth +
    input.navWidth +
    input.gap * 2;
  return input.navWidth > 0 && input.barWidth + 0.5 >= needed;
}

function panelFocusables(panel: HTMLElement): HTMLElement[] {
  return [...panel.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)")];
}

export function AppShell({ children }: { children: ReactNode }) {
  const appActor = useAppActor();
  const prefsActor = usePrefsActor();
  const route = useSelector(appActor, (snapshot) => snapshot.context.route);
  const navOpen = useSelector(appActor, (snapshot) => snapshot.context.navOpen);
  const focusMode = useSelector(appActor, (snapshot) => snapshot.context.focusMode);
  const theme = useSelector(prefsActor, (snapshot) => snapshot.context.theme);
  const fontSize = useSelector(prefsActor, (snapshot) => snapshot.context.fontSize);
  const barRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const barNavRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onLanding = route.name === "landing";
  const wideMain =
    route.name === "ingredientCategorizer" ||
    route.name === "ingredients" ||
    route.name === "restaurants";

  useLayoutEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    if (!bar) {
      root.style.setProperty("--app-bar-height", "0px");
      return;
    }
    const apply = () => {
      root.style.setProperty("--app-bar-height", `${String(bar.getBoundingClientRect().height)}px`);
    };
    const applyInlineNav = () => {
      const nav = barNavRef.current;
      const menu = menuButtonRef.current;
      const brand = brandRef.current;
      if (!nav || !menu || !brand) {
        return;
      }
      const computed = getComputedStyle(bar);
      const fits = inlineNavFits({
        barWidth: bar.clientWidth,
        paddingLeft: Number.parseFloat(computed.paddingLeft) || 0,
        paddingRight: Number.parseFloat(computed.paddingRight) || 0,
        gap: Number.parseFloat(computed.columnGap) || 0,
        menuWidth: menu.offsetWidth,
        brandWidth: brand.offsetWidth,
        navWidth: nav.scrollWidth,
      });
      const next = fits ? "true" : "false";
      if (bar.dataset.inlineNav !== next) {
        bar.dataset.inlineNav = next;
      }
      nav.toggleAttribute("inert", !fits);
      nav.setAttribute("aria-hidden", fits ? "false" : "true");
    };
    const applyAll = () => {
      apply();
      applyInlineNav();
    };
    applyAll();
    const observer = new ResizeObserver(applyAll);
    observer.observe(bar);
    return () => {
      observer.disconnect();
    };
  }, [focusMode, fontSize, route]);

  useEffect(() => {
    if (!navOpen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) {
      return;
    }
    const panel = panelRef.current;
    const menuButton = menuButtonRef.current;
    const previouslyFocused = document.activeElement;
    const first = panel ? panelFocusables(panel)[0] : undefined;
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        appActor.send({ type: "closeNav" });
        return;
      }
      if (event.key !== "Tab" || !panel) {
        return;
      }
      const items = panelFocusables(panel);
      if (items.length === 0) {
        return;
      }
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (!firstItem || !lastItem) {
        return;
      }
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
        return;
      }
      if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      } else {
        menuButton?.focus();
      }
    };
  }, [appActor, navOpen]);

  useEffect(() => {
    if (navOpen || !focusMode) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      appActor.send({ type: "exitFocusMode" });
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [appActor, focusMode, navOpen]);

  return (
    <div className={styles.shell} data-focus-mode={focusMode ? "true" : undefined}>
      {focusMode ? null : (
        <header className={styles.bar} data-app-bar="" ref={barRef}>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            aria-controls={PANEL_ID}
            onClick={() => {
              appActor.send({ type: "toggleNav" });
            }}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <a
            ref={brandRef}
            className={styles.brand}
            href={routeToHash({ name: "landing" })}
            aria-current={onLanding ? "page" : undefined}
            onClick={(event) => {
              handleRouteClick(event, appActor, { name: "landing" });
            }}
          >
            Family Recipes
          </a>
          <p className={styles.section}>{sectionTitle(route)}</p>
          <nav ref={barNavRef} className={styles.barNav} aria-label="Primary">
            {PRIMARY_NAV.map((item) => {
              const current = navItemIsCurrent(route, item);
              return (
                <a
                  key={item.label}
                  className={styles.barLink}
                  href={routeToHash(item.route)}
                  aria-current={current ? "page" : undefined}
                  onClick={(event) => {
                    handleRouteClick(event, appActor, item.route);
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </header>
      )}
      {navOpen && !focusMode ? (
        <div className={styles.overlay}>
          <div
            className={styles.panel}
            id={PANEL_ID}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <nav className={styles.nav} aria-label="Primary">
              {PRIMARY_NAV.map((item) => {
                const current = navItemIsCurrent(route, item);
                return (
                  <a
                    key={item.label}
                    className={styles.navLink}
                    href={routeToHash(item.route)}
                    aria-current={current ? "page" : undefined}
                    onClick={(event) => {
                      handleRouteClick(event, appActor, item.route);
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
            <div className={styles.prefs}>
              <div className={styles.prefGroup} role="group" aria-label="Font size">
                <p className={styles.prefLabel}>Font size</p>
                <div className={styles.chips}>
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
              </div>
              <div className={styles.prefGroup} role="group" aria-label="Theme">
                <p className={styles.prefLabel}>Theme</p>
                <div className={styles.chips}>
                  {THEMES.map((value) => (
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
              </div>
            </div>
          </div>
          <button
            type="button"
            className={styles.scrim}
            aria-label="Close menu"
            onClick={() => {
              appActor.send({ type: "closeNav" });
            }}
          />
        </div>
      ) : null}
      <main
        className={`${wideMain ? styles.mainWide : styles.main}${focusMode ? ` ${styles.mainFocus}` : ""}`}
        inert={navOpen ? true : undefined}
      >
        {children}
      </main>
    </div>
  );
}
