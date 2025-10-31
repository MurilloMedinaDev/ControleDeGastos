import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Cria o aplicativo Express
const servidor = express();
servidor.use(cors());
servidor.use(express.json());

// Função para conectar ao banco e criar tabela se não existir
async function conectarBanco() {
  const conexaoBanco = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  // Cria a tabela "usuario" se não existir
  await conexaoBanco.exec(`
    CREATE TABLE IF NOT EXISTS usuario (
      ID_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      senha TEXT
    )
  `);

  return conexaoBanco;
}

//  Rota para cadastrar usuário
servidor.post('/cadastrar', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
  }

  const db = await conectarBanco();

  try {
    await db.run('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', [
      nome,
      email,
      senha
    ]);
    res.json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
    if (erro.message.includes('UNIQUE')) {
      res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
    } else {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' });
    }
  }
});

//  Rota para login
servidor.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: 'Preencha todos os campos.' });
  }

  const db = await conectarBanco();
  const usuario = await db.get('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);

  if (usuario) {
    // Retorna também o nome e o e-mail do usuário
    res.json({
      sucesso: true,
      mensagem: 'Login bem-sucedido!',
      nome: usuario.nome,
      email: usuario.email
    });
  } else {
    res.status(401).json({ sucesso: false, mensagem: 'E-mail ou senha incorretos.' });
  }
});

// Rota para buscar dados do usuário pelo e-mail
servidor.get('/usuario/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const db = await conectarBanco();
    const usuario = await db.get('SELECT nome, email FROM usuario WHERE email = ?', [email]);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
  } catch (erro) {
    console.error('Erro ao buscar usuário:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});







// Inicia o servidor
servidor.listen(3000, () => {
  console.log(' Servidor rodando em http://localhost:3000');
});
