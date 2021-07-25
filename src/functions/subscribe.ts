/*
 * Package Import
 */
import queryString from 'querystring';
import { Handler } from '@netlify/functions';

/*
 * Local Import
 */
import initializeDatabase from '../utils/database';

/**
 * Code
 */
// const regExp = new RegExp('(?:https://)github.com[:/](.*)', 'g');

/**
 *
 * @param event
 * @param context
 * @returns
 */
const handler: Handler = async (event, context) => {
  // Payload is required
  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'payload is required' }),
    };
  }

  try {
    // Init
    const database = await initializeDatabase();
    const payload = queryString.parse(event.body);

    // const matches = regExp.exec(repository);

    // if (matches) {
    //   repository = matches[1];
    // }

    //
    const trimmedRepository = payload.text.trim();
    const isEmpty = trimmedRepository === '';

    //
    if (!isEmpty) {
      if (database.data.repositories.includes(trimmedRepository)) {
        database.data.repositories.push(trimmedRepository);
        database.write();

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'new repository added' }),
        };
      }
      // else { // Already include }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

/**
 * Export
 */
export { handler };
