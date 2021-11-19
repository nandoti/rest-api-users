// Todas as config. que estartam a aplicação

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

class App {
  // Estarta
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    // Simplifica a aplicação
    this.app.use(express.json());

    // Next intercepta a requisição ou validar um dado e prossegue para rota desejada atuar
    this.app.use((req, res, next) => {
      // Aceita qualquer origem na requisição
      res.header("Access-Controll-Allow-Origin", "*");
      //Métodos a serem aceitos na requisição
      res.header("Access-Controll-Allow-Methods", "Get, POST, PUT, DELETE");
      // Cabeçalhos
      res.header(
        "Access-Controll-Allow-Headers",
        "Access, Content-type, Authorization, Acept, Origin, X-Requested-With"
      );

      this.app.use(cors());
      next();
    });
  }
  routes() {
    // Rotas da aplicação
    this.app.use(routes);
  }
}
// Exportado App (classe) e atributo (App) para ter acesso ao app.js
module.exports = new App().app;
