import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { userMailSendByAdmin } from '../utils/sendMail.js';

/**
 * @DESC Get all users data
 * @ROUTE /api/v1/user
 * @method GET
 * @access public
 */
export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find()
    .populate({
      path: 'role',
      populate: {
        path: 'permissions',
        model: 'Permission'
      }
    })
    .exec();

  res.status(200).json({ data: users, message: 'Fetch all user success.' });
});

/**
 * @DESC Get Single users data
 * @ROUTE /api/v1/user/:id
 * @method GET
 * @access public
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User data not found' });
  }

  res.status(200).json(user);
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const createUser = asyncHandler(async (req, res) => {
  // get values
  const { name, email, mobile, password, gender, role } = req.body;

  // validations
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // email check
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);
  // create new user
  const user = await User.create({
    name,
    email,
    role,
    mobile,
    password: hashPass,
    gender
  });

  // <!-- send user access to email -->
  userMailSendByAdmin({ to: email, sub: 'Account access verify info for access Woolmart e-commerce  Dashboard panel', msg: `Your account login access is email : ${email} & password : ${password}` });

  res.status(200).json({ data: user, message: `${user.name} user create success` });
});

/**
 * @DESC Delete User
 * @ROUTE /api/v1/user/:id
 * @method DELETE
 * @access public
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  res.status(200).json({ data: user, message: `${user.name} user delete successfully` });
});

/**
 * @DESC Update User
 * @ROUTE /api/v1/user/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await User.findById(id);

  if (!data) {
    return res.status(404).json({ message: 'User not found' });
  }

  let status = data.status;
  if (req.body.status === true) {
    status = true;
  } else if (req.body.status === false) {
    status = false;
  }

  // hash password
  let hashPassword = data.password;
  if (req.body?.password) {
    hashPassword = await bcrypt.hash(req.body.password, 10);
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      name: req?.body?.name ? req.body.name : data.name,
      email: req?.body?.email ? req.body.email : data.email,
      mobile: req?.body?.mobile ? req.body.mobile : data.mobile,
      password: hashPassword,
      gender: req?.body?.gender ? req.body.gender : data.gender,
      role: req?.body?.role ? req.body.role : data.role,
      status
    },
    { new: true }
  );

  res.status(200).json({ data: user, message: `User update success` });
});

/**
 * @DESC Change password
 * @ROUTE /api/v1/password/:id
 * @method POST
 * @access public
 */
export const changePass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPass, newPass } = req.body;

  if (!oldPass || !newPass) return res.status(400).json({ message: `All fields are required!` });

  const getUser = await User.findById(id);

  if (!getUser) return res.status(404).json({ message: `Use not found!` });

  const passCheck = await bcrypt.compare(oldPass, getUser.password);

  if (!passCheck) return res.status(400).json({ message: `Password not match!` });

  const hashPass = await bcrypt.hash(newPass, 10);
  const changeData = await User.findByIdAndUpdate(id, { password: hashPass }, { new: true });

  res.status(200).json({ data: changeData, message: 'Password change successful.' });
});
