import { User } from "../models/user";
import { deleteUserDB, getUserByIdDB, getUsersDB, insertUserDB, updateUserDB } from "../repositories/user";

export const getUsersService = async () => {
  return await getUsersDB();
};

export const getUserByIdService = async (id: string) => {
  return await getUserByIdDB(id);
};

export const insertUserService = async (payload: User) => {
  return await insertUserDB(payload);
};

export const updateUserService = async (id: string, payload: User) => {
  return await updateUserDB(id, payload);
};

export const deleteUserService = async (id: string) => {
  return await deleteUserDB(id);
};
