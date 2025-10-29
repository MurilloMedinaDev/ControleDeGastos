document.getElementById('voltarBtn').addEventListener('click',()=>{
  
  window.location.href ="/ControleDeGastos/index.html"
})




document.getElementById('cadastrarBtn').addEventListener('click', async () => {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!nome || !email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const resposta = await fetch('http://localhost:3000/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();
    alert(dados.mensagem);
  } catch (erro) {
    console.error('Erro:', erro);
    alert('Erro ao conectar ao servidor.');
  }
});
