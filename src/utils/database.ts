/**
 * Package Import
 */
// import { Low, JSONFile } from 'lowdb';
import path from 'path';
import fs from 'fs';

/**
 * Types
 */
type Data = {
  repositories: string[];
};

/**
 * Initialization Database instance
 */
export default async () => {
  // const appDirectory = fs.realpathSync(process.cwd());
  // const file = path.join(appDirectory, 'db.json');
  // const adapter = new JSONFile<Data>(file);
  // const db = new Low<Data>(adapter);

  // Read data from JSON file, this will set db.data content
  // await db.read();

  // Set default data
  let db;
  db.data ||= { repositories: [] };

  return db;
};
