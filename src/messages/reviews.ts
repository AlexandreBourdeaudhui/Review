/**
 * Local Import
 */
import { Body, PullRequest } from '../types';

/**
 * Code
 */
export const followedRepository = (repository: string): string =>
  `Available reviews for the following repository <https://github.com/${repository}|${repository}> :arrow_heading_down:`;

export const pullRequestReview = ({ html_url, title }: PullRequest): string =>
  `:arrow_right: <${html_url}|${title}>`;

export const noMoreReviews = (): Body => ({
  response_type: 'in_channel',
  text: ':robot_face: I don’t see any other reviews requests at this time.',
});
