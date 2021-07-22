/*
 * Package Import
 */
import queryString from 'querystring';
import { Handler } from '@netlify/functions'

/*
 * Local Import
 */
import initializeDatabase from '../utils/database';


/**
 * 
 * @param repository 
 */
  const setRepostitory = async (repository: String) => {
    const database = await initializeDatabase();
    
    //
    if (!database.data.repositories.includes(repository)) {
      database.data.repositories.push(repository);
      database.write();
    }
    // else { already include; }
  }

/**
 * 
 * @param event 
 * @param context 
 * @returns 
 */
const handler: Handler = async (event, context) => {
    // Payload is required
    if (!event.body) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Payload is required' }),
      };
    }
  
  // Data
  const payload = queryString.parse(event.body);
  setRepostitory(payload);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  }
}

/**
 * Export
 */
export { handler };