import { Hono } from "hono";
import { deleteUser, getUserById, getUsers, insertUser, updateUser } from "../handlers/user";

const user = new Hono();

user.get("/", getUsers);
user.get("/:id", getUserById);
user.post("/", insertUser);
user.put("/:id", updateUser);
user.delete("/:id", deleteUser);

export default user;
