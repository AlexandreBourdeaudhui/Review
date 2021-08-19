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
 * Subscribe to reviews for a repository.
 * Usage: /reviews subscribe organization/repository
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

    // Save item in Database
    await dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: { repository: full_name },
        ConditionExpression: 'attribute_not_exists(repository)',
      })
      .promise();

    return respond(200, messages.subscribed(repository));
  } catch (error) {
    // Already exist in database
    if (error.code === 'ConditionalCheckFailedException') {
      return respond(200, messages.alreadySubscribed(repository));
    }

    // Ressource not found
    if (error.status === 404) {
      return respond(200, messages.notFound(repository));
    }
  }
};
