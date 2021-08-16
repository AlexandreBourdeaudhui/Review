/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import { respond } from '../utils/index';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 *
 */
const getList = (repositories: { repository: string }[]) =>
  `Subscribed to the following repository : \n\n${repositories
    .map(
      ({ repository }) =>
        `- <https://github.com/${repository}|${repository}>\n`,
    )
    .join('')}`;

/**
 * List all active subscriptions.
 * Usage: /reviews list
 */
export default async (): Promise<APIGatewayProxyResult> => {
  try {
    const { Items } = await dynamoDb
      .scan({ TableName: process.env.DYNAMODB_TABLE })
      .promise();

    return respond(200, {
      response_type: 'in_channel',
      text: getList(Items),
    });
  } catch (error) {
    throw new Error(error);
  }
};
