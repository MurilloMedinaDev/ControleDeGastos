//FUNÇÃO AO CLICAR BOTAO VOLTAR
document.getElementById('S-voltarBtn').addEventListener('click',()=>{

window.location.href = "MyFinance.html"


})

//FUNÇÃO AO CLICAR NO BOTAO ADICIONAR
document.getElementById('novaSaidaBtn').addEventListener('click', async() =>{

    const nome = document.getElementById('nomeSaida').value.trim();
    const valor = document.getElementById('valorSaida').value.trim();
    const data = document.getElementById('dataSaida').value.trim();
    const ID_Categoria = document.getElementById('categoriaSaida').value.trim();
    const unParcela = document.getElementById('parcelaAtual').value.trim();
    const qntParcela = document.getElementById('totalParcelas').value.trim();


    const ID_usuario = localStorage.getItem('ID_usuario');


    //VERIFICA SE TODOS OS CAMPOS ESTÃO PREECHIDOS

    if (!nome || !valor|| !data || !ID_Categoria){
        alert('Preencha todos os campos!');
        return;
      }


      
      try {
    
  // Envia os dados para o servidor (rota /saida)
    const resposta = await fetch('http://localhost:3000/saida', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, valor, data, qntParcela,unParcela, ID_usuario, ID_Categoria})
    });

     // Lê a resposta do servidor e transforma em objeto JavaScript
    const dados = await resposta.json();
    alert(dados.mensagem);
  } 
  
  // Caso o servidor diga que deu erro 
  catch (erro) {
    console.error('Erro:', erro);
    alert('Erro ao conectar ao servidor.');
  }
});


