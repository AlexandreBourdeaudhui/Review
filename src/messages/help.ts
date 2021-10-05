/**
 * Local Import
 */
import { Commands, ResponseSlack } from '../types';

/**
 * Code
 */
export const allCommands = (commands: Commands[]): ResponseSlack => ({
  response_type: 'ephemeral',
  text: `Invalid command! :eyes:\nNeed some help with \`/reviews\` command?\n\n${commands
    .map(
      (command) => `${command.desc} :\n:point_right: \`${command.usage}\`\n\n`,
    )
    .join('')}`,
  attachments: [
    {
      footer:
        '<https://github.com/AlexandreBourdeaudhui/Review|See code source on GitHub>',
    },
  ],
});
