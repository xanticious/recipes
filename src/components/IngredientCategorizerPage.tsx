import { useSelector } from "@xstate/react";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { useAppActor } from "../actors.tsx";
import {
  CATEGORIZER_COLUMNS,
  CATEGORIZER_COLUMN_KEYS,
  CATEGORIZER_COLUMN_LABELS,
  CATEGORIZER_KEY_COLUMNS,
  categorizerColumnFromPoint,
  categorizerExportJson,
  describeIngredient,
  groupIngredients,
  INGREDIENT_SECTION_LABELS,
  ingredientLookup,
  ingredients,
  ingredientsInColumn,
  recipes,
  recipesByIngredientId,
  recipesUsingIngredient,
  type Ingredient,
} from "../data/index.ts";
import styles from "./IngredientCategorizerPage.module.css";
import { IngredientDietDetails } from "./IngredientDietDetails.tsx";

const DRAG_THRESHOLD_PX = 10;
const LONG_PRESS_MS = 320;
const usage = recipesByIngredientId(recipes);

type DragSession = {
  id: string;
  pointerId: number;
  pointerType: string;
  startX: number;
  startY: number;
  x: number;
  y: number;
  fromGrip: boolean;
  active: boolean;
  longPress: ReturnType<typeof setTimeout> | null;
  target: Element | null;
};

function placeGhost(ghost: HTMLDivElement | null, x: number, y: number) {
  if (!ghost) {
    return;
  }
  ghost.style.transform = `translate(${String(x - 24)}px, ${String(y - 18)}px)`;
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="8" r="1.2" fill="currentColor" />
      <path
        d="M12 11.25v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GripIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <circle cx="5" cy="3.5" r="1.15" fill="currentColor" />
      <circle cx="11" cy="3.5" r="1.15" fill="currentColor" />
      <circle cx="5" cy="8" r="1.15" fill="currentColor" />
      <circle cx="11" cy="8" r="1.15" fill="currentColor" />
      <circle cx="5" cy="12.5" r="1.15" fill="currentColor" />
      <circle cx="11" cy="12.5" r="1.15" fill="currentColor" />
    </svg>
  );
}

function IngredientInfoPanel({ ingredient }: { ingredient: Ingredient }) {
  const info = describeIngredient(ingredient, recipesUsingIngredient(ingredient.id, usage));
  return (
    <div className={styles.infoPanel}>
      <p>{info.what}</p>
      <IngredientDietDetails diet={info.diet} />
      <p>{info.commonness}</p>
      <p>{info.uses}</p>
      {info.notes ? <p>{info.notes}</p> : null}
    </div>
  );
}

export function IngredientCategorizerPage() {
  const appActor = useAppActor();
  const categorizer = useSelector(appActor, (snapshot) => snapshot.context.categorizer);
  const dragRef = useRef<DragSession | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const unbindRef = useRef<(() => void) | null>(null);

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
      unbindRef.current?.();
    };
  }, [appActor]);

  useEffect(() => {
    const session = dragRef.current;
    if (categorizer.draggingId && session) {
      placeGhost(ghostRef.current, session.x, session.y);
    }
  }, [categorizer.draggingId]);

  const copyToClipboard = () => {
    const json = categorizerExportJson(ingredients, categorizer.overrides);
    void navigator.clipboard.writeText(json).then(() => {
      appActor.send({ type: "categorizerCopied" });
    });
  };

  const beginDrag = (session: DragSession) => {
    if (session.active) {
      return;
    }
    session.active = true;
    if (session.longPress !== null) {
      clearTimeout(session.longPress);
      session.longPress = null;
    }
    appActor.send({ type: "startCategorizerDrag", id: session.id });
    if (session.target instanceof HTMLElement) {
      try {
        session.target.setPointerCapture(session.pointerId);
      } catch {
        // Pointer already released.
      }
    }
    placeGhost(ghostRef.current, session.x, session.y);
  };

  const endGesture = (reason: "up" | "cancel") => {
    unbindRef.current?.();
    unbindRef.current = null;
    const session = dragRef.current;
    dragRef.current = null;
    if (!session) {
      return;
    }
    if (session.longPress !== null) {
      clearTimeout(session.longPress);
    }
    if (session.active) {
      const column = categorizerColumnFromPoint(session.x, session.y);
      if (column) {
        appActor.send({ type: "moveCategorizerIngredient", id: session.id, column });
      }
      appActor.send({ type: "endCategorizerDrag" });
      return;
    }
    if (reason === "up" && session.pointerType !== "mouse") {
      appActor.send({
        type: "selectCategorizerIngredient",
        id: session.id,
        suppressClick: true,
      });
    }
  };

  const onItemPointerDown = (
    event: ReactPointerEvent<HTMLElement>,
    id: string,
    fromGrip: boolean,
  ) => {
    if (event.button !== 0) {
      return;
    }
    unbindRef.current?.();
    const session: DragSession = {
      id,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
      fromGrip,
      active: false,
      longPress: null,
      target: event.currentTarget,
    };
    dragRef.current = session;

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== session.pointerId || dragRef.current !== session) {
        return;
      }
      session.x = moveEvent.clientX;
      session.y = moveEvent.clientY;
      const distance = Math.hypot(
        moveEvent.clientX - session.startX,
        moveEvent.clientY - session.startY,
      );
      if (!session.active) {
        if (distance < DRAG_THRESHOLD_PX) {
          return;
        }
        if (session.pointerType !== "mouse" && !session.fromGrip) {
          endGesture("cancel");
          return;
        }
        beginDrag(session);
      }
      moveEvent.preventDefault();
      placeGhost(ghostRef.current, moveEvent.clientX, moveEvent.clientY);
      appActor.send({
        type: "setCategorizerDropTarget",
        column: categorizerColumnFromPoint(moveEvent.clientX, moveEvent.clientY),
      });
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== session.pointerId) {
        return;
      }
      session.x = upEvent.clientX;
      session.y = upEvent.clientY;
      endGesture(upEvent.type === "pointercancel" ? "cancel" : "up");
    };

    window.addEventListener("pointermove", onPointerMove, { capture: true, passive: false });
    window.addEventListener("pointerup", onPointerUp, { capture: true });
    window.addEventListener("pointercancel", onPointerUp, { capture: true });
    unbindRef.current = () => {
      window.removeEventListener("pointermove", onPointerMove, { capture: true });
      window.removeEventListener("pointerup", onPointerUp, { capture: true });
      window.removeEventListener("pointercancel", onPointerUp, { capture: true });
    };

    if (fromGrip) {
      event.preventDefault();
      beginDrag(session);
      return;
    }
    if (event.pointerType !== "mouse") {
      session.longPress = setTimeout(() => {
        if (dragRef.current === session && !session.active) {
          beginDrag(session);
        }
      }, LONG_PRESS_MS);
    }
  };

  const selected = categorizer.selectedId
    ? ingredientLookup.get(categorizer.selectedId)
    : undefined;
  const draggingName = categorizer.draggingId
    ? ingredientLookup.get(categorizer.draggingId)?.name
    : undefined;

  return (
    <div className={styles.page} data-dragging={categorizer.draggingId ? "true" : undefined}>
      <header className={styles.header}>
        <div>
          <h1>Ingredient categorizer</h1>
          <p className={styles.lede}>
            Confirmed tags stay put; the rest start in HA Assumed, Not-HA Assumed, or Unknown from
            lactose, gluten, cheese, and FODMAP notes. On a mouse, left click sends to HA -
            Confirmed, right click to Not-HA Confirmed, middle click to Unknown. Drag — or press and
            hold on a tablet — to move. The handle starts a drag immediately. Tap the info icon for
            the description and diet notes; tap it again to hide them.
          </p>
        </div>
        <button type="button" className={styles.copy} onClick={copyToClipboard}>
          {categorizer.copied ? "Copied" : "Copy categories as JSON"}
        </button>
      </header>

      <div className={styles.controls}>
        <p className={styles.selected}>
          {selected
            ? `Selected: ${selected.name}`
            : "Select an ingredient to move it with the buttons or keys 1–5."}
        </p>
        <div className={styles.moves}>
          {CATEGORIZER_COLUMNS.map((column) => (
            <button
              key={column}
              type="button"
              className={styles.move}
              data-column={column}
              data-over={categorizer.dropTarget === column ? "true" : undefined}
              disabled={!selected}
              onClick={() => {
                if (!selected) {
                  return;
                }
                appActor.send({
                  type: "moveCategorizerIngredient",
                  id: selected.id,
                  column,
                });
              }}
            >
              <span className={styles.keyHint}>{CATEGORIZER_COLUMN_KEYS[column]}</span>
              {CATEGORIZER_COLUMN_LABELS[column]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.board}>
        {CATEGORIZER_COLUMNS.map((column) => {
          const items = ingredientsInColumn(ingredients, categorizer.overrides, column);
          return (
            <section
              key={column}
              className={styles.column}
              data-column={column}
              data-over={categorizer.dropTarget === column ? "true" : undefined}
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
                        const selectedItem = categorizer.selectedId === ingredient.id;
                        const infoOpen = categorizer.infoId === ingredient.id;
                        const dragging = categorizer.draggingId === ingredient.id;
                        return (
                          <li
                            key={ingredient.id}
                            className={styles.card}
                            data-dragging={dragging ? "true" : undefined}
                          >
                            <div className={styles.row}>
                              <span
                                className={styles.grip}
                                title="Drag to a column"
                                onPointerDown={(event) => {
                                  onItemPointerDown(event, ingredient.id, true);
                                }}
                              >
                                <GripIcon />
                              </span>
                              <button
                                type="button"
                                className={styles.item}
                                aria-pressed={selectedItem}
                                onPointerDown={(event) => {
                                  onItemPointerDown(event, ingredient.id, false);
                                }}
                                onClick={() => {
                                  appActor.send({
                                    type: "categorizerPrimaryClick",
                                    id: ingredient.id,
                                  });
                                }}
                                onContextMenu={(event) => {
                                  event.preventDefault();
                                  const session = dragRef.current;
                                  if (session?.active) {
                                    return;
                                  }
                                  if (session && session.pointerType !== "mouse") {
                                    return;
                                  }
                                  appActor.send({
                                    type: "moveCategorizerIngredient",
                                    id: ingredient.id,
                                    column: "not-ha-confirmed",
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
                                    column: "unknown",
                                  });
                                }}
                              >
                                {ingredient.name}
                              </button>
                              <button
                                type="button"
                                className={styles.infoButton}
                                aria-expanded={infoOpen}
                                aria-label={`About ${ingredient.name}`}
                                title={`About ${ingredient.name}`}
                                onPointerDown={(event) => {
                                  event.stopPropagation();
                                }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  appActor.send({
                                    type: "toggleCategorizerInfo",
                                    id: ingredient.id,
                                  });
                                }}
                              >
                                <InfoIcon />
                              </button>
                            </div>
                            {infoOpen ? <IngredientInfoPanel ingredient={ingredient} /> : null}
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

      {categorizer.draggingId ? (
        <div ref={ghostRef} className={styles.ghost} aria-hidden="true">
          {draggingName}
        </div>
      ) : null}
    </div>
  );
}
