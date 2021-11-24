const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");

class LoginController {
  async index(req, res) {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        error: true,
        message: "Usuário não existe!",
      });
    }
    // Verifica se as senhas são iguais (compara)

    if (!(await bcrypt.compare(password, userExist.password))) {
      return res.status(400).json({
        error: true,
        message: "Senha inválida.",
      });
    }

    // retornar Token do usuário
    return res.status(200).json({
      user: {
        name: userExist.name,
        email: userExist.email,
      },
      // Gera Token do usuário usando o id,chave secreta e quantidade de tempo
      token: jwt.sign({ id: userExist._id }, config.secret, {
        expiresIn: config.expireIn,
      }),
    });
  }
}

module.exports = new LoginController();
