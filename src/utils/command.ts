/**
 * Package Import
 */
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import { SUBCOMMANDS, SUBCOMMAND_REGEX } from '../constants/command';
import { normalizeQuotes } from './index';

// Commands
import list from '../commands/list';
import help from '../commands/help';
import reviews from '../commands/reviews';
import subscribe from '../commands/subscribe';
import unsubscribe from '../commands/unsubscribe';

// Types
import { SlashCommand } from '../types';

/**
 * Get the action linked to the subcommand
 */
export const getAction = (
  subcommand: string,
  params: string,
  payload: SlashCommand,
): APIGatewayProxyResult | Promise<APIGatewayProxyResult> => {
  const props = { params, payload };

  // Get available reviews
  if (subcommand === SUBCOMMANDS.DAY) {
    return reviews(props);
  }

  // Subscribe a repository to review
  if (subcommand === SUBCOMMANDS.SUBSCRIBE) {
    return subscribe(props);
  }

  // Unsubscribe a repository
  if (subcommand === SUBCOMMANDS.UNSUBSSCRIBE) {
    return unsubscribe(props);
  }

  // Get the list of subscribed repository
  if (subcommand === SUBCOMMANDS.LIST) {
    return list();
  }

  // For all the other unknown commands, we display the help message
  return help();
};

/**
 * Analyze text…
 * And get the `subcommand` and `params` args
 */
export const getCommand = (text: string): string[] => {
  // Check for subcommand in the command text
  const textNormalized = normalizeQuotes(text);
  const matches = textNormalized.match(SUBCOMMAND_REGEX);

  if (matches) {
    const [, subcommand, params] = matches;
    return [subcommand, params];
  }

  // Command text without subcommand
  return [text, null];
};
