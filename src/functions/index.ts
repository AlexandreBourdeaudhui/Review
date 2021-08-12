/*
 * Package Import
 */
import queryString from 'querystring';
import { Handler } from 'aws-lambda';

/*
 * Local Import
 */
import { SUBCOMMAND, COMMANDS } from '../constants/index';

// Commands
import commandList from '../commands/list';
import getHelpCommands from '../commands/help';
import commandReviews from '../commands/reviews';
import commandSubscribe from '../commands/subscribe';
import commandUnsubscribe from '../commands/unsubscribe';

/**
 * Types
 */
// interface SlackCommand {
//   token: string;
//   team_id?: string;
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
 *
 */
export const handler: Handler = async (event) => {
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
    // Init
    const payload = queryString.parse(event.body);
    console.log({ payload });

    const message = payload.text.trim();

    // Analyze
    const [, action, params] = SUBCOMMAND.exec(message);
    SUBCOMMAND.lastIndex = 0;

    // • Command : Get the list of subscribed repository
    if (action === COMMANDS.LIST) {
      return commandList();
    }

    // • Command : Get available reviews
    if (action === COMMANDS.DAY) {
      return commandReviews(payload);
    }

    // • Command : Subscribe a repository to review
    if (action === COMMANDS.SUBSCRIBE) {
      return commandSubscribe(params);
    }

    // • Command : Unsubscribe a repository
    if (action === COMMANDS.UNSUBSSCRIBE) {
      return commandUnsubscribe(params);
    }

    // • Unknown command
    return getHelpCommands();
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
