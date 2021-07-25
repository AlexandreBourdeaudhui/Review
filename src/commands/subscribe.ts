/*/*
 * Local Import
 */
import initializeDatabase from '../utils/database';

/**
 * Code
 */
// const regExp = new RegExp('(?:https://)github.com[:/](.*)', 'g');

/**
 *
 */
export default async (payload) => {
  // Init
  const database = await initializeDatabase();

  // const matches = regExp.exec(repository);

  // if (matches) {
  //   repository = matches[1];
  // }

  //
  const trimmedRepository = payload.text.trim();
  const isEmpty = trimmedRepository === '';

  //
  if (!isEmpty) {
    if (database.data.repositories.includes(trimmedRepository)) {
      database.data.repositories.push(trimmedRepository);
      database.write();

      return {
        message: 'new repository added',
      };

      // else { // Already include }
    }
  }
};
