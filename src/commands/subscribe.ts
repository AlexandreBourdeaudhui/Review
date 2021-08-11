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
 *
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
    // if (!database.data.repositories.includes(repository)) {
    await dynamoDb
      .put({ TableName: process.env.DYNAMODB_TABLE, Item: { repository } })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          response_type: 'in_channel',
          text: `Subscribed to <https://github.com/${repository}|${repository}>. This repository will be scanned for availables reviews. To list all active subscriptions, you can type \`/reviews list\`.`,
        },
        null,
        2,
      ),
    };
    // }

    // else {
    // Repository already exist
    // }
  }

  // else {
  // Please provide a repository to subscribe
  // }
};
