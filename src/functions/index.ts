/*
 * Package Import
 */
import { Octokit } from '@octokit/core';
import { Handler } from '@netlify/functions';

/*
 * Local Import
 */
import { PULL_REQUEST_STATE } from '../constants/index';
import initializeDatabase from '../utils/database';

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
  owner: string;
  repo: string;
  pull_number: number;
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
      pullRequest.state === PULL_REQUEST_STATE.APPROVED ||
      pullRequest.state === PULL_REQUEST_STATE.DENIED,
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
  owner: string;
  repo: string;
}) => {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    state: 'open',
  });

  const pullRequestsToReview = data.map((pullRequest) => {
    const isDraft = pullRequest.draft;
    const hasReview = getPullRequestHasReviews({
      owner,
      repo,
      pull_number: pullRequest.number,
    });

    if (!isDraft && !hasReview) {
      return pullRequest;
    }
  });

  return Promise.all(pullRequestsToReview);
};

/**
 *
 * @param event
 * @param context
 * @returns
 */
const handler: Handler = async (event, context) => {
  try {
    // Init
    const db = await initializeDatabase();
    const pullRequestsNeedReviews = [];

    //
    for (const repository of db.data.repositories) {
      const [owner, repo] = repository.split('/');

      if (owner && repo) {
        const pullRequests = await getPullRequests({ owner, repo });

        if (pullRequests.length) {
          console.log(`
            Pour le projet suivant ${owner}/${repo},
            Voici les pull-requets qui nécéssitent une review : 
            ${pullRequests[0].title} — ${pullRequests[0].html_url}
          `);
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello World' }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

/**
 * Export
 */
export { handler };
