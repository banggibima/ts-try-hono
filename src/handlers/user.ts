import { Context } from "hono";
import {
  deleteUserService,
  getUserByIdService,
  getUsersService,
  insertUserService,
  updateUserService,
} from "../services/user";

export const getUsers = async (c: Context) => {
  const users = await getUsersService();

  return c.json(users);
};

export const getUserById = async (c: Context) => {
  const id = c.req.param("id");

  const user = await getUserByIdService(id);

  return c.json(user);
};

export const insertUser = async (c: Context) => {
  const payload = await c.req.json();

  const user = await insertUserService(payload);

  return c.json(user);
};

export const updateUser = async (c: Context) => {
  const id = c.req.param("id");
  const payload = await c.req.json();

  const user = await updateUserService(id, payload);

  return c.json(user);
};

export const deleteUser = async (c: Context) => {
  const id = c.req.param("id");

  const user = await deleteUserService(id);

  return c.json({ id });
};
