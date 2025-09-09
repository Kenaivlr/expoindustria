const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const FILE = "usuarios.json";

app.use(cors());
app.use(express.json());

// Rota para cadastrar usuário
app.post("/cadastrar", (req, res) => {
  const { usuario, senha } = req.body;

  // Lê arquivo existente ou cria um novo
  let usuarios = [];
  if (fs.existsSync(FILE)) {
    usuarios = JSON.parse(fs.readFileSync(FILE, "utf8"));
  }

  // Adiciona novo usuário
  usuarios.push({ usuario, senha });

  // Salva no arquivo
  fs.writeFileSync(FILE, JSON.stringify(usuarios, null, 2));

  // Retorna lista atualizada
  res.json(usuarios);
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
// Rota de login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  // Lê usuários do arquivo
  if (fs.existsSync(FILE)) {
    let usuarios = JSON.parse(fs.readFileSync(FILE, "utf8"));

    // Verifica se existe
    let encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (encontrado) {
      return res.json({ sucesso: true, mensagem: "Login realizado com sucesso!" });
    }
  }

  res.json({ sucesso: false, mensagem: "Usuário ou senha inválidos!" });
});
