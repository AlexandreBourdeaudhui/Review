/*
 * Package Import
 */
import { Handler } from '@netlify/functions';

/*
 * Local Import
 */
import initializeDatabase from '../utils/database';
import { setSlackResponse } from '../utils/slack';

/**
 *
 * @param items
 * @returns
 */
const formatMessage = (items) => {
  return `Nouvelle liste : \n\n${items
    .map((item) => `* ${item}\n`)
    .join('')}`;
};

/**
 *
 * @param event
 * @param context
 * @returns
 */
const handler: Handler = async (event, context) => {
  // Init
  const database = await initializeDatabase();
  const repositories = formatMessage(database.data.repositories);

  return setSlackResponse(repositories);
};

/**
 * Export
 */
export { handler };
