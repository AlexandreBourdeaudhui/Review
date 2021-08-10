/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';

/*
 * Local Import
 */
import { postMessage } from '../utils/slack';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Code
 */
// const regExp = new RegExp('(?:https://)github.com[:/](.*)', 'g');

/**
 *
 */
export default async (payload, params): Promise<void> => {
  console.log({ payload, params });

  // const matches = regExp.exec(repository);

  // if (matches) {
  //   repository = matches[1];
  // }

  //
  const repository = params.trim();
  const isEmpty = repository === '';

  //
  if (!isEmpty) {
    // if (!database.data.repositories.includes(repository)) {
    await dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: { repository: repository },
      })
      .promise();

    await postMessage({
      channel: payload.channel_id,
      text: `Subscribed to <https://github.com/${repository}|${repository}>. This repository will be scanned for availables reviews. To list all active subscriptions, type \`/reviews list\`.`,
    });
    // }

    // else {
    // Repository already exist
    // }
  }

  // else {
  // Please provide a repository to subscribe
  // }
};
