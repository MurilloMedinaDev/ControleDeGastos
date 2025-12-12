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
  }
   catch (erro) {
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
//  atualizarValorTotalSaida(1,900);



async function apagarColunaEntrada(totalEntrada) {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    await db.run('ALTER TABLE entrada DROP COLUMN totalEntrada');
    console.log('Coluna totalEntrada excluída da tabela entrada.');
  } catch (erro) {
    console.error('Erro ao apagar coluna:', erro);
  } finally {
    await db.close();
  }
}


//teste
//apagarColunaEntrada();

async function apagarColunaSaida(totalSaida) {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    await db.run('ALTER TABLE saida DROP COLUMN totalSaida');
    console.log('Coluna totalSaida excluída da tabela Saida.');
  } catch (erro) {
    console.error('Erro ao apagar coluna:', erro);
  } finally {
    await db.close();
  }
}


//teste
//apagarColunaSaida();


async function adicionarCategoria(nome) {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    // Adicionar Nova categoria
    await db.run('INSERT INTO categoria (nome) VALUES (?)', [nome]);
    console.log(`Nova categoria ${nome} adicionada para.`);
  } catch (erro) {
    console.error('Erro ao adicionar categoria:', erro);
  } finally {
    await db.close();
  }
}

// // Exemplo de uso
//adicionarCategoria('Outros');

 
async function apagarCategoria(ID_Categoria) {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    // Apaga a categoria com base no ID
    await db.run('DELETE FROM categoria WHERE ID_Categoria = ?', [ID_Categoria]);
    console.log(`Linha com ID ${ID_Categoria} excluída da tabela categoria.`);
  } catch (erro) {
    console.error('Erro ao apagar categoria:', erro.message);
  } finally {
    await db.close();
  }
}


// apagarCategoria(6);


async function criarTabelaMovimentacao() {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS movimentacao (
        ID_Movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        valor REAL NOT NULL,
        data DATE NOT NULL,
        qntParcela INTEGER,
        unParcela INTEGER,
        ID_usuario INTEGER,
        ID_Categoria INTEGER,
        ID_tipoMovi INTEGER NOT NULL, 
        FOREIGN KEY (ID_usuario) REFERENCES usuario (ID_usuario),
        FOREIGN KEY (ID_Categoria) REFERENCES categoria (ID_Categoria)
      )
    `);

    console.log('Tabela "movimentacao" criada com sucesso.');
  } catch (erro) {
    console.error('Erro ao criar tabela movimentacao:', erro);
  } finally {
    await db.close();
  }
}

//criarTabelaMovimentacao();


async function apagarTabela() {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  try {
    // Apaga a categoria com base no ID
    await db.run('DROP TABLE entrada');
    console.log(`excluída a tabela entrada.`);
    } catch (erro) {
    console.error('Erro ao apagar tabela entrada:', erro.message);
  } finally {
    await db.close();
  }
}


//apagarTabela();