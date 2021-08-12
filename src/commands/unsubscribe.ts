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

  //
  if (!isEmpty) {
    // if (database.data.repositories.includes(repository)) {
    await dynamoDb
      .delete({ TableName: process.env.DYNAMODB_TABLE, Key: { repository } })
      .promise();

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
    // }

    // else {
    // Repository doesn’t exist
    // }
  }

  // else {
  // Please provide a repository to unsubscribe
  // }
};
