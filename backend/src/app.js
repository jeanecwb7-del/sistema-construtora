const express = require('express');
const cors = require('cors');
const db = require('./database/db');

const app = express();

app.use(cors());
app.use(express.json());

// criar tabela clientes
db.run(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    telefone TEXT
  )
`);

// rota teste
app.get('/', (req, res) => {
  res.send('Sistema da construtora rodando 🚀');
});

// cadastrar cliente
app.post('/clientes', (req, res) => {
  const { nome, telefone } = req.body;

  db.run(
    `INSERT INTO clientes (nome, telefone) VALUES (?, ?)`,
    [nome, telefone],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

// listar clientes
app.get('/clientes', (req, res) => {
  db.all(`SELECT * FROM clientes`, [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
