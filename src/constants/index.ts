/**
 * RegExp
 */
export const SUBCOMMAND = /([\w:]+)\s?(.*)?/gi;

/**
 * Available commands
 */
export enum COMMANDS {
  DAY = 'day',
  LIST = 'list',
  SUBSCRIBE = 'subscribe',
  UNSUBSSCRIBE = 'unsubscribe',
}

/**
 * Possible state for pull request
 */
export enum PULL_REQUEST_STATE {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  REVIEW = 'REVIEW',
}
