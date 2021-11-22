const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

class UserController {
  
  show(req, res) {
    let users = [
      "Fernando",
      "Patrick",
      "Carlos",
      "Rafa",
      "Yuri",
      "Gui",
      "Livinho",
    ];
    return res.status(200).json({
      error: false,
      users,
    });
  }
  // Serve para inserir mais dados no BD
  async store(req, res) {
    // Cria uma validação dos dados através do Yup schema

    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }
    // Fim da avaliação

    // Verifica se o e-mail já existe ou não no MongoBD
    let userExit = await User.findOne({ email: req.body.email });
    if (userExit) {
      return res.status(400).json({
        error: true,
        message: "Usuário já existente",
      });
    }

    // Variáves criada automaticamente (Desestrutuação dos dados da requisição)
    const { name, email, password } = req.body;


    const data = {
      name,
      email,
      password,
    };

    // Gerar criptografia da senha e quantos caracteres precisam para senha
    data.password = await bcrypt.hash(data.password, 8);

    // Inserção no BD

    await User.create(data, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro ao inserir usuário no MongoBD",
        });
      return res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso",
      });
    });
  }
}

module.exports = new UserController();
