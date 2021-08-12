/**
 * RegExp
 */
export const SUBCOMMAND = /^(\w+) *(.*)$/;

/**
 * Available commands
 */
export enum COMMANDS {
  DAY = 'day',
  LIST = 'list',
  SUBSCRIBE = 'subscribe',
  UNSUBSSCRIBE = 'unsubscribe',
}
