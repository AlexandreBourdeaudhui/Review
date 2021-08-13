/*
 * Package Import
 */
import { DynamoDB } from 'aws-sdk';

/*
 * Init
 */
const dynamoDb = new DynamoDB.DocumentClient();

/**
 * Code
 */
// const regExp = new RegExp('(?:https://)github.com[:/](.*)', 'g');

/**
 * Subscribe to reviews for a repository
 * Usage: /reviews subscribe organization/repository
 */
export default async (params: string) => {
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
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            response_type: 'ephemeral',
            text: 'Please give a resource to subscribe.',
          },
          null,
          2,
        ),
      };
    }

    //
    const databaseParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: { repository },
      ConditionExpression: 'attribute_not_exists(repository)',
    };

    await dynamoDb.put(databaseParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          response_type: 'in_channel',
          text: `Subscribed to <https://github.com/${repository}|${repository}>. This repository will be scanned for availables reviews.`,
        },
        null,
        2,
      ),
    };
  } catch (error) {
    // Already exist
    if (error.code === 'ConditionalCheckFailedException') {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            response_type: 'ephemeral',
            text: `You're already subscribed to <https://github.com/${repository}|${repository}>.`,
          },
          null,
          2,
        ),
      };
    }
  }
};
