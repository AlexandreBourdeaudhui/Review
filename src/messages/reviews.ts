/**
 * Local Import
 */
import { Body } from '../utils';

/**
 * Types
 */
interface PullRequest {
  html_url: string;
  title: string;
}

/**
 * Code
 */
export const followRepository = (repository: string): string =>
  `Available reviews for the following repository <https://github.com/${repository}|${repository}> :arrow_heading_down:`;

export const pullRequestReview = ({ html_url, title }: PullRequest): string =>
  `:arrow_right: <${html_url}|${title}>`;

export const clearReviews = (): Body => ({
  response_type: 'in_channel',
  text: ':robot_face: I don’t see any other reviews requests at this time.',
});
