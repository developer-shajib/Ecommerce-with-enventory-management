import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailSend } from '../utils/sendMail.js';

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
  const loginUser = await User.findOne({ email })
    .populate({
      path: 'role',
      populate: {
        path: 'permissions',
        model: 'Permission'
      }
    })
    .exec();

  if (!loginUser) return res.status(404).json({ message: 'User not found' });

  // check password
  const passCheck = await bcrypt.compare(password, loginUser.password);

  if (!passCheck) {
    return res.status(404).json({ message: 'Wrong password' });
  }

  // create access token
  const token = jwt.sign({ email: loginUser.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN
  });

  // create refresh token
  const refreshToken = jwt.sign({ email: loginUser.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
  });

  // response login user token
  res
    .status(200)
    .cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.APP_ENV === 'Development' ? false : true,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json({ token, user: loginUser, message: 'Login Successful' });
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
    password: hashPass
  });

  res.status(200).json({ user, message: 'Register Successful' });
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

/**
 * @DESC Logged In user
 * @ROUTE /api/v1/auth/me
 * @method get
 * @access public
 */
export const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.me, message: 'Logged In User' });
});

/**
 * @DESC Forget Password
 * @ROUTE /api/v1/auth/forget
 * @method post
 * @access public
 */
export const forget = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const checkEmail = await User.findOne({ email });
  if (!checkEmail) return res.status(404).json({ message: 'Email not exist!' });

  // create token
  const token = jwt.sign({ id: checkEmail._id }, process.env.EMAIL_VERIFY_TOKEN_SECRET, {
    expiresIn: process.env.VERIFY_TOKEN_EXPIRE_IN
  });

  const link = `${process.env.CLIENT_URI}/forget/${token}/${checkEmail._id}`;

  await mailSend(email, 'Email verification for ecommerce dashboard forget password', { name: checkEmail.name, token, link });

  await User.findByIdAndUpdate(checkEmail._id, { token });

  res.status(200).json({ message: 'Email sent successful. Check your email.' });
});

/**
 * @DESC Forget Password
 * @ROUTE /api/v1/auth/forget/:token/:id
 * @method GET
 * @access public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, id } = req.params;

  if (!token) return res.status(404).json({ message: 'Token not found' });

  // jwt.verify(
  //   token,
  //   process.env.EMAIL_VERIFY_TOKEN_SECRET,
  //   asyncHandler(async (error, decode) => {
  //     if (error) return res.status(400).json({ message: 'Token has been expire!. Try Again!' });

  //     // await User.findByIdAndUpdate(decode.id, { password });

  //     res.status(200).json({ message: 'Verify Successful. Now set password.' });
  //   })
  // );
});
