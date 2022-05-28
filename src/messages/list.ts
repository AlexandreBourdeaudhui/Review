/**
 * Local Import
 */
import type { Repositories } from '../types/github';
import type { ResponseSlack } from '../types/slack';

/**
 * Message • List of subscribed repositories that can 
 * be scanned to know if their pull-request can be reviewed
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
