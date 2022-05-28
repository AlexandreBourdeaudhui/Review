/**
 * Package Import
 */
import type { Endpoints } from '@octokit/types';

/**
 * Types
 */
export type ReviewsParams =
  Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['parameters'];

export type PullRequestParams =
  Endpoints['GET /repos/{owner}/{repo}/pulls']['parameters'];

export type PullRequestData =
  Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'];

export type RepositoryData =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

export interface Repositories {
  repository?: string;
}

export interface PullRequest {
  html_url: string;
  number: number;
  title: string;
}
