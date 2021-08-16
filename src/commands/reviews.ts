/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

/*
 * Local Import
 */
import { getAvailableReviews } from '../utils/github';
import { postMessage } from '../utils/slack';
import { respond } from '../utils/index';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * List all the pull-requests to review, in Slack thread.
 */
const listAvailableReviews = ({ availableReviews, data, payload }) =>
  availableReviews.map(({ html_url, title }) =>
    postMessage({
      channel: payload.channel_id,
      thread_ts: data.message.ts,
      text: `<${html_url}|${title}>`,
    }),
  );

/**
 * Check if we have any pull-requets that need to review
 * and for each repository with pull-requests to review, send message.
 */
const checkPullRequests = ({ payload, repositories }) =>
  repositories.map(async ({ repository }) => {
    const [owner, repo] = repository.split('/');

    if (owner && repo) {
      const availableReviews = await getAvailableReviews({ owner, repo });
      console.log(
        `${repository} has ${availableReviews.length} pull-request to review`,
      );

      if (availableReviews.length) {
        const { data } = await postMessage({
          channel: payload.channel_id,
          text: `Available reviews for the following repository <https://github.com/${repository}|${repository}> :arrow_heading_down:`,
        });

        await Promise.all(
          listAvailableReviews({ data, payload, availableReviews }),
        );
      }
    }
  });

/**
 * Show pull-requests that need review.
 * Usage: /reviews day
 */
export default async (payload): Promise<APIGatewayProxyResult> => {
  try {
    const { Items: repositories } = await dynamoDb
      .scan({ TableName: process.env.DYNAMODB_TABLE })
      .promise();

    //
    await Promise.all(checkPullRequests({ payload, repositories }));

    return respond(200, {
      response_type: 'in_channel',
      text: ':robot_face: I don’t see any other reviews requests at this time.',
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Note 📝
 * for ... of         : Reading in sequence (more slower 🐌)
 * Promise.all(.map)  : Reading in parallel (more faster ⚡️)
 *
 * @see https://stackoverflow.com/a/37576787/8365373
 *
 * -------------------------------------------------------------
 *
 * @TODO : Slack has a 3000ms timeout, so if we don't respond within
 * that window, and the Slack user who interacted with the app
 * will see an error message (timeout)
 * @see https://api.slack.com/interactivity/handling#message_responses
 */
