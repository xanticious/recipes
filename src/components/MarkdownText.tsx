import { Fragment, type ReactNode } from "react";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).flatMap((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return <strong key={`${keyPrefix}-b-${String(i)}`}>{part.slice(2, -2)}</strong>;
    }
    return part.split(/(\*[^*]+\*)/g).map((chunk, j) => {
      if (chunk.startsWith("*") && chunk.endsWith("*") && chunk.length >= 3) {
        return <em key={`${keyPrefix}-i-${String(i)}-${String(j)}`}>{chunk.slice(1, -1)}</em>;
      }
      return <Fragment key={`${keyPrefix}-t-${String(i)}-${String(j)}`}>{chunk}</Fragment>;
    });
  });
}

export function MarkdownText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={String(i)}>
          {i > 0 ? <br /> : null}
          {renderInline(line, String(i))}
        </Fragment>
      ))}
    </>
  );
}
