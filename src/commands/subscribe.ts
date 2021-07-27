/*
 * Local Import
 */
import { postMessage } from '../utils/slack';
import initializeDatabase from '../utils/database';

/**
 * Code
 */
// const regExp = new RegExp('(?:https://)github.com[:/](.*)', 'g');

/**
 *
 */
export default async (payload, params): Promise<void> => {
  // Init
  const database = await initializeDatabase();

  // const matches = regExp.exec(repository);

  // if (matches) {
  //   repository = matches[1];
  // }

  //
  const repository = params.trim();
  const isEmpty = repository === '';

  //
  if (!isEmpty) {
    if (!database.data.repositories.includes(repository)) {
      database.data.repositories.push(repository);

      await database.write();

      await postMessage({
        channel: payload.channel_id,
        text: `Subscribed to <https://github.com/${repository}|${repository}>. This channel will be scanned for availables reviews.`,
      });
    }

    // else {
    // Repository already exist
    // }
  }

  // else {
  // Please provide a repository to subscribe
  // }
};
