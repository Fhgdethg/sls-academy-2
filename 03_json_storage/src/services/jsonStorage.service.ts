import fs, { promises as fsPromises } from 'fs';

type TJSONBody = { [key: string]: any } | any[];

class JsonStorageService {
  async checkFileExists(filePath: string) {
    try {
      await fsPromises.access(filePath);
      return true;
    } catch (err) {
      return false;
    }
  }

  async readJsonFile(filePath: string) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      stream.on('end', () => {
        try {
          const jsonData = JSON.parse(chunks.join(''));
          resolve(jsonData);
        } catch (err) {
          reject(err);
        }
      });

      stream.on('error', (err) => {
        reject(err);
      });
    });
  }

  async updateJsonFile(filePath: string, jsonData: TJSONBody) {
    const jsonStr = JSON.stringify(jsonData, null, 2);

    await fsPromises.writeFile(filePath, jsonStr, { encoding: 'utf8' });
  }
}

export default new JsonStorageService();
