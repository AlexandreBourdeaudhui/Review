/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import type { APIGatewayProxyResult } from 'aws-lambda';

/*
 * Local Import
 */
import * as messages from '../messages/reviews';

// Helpers
import { getAvailableReviews } from '../utils/github';
import { postMessage } from '../utils/slack';

// Types
import type { IActionParams } from '../types';
import type { Repositories } from '../types/github';
import type { SlashCommand } from '../types/slack';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Verify if we have a pull-requets that need to be reviewed
 * And, display it in Slack
 */
const verifyPullRequests = ({
  payload,
  repositories,
}: {
  payload: SlashCommand;
  repositories: Repositories[];
}) =>
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
              blocks: JSON.stringify(
                messages.pullRequestReview(availableReview),
                null,
                2,
              ),
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
export default async ({
  payload,
}: IActionParams): Promise<APIGatewayProxyResult> => {
  try {
    const { Items: repositories } = await dynamoDb
      .scan({ TableName: process.env.DYNAMODB_TABLE })
      .promise();

    // Verify if we have a pull-requets that need to be reviewed
    if (Array.isArray(repositories) && repositories.length > 0) {
      await Promise.all(
        verifyPullRequests({
          payload,
          repositories,
        }),
      );
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages.noMoreReviews(), null, 2),
    };
  } catch (error) {
    throw new Error(error);
  }
};

// @TODO : Slack has a 3000ms timeout, so if we don't respond within that
// window, and the Slack user who interacted with the app will see an error
// message (timeout), see the following link. https://api.slack.com/interactivity/handling#message_responses
