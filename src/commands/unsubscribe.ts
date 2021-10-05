/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import { IActionParams } from '../types';
import * as messages from '../messages/subscribe';
import { getRepositoryData } from '../utils/github';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Unsubscribe from reviews for a repository.
 * Usage: /reviews unsubscribe organization/repository
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

    // Delete item in Database
    await dynamoDb
      .delete({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { repository: full_name },
      })
      .promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages.unsubscribed(repository), null, 2),
    };
  } catch (error) {
    // Repository doesn’t exist in database
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
