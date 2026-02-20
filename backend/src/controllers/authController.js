import { loginUser, registerUser } from '../db/query.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (error) {
    next(error);
  }
};
