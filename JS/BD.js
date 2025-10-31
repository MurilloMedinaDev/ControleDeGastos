import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function adicionarColunaSaldo() {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    // Adiciona a nova coluna "saldo" se ela ainda não existir
    await db.exec(`ALTER TABLE saida ADD COLUMN totalSaida REAL DEFAULT 0.00;`);
    console.log('Coluna "totalSaida" adicionada com sucesso!');
  } catch (erro) {
    if (erro.message.includes('duplicate column')) {
      console.log('A coluna "totalSaida" já existe. Nenhuma alteração feita.');
    } else {
      console.error('Erro ao adicionar coluna:', erro);
    }
  }

  await db.close();
}

adicionarColunaSaldo();
