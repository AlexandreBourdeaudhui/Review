/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import type { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import * as messages from '../messages/list';

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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages.repositoryList(Items), null, 2),
    };
  } catch (error) {
    throw new Error(error);
  }
};
