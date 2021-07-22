/**
 * Package Import
 */
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import fs from 'fs';

/**
 *
 */
export default async () => {
  const appDirectory = fs.realpathSync(process.cwd());
  const file = path.join(appDirectory, 'db.json');
  const adapter = new JSONFile(file);

  //
  const db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  // Set default data
  db.data ||= { repositories: [] };
  return db;
};
