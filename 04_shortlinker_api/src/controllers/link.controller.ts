import { Request, Response } from 'express';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import linkService from '../serviсes/link.service.js';

import { connect } from '../db/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let aliasesData = {};
connect().then((aliasesObj) => (aliasesData = aliasesObj));

export class LinkController {
  async createAlias(req: Request, res: Response) {
    try {
      const { url } = req.body;

      if (!url || typeof url !== 'string')
        return res.status(400).json({
          message: 'Bad Request',
        });

      const filePath = path.join(__dirname, `../db/${url}`);
      const aliasesPath = path.join(__dirname, `../db/aliases.json`);

      const isFileExist = await linkService.checkFileExists(filePath);

      if (!isFileExist)
        return res.status(404).json({
          message: 'File is not exist',
        });

      const fileNameWithoutExtension =
        linkService.getFileNameWithoutExtension(url);

      const aliases = Object.keys(aliasesData);
      const aliasForUrl = aliases.find((key) => aliasesData[key] === url);

      if (aliasForUrl)
        return res.status(409).json({
          message: 'This file already has alias',
          file: url,
          alias: aliasForUrl,
        });

      const newAlias = linkService.generateRandomAlias(
        fileNameWithoutExtension,
        aliases,
      );

      aliasesData[newAlias] = url;

      await fs.writeFile(aliasesPath, JSON.stringify(aliasesData));

      return res.status(201).json({
        url,
        alias: newAlias,
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getDataByLink(req: Request, res: Response) {
    try {
      const { url } = req.params;

      if (!url)
        return res.status(400).json({
          message: 'Bad Request',
        });

      const isUrlAlias = Boolean(aliasesData[url]);

      if (isUrlAlias) {
        const currentFile = path.join(__dirname, `../db/${aliasesData[url]}`);
        return res.sendFile(currentFile);
      }

      const currentFile = path.join(__dirname, `../db/${url}`);
      const isFileExist = await linkService.checkFileExists(currentFile);

      if (!isFileExist)
        return res.status(404).json({
          message: 'File is not exist',
        });

      return res.sendFile(currentFile);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new LinkController();
