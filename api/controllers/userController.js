const userService = require('../services/userService');

exports.createUser = async ({ email, password }) => {
  try {
    const newUser = await userService.createUser({
      email,
      password,
    });
    return newUser;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

exports.deleteUser = async ({ userId }) => {
  try {
    const deletedUser = await userService.deleteUser({ userId });
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.listUsers = async () => {
  try {
    const users = await userService.listUsers();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUser = async ({ userId }) => {
  try {
    const users = await userService.getUser({ userId });
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await userService.loginUser({
      email,
      password,
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
