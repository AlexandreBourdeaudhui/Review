/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Types
 */
type Repositories = { repository: string };

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
 * List all active subscriptions
 * Usage: /reviews list
 */
export default async () => {
  try {
    const { Items } = await dynamoDb
      .scan({ TableName: process.env.DYNAMODB_TABLE })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          response_type: 'in_channel',
          text: getList(Items),
        },
        null,
        2,
      ),
    };
  } catch (error) {
    throw new Error(error);
  }
};
