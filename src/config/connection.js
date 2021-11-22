// Conexão multipla (Pode ser integrada com vários BD)

const mongoose = require("mongoose");

// Aqui poderá incluir outros BD (startar a conexão)
class Connection {
  constructor() {
    this.dataBaseConnectionMongoDB();
  }

  dataBaseConnectionMongoDB() {
    this.mongoDBConnection = mongoose
      .connect("mongodb://localhost/nodejs",)
      .then(() => {
        console.log("Conexão estabelicida com o MongoDB");
      })
      .catch((error) => {
        console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`);
      });
  }
}

module.exports = new Connection();