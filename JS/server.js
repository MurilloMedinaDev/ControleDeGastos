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
      email TEXT,
      senha TEXT
    )
  `);

  return conexaoBanco;
}

// Rota para cadastrar usuário
servidor.post('/cadastrar', async (dadosDoCliente, respostaDoServidor) => {
  // Pega os dados enviados pelo cliente
  const nomeUsuario = dadosDoCliente.body.nome;
  const emailUsuario = dadosDoCliente.body.email;
  const senhaUsuario = dadosDoCliente.body.senha;

  // Verifica se todos os campos foram preenchidos
  if (!nomeUsuario || !emailUsuario || !senhaUsuario) {
    return respostaDoServidor
      .status(400)
      .json({ mensagem: 'Preencha todos os campos.' });
  }

  // Conecta ao banco
  const conexaoBanco = await conectarBanco();

  // Insere os dados na tabela
  await conexaoBanco.run(
    'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
    [nomeUsuario, emailUsuario, senhaUsuario]
  );

  // Retorna mensagem de sucesso
  respostaDoServidor.json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

// Inicia o servidor na porta 3000
servidor.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});
