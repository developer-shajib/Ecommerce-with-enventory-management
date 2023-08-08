import asyncHandler from 'express-async-handler';
import Role from '../models/Role.js';
import bcrypt from 'bcrypt';
import createSlug from '../helpers/slug.js';

/**
 * @DESC Get all roles data
 * @ROUTE /api/v1/role
 * @method GET
 * @access public
 */
export const getAllRole = asyncHandler(async (req, res) => {
  const roles = await Role.find().populate('permissions');

  res.status(200).json({ roles, message: 'Fetch all role data success' });
});

/**
 * @DESC Get Single roles data
 * @ROUTE /api/v1/role/:id
 * @method GET
 * @access public
 */
export const getSingleRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findById(id).populate('permissions');

  if (!role) {
    return res.status(404).json({ message: 'Role data not found' });
  }

  res.status(200).json({ role, message: 'Fetch role data success' });
});

/**
 * @DESC Create new Role
 * @ROUTE /api/v1/role
 * @method POST
 * @access public
 */
export const createRole = asyncHandler(async (req, res) => {
  // get values
  const { name } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // role check
  const checkRole = await Role.findOne({ name });

  if (checkRole) return res.status(400).json({ message: 'Role already exist!' });

  // create new role
  const role = await Role.create({
    name,
    slug: createSlug(name),
    permissions: req.body.permissions
  });

  const createdRole = await Role.findById(role._id).populate('permissions');

  res.status(200).json({ role: createdRole, message: 'Role create success' });
});

/**
 * @DESC Delete Role
 * @ROUTE /api/v1/role/:id
 * @method DELETE
 * @access public
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findByIdAndDelete(id);

  res.status(200).json({ data: role, message: 'Role delete successfully' });
});

/**
 * @DESC Update Role
 * @ROUTE /api/v1/role/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Role.findById(id);

  if (!data) {
    return res.status(404).json({ message: 'Role data not found!' });
  }

  let status = data.status;
  if (req.body.status === true) {
    status = true;
  } else if (req.body.status === false) {
    status = false;
  }

  const role = await Role.findByIdAndUpdate(
    data._id,
    {
      name: req.body.name ? req.body.name : data.name,
      slug: req.body.name ? createSlug(req.body.name) : data.slug,
      status,
      permissions: req.body.permissions ? req.body.permissions : data.permissions
    },
    { new: true }
  );

  const updateData = await Role.findById(role._id).populate('permissions');

  res.status(200).json({ data: updateData, message: `Role update success.` });
});
