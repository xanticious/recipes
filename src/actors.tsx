import { useActorRef, useSelector } from "@xstate/react";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { ActorRefFrom } from "xstate";
import { appMachine } from "./machines/appMachine.ts";
import {
  persistFontSize,
  persistKeepScreenAwake,
  persistTheme,
  prefsMachine,
} from "./machines/prefsMachine.ts";
import { canRequestScreenWakeLock } from "./wakeLock.ts";

export type AppActor = ActorRefFrom<typeof appMachine>;
export type PrefsActor = ActorRefFrom<typeof prefsMachine>;

type AppActors = {
  appActor: AppActor;
  prefsActor: PrefsActor;
};

const AppActorsContext = createContext<AppActors | null>(null);

export function AppActorsProvider({ children }: { children: ReactNode }) {
  const prefsActor = useActorRef(prefsMachine, { input: {} });
  const appActor = useActorRef(appMachine, { input: {} });

  const theme = useSelector(prefsActor, (snapshot) => snapshot.context.theme);
  const fontSize = useSelector(prefsActor, (snapshot) => snapshot.context.fontSize);
  const keepScreenAwake = useSelector(prefsActor, (snapshot) => snapshot.context.keepScreenAwake);
  const focusMode = useSelector(appActor, (snapshot) => snapshot.context.focusMode);

  useEffect(() => {
    persistTheme(theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    persistFontSize(fontSize);
    document.documentElement.dataset.fontSize = fontSize;
  }, [fontSize]);

  useEffect(() => {
    persistKeepScreenAwake(keepScreenAwake);
  }, [keepScreenAwake]);

  useEffect(() => {
    const onHashChange = () => {
      appActor.send({ type: "hashChanged", hash: window.location.hash });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [appActor]);

  useEffect(() => {
    if (!focusMode || !keepScreenAwake || !canRequestScreenWakeLock()) {
      appActor.send({ type: "setWakeLockHeld", held: false });
      return;
    }

    let cancelled = false;
    let sentinel: WakeLockSentinel | null = null;

    const requestLock = async () => {
      if (cancelled || document.visibilityState !== "visible") {
        return;
      }
      try {
        sentinel = await navigator.wakeLock.request("screen");
        if (cancelled) {
          await sentinel.release();
          sentinel = null;
          return;
        }
        sentinel.addEventListener("release", () => {
          if (!cancelled) {
            appActor.send({ type: "setWakeLockHeld", held: false });
          }
        });
        appActor.send({ type: "setWakeLockHeld", held: true });
      } catch {
        sentinel = null;
        if (!cancelled) {
          appActor.send({ type: "setWakeLockHeld", held: false });
        }
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void requestLock();
      }
    };

    void requestLock();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      if (sentinel) {
        void sentinel.release();
      }
      appActor.send({ type: "setWakeLockHeld", held: false });
    };
  }, [appActor, focusMode, keepScreenAwake]);

  return (
    <AppActorsContext.Provider value={{ prefsActor, appActor }}>
      {children}
    </AppActorsContext.Provider>
  );
}

function useAppActors(): AppActors {
  const value = useContext(AppActorsContext);
  if (!value) {
    throw new Error("App actors are not available");
  }
  return value;
}

export function useAppActor(): AppActor {
  return useAppActors().appActor;
}

export function usePrefsActor(): PrefsActor {
  return useAppActors().prefsActor;
}
