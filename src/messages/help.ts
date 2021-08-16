/**
 * Local Import
 */
import { Body } from '../utils';

/**
 * Types
 */
interface Commands {
  usage: string;
  desc: string;
}

/**
 * Code
 */
export const allCommands = (commands: Commands[]): Body => ({
  response_type: 'ephemeral',
  text: `Invalid command! :eyes:\nNeed some help with \`/reviews\` command?\n\n${commands
    .map(
      (command) => `${command.desc} :\n:point_right: \`${command.usage}\`\n\n`,
    )
    .join('')}`,
  attachments: [
    {
      footer: '<https://github.com/AlexandreBourdeaudhui/Review|Code source>',
    },
  ],
});
