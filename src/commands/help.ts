/**
 *
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
export default (): string => `
Invalid command! :eyes:
Need some help with \`/reviews\` command?

${commands
  .map((command) => `${command.desc} :\n:point_right: \`${command.usage}\`\n\n`)
  .join('')}
`;
