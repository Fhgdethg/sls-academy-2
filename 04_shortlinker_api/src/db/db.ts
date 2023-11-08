import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aliasesPath = path.join(__dirname, './aliases.json');

export const connect = async () => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(aliasesPath, { encoding: 'utf8' });
    let data = '';

    readStream.on('data', (chunk) => {
      data += chunk;
    });

    readStream.on('end', () => {
      resolve(data ? JSON.parse(data) : {});
    });

    readStream.on('error', (error) => {
      reject(error);
    });
  });
};
