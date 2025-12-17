document.getElementById('E-voltarBtn').addEventListener('click',()=>{
window.location.href = "MyFinance.html"

})

document.getElementById('novaEntradaBtn').addEventListener('click', async() =>{

    const nome = document.getElementById('nomeEntrada').value.trim();
    const valor = document.getElementById('valorEntrada').value.trim();
    const data = document.getElementById('dataEntrada').value.trim();
    const ID_Categoria = document.getElementById('categoria').value.trim();


    const ID_usuario = localStorage.getItem('ID_usuario');
   

    
  if (!nome || !valor|| !data || !ID_Categoria){
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const resposta = await fetch('http://localhost:3000/entrada', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, valor, data, ID_Categoria,ID_usuario})
    });

    const dados = await resposta.json();
    alert(dados.mensagem);
  } catch (erro) {
    console.error('Erro:', erro);
    alert('Erro ao conectar ao servidor.');
  }
});

