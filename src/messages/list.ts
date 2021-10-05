/**
 * Local Import
 */
import { Repositories, ResponseSlack } from '../types';

/**
 * Code
 */
export const repositoryList = (
  repositories: Repositories[],
): ResponseSlack => ({
  response_type: 'in_channel',
  text: `Subscribed to the following repository : \n\n${repositories
    .map(
      ({ repository }) =>
        `- <https://github.com/${repository}|${repository}>\n`,
    )
    .join('')}`,
});
