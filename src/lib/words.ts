import type { CSSProperties } from 'react';

/** Splits text into words so each one can animate on its own. Empty strings are dropped. */
export const splitWords = (text: string): string[] => text.split(/\s+/).filter(Boolean);

/** Position of an item in a staggered group, exposed to CSS as --i */
export const idx = (i: number) => ({ '--i': i }) as CSSProperties;
