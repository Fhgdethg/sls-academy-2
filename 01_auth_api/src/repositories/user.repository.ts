import db from '../db.js';

// table users with columns email: string, id: string, password: string;

class UserRepository {
  async findUserByEmail(email: string) {
    return await db.query(
      `SELECT * FROM users WHERE email = '${email}' LIMIT 1;`,
    );
  }

  async findUserById(id: string) {
    return await db.query(`SELECT * FROM users WHERE id = '${id}' LIMIT 1;`);
  }

  async addUser(email: string, hashPassword: string, id: string) {
    return await db.query(
      `INSERT INTO users (email, password, id) VALUES ('${email}', '${hashPassword}', '${id}');`,
    );
  }
}

export default new UserRepository();
