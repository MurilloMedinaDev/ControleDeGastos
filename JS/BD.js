import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Função para criar a tabela e inserir um registro
async function CriarPopular(email,senha) {
  const db = await open({
    filename:'./banco.db',
    driver: sqlite3.Database
  });


  // await db.exec(`
  //   CREATE TABLE IF NOT EXISTS usuario (
  //     ID_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
  //     email TEXT,
  //     senha TEXT)`);

 
  // await db.run(`INSERT INTO usuario (email, senha) VALUES (?, ?)`, [email,senha]);

  // await db.close();


  // await db.exec(`
  //   CREATE TABLE IF NOT EXISTS categoria (
  //     ID_Categoria INTEGER PRIMARY KEY AUTOINCREMENT,
  //     nome TEXT)`);

 
  // await db.run(`INSERT INTO categoria (nome) VALUES (?)`, [nome]);

  // await db.close();


  // await db.exec(`
  //   CREATE TABLE IF NOT EXISTS entrada(
  //     ID_Entrada INTEGER PRIMARY KEY AUTOINCREMENT,
  //     nome TEXT,
  //     valor REAL,
  //     data DATE, 
  //     ID_Categoria INTEGER,
  //     ID_usuario INTEGER,
  //     FOREIGN KEY (ID_usuario) REFERENCES usuario(ID_usuario),
  //     FOREIGN KEY (ID_Categoria) REFERENCES categoria(ID_Categoria)      
  //     )`);




// await db.exec(`
//   CREATE TABLE IF NOT EXISTS saida(ID_Saida INTEGER PRIMARY KEY AUTOINCREMENT,
//   nome TEXT,
//   valor REAL,
//   data DATE,
//   qntParcela INTEGER,
//   unParcela INTEGER,
//   ID_usuario INTEGER, 
//   ID_Categoria INTEGER,
//    FOREIGN KEY (ID_usuario) REFERENCES usuario(ID_usuario),
//    FOREIGN KEY (ID_Categoria) REFERENCES categoria(ID_Categoria)   
  

  
  
  
// )`);





 
  await db.run(`INSERT INTO usuario(email,senha) VALUES (?,?)`, [email,senha]);

  await db.close();



// para excluir tabela
// await db.exec('DROP TABLE IF EXISTS sqlite_sequence;');

//   console.log('Tabela "tabela" deletada com sucesso.');



}
// await CriarPopular();






(async () => {
  try {
    await CriarPopular('usuarioMaster@gmail.com',999);
    console.log('Tabela criada e dados inseridos com sucesso!');
    
  } catch (err) {
    console.error(err);
  }
})();