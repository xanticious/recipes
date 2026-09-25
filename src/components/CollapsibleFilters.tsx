import type { ChangeEvent, ReactNode } from "react";
import styles from "./CollapsibleFilters.module.css";

export function CollapsibleFilters({
  id,
  search,
  toolbar,
  end,
  expanded,
  onToggle,
  hasFilters,
  onClear,
  children,
}: {
  id: string;
  search?: {
    value: string;
    placeholder: string;
    ariaLabel: string;
    onChange: (query: string) => void;
  };
  toolbar?: ReactNode;
  end?: ReactNode;
  expanded: boolean;
  onToggle: () => void;
  hasFilters: boolean;
  onClear?: () => void;
  children: ReactNode;
}) {
  const panelId = `${id}-panel`;

  return (
    <div className={styles.filters}>
      <div className={styles.toolbar}>
        {search ? (
          <input
            className={styles.search}
            type="search"
            value={search.value}
            placeholder={search.placeholder}
            aria-label={search.ariaLabel}
            onChange={(event) => {
              search.onChange(event.target.value);
            }}
          />
        ) : null}
        {toolbar}
        <button
          type="button"
          className={styles.filterButton}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={hasFilters ? "Filter, applied" : "Filter"}
          data-active={hasFilters ? "true" : undefined}
          onClick={onToggle}
        >
          Filter
          {hasFilters ? <span className={styles.appliedMark} aria-hidden="true" /> : null}
        </button>
        {end}
      </div>
      {expanded ? (
        <div className={styles.panel} id={panelId}>
          {children}
          {onClear ? (
            <button type="button" className={styles.clear} disabled={!hasFilters} onClick={onClear}>
              Clear filters
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function FilterGroup({ legend, children }: { legend?: string; children: ReactNode }) {
  return (
    <fieldset className={styles.group}>
      {legend ? <legend>{legend}</legend> : null}
      <div className={styles.chips}>{children}</div>
    </fieldset>
  );
}

export function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={styles.chip} aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}

export function FilterSegmentedToggle<T extends string>({
  value,
  options,
  ariaLabel,
  onChange,
}: {
  value: T;
  options: readonly { value: T; label: string; name?: string }[];
  ariaLabel: string;
  onChange: (value: T) => void;
}) {
  return (
    <div className={styles.segment} role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={styles.segmentButton}
          aria-label={option.name}
          aria-pressed={value === option.value}
          onClick={() => {
            onChange(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      {children}
    </label>
  );
}

export function FilterSelect({
  value,
  ariaLabel,
  onChange,
  children,
}: {
  value: string;
  ariaLabel: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}) {
  return (
    <select className={styles.combobox} value={value} aria-label={ariaLabel} onChange={onChange}>
      {children}
    </select>
  );
}
