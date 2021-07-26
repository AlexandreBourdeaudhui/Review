/*
 * Local Import
 */
import initializeDatabase from '../utils/database';
import { slackWrapper } from '../utils/slack';

/**
 *
 * @param {*} repositories
 * @returns
 */
const getList = (repositories) =>
  `Subscribed to the following repository : \n\n${repositories
    .map((repository) => `- <https://github.com/${repository}|${repository}>\n`)
    .join('')}`;

/**
 *
 */
export default async (payload) => {
  // Init
  const database = await initializeDatabase();
  const { repositories } = database.data;

  //
  return slackWrapper({
    request: 'chat.postMessage',
    params: {
      channel: payload.channel_id,
      text: getList(repositories),
    },
  });
};
