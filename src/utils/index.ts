/**
 * Normalize text quotes
 */
export const normalizeQuotes = (text: string): string =>
  text
    .replace(/\u00AB/g, '"')
    .replace(/\u00BB/g, '"')
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"')
    .replace(/\u201E/g, '"')
    .replace(/\u201F/g, '"');
