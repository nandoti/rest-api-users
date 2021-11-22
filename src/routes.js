// Estrutura da API

const { Router } = require('express');

// UserController será a requisição para o routes (rota index)
const UserController = require("./app/Controllers/UserController");

const routes = new Router();

routes.post("/user", UserController.store);
routes.get("/user", UserController.show);

module.exports = routes;