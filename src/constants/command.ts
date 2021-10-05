/**
 * RegExp
 */
export const SUBCOMMAND_REGEX = /^(\w+) *(.*)$/;

/**
 * Available commands
 */
export enum SUBCOMMANDS {
  DAY = 'day',
  LIST = 'list',
  SUBSCRIBE = 'subscribe',
  UNSUBSSCRIBE = 'unsubscribe',
}
