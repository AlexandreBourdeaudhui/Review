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
  // const matches = regExp.exec(repository);

  // if (matches) {
  //   repository = matches[1];
  // }

  //
  const repository = params.trim();
  const isEmpty = repository === '';

  //
  if (!isEmpty) {
    // if (database.data.repositories.includes(repository)) {
    await dynamoDb
      .delete({ TableName: process.env.DYNAMODB_TABLE, Key: { repository: repository } })
      .promise();

    await postMessage({
      channel: payload.channel_id,
      text: `Unsubscribed from <https://github.com/${repository}|${repository}>.`,
    });
    // }

    // else {
    // Repository doesn’t exist
    // }
  }

  // else {
  // Please provide a repository to unsubscribe
  // }
};
