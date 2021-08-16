/**
 * Package Import
 */
import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Local Import
 */
import * as messages from '../messages/help';
import { respond } from '../utils/index';

/**
 * Data
 */
const commands = [
  {
    usage: '/reviews day',
    desc: 'Show pull-requests that need review',
  },
  {
    usage: '/reviews subscribe owner/repository',
    desc: 'Subscribe to reviews for a repository',
  },
  {
    usage: '/reviews unsubscribe owner/repository',
    desc: 'Unsubscribe from reviews for a repository',
  },
  {
    usage: '/reviews list',
    desc: 'List all active subscriptions',
  },
  {
    usage: '/reviews help',
    desc: 'Show this help message',
  },
];

/**
 * Show a message usage/description for all available commands.
 * Usage: /reviews help, /reviews unknowcommand, /reviews
 */
export default (): APIGatewayProxyResult =>
  respond(200, messages.allCommands(commands));
