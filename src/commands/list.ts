/*
 * Local Import
 */
import initializeDatabase from '../utils/database';
import { slackWrapper } from '../utils/slack';

/**
 *
 */
export default async (payload) => {
  // Init
  const database = await initializeDatabase();
  const { repositories } = database.data;

  //
  const getList = () => {
    return `Subscribed to the following repository : \n\n${repositories
      .map((repo) => `- <https://github.com/${repo}|${repo}>\n`)
      .join('')}`;
  };

  //
  return slackWrapper({
    request: 'chat.postMessage',
    params: {
      channel: payload.channel_id,
      text: getList(),
    },
  });
};
