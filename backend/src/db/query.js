import * as db from './pool.js';
import bycrpt from 'bcrypt';

const loginUser = async (email, password) => {
  const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const isPasswordValid = bycrpt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return user;
};

const registerUser = async (email, password, role = 'user') => {
  const hashedPassword = await bycrpt.hash(password, 10);
  const result = db.query(
    'INSERT INTO users (email,password,role) VALUES ($1,$2,$3) returning id,email,role',
    [email, password, role]
  );

  return result.rows[0];
};
