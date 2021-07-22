/*
 * Package Import
 */
import { Handler } from '@netlify/functions'

/*
 * Local Import
 */
import initializeDatabase from '../utils/database';


/**
 * 
 * @param event 
 * @param context 
 * @returns 
 */
const handler: Handler = async (event, context) => {  
  // Data
  const database = await initializeDatabase();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: database.data.repositories })
  }
}

/**
 * Export
 */
export { handler };