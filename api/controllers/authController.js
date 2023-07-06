import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @DESC Login User
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(async (req, res) => {
  // get values
  const { email, password } = req.body;

  // validation
  if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

  // find login user
  const loginUser = await User.findOne({ email });

  if (!loginUser) return res.status(404).json({ message: 'User not found' });

  // check password
  const passCheck = await bcrypt.compare(password, loginUser.password);

  if (!passCheck) {
    return res.status(404).json({ message: 'Wrong password' });
  }

  // create access token
  const token = jwt.sign({ email: loginUser.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
  });

  // create refresh token
  const refreshToken = jwt.sign({ email: loginUser.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
  });

  // response login user token
  res.status(200).cookie('accessToken', token).json({ token, user: loginUser });
});

/**
 * @DESC Register a User
 * @ROUTE /api/v1/auth/register
 * @method POST
 * @access public
 */
export const register = asyncHandler(async (req, res) => {
  // get values
  const { name, email, password } = req.body;

  // validations
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // email check
  const emailCheck = await User.findOne({ email });

  if (emailCheck) return res.status(400).json({ message: 'Email already exists' });

  // hash password
  const hashPass = await bcrypt.hash(password, 10);
  // create new user
  const user = await User.create({
    name,
    email,
    password: hashPass,
  });

  res.status(200).json(user);
});

/**
 * @DESC Logout User
 * @ROUTE /api/v1/auth/logout
 * @method POST
 * @access public
 */
export const logout = asyncHandler(async (req, res) => {
  res.status(200).clearCookie('accessToken').json({ message: 'Logout successful' });
});
