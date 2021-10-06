/**
 * Local Import
 */
import { PullRequest, ResponseSlack, SlackBlocks } from '../types';

/**
 * Code
 */
export const followedRepository = (repository: string): string =>
  `Available reviews for the following repository <https://github.com/${repository}|${repository}> :arrow_heading_down:`;

export const noMoreReviews = (): ResponseSlack => ({
  response_type: 'in_channel',
  text: ':robot_face: I don’t see any other reviews requests at this time.',
});

export const pullRequestReview = ({
  number,
  html_url,
  title,
}: PullRequest): SlackBlocks => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `:new: New pull request !\n [#${number}] *<${html_url}|${title}>*`,
    },
  },
  // {
  //   type: 'section',
  //   fields: [
  //     // {
  //     //   type: 'mrkdwn',
  //     //   text: '*Labels*\n label1, label2, label3',
  //     // },
  //     // {
  //     //   type: 'mrkdwn',
  //     //   text: '*Assignees*\n Waiting for reviewer',
  //     // },
  //   ],
  // },
];
