const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/constants');
const User = require('../db/models/User');
const ServiceError = require('../util/serviceError');

let refreshTokens = [];

exports.createUser = async ({ email, password }) => {
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser != null) {
      throw new ServiceError({
        message: 'email already exited',
        status: false,
        statusCode: 422,
      });
    }
    //* no need to store salt, hash password have hash in beginning of hashedPassword
    // const salt = await bcrypt.genSalt(); //default 10
    const hashedPassword = await bcrypt.hash(password, 10); // salt
    // console.log(hashedPassword);

    const user = new User({
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteUser = async ({ userId }) => {
  try {
    const deletedUser = await User.deleteOne({ _id: userId });
    // console.log(deletedUser);
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.listUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUser = async ({ userId }) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user == null) {
      throw new ServiceError({
        message: 'cannot find the user',
        status: false,
        statusCode: 404,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new ServiceError({
        message: 'wrong password',
        status: false,
        statusCode: 404,
      });
    }
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ email: user.email, userId: user._id }, ACCESS_TOKEN_SECRET(), {
      expiresIn: '15min',
    });

    // eslint-disable-next-line no-underscore-dangle
    const refreshToken = jwt.sign({ email: user.email, userId: user._id }, REFRESH_TOKEN_SECRET());
    refreshTokens.push(refreshToken);
    return { message: 'auth success', token, refreshToken };
  } catch (error) {
    throw new Error(error);
  }
};

exports.getToken = async ({ refreshToken }) => {
  try {
    if (refreshToken == null) {
      throw new ServiceError({
        message: 'refresh token not found',
        status: false,
        statusCode: 401,
      });
    }
    if (!refreshTokens.includes(refreshToken)) {
      throw new ServiceError({
        message: 'refresh token wrong',
        status: false,
        statusCode: 403,
      });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET(), (err, user) => {
      if (err) {
        throw new ServiceError({
          message: 'refresh token wrong',
          status: false,
          statusCode: 403,
        });
      }
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ email: user.email, userId: user._id }, ACCESS_TOKEN_SECRET(), {
        expiresIn: '15min',
      });
      return { message: 'access token', token };
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.logout = async ({ refreshToken }) => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    return { message: 'successfully logged out' };
  } catch (error) {
    throw new Error(error);
  }
};
