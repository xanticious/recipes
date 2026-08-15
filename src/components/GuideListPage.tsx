import { useAppActor } from "../actors.tsx";
import {
  DIET_TAG_LABELS,
  getGuide,
  GUIDE_CATEGORY_META,
  GUIDE_DISCLAIMER,
  type GuideCategory,
} from "../data/index.ts";
import { handleRouteClick } from "../navigation.ts";
import { routeToHash } from "../routing.ts";
import styles from "./Guides.module.css";

export function GuideListPage({ category }: { category: GuideCategory }) {
  const appActor = useAppActor();
  const meta = GUIDE_CATEGORY_META[category];

  return (
    <article className={styles.page}>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <a
          className={styles.crumbLink}
          href={routeToHash({ name: "guides" })}
          onClick={(event) => {
            handleRouteClick(event, appActor, { name: "guides" });
          }}
        >
          Guides
        </a>
        <span aria-hidden="true">/</span>
        <span>{meta.title}</span>
      </nav>

      <header className={styles.header}>
        <h1>{meta.title}</h1>
        <p className={styles.lede}>{meta.lede}</p>
      </header>

      <p className={styles.disclaimer}>{GUIDE_DISCLAIMER}</p>

      {meta.groups.map((group) => {
        const headingId = `group-${group.tags[0] ?? group.heading}`;
        return (
          <section key={group.heading} className={styles.group} aria-labelledby={headingId}>
            <h2 id={headingId}>{group.heading}</h2>
            <div className={styles.cardGrid}>
              {group.tags.map((tag) => {
                const guide = getGuide(tag);
                return (
                  <a
                    key={tag}
                    className={styles.card}
                    href={routeToHash({ name: "guide", tag })}
                    onClick={(event) => {
                      handleRouteClick(event, appActor, { name: "guide", tag });
                    }}
                  >
                    <h3 className={styles.cardTitle}>{guide.title}</h3>
                    <p className={styles.cardBlurb}>
                      {DIET_TAG_LABELS[tag]}. {guide.blurb}
                    </p>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </article>
  );
}
