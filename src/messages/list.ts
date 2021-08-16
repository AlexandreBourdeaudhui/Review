/**
 * Local Import
 */
import { Body } from '../utils';

/**
 * Types
 */
interface Repository {
  repository: string;
}

/**
 * Code
 */
export const repositoryList = (repositories: Repository[]): Body => ({
  response_type: 'in_channel',
  text: `Subscribed to the following repository : \n\n${repositories
    .map(
      ({ repository }) =>
        `- <https://github.com/${repository}|${repository}>\n`,
    )
    .join('')}`,
});
