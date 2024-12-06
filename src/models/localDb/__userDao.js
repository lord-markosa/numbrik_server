import generateUniqueId from "../../utils/generateUniqueId.js";
import { readData, writeData } from "./localDataHandler.js";

export const __getUsers = async () => (await readData()).users;

export const __getUserByUsername = async (username) =>
    (await __getUsers()).find((user) => user.username === username);

export const __getUserById = async (id) =>
    (await __getUsers()).find((user) => user.id === id);

export const __createUser = async (user) => {
    const data = await readData();
    data.users.push({ id: generateUniqueId(), ...user });
    await writeData(data);
    return data.users[data.users.length - 1];
};

export const __updateUser = async (updatedUser) => {
    const data = await readData();
    data.users = data.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
    );
    await writeData(data);
    return updatedUser;
};
