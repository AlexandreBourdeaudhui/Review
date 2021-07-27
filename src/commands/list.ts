/*
 * Local Import
 */
import { postMessage } from '../utils/slack';
import initializeDatabase from '../utils/database';

/**
 * Types
 */
type Repositories =  string[];

/**
 *
 */
const getList = (repositories: Repositories) =>
  `Subscribed to the following repository : \n\n${repositories
    .map((repository) => `- <https://github.com/${repository}|${repository}>\n`)
    .join('')}`;

/**
 *
 */
export default async (payload): Promise<void> => {
  // Init
  const database = await initializeDatabase();

  //
  await postMessage({
    channel: payload.channel_id,
    text: getList(database.data.repositories),
  });
};
