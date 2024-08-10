import { User } from "../models/user";
import { deleteUserDB, getUserByIdDB, getUsersDB, insertUserDB, updateUserDB } from "../repositories/user";

export const getUsersService = async () => {
  const users = await getUsersDB();

  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await getUserByIdDB(id);

  if (user === null) {
    return null;
  }

  return user;
};

export const insertUserService = async (payload: User) => {
  const user = await insertUserDB(payload);

  return user;
};

export const updateUserService = async (id: string, payload: User) => {
  const exist = await getUserByIdDB(id);

  if (exist === null) {
    return null;
  }

  const user = Object.assign(exist, payload);

  console.log(user);

  return await updateUserDB(id, user);
};

export const deleteUserService = async (id: string) => {
  const exist = await getUserByIdDB(id);

  if (exist === null) {
    return null;
  }

  const user = await deleteUserDB(id);

  return user;
};
