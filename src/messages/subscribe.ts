/**
 * Local Import
 */
import { Body } from '../utils';

/**
 * Code
 */
export const emptyRessource = (): Body => ({
  response_type: 'ephemeral',
  text: 'Please give a resource to subscribe.',
});

export const subscribed = (repository: string): Body => ({
  response_type: 'in_channel',
  text: `Subscribed to <https://github.com/${repository}|${repository}>. This repository will be scanned for availables reviews.`,
});

export const alreadySubscribed = (repository: string): Body => ({
  response_type: 'ephemeral',
  text: `You're already subscribed to <https://github.com/${repository}|${repository}>.`,
});

export const unsubscribed = (repository: string): Body => ({
  response_type: 'in_channel',
  text: `Unsubscribed from <https://github.com/${repository}|${repository}>.`,
});

export const notFound = (resource: string): Body => ({
  response_type: 'ephemeral',
  text: `Could not find this resource: ${resource}.`,
});
