/*
 * Package Import
 */
import queryString from 'querystring';
import { Handler } from '@netlify/functions';

/*
 * Local Import
 */
import reviews from '../commands/reviews';
import subscribe from '../commands/subscribe';
import unsubscribe from '../commands/unsubscribe';
import list from '../commands/list';
import getHelpCommands from '../commands/help';

//
import { COMMANDS } from '../constants/index';

/**
 *
 * @param event
 * @param context
 * @returns
 */
export const handler: Handler = async (event, context) => {
  // Init
  const commands = new Map();
  const payload = queryString.parse(event.body);

  // Unauthorized Request…
  if (!process.env.GITHUB_TOKEN || !process.env.TOKEN_SLACK) {
    return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized Request. Please check your configuration file.' }),
    };
  }

  // Payload not found…
  if (!event.body) {
    return { statusCode: 404, body: JSON.stringify({ message: 'Not Found.' }) };
  }

  // URL verification request, from Slack…
  if (payload && payload.type && payload.type === 'url_verification') {
    return {
      statusCode: 200,
      body: payload.challenge,
    };
  }

  // Let’s go
  try {
    // Commands
    commands.set(COMMANDS.LIST, list);
    commands.set(COMMANDS.DAY, reviews);
    commands.set(COMMANDS.SUBSCRIBE, subscribe);
    commands.set(COMMANDS.UNSUBSSCRIBE, unsubscribe);

    if (payload.text) {
      // Analyze payload
      const regex = /([\w:]+)\s?(.*)?/gi;
      const [, action, params] = regex.exec(payload.text);

      // Commands
      if (commands.has(action)) {
        const command = commands.get(action);
        command(payload, ...params);
      }

      // Unknown command
      else {
        return { statusCode: 200, body: getHelpCommands() };
      }

      return { statusCode: 200, body: { ok: true } };
    }
  }
  catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};
