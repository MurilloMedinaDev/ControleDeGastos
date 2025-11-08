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
// adicionarColunaSaldoEntrada();

async function adicionarColunaSaldoEntrada() {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    // Adiciona a nova coluna "saldo" se ela ainda não existir
    await db.exec(`ALTER TABLE usuario ADD COLUMN totalEntrada REAL DEFAULT 0.00;`);
    console.log('Coluna "totalEntrada" adicionada com sucesso!');
  } catch (erro) {
    if (erro.message.includes('duplicate column')) {
      console.log('A coluna "totalSaida" já existe. Nenhuma alteração feita.');
    } else {
      console.error('Erro ao adicionar coluna:', erro);
    }
  }

  await db.close();
}


//adicionarColunaSaldoEntrada();

async function adicionarColunaSaldoSaida() {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    // Adiciona a nova coluna "saldo" se ela ainda não existir
    await db.exec(`ALTER TABLE usuario ADD COLUMN totalSaida REAL DEFAULT 0.00;`);
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

//adicionarColunaSaldoSaida();


async function atualizarSaldoUsuario(id, novoSaldo) {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    // Atualiza o campo "saldo" de um usuário com base no ID
    await db.run('UPDATE entrada SET ID_Categoria = ? WHERE ID_usuario = ?', [ID_categoria, id]);
    console.log(`ID_categoria do usuário com ID ${id} atualizado para ${ID_categoria}.`);
  } catch (erro) {
    console.error('Erro ao atualizar o saldo do usuário:', erro);
  } finally {
    await db.close();
  }
}

// // Exemplo de uso
// atualizarSaldoUsuario(5, 1);


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
  
  async function atualizarIDUsuarioNoValor(id, novoID) {
    const db = await open({
      filename: './banco.db',
      driver: sqlite3.Database
    });
  
    try {
      // Atualiza o campo "saldo" de um usuário com base no ID
      await db.run('UPDATE entrada SET ID_usuario = ? where ID_Entrada = ?', [novoID, id]);
      console.log(`Id da entrada com ID ${id} atualizado para ${novoID}.`);
    } catch (erro) {
      console.error('Erro ao atualizar o nome do usuário:', erro);
    } finally {
      await db.close();
    }
  }






//   // Exemplo de uso
   //atualizarIDUsuarioNoValor(1,1);
  

     
  async function atualizarIdCatego(id, CategoriaID) {
    const db = await open({
      filename: './banco.db',
      driver: sqlite3.Database
    });
  
    try {
      
      await db.run('UPDATE entrada SET ID_Categoria = ? where ID_Entrada = ?', [CategoriaID, id]);
      console.log(`Id da entrada com ID ${id} atualizado para ${CategoriaID}.`);
    } catch (erro) {
      console.error('Erro ao atualizar o nome do usuário:', erro);
    } finally {
      await db.close();
    }
  }



//   // Exemplo de uso
 // atualizarIdCatego(1,1);

        
  async function atualizarIdNomeCate(id, nomeCateID) {
    const db = await open({
      filename: './banco.db',
      driver: sqlite3.Database
    });
  
    try {
      
      await db.run('UPDATE entrada SET nome = ? where ID_Entrada = ?', [nomeCateID, id]);
      console.log(`Nome da entrada com ID ${id} atualizado para ${nomeCateID}.`);
    } catch (erro) {
      console.error('Erro ao atualizar o nome do usuário:', erro);
    } finally {
      await db.close();
    }
  }

  //   // Exemplo de uso
  //atualizarIdNomeCate(1,'aluguel');


  async function atualizarValorTotalEntrada(id,totalEntrada) {
    const db = await open({
      filename: './banco.db',
      driver: sqlite3.Database
    });
  
    try {
      // Atualiza o campo "saldo" de um usuário com base no ID
      await db.run('UPDATE usuario SET totalEntrada = ? where ID_usuario = ?', [totalEntrada, id]);
      console.log(`saldo total entrada com ID ${id} atualizado para ${totalEntrada}.`);
    } catch (erro) {
      console.error('Erro ao atualizar o nome do usuário:', erro);
    } finally {
      await db.close();
    }
  }

//   // Exemplo de uso
  //atualizarValorTotalEntrada(1,1454.9);


  
  async function atualizarValorTotalSaida(id,totalSaida) {
    const db = await open({
      filename: './banco.db',
      driver: sqlite3.Database
    });
  
    try {
      // Atualiza o campo "saldo" de um usuário com base no ID
      await db.run('UPDATE usuario SET totalSaida = ? where ID_usuario = ?', [totalSaida, id]);
      console.log(`saldo total saida com ID ${id} atualizado para ${totalSaida}.`);
    } catch (erro) {
      console.error('Erro ao atualizar o nome do usuário:', erro);
    } finally {
      await db.close();
    }
  }

//   // Exemplo de uso
  atualizarValorTotalSaida(1,900);


