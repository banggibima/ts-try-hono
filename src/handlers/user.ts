import { Context } from "hono";
import {
  deleteUserService,
  getUserByIdService,
  getUsersService,
  insertUserService,
  updateUserService,
} from "../services/user";
import { create, update } from "../validators/user";
import { User } from "../models/user";

export const getUsers = async (c: Context) => {
  try {
    const users = await getUsersService();

    return c.json(users, 200);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

export const getUserById = async (c: Context) => {
  const id = c.req.param("id");

  const user = await getUserByIdService(id);

  if (user === null) {
    return c.json(user, 404);
  }

  return c.json(user, 200);
};

export const insertUser = async (c: Context) => {
  const payload = await c.req.json();

  const validation = create.safeParse(payload);

  if (validation.success === false) {
    return c.json({ error: validation.error.issues }, 400);
  }

  try {
    const user = await insertUserService(validation.data as User);

    return c.json(user, 201);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

export const updateUser = async (c: Context) => {
  const id = c.req.param("id");
  const payload = await c.req.json();

  const validation = update.safeParse(payload);

  if (validation.success === false) {
    return c.json({ error: validation.error.issues }, 400);
  }

  try {
    const user = await updateUserService(id, validation.data as User);

    if (user === null) {
      return c.json(user, 404);
    }

    return c.json(user, 200);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};

export const deleteUser = async (c: Context) => {
  const id = c.req.param("id");

  try {
    const user = await deleteUserService(id);

    if (user === null) {
      return c.json(user, 404);
    }

    return c.json(user, 204);
  } catch (error) {
    return c.json({ error: error }, 500);
  }
};
