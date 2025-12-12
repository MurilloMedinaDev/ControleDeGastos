
//FUNÇÃO AO CLICAR NO BOTAO VOLTAR
document.getElementById('voltarBtn').addEventListener('click',()=>{
  
  window.location.href ="/ControleDeGastos/index.html"
})



//FUNÇÃO AO CLICAR NO BOTAO CADASTRAR
document.getElementById('cadastrarBtn').addEventListener('click', async () => {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  //VERIFICA SE TODOS OS CAMPOS FORAM PREENCHIDOS
  if (!nome || !email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

    // Envia os dados para o servidor (rota /cadastrar)
  try {
    const resposta = await fetch('http://localhost:3000/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });
// Lê a resposta do servidor e transforma em objeto JavaScript
    const dados = await resposta.json();
    alert(dados.mensagem);
  } 
  
  // Caso o servidor diga que a entrada foi bem-sucedido
  catch (erro) {
    console.error('Erro:', erro);
    alert('Erro ao conectar ao servidor.');
  }
});
