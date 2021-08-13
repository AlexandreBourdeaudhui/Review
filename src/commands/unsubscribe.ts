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
 * Unsubscribe from reviews for a repository
 * Usage: /reviews unsubscribe organization/repository
 */
export default async (params: string) => {
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
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            response_type: 'ephemeral',
            text: 'Please give a resource to unsubscribe.',
          },
          null,
          2,
        ),
      };
    }

    //
    const databaseParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { repository },
    };

    await dynamoDb.delete(databaseParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          response_type: 'in_channel',
          text: `Unsubscribed from <https://github.com/${repository}|${repository}>.`,
        },
        null,
        2,
      ),
    };
  } catch (error) {
    // else {
    // Repository doesn’t exist
    // }
  }
};
