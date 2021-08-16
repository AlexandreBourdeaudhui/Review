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
 * Unsubscribe from reviews for a repository.
 * Usage: /reviews unsubscribe organization/repository
 */
export default async (params: string): Promise<APIGatewayProxyResult> => {
  // const matches = regExp.exec(repository);

  // if (matches) {
  //   repository = matches[1];
  // }

  //
  const repository = params.trim();
  const isEmpty = repository === '';

  try {
    //
    if (isEmpty) {
      return respond(200, {
        response_type: 'ephemeral',
        text: 'Please give a resource to unsubscribe.',
      });
    }

    //
    const databaseParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { repository },
    };

    await dynamoDb.delete(databaseParams).promise();

    return respond(200, {
      response_type: 'in_channel',
      text: `Unsubscribed from <https://github.com/${repository}|${repository}>.`,
    });
  } catch (error) {
    // else {
    // Repository doesn’t exist
    // }
  }
};
