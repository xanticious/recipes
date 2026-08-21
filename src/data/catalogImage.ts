export type CatalogPhotoCredit = {
  photographer: string;
  url: string;
  source: string;
};

export type CatalogImageRequest = {
  id: string;
  name: string;
  width: number;
  height: number;
  src?: string;
  photo?: CatalogPhotoCredit;
};

export type PlaceholderLayout = {
  width: number;
  height: number;
  fontSize: number;
  lineHeight: number;
  lines: readonly string[];
};

export type SizedPhoto = {
  kind: "photo";
  width: number;
  height: number;
  src: string;
  alt: string;
  credit: CatalogPhotoCredit;
};

export type SizedPlaceholder = {
  kind: "placeholder";
  width: number;
  height: number;
  alt: string;
  hue: number;
  layout: PlaceholderLayout;
};

export type SizedCatalogImage = SizedPhoto | SizedPlaceholder;

export const CATALOG_IMAGE_CARD = { width: 320, height: 320 } as const;
export const CATALOG_IMAGE_PANEL = { width: 720, height: 540 } as const;

/** Average glyph width as a fraction of font-size for UI sans-serif. */
const CHAR_WIDTH = 0.58;
const LINE_HEIGHT = 1.2;
const MIN_FONT = 10;

export function placeholderHue(id: string): number {
  let hash = 2166136261;
  for (const char of id) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % 360;
}

export function measurePlaceholderText(text: string, fontSize: number): number {
  return text.length * fontSize * CHAR_WIDTH;
}

function breakWord(word: string, fontSize: number, maxWidth: number): string[] {
  if (measurePlaceholderText(word, fontSize) <= maxWidth) {
    return [word];
  }
  const pieces: string[] = [];
  let rest = word;
  while (rest.length > 0) {
    let take = rest.length;
    while (take > 1 && measurePlaceholderText(rest.slice(0, take), fontSize) > maxWidth) {
      take -= 1;
    }
    pieces.push(rest.slice(0, take));
    rest = rest.slice(take);
  }
  return pieces;
}

export function wrapPlaceholderText(text: string, fontSize: number, maxWidth: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return [];
  }
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    for (const piece of breakWord(word, fontSize, maxWidth)) {
      const next = current.length === 0 ? piece : `${current} ${piece}`;
      if (measurePlaceholderText(next, fontSize) <= maxWidth) {
        current = next;
      } else {
        if (current.length > 0) {
          lines.push(current);
        }
        current = piece;
      }
    }
  }
  if (current.length > 0) {
    lines.push(current);
  }
  return lines;
}

function placeholderFits(
  lines: readonly string[],
  fontSize: number,
  maxWidth: number,
  maxHeight: number,
): boolean {
  if (lines.length === 0) {
    return true;
  }
  if (lines.some((line) => measurePlaceholderText(line, fontSize) > maxWidth + 0.01)) {
    return false;
  }
  return lines.length * fontSize * LINE_HEIGHT <= maxHeight;
}

export function layoutPlaceholderLabel(
  text: string,
  width: number,
  height: number,
): PlaceholderLayout {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const padX = Math.max(safeWidth * 0.08, 8);
  const padY = Math.max(safeHeight * 0.08, 8);
  const maxWidth = Math.max(1, safeWidth - padX * 2);
  const maxHeight = Math.max(1, safeHeight - padY * 2);
  const label = text.trim();
  if (label.length === 0) {
    return {
      width: safeWidth,
      height: safeHeight,
      fontSize: MIN_FONT,
      lineHeight: LINE_HEIGHT,
      lines: [],
    };
  }

  let low = MIN_FONT;
  let high = Math.max(MIN_FONT, Math.floor(Math.min(maxWidth / 2, maxHeight / LINE_HEIGHT)));
  let best: PlaceholderLayout = {
    width: safeWidth,
    height: safeHeight,
    fontSize: MIN_FONT,
    lineHeight: LINE_HEIGHT,
    lines: wrapPlaceholderText(label, MIN_FONT, maxWidth),
  };

  while (low <= high) {
    const fontSize = Math.floor((low + high) / 2);
    const lines = wrapPlaceholderText(label, fontSize, maxWidth);
    if (placeholderFits(lines, fontSize, maxWidth, maxHeight)) {
      best = { width: safeWidth, height: safeHeight, fontSize, lineHeight: LINE_HEIGHT, lines };
      low = fontSize + 1;
    } else {
      high = fontSize - 1;
    }
  }
  return best;
}

export function sizedCatalogImage(request: CatalogImageRequest): SizedCatalogImage {
  const width = Math.max(1, Math.round(request.width));
  const height = Math.max(1, Math.round(request.height));
  const alt = request.name;
  if (request.src && request.photo) {
    return {
      kind: "photo",
      width,
      height,
      src: request.src,
      alt,
      credit: request.photo,
    };
  }
  return {
    kind: "placeholder",
    width,
    height,
    alt,
    hue: placeholderHue(request.id),
    layout: layoutPlaceholderLabel(alt, width, height),
  };
}

export function publicCatalogUrl(folder: string, fileName: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${folder}/${fileName}`;
}
