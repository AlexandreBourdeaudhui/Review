/**
 * Local Import
 */
import type { ResponseSlack } from '../types/slack';

/**
 * Message • Empty ressources
 */
export const emptyRessource = (): ResponseSlack => ({
  response_type: 'ephemeral',
  text: 'Please give a resource to subscribe.',
  attachments: [
    {
      color: 'danger',
      mrkdwn_in: ['text'],
    },
  ],
});

/**
 * Message • Subscribe a new repository
 */
export const subscribed = (repository: string): ResponseSlack => ({
  response_type: 'in_channel',
  text: `Subscribed to <https://github.com/${repository}|${repository}>. This repository will be scanned for availables reviews.`,
});

/**
 * Message • The repository is already subscribed
 */
export const alreadySubscribed = (repository: string): ResponseSlack => ({
  response_type: 'ephemeral',
  text: `You're already subscribed to <https://github.com/${repository}|${repository}>.`,
});

/**
 * Message • Unsubscribed a repository
 */
export const unsubscribed = (repository: string): ResponseSlack => ({
  response_type: 'in_channel',
  text: `Unsubscribed from <https://github.com/${repository}|${repository}>.`,
});

/**
 * Message • Ressource not found
 */
export const notFound = (resource: string): ResponseSlack => ({
  response_type: 'ephemeral',
  text: `Could not find this resource: ${resource}.`,
  attachments: [
    {
      color: 'danger',
      mrkdwn_in: ['text'],
    },
  ],
});
