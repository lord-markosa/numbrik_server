import {
    _createUser,
    _getUserById,
    _getUserByUsername,
    _getUsers,
    _updateUser,
} from "./cosmosDb/_userDao.js";
import {
    __createUser,
    __getUserById,
    __getUserByUsername,
    __getUsers,
    __updateUser,
} from "./localDb/__userDao.js";

const isDevelopment = process.env.NODE_ENV === "development";

export const getUsers = isDevelopment ? __getUsers : _getUsers;

export const getUserByUsername = isDevelopment
    ? __getUserByUsername
    : _getUserByUsername;

export const getUserById = isDevelopment ? __getUserById : _getUserById;

export const createUser = isDevelopment ? __createUser : _createUser;

export const updateUser = isDevelopment ? __updateUser : _updateUser;
