/**
 * RegExp GitHub repository
 */
export const GITHUB_REPO = /^(?:https:\/\/github.com\/)?([^/]+)\/([^/]+)$/;

/**
 * All possible state for a pull-request
 */
export enum PULL_REQUEST_STATE {
  OPEN = 'open',
  APPROVED = 'APPROVED',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
}
