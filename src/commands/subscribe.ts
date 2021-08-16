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
    //
    if (isEmpty) {
      return respond(200, {
        response_type: 'ephemeral',
        text: 'Please give a resource to subscribe.',
      });
    }

    //
    await dynamoDb
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: { repository },
        ConditionExpression: 'attribute_not_exists(repository)',
      })
      .promise();

    return respond(200, {
      response_type: 'in_channel',
      text: `Subscribed to <https://github.com/${repository}|${repository}>. This repository will be scanned for availables reviews.`,
    });
  } catch (error) {
    // Already exist
    if (error.code === 'ConditionalCheckFailedException') {
      return respond(200, {
        response_type: 'ephemeral',
        text: `You're already subscribed to <https://github.com/${repository}|${repository}>.`,
      });
    }
  }
};
