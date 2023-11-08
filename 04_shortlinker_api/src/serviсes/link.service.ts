import { promises as fsPromises } from 'fs';

export class LinkService {
  async checkFileExists(filePath: string) {
    try {
      await fsPromises.access(filePath);
      return true;
    } catch (err) {
      return false;
    }
  }

  getFileNameWithoutExtension(fileName: string) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }

    return fileName.slice(0, lastDotIndex);
  }

  generateRandomAlias(file: string, reservedAliases: string[], length = 6) {
    let result = '';

    const isReserved = (alias) => reservedAliases.includes(alias);

    while (true) {
      for (let i = 0; i < length; i++) {
        result += file.charAt(Math.floor(Math.random() * file.length));
      }

      if (!isReserved(result)) {
        return result;
      }

      result = '';
    }
  }
}

export default new LinkService();
