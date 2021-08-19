/**
 * Local Import
 */
import { SUBCOMMAND } from '../constants/command';
import { normalizeQuotes } from './index';

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
