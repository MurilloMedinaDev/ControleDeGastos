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

// exemplo de uso
// adicionarColunaSaldo();


async function atualizarSaldoUsuario(id, novoSaldo) {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    // Atualiza o campo "saldo" de um usuário com base no ID
    await db.run('UPDATE usuario SET saldo = ? WHERE ID_usuario = ?', [novoSaldo, id]);
    console.log(`Saldo do usuário com ID ${id} atualizado para ${novoSaldo}.`);
  } catch (erro) {
    console.error('Erro ao atualizar o saldo do usuário:', erro);
  } finally {
    await db.close();
  }
}

// // Exemplo de uso
//atualizarSaldoUsuario(4, 199.99);


async function atualizarNomeUsuario(id, novoNome) {
    const db = await open({
      filename: './banco.db',
      driver: sqlite3.Database
    });
  
    try {
      // Atualiza o campo "saldo" de um usuário com base no ID
      await db.run('UPDATE usuario SET nome = ? WHERE ID_usuario = ?', [novoNome, id]);
      console.log(`Nome do usuário com ID ${id} atualizado para ${novoNome}.`);
    } catch (erro) {
      console.error('Erro ao atualizar o nome do usuário:', erro);
    } finally {
      await db.close();
    }
  }
  
//   // Exemplo de uso
//   atualizarNomeUsuario(1,'Murillo');
  
