/*
 * Package Import
 */
import { Octokit } from '@octokit/core';

/*
 * Local Import
 */
import { PULL_REQUEST_STATE } from '../constants/index';

// Helpers
import { postMessage } from '../utils/slack';
import initializeDatabase from '../utils/database';

/**
 * Types
 */
interface PullRequest {
  owner: string;
  repo: string;
  pull_number?: number;
};

/*
 * Init
 */
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Get if the pull-request `X` has already a review.
 * @doc https://docs.github.com/en/rest/reference/pulls#list-reviews-for-a-pull-request
 */
const getPullRequestHasReviews = async ({
  owner,
  repo,
  pull_number,
}: PullRequest) => {
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
const getPullRequests = async ({ owner, repo }: PullRequest) => {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    state: 'open',
  });

  const pullRequestsReview = await Promise.all(
    data.map(async (pullRequest) => {
      const isDraft = pullRequest.draft;
      const alreadyHasReview = await getPullRequestHasReviews({
        owner,
        repo,
        pull_number: pullRequest.number,
      });

      if (!isDraft && !alreadyHasReview) {
        return pullRequest;
      }
    }),
  );

  const pullRequestsReviewFiltered = pullRequestsReview.filter(Boolean);
  return pullRequestsReviewFiltered;
};

/**
 *
 */
export default async (payload) => {
  try {
    // Init
    const db = await initializeDatabase();

    //
    for (const repository of db.data.repositories) {
      const [owner, repo] = repository.split('/');

      if (owner && repo) {
        const pullRequestsReviews = await getPullRequests({ owner, repo });

        if (pullRequestsReviews.length) {
          //
          const { data } = await postMessage({
            channel: payload.channel_id,
            text: `Available reviews for the following repository <https://github.com/${repository}|${repository}> :arrow_heading_down:`,
          });

          // In thread,
          await Promise.all(
            pullRequestsReviews.map(({ html_url, title }) => {
              postMessage({
                channel: payload.channel_id,
                thread_ts: data.message.ts,
                text: `<${html_url}|${title}>`,
              });
            }),
          );
        }
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};
