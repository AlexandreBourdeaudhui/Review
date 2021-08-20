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

// Helpers
import getSubcommand from '../utils/command';
import { COMMANDS } from '../constants/command';

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
    const payload = queryString.parse(event.body);
    const [subcommand, params] = getSubcommand(payload.text);
    console.log({ payload });

    // • Command : Get the list of subscribed repository
    if (subcommand === COMMANDS.LIST) {
      return commandList();
    }

    // • Command : Get available reviews
    if (subcommand === COMMANDS.DAY) {
      return commandReviews(payload);
    }

    // • Command : Subscribe a repository to review
    if (subcommand === COMMANDS.SUBSCRIBE) {
      return commandSubscribe(params);
    }

    // • Command : Unsubscribe a repository
    if (subcommand === COMMANDS.UNSUBSSCRIBE) {
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
