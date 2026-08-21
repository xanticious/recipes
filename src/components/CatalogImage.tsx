import type { CSSProperties } from "react";
import { sizedCatalogImage, type CatalogPhotoCredit } from "../data/catalogImage.ts";
import styles from "./CatalogImage.module.css";

export function CatalogImage({
  id,
  name,
  width,
  height,
  src,
  photo,
  decorative = false,
  showCredit = false,
  fill = false,
}: {
  id: string;
  name: string;
  width: number;
  height: number;
  src?: string;
  photo?: CatalogPhotoCredit;
  decorative?: boolean;
  showCredit?: boolean;
  fill?: boolean;
}) {
  const image = sizedCatalogImage({ id, name, width, height, src, photo });
  const frameStyle = {
    "--image-w": String(image.width),
    "--image-h": String(image.height),
  } as CSSProperties;

  if (image.kind === "photo") {
    return (
      <figure className={fill ? styles.fillFigure : styles.figure}>
        <div className={styles.frame} style={frameStyle}>
          <img
            className={styles.photo}
            src={image.src}
            alt={decorative ? "" : image.alt}
            width={image.width}
            height={image.height}
          />
        </div>
        {showCredit ? (
          <figcaption className={styles.credit}>
            Photo by{" "}
            <a
              className={styles.creditLink}
              href={image.credit.url}
              rel="noreferrer"
              target="_blank"
            >
              {image.credit.photographer}
            </a>{" "}
            on {image.credit.source}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  const { layout } = image;
  const startY =
    (layout.height - layout.lines.length * layout.fontSize * layout.lineHeight) / 2 +
    layout.fontSize * 0.8;

  return (
    <div
      className={fill ? styles.fillPlaceholder : styles.placeholder}
      style={
        {
          ...frameStyle,
          "--hue": String(image.hue),
        } as CSSProperties
      }
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : image.alt}
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${String(layout.width)} ${String(layout.height)}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect className={styles.placeholderFill} width={layout.width} height={layout.height} />
        {layout.lines.map((line, index) => (
          <text
            key={`${line}-${String(index)}`}
            x={layout.width / 2}
            y={startY + index * layout.fontSize * layout.lineHeight}
            textAnchor="middle"
            fontSize={layout.fontSize}
            fontWeight={650}
          >
            {line}
          </text>
        ))}
      </svg>
    </div>
  );
}
