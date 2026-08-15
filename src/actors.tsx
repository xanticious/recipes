import { useActorRef, useSelector } from "@xstate/react";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { ActorRefFrom } from "xstate";
import { appMachine } from "./machines/appMachine.ts";
import { persistFontSize, persistTheme, prefsMachine } from "./machines/prefsMachine.ts";

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

  useEffect(() => {
    persistTheme(theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    persistFontSize(fontSize);
    document.documentElement.dataset.fontSize = fontSize;
  }, [fontSize]);

  useEffect(() => {
    const onHashChange = () => {
      appActor.send({ type: "hashChanged", hash: window.location.hash });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [appActor]);

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
