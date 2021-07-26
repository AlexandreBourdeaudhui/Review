/*
 * Package Import
 */
import { Octokit } from '@octokit/core';

/*
 * Local Import
 */
import { PULL_REQUEST_STATE } from '../constants/index';

// Helpers
import initializeDatabase from '../utils/database';
import { slackWrapper } from '../utils/slack';

/*
 * Init
 */
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Get the reviews of pull request X
 * @doc https://docs.github.com/en/rest/reference/pulls#list-reviews-for-a-pull-request
 *
 * @param {String} owner
 * @param {String} repo
 * @param {Number} pull_number
 * @return
 */
const getPullRequestHasReviews = async ({
  owner,
  repo,
  pull_number,
}: {
  owner: string,
  repo: string,
  pull_number: number,
}) => {
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
      pullRequest.state === PULL_REQUEST_STATE.APPROVED
      || pullRequest.state === PULL_REQUEST_STATE.DENIED,
  );
};

/**
 * Get all pull requests from GitHub repo
 * @doc https://docs.github.com/en/rest/reference/pulls#list-pull-requests
 *
 * @param {String} owner
 * @param {String} repo
 * @returns
 */
const getPullRequests = async ({
  owner,
  repo,
}: {
  owner: string,
  repo: string,
}) => {
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
          const { data } = await slackWrapper({
            request: 'chat.postMessage',
            params: {
              channel: payload.channel_id,
              text: `Available reviews for the following repository <https://github.com/${repository}|${repository}> :arrow_heading_down:`,
            },
          });

          // In thread,
          await Promise.all(
            pullRequestsReviews.map(({ html_url, title }) => {
              slackWrapper({
                request: 'chat.postMessage',
                params: {
                  channel: payload.channel_id,
                  thread_ts: data.message.ts,
                  text: `<${html_url}|${title}>`,
                },
              });
            }),
          );
        }
      }
    }
  }
  catch (error) {
    //
  }
};
