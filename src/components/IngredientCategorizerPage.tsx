import { useSelector } from "@xstate/react";
import { useEffect, type DragEvent } from "react";
import { useAppActor } from "../actors.tsx";
import {
  CATEGORIZER_COLUMNS,
  CATEGORIZER_COLUMN_KEYS,
  CATEGORIZER_COLUMN_LABELS,
  CATEGORIZER_KEY_COLUMNS,
  categorizerExportJson,
  groupIngredients,
  INGREDIENT_SECTION_LABELS,
  ingredients,
  ingredientsInColumn,
  type CategorizerColumn,
} from "../data/index.ts";
import styles from "./IngredientCategorizerPage.module.css";

export function IngredientCategorizerPage() {
  const appActor = useAppActor();
  const categorizer = useSelector(appActor, (snapshot) => snapshot.context.categorizer);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) {
        return;
      }
      const column = CATEGORIZER_KEY_COLUMNS[event.key];
      if (!column) {
        return;
      }
      const selectedId = appActor.getSnapshot().context.categorizer.selectedId;
      if (!selectedId) {
        return;
      }
      event.preventDefault();
      appActor.send({ type: "moveCategorizerIngredient", id: selectedId, column });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [appActor]);

  const copyToClipboard = () => {
    const json = categorizerExportJson(ingredients, categorizer.overrides);
    void navigator.clipboard.writeText(json).then(() => {
      appActor.send({ type: "categorizerCopied" });
    });
  };

  const onDragOverColumn = (event: DragEvent<HTMLElement>, column: CategorizerColumn) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    if (appActor.getSnapshot().context.categorizer.dropTarget !== column) {
      appActor.send({ type: "setCategorizerDropTarget", column });
    }
  };

  const onDropColumn = (event: DragEvent<HTMLElement>, column: CategorizerColumn) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    appActor.send({ type: "setCategorizerDropTarget", column: null });
    if (id) {
      appActor.send({ type: "moveCategorizerIngredient", id, column });
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Ingredient categorizer</h1>
          <p className={styles.lede}>
            Pending House Approval starts in Uncategorized. Left click sends to HA, right click to
            Not HA, middle click to Pending. Drag to move, including back to Uncategorized. Order
            inside a column matches the Ingredients page: grocery section, then name.
          </p>
        </div>
        <button type="button" className={styles.copy} onClick={copyToClipboard}>
          {categorizer.copied ? "Copied" : "Copy HA / Not HA as JSON"}
        </button>
      </header>

      <div className={styles.board}>
        {CATEGORIZER_COLUMNS.map((column) => {
          const items = ingredientsInColumn(ingredients, categorizer.overrides, column);
          return (
            <section
              key={column}
              className={styles.column}
              data-column={column}
              data-over={categorizer.dropTarget === column ? "true" : undefined}
              onDragOver={(event) => {
                onDragOverColumn(event, column);
              }}
              onDrop={(event) => {
                onDropColumn(event, column);
              }}
              onDragLeave={(event) => {
                const related = event.relatedTarget;
                if (related instanceof Node && event.currentTarget.contains(related)) {
                  return;
                }
                if (appActor.getSnapshot().context.categorizer.dropTarget === column) {
                  appActor.send({ type: "setCategorizerDropTarget", column: null });
                }
              }}
            >
              <header className={styles.columnHeader}>
                <h2>
                  <span className={styles.keyHint}>{CATEGORIZER_COLUMN_KEYS[column]}</span>
                  {CATEGORIZER_COLUMN_LABELS[column]}
                </h2>
                <p className={styles.count}>{String(items.length)}</p>
              </header>
              <div className={styles.list}>
                {groupIngredients(items).map((group) => (
                  <section key={group.section} className={styles.group}>
                    <h3 className={styles.groupHeading}>
                      {INGREDIENT_SECTION_LABELS[group.section]}
                    </h3>
                    <ul className={styles.groupList}>
                      {group.ingredients.map((ingredient) => {
                        const selected = categorizer.selectedId === ingredient.id;
                        return (
                          <li key={ingredient.id}>
                            <button
                              type="button"
                              className={styles.item}
                              draggable
                              aria-pressed={selected}
                              onClick={() => {
                                appActor.send({
                                  type: "categorizerPrimaryClick",
                                  id: ingredient.id,
                                });
                              }}
                              onContextMenu={(event) => {
                                event.preventDefault();
                                appActor.send({
                                  type: "moveCategorizerIngredient",
                                  id: ingredient.id,
                                  column: "notHa",
                                });
                              }}
                              onMouseDown={(event) => {
                                if (event.button === 1) {
                                  event.preventDefault();
                                }
                              }}
                              onMouseUp={(event) => {
                                if (event.button !== 1) {
                                  return;
                                }
                                event.preventDefault();
                                appActor.send({
                                  type: "moveCategorizerIngredient",
                                  id: ingredient.id,
                                  column: "pending",
                                });
                              }}
                              onDragStart={(event) => {
                                event.dataTransfer.setData("text/plain", ingredient.id);
                                event.dataTransfer.effectAllowed = "move";
                                appActor.send({
                                  type: "selectCategorizerIngredient",
                                  id: ingredient.id,
                                  suppressClick: true,
                                });
                              }}
                              onDragEnd={() => {
                                appActor.send({ type: "setCategorizerDropTarget", column: null });
                              }}
                            >
                              {ingredient.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
