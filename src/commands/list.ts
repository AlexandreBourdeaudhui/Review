/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import * as messages from '../messages/list';
import { respond } from '../utils/index';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * List all active subscriptions.
 * Usage: /reviews list
 */
export default async (): Promise<APIGatewayProxyResult> => {
  try {
    const { Items } = await dynamoDb
      .scan({ TableName: process.env.DYNAMODB_TABLE })
      .promise();

    return respond(200, messages.repositoryList(Items));
  } catch (error) {
    throw new Error(error);
  }
};
