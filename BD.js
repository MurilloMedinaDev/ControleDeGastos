import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Função para criar a tabela e inserir um registro
async function CriarPopular(email,senha) {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });


  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuario (
      ID_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      senha TEXT)`);

 
  await db.run(`INSERT INTO usuario (email, senha) VALUES (?, ?)`, [email,senha]);

  await db.close();
}

(async () => {
  try {
    await CriarPopular('murillo@gmail.com', 1234);
    console.log('Tabela criada e dados inseridos com sucesso!');
  } catch (err) {
    console.error(err);
  }
})();