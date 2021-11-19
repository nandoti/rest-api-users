const mongoose = require("mongoose");

// Defina as conf do Schema
const User = mongoose.Schema(
    {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
    },
    {
        timestamps: true, // Grava o tempo dos dados
    }
)

module.exports = mongoose.model("user", User);
