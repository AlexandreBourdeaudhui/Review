/**
 * Local Import
 */
import { ResponseSlack } from '../types';

/**
 * Code
 */
export const emptyRessource = (): ResponseSlack => ({
  response_type: 'ephemeral',
  text: 'Please give a resource to subscribe.',
  attachments: [{ color: 'danger', mrkdwn_in: ['text'] }],
});

export const subscribed = (repository: string): ResponseSlack => ({
  response_type: 'in_channel',
  text: `Subscribed to <https://github.com/${repository}|${repository}>. This repository will be scanned for availables reviews.`,
});

export const alreadySubscribed = (repository: string): ResponseSlack => ({
  response_type: 'ephemeral',
  text: `You're already subscribed to <https://github.com/${repository}|${repository}>.`,
});

export const unsubscribed = (repository: string): ResponseSlack => ({
  response_type: 'in_channel',
  text: `Unsubscribed from <https://github.com/${repository}|${repository}>.`,
});

export const notFound = (resource: string): ResponseSlack => ({
  response_type: 'ephemeral',
  text: `Could not find this resource: ${resource}.`,
  attachments: [{ color: 'danger', mrkdwn_in: ['text'] }],
});
