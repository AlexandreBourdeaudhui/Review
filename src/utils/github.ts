/*
 * Package Import
 */
import { Octokit } from '@octokit/core';

/*
 * Local Import
 */
import { GITHUB_REPO_REGEX, PULL_REQUEST_STATE } from '../constants/github';
import type {
  PullRequestData,
  PullRequestParams,
  RepositoryData,
  ReviewsParams,
} from '../types/github';

/**
 * Init
 */
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Get if the pull-request `X` has already a review.
 * @doc https://docs.github.com/en/rest/reference/pulls#list-reviews-for-a-pull-request
 */
export const getPullRequetsHasAlreadyReviews = async ({
  owner,
  repo,
  pull_number,
}: ReviewsParams): Promise<boolean> => {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
    {
      owner,
      repo,
      pull_number,
    },
  );

  return data.some(
    (pullRequest) =>
      pullRequest.state === PULL_REQUEST_STATE.APPROVED ||
      pullRequest.state === PULL_REQUEST_STATE.CHANGES_REQUESTED,
  );
};

/**
 * Get all pull-requests from a GitHub repository.
 * @doc https://docs.github.com/en/rest/reference/pulls#list-pull-requests
 */
export const getAvailableReviews = async ({
  owner,
  repo,
}: PullRequestParams): Promise<PullRequestData> => {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    state: PULL_REQUEST_STATE.OPEN,
  });

  const pullRequestsReview = await Promise.all(
    data.map(async (pullRequest) => {
      const isDraft = pullRequest.draft;
      const alreadyHasReview = await getPullRequetsHasAlreadyReviews({
        owner,
        repo,
        pull_number: pullRequest.number,
      });

      if (!isDraft && !alreadyHasReview) {
        return pullRequest;
      }
    }),
  );

  // Remove undefined and return pull—requests
  return pullRequestsReview.filter(Boolean);
};

/**
 * Get repository data
 * @doc https://docs.github.com/en/rest/reference/repos#get-a-repository
 */
export const getRepositoryData = async (
  repository: string,
): Promise<RepositoryData> => {
  let owner;
  let repo;

  // e.g : owner/repo
  // match: ['owner', 'repo']
  const repoSplit = repository.split('/');
  owner = repoSplit[0];
  repo = repoSplit[1];

  if (repository.startsWith('https://')) {
    // e.g : for a repository https://github.com/owner/repo
    // match: ['https://github.com/owner/repo','owner','repo']
    const match = new RegExp(GITHUB_REPO_REGEX).exec(repository);

    if (match) {
      owner = match[1];
      repo = match[2];
    }
  }

  const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
    owner,
    repo,
  });

  return data;
};
