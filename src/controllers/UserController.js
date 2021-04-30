import { UserService } from '../services';

const getUsers = async (_, res, next) => {
  try {
    const response = await UserService.getUsers();
    res.send(response);
  } catch (err) {
    console.log(`Error getting users: `, err);
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const response = await UserService.getUserById(userId);
    res.send(response);
  } catch (err) {
    console.log(`Error getting user by id: ${userId} `, err);
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const response = await UserService.createUser(body);
    res.send(response);
  } catch (err) {
    console.log(`Error creating user: `, err);
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { body } = req;
    const response = await UserService.updateUser(userId, body);
    res.send(response);
  } catch (err) {
    console.log(`Error updating user: ${userId}: `, err);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const response = await UserService.deleteUser(userId);
    res.send(response);
  } catch (err) {
    console.log(`Error deleting user: ${userId}: `, err);
    next(err);
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
