import { Request, Response } from 'express';

import placeService from '../serviсes/place.service.js';

import { connect } from '../db/db.js';

let dbData = [];

connect().then((data: string[][]) => {
  dbData = data;
});

export class PlaceController {
  async getCurrentPlace(req: Request, res: Response) {
    try {
      const ipData = req.headers['x-forwarded-for'];
      const userIP = Array.isArray(ipData) ? ipData[0].toString() : ipData;
      const ipNumber = placeService.getIpNumber(userIP);

      const currentPlace = placeService.binarySearchPlace(dbData, ipNumber);

      if (currentPlace?.length) {
        const ipNumberStart = Number(currentPlace[0]);

        const ipNumberEnd = Number(currentPlace[1]);
        const ipStart = placeService.convertNumberToIPv4(ipNumberStart);
        const ipEnd = placeService.convertNumberToIPv4(ipNumberEnd);

        return res.json({
          currentIP: userIP,
          country: currentPlace[3],
          countryAbbr: currentPlace[2],
          countryFromIP: ipStart,
          countryToIP: ipEnd,
        });
      }

      return res.status(404).json({ message: 'Not found' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new PlaceController();
