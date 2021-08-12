/**
 * Usage/Description of all available commands
 */
const commands = [
  {
    usage: '/reviews day',
    desc: 'Show pull-requests that need review',
  },
  {
    usage: '/reviews subscribe owner/repository',
    desc: 'Subscribe to reviews for a repository',
  },
  {
    usage: '/reviews unsubscribe owner/repository',
    desc: 'Unsubscribe from reviews for a repository',
  },
  {
    usage: '/reviews list',
    desc: 'List all active subscriptions',
  },
  {
    usage: '/reviews help',
    desc: 'Show this help message',
  },
];

/**
 *
 */
export default () => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      response_type: 'ephemeral',
      text: `Invalid command! :eyes:\nNeed some help with \`/reviews\` command?`,
      attachments: [
        ...commands.map((command) => ({
          text: `${command.desc} :\n:point_right: \`${command.usage}\``,
          mrkdwn_in: ['text'],
        })),
        {
          footer:
            '<https://github.com/AlexandreBourdeaudhui/Review|Code source>',
        },
      ],
    },
    null,
    2,
  ),
});
