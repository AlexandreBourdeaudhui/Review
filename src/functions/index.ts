/*
 * Package Import
 */
import queryString from 'querystring';
import { Handler } from 'aws-lambda';

/*
 * Local Import
 */
import commandList from '../commands/list';
import getHelpCommands from '../commands/help';
import commandReviews from '../commands/reviews';
import commandSubscribe from '../commands/subscribe';
import commandUnsubscribe from '../commands/unsubscribe';

//
import { COMMANDS } from '../constants/index';

/**
 * Types
 */
// interface SlackCommand {
//   token: string;
//   team_id: string;
//   team_domain: string;
//   channel_id: string;
//   channel_name: string;
//   user_id: string;
//   user_name: string;
//   command: string;
//   text: string;
//   api_app_id: string;
//   is_enterprise_install: string;
//   response_url: string;
//   trigger_id: string;
// }

/**
 * Constants
 */
const COMMAND = /([\w:]+)\s?(.*)?/gi;

/**
 *
 */
export const handler: Handler = async (event) => {
  // Init
  const payload = queryString.parse(event.body);

  // Unauthorized Request…
  if (!process.env.GITHUB_TOKEN || !process.env.TOKEN_SLACK) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Unauthorized Request. Please check your configuration file.',
      }),
    };
  }

  // Payload not found…
  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found.' }),
    };
  }

  // Let’s go
  try {
    if (payload.text) {
      // Analyze payload
      const [, action, params] = COMMAND.exec(payload.text);
      COMMAND.lastIndex = 0;

      // Command : Get the list of subscribed repository
      if (action === COMMANDS.LIST) {
        await commandList(payload);
      }

      // Command : Get available reviews
      else if (action === COMMANDS.DAY) {
        await commandReviews(payload);
      }

      // Command : Subscribe a repository to review
      else if (action === COMMANDS.SUBSCRIBE) {
        await commandSubscribe(payload, params);
      }

      // Command : Unsubscribe a repository
      else if (action === COMMANDS.UNSUBSSCRIBE) {
        await commandUnsubscribe(payload, params);
      }

      // Unknown command
      else {
        return {
          statusCode: 200,
          body: getHelpCommands(),
        };
      }

      // All right
      return {
        statusCode: 200,
        body: { ok: true },
      };
    }
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
