/*
 * Package Import
 */
import queryString from 'querystring';
import type { Handler } from 'aws-lambda';

/*
 * Local Import
 */
import { getAction, getCommand } from '../utils/command';
import type { SlashCommand } from '../types/slack';

/**
 * Serverless function handler
 * It is launched when the `/review` command is called on a Slack channel
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

  try {
    const payload = queryString.parse(event.body) as unknown as SlashCommand;
    const [subcommand, params] = getCommand(payload.text);

    return getAction(subcommand, params, payload);
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
