/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import * as messages from '../messages/subscribe';
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
    if (isEmpty) {
      return respond(200, messages.emptyRessource());
    }

    //
    await dynamoDb
      .delete({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { repository },
      })
      .promise();

    return respond(200, messages.unsubscribed(repository));
  } catch (error) {
    // else {
    // Repository doesn’t exist
    // }
  }
};
