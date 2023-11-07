import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const connect = () => {
  const dbData = [];
  const filePath = path.join(__dirname, './IP2LOCATION-LITE-DB1.csv');

  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

    fileStream.on('data', (lines: string) => {
      const linesArr = lines.split('\r\n');

      linesArr.forEach((line) => {
        const lineItems = line.split(',').map((item) => item.replace(/"/g, ''));
        dbData.push(lineItems);
      });
    });

    fileStream.on('end', () => {
      resolve(dbData);
    });

    fileStream.on('error', (error) => {
      reject(error);
    });
  });
};

export default connect();
