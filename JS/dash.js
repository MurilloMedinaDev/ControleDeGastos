

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('ativa');
}

window.addEventListener('DOMContentLoaded', async () => {
  const nome = localStorage.getItem('usuarioNome');
  const email = localStorage.getItem('usuarioEmail');
  


  document.getElementById('nomeBD').textContent = nome || 'Usuário';
  document.getElementById('emailBD').textContent = email || '';

  // Busca o ID do usuário pelo e-mail 
  if (email) {
    try {
      const resposta = await fetch(`http://localhost:3000/usuario/${encodeURIComponent(email)}`);
      if (!resposta.ok) throw new Error('Erro ao buscar ID');

      const dados = await resposta.json();

      // Atualiza dados
      document.getElementById('ID_usu').textContent = `ID : ${dados.ID_usuario}`;
      document.getElementById('saldoAtual').textContent = `${dados.saldo}`;
      document.getElementById('totalSaida').textContent = `${dados.totalSaida}`;
      document.getElementById('totalEntrada').textContent = `${dados.totalEntrada}`;


      
      // Agora busca as ENTRADAS do usuário usando o ID retornado
      const respEntradas = await fetch(`http://localhost:3000/entrada/${dados.ID_usuario}`);
      if (!respEntradas.ok) throw new Error('Erro ao buscar entradas');

      const entradas = await respEntradas.json();

     
      const containers = document.querySelectorAll('.container-Movimentacao .container');







    
      entradas.slice(-5).reverse().forEach((item, i) => { //Pegue só as primeiras X entradas, onde X é a quantidade de containers que existem no HTML
        const container = containers[i];

        const data = container.querySelector('.dataMovi');
        const categoria = container.querySelector('.categoriaMovi');
        const nomeMovi = container.querySelector('.textMovi');
        const valor = container.querySelector('.valorMovi');

        // Formata a data 
        const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', {
          timeZone: 'UTC'
        });

        data.textContent = dataFormatada;
        categoria.textContent = item.ID_Categoria;
        nomeMovi.textContent = item.nome;
        valor.textContent = `R$ ${item.valor.toFixed(2)}`;
      });

    } catch (erro) {
      console.error('Erro ao buscar dados do usuário ou entradas:', erro);
    }
  }


  
});


