export class PlaceService {
  shortenIPv4(ip: string) {
    const octets = ip.split('.').map((octet) => parseInt(octet, 10));

    return octets.map((octet) => octet.toString()).join('.');
  }

  getIpNumber(ip: string) {
    const shortIp = this.shortenIPv4(ip);
    const ipArr = shortIp.split('.').map((ip) => Number(ip));

    return (
      ipArr[0] * 256 ** 3 + ipArr[1] * 256 ** 2 + ipArr[2] * 256 + ipArr[3]
    );
  }

  convertNumberToIPv4(decimal: number) {
    const octet1 = Math.floor(decimal / 256 ** 3);
    const octet2 = Math.floor((decimal % 256 ** 3) / 256 ** 2);
    const octet3 = Math.floor((decimal % 256 ** 2) / 256);
    const octet4 = decimal % 256;

    return `${octet1}.${octet2}.${octet3}.${octet4}`;
  }

  binarySearchPlace(dbData: string[][], currentNumber: number) {
    let left = 0;
    let right = dbData.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midNum1 = parseInt(dbData[mid][0]);
      const midNum2 = parseInt(dbData[mid][1]);

      if (midNum1 <= currentNumber && midNum2 >= currentNumber) {
        return dbData[mid];
      } else if (midNum1 > currentNumber) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
}

export default new PlaceService();
