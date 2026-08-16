import { useAppActor } from "../actors.tsx";
import { GUIDE_DISCLAIMER, kitchenGuide } from "../data/index.ts";
import { goOpenExplore } from "../navigation.ts";
import styles from "./Guides.module.css";

export function GuidePage() {
  const appActor = useAppActor();

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1>{kitchenGuide.title}</h1>
        <p className={styles.lede}>{kitchenGuide.lede}</p>
      </header>

      <p className={styles.disclaimer}>{GUIDE_DISCLAIMER}</p>

      {kitchenGuide.sections.map((section) => (
        <section key={section.id} className={styles.section} aria-labelledby={section.id}>
          <h2 id={section.id}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.swaps && section.swaps.length > 0 ? (
            <ul className={styles.swaps}>
              {section.swaps.map((swap) => (
                <li key={`${swap.insteadOf}-${swap.use}`}>
                  <span className={styles.swapFrom}>Instead of {swap.insteadOf}</span>
                  <span className={styles.swapTo}>{swap.use}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {section.items && section.items.length > 0 ? (
            <ul className={styles.bullets}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <button
        type="button"
        className={styles.exploreBtn}
        onClick={() => {
          goOpenExplore(appActor);
        }}
      >
        Browse recipes
      </button>
    </article>
  );
}
