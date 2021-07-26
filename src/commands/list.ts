/*
 * Local Import
 */
import { postMessage } from '../utils/slack';
import initializeDatabase from '../utils/database';

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

  //
  await postMessage({
    channel: payload.channel_id,
    text: getList(database.data.repositories),
  });
};
