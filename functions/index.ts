/*
 * Package Import
 */
import queryString from 'querystring';
import { Handler } from '@netlify/functions';

/*
 * Local Import
 */
import reviews from '../src/commands/reviews';
import subscribe from '../src/commands/subscribe';
import unsubscribe from '../src/commands/unsubscribe';
import list from '../src/commands/list';
import help from '../src/commands/help';

/**
 *
 * @param event
 * @param context
 * @returns
 */
export const handler: Handler = async (event, context) => {
  // Unauthorized Request.
  if (!process.env.GITHUB_TOKEN || !process.env.TOKEN_SLACK) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Unauthorized Request. Please check your configuration file.',
      }),
    };
  }

  // Not Found.
  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found.' }),
    };
  }

  try {
    // Init
    const payload = queryString.parse(event.body);

    if (payload.text) {
      //
      const regex = /([\w:]+)\s?(.*)?/gi;
      const [, action, params] = regex.exec(payload.text);

      // @TODO, factoriser
      // @TODO2, regarder où "watch" le dossier "src" pour que ça soit automatiquement prit en compte lors d'une sauvegarde
      if (action === 'day') {
        reviews(payload);
      } else if (action === 'list') {
        list(payload);
      } else if (action === 'subscribe') {
        subscribe(payload, params);
      } else if (action === 'unsubscribe') {
        unsubscribe(payload, params);
      }
    } else {
      return {
        statusCode: 200,
        body: help(),
      };
    }

    return {
      statusCode: 200,
      body: '',
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
