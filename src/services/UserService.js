import UserRepository from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function CreateUser(user) {
  try {
    const userExists = await GetUserByEmail(user.email);
    if (userExists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await UserRepository.CreateUser({
      ...user,
      password: hashedPassword,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function Login(data) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    const user = await UserRepository.GetUserByEmail(data.email);
    if (!user) throw new Error("Invalid email");

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: "3h" }
      ),
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function GetUserByEmail(email) {
  return await UserRepository.GetUserByEmail(email);
}

export default { CreateUser, GetUserByEmail, Login };
