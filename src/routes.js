// Estrutura da API

const { Router } = require("express");

// AuthMidleware intercepta a requisição 
const AuthMidleware = require("./app/Midlewares/AuthMidleware");
const LoginController = require("./app/Controllers/LoginController");

// UserController será a requisição para o routes (rota index)
const UserController = require("./app/Controllers/UserController");

const routes = new Router();

routes.post("/user", UserController.store);
routes.get("/user", AuthMidleware, UserController.show);

routes.post("/login", LoginController.index);

module.exports = routes;
