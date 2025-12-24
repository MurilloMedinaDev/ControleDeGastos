//FUNÇÃO AO CLICAR NO BOTAO VOLTAR
document.getElementById('E-voltarBtn').addEventListener('click',()=>{
window.location.href = "MyFinance.html"

})

//FUNÇÃO AO CLICAR  NO BOTAO adicionar 
document.getElementById('novaEntradaBtn').addEventListener('click', async() =>{

    const nome = document.getElementById('nomeEntrada').value.trim();
    const valor = document.getElementById('valorEntrada').value.trim();
    const data = document.getElementById('dataEntrada').value.trim();
    const ID_Categoria = document.getElementById('categoria').value.trim();


    const ID_usuario = localStorage.getItem('ID_usuario');
   

    //VERIFICA SE TODOS OS CAMPOS ESTÃO PREENCHIDOS 
  if (!nome || !valor|| !data || !ID_Categoria){
    alert('Preencha todos os campos!');
    return;
  }

  // Envia os dados para o servidor (rota /entrada)
  try {
    const resposta = await fetch('http://localhost:3000/entrada', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, valor, data, ID_Categoria,ID_usuario})
    });

 // Lê a resposta do servidor e transforma em objeto JavaScript
    const dados = await resposta.json();
     // Caso o servidor diga que a entrada foi bem-sucedido
    alert(dados.mensagem);
  } 
  
   // Caso o servidor diga que deu erro  
   catch (erro) {
    console.error('Erro:', erro);
    alert('Erro ao conectar ao servidor.');
  }
});

