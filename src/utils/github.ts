/*
 * Package Import
 */
import { Octokit } from '@octokit/core';

/*
 * Local Import
 */
import { PULL_REQUEST_STATE } from '../constants/github';

/**
 * Types
 */
interface PullRequest {
  owner: string;
  repo: string;
  pull_number?: number;
}

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
}: PullRequest): Promise<boolean> => {
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
      pullRequest.state === PULL_REQUEST_STATE.DENIED,
  );
};

/**
 * Get all pull-requests from a GitHub repository.
 * @doc https://docs.github.com/en/rest/reference/pulls#list-pull-requests
 */
export const getAvailableReviews = async ({ owner, repo }: PullRequest) => {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    state: 'open',
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

  // Remove undefined
  return pullRequestsReview.filter(Boolean);
};
