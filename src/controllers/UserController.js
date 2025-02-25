import UserService from "../services/UserService.js";

async function CreateUser(req, res) {
  try {
    const data = await UserService.CreateUser(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function Login(req, res) {
  try {
    console.log(req.body);
    //implemtar JWT e criptografia
    const data = await UserService.Login(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default { CreateUser, Login };
