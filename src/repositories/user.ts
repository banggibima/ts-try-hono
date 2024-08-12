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
  let { id, username, password } = payload;

  id = uuid();

  const user = await sql`
    INSERT INTO users (id, username, password, created_at, updated_at)
    VALUES (${id}, ${username}, ${password}, NOW(), NOW())
    RETURNING id, username, password, created_at, updated_at
  `;

  if (user.length === 0) {
    return null;
  }

  return user[0];
};

export const updateUserDB = async (id: string, payload: User) => {
  let { username, password } = payload;

  const user = await sql`
    UPDATE users 
    SET username = ${username}, password = ${password}, updated_at = NOW()
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
