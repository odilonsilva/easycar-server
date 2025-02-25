import { execute } from "../database/sqlite.js";

async function CreateUser(user) {
  return await execute(
    "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?) returning *",
    [user.name, user.email, user.password, user.phone]
  );
}

async function GetUserByEmail(email) {
  return await execute("SELECT * FROM users WHERE email = ?", [email], "get");
}

async function GetUserByEmailAndPassword(email, password) {
  return await execute(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    "get"
  );
}

export default { CreateUser, GetUserByEmail, GetUserByEmailAndPassword };
