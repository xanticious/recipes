import { GUIDE_DISCLAIMER, kitchenGuide } from "../data/index.ts";
import styles from "./Guides.module.css";

export function GuidePage() {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1>{kitchenGuide.title}</h1>
      </header>

      <p className={styles.disclaimer}>{GUIDE_DISCLAIMER}</p>

      <p className={styles.ha}>{kitchenGuide.ha}</p>

      <section className={styles.section} aria-labelledby="substitutions">
        <h2 id="substitutions">Substitutions</h2>
        <p>{kitchenGuide.substitutionsIntro}</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Original</th>
                <th scope="col">Substitution</th>
              </tr>
            </thead>
            <tbody>
              {kitchenGuide.substitutions.map((row) => (
                <tr key={row.original}>
                  <th scope="row">{row.original}</th>
                  <td>{row.substitution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
