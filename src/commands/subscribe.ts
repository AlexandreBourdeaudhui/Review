/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import type { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import * as messages from '../messages/subscribe';
import { getRepositoryData } from '../utils/github';

// Types
import type { IActionParams } from '../types';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Subscribe to reviews for a repository.
 * Usage: /reviews subscribe organization/repository
 */
export default async ({
  params,
}: IActionParams): Promise<APIGatewayProxyResult> => {
  // Params
  const repository = params.trim();
  const isEmpty = repository === '';

  try {
    if (isEmpty) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messages.emptyRessource(), null, 2),
      };
    }

    // Verify if the repository exist on GitHub and get repository data
    const { full_name } = await getRepositoryData(repository);

    // Save item in Database
    await dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: { repository: full_name },
        ConditionExpression: 'attribute_not_exists(repository)',
      })
      .promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages.subscribed(repository), null, 2),
    };
  } catch (error) {
    // Already exist in database
    if (error.code === 'ConditionalCheckFailedException') {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messages.alreadySubscribed(repository), null, 2),
      };
    }

    // Ressource not found
    if (error.status === 404) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messages.notFound(repository), null, 2),
      };
    }

    throw new Error(error);
  }
};
