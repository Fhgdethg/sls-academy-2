import Koa from 'koa';
import path from 'path';
import { fileURLToPath } from 'url';

import jsonStorageService from '../services/jsonStorage.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class JsonStorageController {
  async getFileByName(ctx: Koa.Context) {
    try {
      const { fileName } = ctx.params;
      const filePath = path.join(__dirname, `../db/${fileName}`);
      const isFileExist = await jsonStorageService.checkFileExists(filePath);

      if (!isFileExist) {
        ctx.status = 404;
        ctx.body = { message: 'Document not found' };
        return;
      }

      ctx.body = await jsonStorageService.readJsonFile(filePath);
      return;
    } catch (err) {
      ctx.status = 500;
      ctx.body = { message: 'Server error' };
    }
  }

  async updateFileByName(ctx: Koa.Context) {
    try {
      const { fileName } = ctx.params;
      const filePath = path.join(__dirname, `../db/${fileName}`);
      const isFileExist = await jsonStorageService.checkFileExists(filePath);

      if (!isFileExist) {
        ctx.status = 404;
        ctx.body = { message: 'Document not found' };
        return;
      }

      const jsonBody = ctx.request.body;

      await jsonStorageService.updateJsonFile(filePath, jsonBody);

      ctx.body = jsonBody;
      return;
    } catch (err) {
      ctx.status = 500;
      ctx.body = { message: 'Server error' };
    }
  }
}

export default new JsonStorageController();
