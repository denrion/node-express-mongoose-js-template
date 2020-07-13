/* eslint-disable no-unused-vars */
const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} = require('./handlerFactory');
const User = require('../models/User/user.model');

/**
 * @desc      Get All Users
 * @route     GET /api/v1/users
 * @access    Private
 */
const getAllUsers = getAll(User);

/**
 * @desc      Get User By Id
 * @route     GET /api/v1/users/:userId
 * @access    Private
 */
const getUser = getOne(User);

/**
 * @desc      Create New User
 * @route     POST /api/v1/users
 * @access    Private
 */
const createUser = createOne(User);

/**
 * @desc      Update user
 * @route     PATHS /api/v1/users/:userId
 * @access    Private
 */
const updateUser = updateOne(User);

/**
 * @desc      Delete User
 * @route     DELETE /api/v1/users/:userId
 * @access    Private
 */
const deleteUser = deleteOne(User);

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
