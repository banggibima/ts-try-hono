import sql from "../database/postgres";
import { v4 as uuid } from "uuid";
import { User } from "../models/user";

export const getUsersDB = async () => {
  const users = await sql`
    SELECT id, username, password, created_at, updated_at FROM users
  `;

  return users;
};

export const getUserByIdDB = async (id: string) => {
  const user = await sql`
    SELECT id, username, password, created_at, updated_at FROM users WHERE id = ${id}
  `;

  if (user.length === 0) {
    return null;
  }

  return user[0];
};

export const insertUserDB = async (payload: User) => {
  payload.id = uuid();

  const user = await sql`
    INSERT INTO users (id, username, password, created_at, updated_at)
    VALUES (${payload.id}, ${payload.username}, ${payload.password}, NOW(), NOW())
    RETURNING id, username, password, created_at, updated_at
  `;

  if (user.length === 0) {
    return null;
  }

  return user[0];
};

export const updateUserDB = async (id: string, payload: User) => {
  const user = await sql`
    UPDATE users 
    SET username = ${payload.username}, password = ${payload.password}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, username, password, created_at, updated_at
  `;

  if (user.length === 0) {
    return null;
  }

  return user[0];
};

export const deleteUserDB = async (id: string) => {
  const user = await sql`
    DELETE FROM users WHERE id = ${id} RETURNING id, username, password, created_at, updated_at
  `;

  if (user.length === 0) {
    return null;
  }

  return user[0];
};
