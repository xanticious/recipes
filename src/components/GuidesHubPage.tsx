import { useAppActor } from "../actors.tsx";
import { GUIDE_CATEGORY_META, GUIDE_DISCLAIMER } from "../data/index.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import styles from "./Guides.module.css";

export function GuidesHubPage() {
  const appActor = useAppActor();
  const allergies = GUIDE_CATEGORY_META.allergies;
  const lifestyle = GUIDE_CATEGORY_META.lifestyle;

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1>Living with food allergies and eating patterns</h1>
        <p className={styles.lede}>
          If you are newly adjusting how you eat, you do not have to figure it all out at once.
          These short guides explain what each tag in our cookbook means in everyday cooking, the
          swaps we use most, and a few recipes you can start with tonight.
        </p>
      </header>

      <p className={styles.disclaimer}>{GUIDE_DISCLAIMER}</p>

      <div className={styles.cardGridTwo}>
        <a
          className={styles.card}
          href={routeToHash({ name: "guideList", category: "allergies" })}
          onClick={(event) => {
            handleRouteClick(event, appActor, { name: "guideList", category: "allergies" });
          }}
        >
          <h2 className={styles.cardTitle}>{allergies.title}</h2>
          <p className={styles.cardBlurb}>{allergies.blurb}</p>
        </a>
        <a
          className={styles.card}
          href={routeToHash({ name: "guideList", category: "lifestyle" })}
          onClick={(event) => {
            handleRouteClick(event, appActor, { name: "guideList", category: "lifestyle" });
          }}
        >
          <h2 className={styles.cardTitle}>{lifestyle.title}</h2>
          <p className={styles.cardBlurb}>{lifestyle.blurb}</p>
        </a>
      </div>
    </article>
  );
}
