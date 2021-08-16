/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

/*
 * Local Import
 */
import * as messages from '../messages/reviews';

// Helpers
import { getAvailableReviews } from '../utils/github';
import { postMessage } from '../utils/slack';
import { respond } from '../utils/index';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Check if we have any pull-requets that need to review
 */
const verifyPullRequests = ({ payload, repositories }) =>
  repositories.map(async ({ repository }) => {
    const [owner, repo] = repository.split('/');

    if (owner && repo) {
      const availableReviews = await getAvailableReviews({ owner, repo });
      console.log(`${repository} has ${availableReviews.length} PR to review`);

      if (availableReviews.length) {
        // For each repository with pull-requests to review, send message.
        const { data } = await postMessage({
          channel: payload.channel_id,
          text: messages.followedRepository(repository),
        });

        // List all the pull-requests to review, in Slack thread.
        await Promise.all(
          availableReviews.map((availableReview) =>
            postMessage({
              channel: payload.channel_id,
              thread_ts: data.message.ts,
              text: messages.pullRequestReview(availableReview),
            }),
          ),
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
    await Promise.all(verifyPullRequests({ payload, repositories }));

    // @TODO : Slack has a 3000ms timeout, so if we don't respond within that
    // window, and the Slack user who interacted with the app will see an error
    // message (timeout), see the following link.
    // https://api.slack.com/interactivity/handling#message_responses
    return respond(200, messages.clearReviews());
  } catch (error) {
    throw new Error(error);
  }
};
