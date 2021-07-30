/**
 *
 */
export const PULL_REQUEST_STATE = Object.freeze({
  APPROVED: 'APPROVED',
  DENIED: 'DENIED',
  REVIEW: 'REVIEW',
});

/**
 * Types
 */
export enum COMMANDS {
  DAY = 'day',
  LIST = 'list',
  SUBSCRIBE = 'subscribe',
  UNSUBSSCRIBE = 'unsubscribe',
}