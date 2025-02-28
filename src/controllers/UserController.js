import UserService from "../services/UserService.js";
import validate from "../validators/BaseValidator.js";

async function CreateUser(req, res) {
  const errors = validate(req);
  if (errors) return res.status(400).json(errors);

  try {
    const data = await UserService.CreateUser(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function Login(req, res) {
  const errors = validate(req);
  if (errors) return res.status(400).json(errors);

  try {
    console.log(req.body);
    //implementar JWT e criptografia
    const data = await UserService.Login(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default { CreateUser, Login };
