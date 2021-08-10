/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';

/*
 * Local Import
 */
import { postMessage } from '../utils/slack';

/**
 * Types
 */
type Repositories = { repository: string };

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 *
 */
const getList = (repositories: Repositories[]) =>
  `Subscribed to the following repository : \n\n${repositories
    .map(
      ({ repository }) =>
        `- <https://github.com/${repository}|${repository}>\n`,
    )
    .join('')}`;

/**
 *
 */
export default async (payload): Promise<void> => {
  try {
    //
    const result = await dynamoDb
      .scan({ TableName: process.env.DYNAMODB_TABLE })
      .promise();

    //
    await postMessage({
      channel: payload.channel_id,
      text: getList(result.Items),
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
