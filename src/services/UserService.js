import UserRepository from "../repositories/UserRepository.js";

async function CreateUser(user) {
  try {
    const userExists = await GetUserByEmail(user.email);
    if (userExists) {
      throw new Error("User already exists");
    }

    return await UserRepository.CreateUser(user);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function Login(user) {
  try {
    const userExists = await UserRepository.GetUserByEmailAndPassword(
      user.email.toLowerCase(),
      user.password.toLowerCase()
    );
    if (!userExists) {
      throw new Error("Invalid email or password");
    }

    return {
      user_id: userExists.user_id,
      name: userExists.name,
      email: userExists.email,
      phone: userExists.phone,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function GetUserByEmail(email) {
  return await UserRepository.GetUserByEmail(email);
}

export default { CreateUser, GetUserByEmail, Login };
