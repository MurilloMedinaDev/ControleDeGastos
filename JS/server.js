import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Cria o aplicativo Express
const servidor = express();
servidor.use(cors());
servidor.use(express.json());

// Função para conectar ao banco
async function conectarBanco() {
  const conexaoBanco = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  // TABELA USUÁRIO 
  await conexaoBanco.exec(`
    CREATE TABLE IF NOT EXISTS usuario (
      ID_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      senha TEXT,
      saldo REAL DEFAULT 0.00,
      totalEntrada REAL DEFAULT 0.00,
      totalSaida REAL DEFAULT 0.00
    )
  `);

  // TABELA CATEGORIA 
  await conexaoBanco.exec(`
    CREATE TABLE IF NOT EXISTS categoria (
      ID_Categoria INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT
    )
  `);

  //  TABELA MOVIMENTAÇÃO 
  await conexaoBanco.exec(`
    CREATE TABLE IF NOT EXISTS movimentacao (
      ID_Movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      valor REAL NOT NULL,
      data DATE NOT NULL,
      qntParcela INTEGER,
      unParcela INTEGER,
      ID_usuario INTEGER,
      ID_Categoria INTEGER,
      ID_tipoMovi INTEGER NOT NULL, -- 1 = entrada / 2 = saída
      FOREIGN KEY (ID_usuario) REFERENCES usuario (ID_usuario),
      FOREIGN KEY (ID_Categoria) REFERENCES categoria (ID_Categoria)
    )
  `);

  return conexaoBanco;
}


// ROTAS DE USUÁRIO


// Cadastrar usuário
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

// Login
servidor.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: 'Preencha todos os campos.' });
  }

  const db = await conectarBanco();
  const usuario = await db.get('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);

  if (usuario) {
    res.json({
      sucesso: true,
      mensagem: 'Login bem-sucedido!',
      nome: usuario.nome,
      email: usuario.email,
      ID_usuario: usuario.ID_usuario
    });
  } else {
    res.status(401).json({ sucesso: false, mensagem: 'E-mail ou senha incorretos.' });
  }
});

// Buscar dados do usuário
servidor.get('/usuario/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const db = await conectarBanco();
    const usuario = await db.get(
      'SELECT nome, ID_usuario, saldo, email, totalEntrada, totalSaida FROM usuario WHERE email = ?',
      [email]
    );

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


// ROTAS DE MOVIMENTAÇÕES


// Buscar todas as movimentações do usuário
servidor.get('/movimentacoes/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const db = await conectarBanco();
    const movs = await db.all(
      `SELECT 
        ID_Movimentacao,
        nome,
        valor,
        data,
        ID_Categoria,
        ID_tipoMovi,
        qntParcela,
        unParcela
      FROM movimentacao
      WHERE ID_usuario = ?
      ORDER BY data DESC`,
      [id_usuario]
    );

    res.json(movs);
  } catch (erro) {
    console.error('Erro ao buscar movimentações:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

// Cadastrar entrada
servidor.post('/entrada', async (req, res) => {
  const { nome, valor, data, ID_Categoria, ID_usuario } = req.body;
  const db = await conectarBanco();

  try {
    await db.run(
      `INSERT INTO movimentacao 
        (nome, valor, data, ID_Categoria, ID_usuario, ID_tipoMovi) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, valor, data, ID_Categoria, ID_usuario, 1]
    );

    res.json({ mensagem: 'Entrada cadastrada com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao cadastrar entrada.' });
  } finally {
    await db.close();
  }
});

// Cadastrar saída
servidor.post('/saida', async (req, res) => {
  const { nome, valor, data, qntParcela, unParcela, ID_Categoria, ID_usuario } = req.body;
  const db = await conectarBanco();

  try {
    await db.run(
      `INSERT INTO movimentacao 
        (nome, valor, data, qntParcela, unParcela, ID_Categoria, ID_usuario, ID_tipoMovi)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, valor, data, qntParcela, unParcela, ID_Categoria, ID_usuario, 2]
    );

    res.json({ mensagem: 'Saída cadastrada com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ mensagem: 'Erro ao cadastrar saída.' });
  } finally {
    await db.close();
  }
});


servidor.delete('/movimentacao/:id', async (req, res) => {
  try {
    const db = await conectarBanco();
    const { id } = req.params;

    const result = await db.run(
      'DELETE FROM movimentacao WHERE ID_Movimentacao = ?',
      [id]
    );

    await db.close(); // fechar conexão

    if (result.changes === 0) {
      return res.status(404).json({ mensagem: "Movimentação não encontrada." });
    }

    res.json({ mensagem: "Movimentação excluída com sucesso." });

  } catch (erro) {
    console.error("Erro ao excluir:", erro);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});


// iniciar SERVIDOR


servidor.listen(3000, async () => {
  const db = await conectarBanco();
  console.log('Servidor rodando em http://localhost:3000');
});
