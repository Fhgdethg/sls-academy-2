import db from '../db.js';

// table refresh_token with columns token_id: string, user_id: string;

class RefreshTokenRepository {
  async removeTokenByUserId(userId: string) {
    return await db.query(
      `DELETE FROM refresh_token WHERE user_id = '${userId}';`,
    );
  }

  async addToken(tokenId: string, userId: string) {
    return await db.query(
      `INSERT INTO refresh_token (token_id, user_id) VALUES ('${tokenId}', '${userId}');`,
    );
  }
}

export default new RefreshTokenRepository();
