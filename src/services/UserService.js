'use strict';

import { User } from '../models';

const getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    console.log('Error getting all users: ', err);
  }
};

const getUserById = async userId => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.log(`Error getting user: ${userId}: `, err);
  }
};

const createUser = async payload => {
  try {
    const user = new User(payload);
    const createdUser = await user.save();
    return createdUser;
  } catch (err) {
    console.log(`Error creating user: `, err);
  }
};

const updateUser = async (userId, payload) => {
  try {
    const user = await User.findByIdAndUpdate(userId, payload, {
      new: true
    });
    return user;
  } catch (err) {
    console.log(`Error updating user: ${userId}: `, err);
  }
};

const deleteUser = async userId => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return !!user;
  } catch (err) {
    console.log(`Error deleting  user: ${userId}: `, err);
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
