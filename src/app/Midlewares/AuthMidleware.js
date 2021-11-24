const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Token de autenticação não existe!",
    });
  }
  const [, token] = auth.split(" ");

  //Verifica se o token existe

  try {
    // Serve para o token está decodificado ou não
      const decoded = await promisify(jwt.verify)(token, config.secret);
      
      if (!decoded) {
        return res.status(401).json({
          error: true,
          code: 130,
          message: "Token expirado!",
        });  
      } else {
          req.user_id = decoded.id;
          next();
      }
  } catch {
     return res.status(401).json({
       error: true,
       code: 130,
       message: "Token inválido!",
     });   
  }
};
