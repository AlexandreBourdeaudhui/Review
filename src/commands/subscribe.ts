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
 * Subscribe to reviews for a repository.
 * Usage: /reviews subscribe organization/repository
 */
export default async (params: string): Promise<APIGatewayProxyResult> => {
  //
  const repository = params.trim();
  const isEmpty = repository === '';

  // const matches = regExp.exec(repository);

  // if (matches) {
  //   repository = matches[1];
  // }

  try {
    if (isEmpty) {
      return respond(200, messages.emptyRessource());
    }

    //
    await dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: { repository },
        ConditionExpression: 'attribute_not_exists(repository)',
      })
      .promise();

    return respond(200, messages.subscribed(repository));
  } catch (error) {
    // Already exist
    if (error.code === 'ConditionalCheckFailedException') {
      return respond(200, messages.alreadySubscribed(repository));
    }
  }
};
