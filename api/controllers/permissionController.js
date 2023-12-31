import asyncHandler from 'express-async-handler';
import Permission from '../models/Permission.js';
import bcrypt from 'bcrypt';
import createSlug from '../helpers/slug.js';

/**
 * @DESC Get all permissions data
 * @ROUTE /api/v1/permission
 * @method GET
 * @access public
 */
export const getAllPermission = asyncHandler(async (req, res) => {
  const permissions = await Permission.find();

  res.status(200).json({ permissions, message: 'Fetch all permission data success' });
});

/**
 * @DESC Get Single permissions data
 * @ROUTE /api/v1/permission/:id
 * @method GET
 * @access public
 */
export const getSinglePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findById(id);

  if (!permission) {
    return res.status(404).json({ message: 'Permission data not found' });
  }

  res.status(200).json({ permission, message: 'Fetch all permission data success' });
});

/**
 * @DESC Create new Permission
 * @ROUTE /api/v1/permission
 * @method POST
 * @access public
 */
export const createPermission = asyncHandler(async (req, res) => {
  // get values
  const { name } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // permission check
  const checkPermission = await Permission.findOne({ name });

  if (checkPermission) return res.status(400).json({ message: 'This permission already exist!' });

  // create new permission
  const permission = await Permission.create({
    name,
    slug: createSlug(name)
  });

  res.status(200).json({ permission, message: 'New permission create success' });
});

/**
 * @DESC Delete Permission
 * @ROUTE /api/v1/permission/:id
 * @method DELETE
 * @access public
 */
export const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isUser = await Permission.findById(id);

  if (!isUser) return res.status(404).json({ message: 'This permission not found' });

  const permission = await Permission.findByIdAndDelete(id);

  res.status(200).json({ permission, message: 'Permission delete successful' });
});

/**
 * @DESC Update Permission
 * @ROUTE /api/v1/permission/:id
 * @method PUT/PATCH
 * @access public
 */
export const updatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Permission.findById(id);

  if (!data) {
    return res.status(404).json({ message: 'Permission not found!' });
  }

  let status = data.status;
  if (req.body.status === true) {
    status = true;
  } else if (req.body.status === false) {
    status = false;
  }

  const permission = await Permission.findByIdAndUpdate(
    data._id,
    {
      name: req.body.name ? req.body.name : data.name,
      slug: req.body.name ? createSlug(req.body.name) : data.slug,
      status
    },
    { new: true }
  );

  res.status(200).json({ permission, message: `Permission update success.` });
});
