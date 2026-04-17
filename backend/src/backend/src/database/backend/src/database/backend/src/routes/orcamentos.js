const express = require("express");
const router = express.Router();

// rota para criar orçamento
router.post("/", (req, res) => {
  const { cliente, obra, valor } = req.body;

  res.json({
    mensagem: "Orçamento criado com sucesso",
    dados: { cliente, obra, valor }
  });
});

// rota para listar (teste)
router.get("/", (req, res) => {
  res.json([
    { cliente: "João", obra: "Casa", valor: 10000 }
  ]);
});

module.exports = router;
