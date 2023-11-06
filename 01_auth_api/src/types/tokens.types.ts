export interface IDecodedAccessToken {
  userId: string;
  type: 'access';
}

export interface IDecodedRefreshToken {
  id: string;
  type: 'refresh';
}
