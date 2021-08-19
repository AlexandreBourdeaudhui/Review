/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import * as messages from '../messages/subscribe';

// Helpers
import { getRepositoryData } from '../utils/github';
import { respond } from '../utils/index';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Unsubscribe from reviews for a repository.
 * Usage: /reviews unsubscribe organization/repository
 */
export default async (params: string): Promise<APIGatewayProxyResult> => {
  // Params
  const repository = params.trim();
  const isEmpty = repository === '';

  try {
    if (isEmpty) {
      return respond(200, messages.emptyRessource());
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

    return respond(200, messages.unsubscribed(repository));
  } catch (error) {
    // Repository doesn’t exist in database

    // Ressource not found
    if (error.status === 404) {
      return respond(200, messages.notFound(repository));
    }
  }
};
