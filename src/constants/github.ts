/**
 * RegExp GitHub repository
 */
export const GITHUB_REPO = /^(?:https:\/\/github.com\/)?([^/]+)\/([^/]+)$/;

/**
 * All possible state for a pull-request
 */
export enum PULL_REQUEST_STATE {
  APPROVED = 'APPROVED',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
}
