import jwt from 'jsonwebtoken';

import refreshTokenRepository from '../repositories/refreshToken.repository.js';

import mainHelpers from '../helpers/main.helpers.js';
import validationHelpers from '../helpers/validation.helpers.js';

const JWT_SECRET = `${process.env.JWT_SECRET}`;

export class AuthService {
  authValidation(email: string, password: string) {
    const errors = [];
    const emailError = validationHelpers.emailValidation(email);
    const passwordError = validationHelpers.passwordValidation(password);

    if (emailError)
      errors.push({
        field: 'email',
        msg: emailError,
      });
    if (passwordError)
      errors.push({
        field: 'password',
        msg: passwordError,
      });

    return errors;
  }

  generateAccessToken(userId: string) {
    const payload = {
      userId,
      type: 'access',
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '60m' });
  }

  generateRefreshToken() {
    const payload = {
      id: mainHelpers.generateUUID(),
      type: 'refresh',
    };

    return jwt.sign(payload, JWT_SECRET);
  }

  async signUpTokensHandler(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    console.log('work');
    const refreshToken = this.generateRefreshToken();
    const refreshTokenData = jwt.verify(refreshToken, JWT_SECRET);

    await refreshTokenRepository.addToken(refreshTokenData.id, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async replaceDbRefreshToken(tokenId: string, userId: string) {
    await refreshTokenRepository.removeTokenByUserId(userId);
    await refreshTokenRepository.addToken(tokenId, userId);
  }

  async updateTokens(userId: string) {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken();
    const refreshTokenData = jwt.verify(refreshToken, JWT_SECRET);

    await this.replaceDbRefreshToken(refreshTokenData.id, userId);

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default new AuthService();
