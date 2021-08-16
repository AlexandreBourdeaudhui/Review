/**
 * Local Import
 */
import { SUBCOMMAND } from '../constants/command';

/**
 * Normalize text quotes
 */
const normalizeQuotes = (text: string): string =>
  text
    .replace(/\u00AB/g, '"')
    .replace(/\u00BB/g, '"')
    .replace(/\u201C/g, '"')
    .replace(/\u201D/g, '"')
    .replace(/\u201E/g, '"')
    .replace(/\u201F/g, '"');

/**
 * Analyze text, and get the `subcommand` and `args`
 */
export default (text: string): string[] => {
  // Normalize text
  const textNormalized = normalizeQuotes(text);

  // Check for subcommand in the command text
  const matches = textNormalized.match(SUBCOMMAND);

  if (matches) {
    const [, subcommand, params] = matches;
    return [subcommand, params];
  }

  // Command text without subcommand
  return [text];
};
