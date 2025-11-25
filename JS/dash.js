

window.addEventListener('DOMContentLoaded', async () => {
  const nome = localStorage.getItem('usuarioNome');
  const email = localStorage.getItem('usuarioEmail');

  document.getElementById('nomeBD').textContent = nome || 'Usuário';
  document.getElementById('emailBD').textContent = email || '';

  if (email) {
    try {
      // Busca ID do usuário
      const resposta = await fetch(`http://localhost:3000/usuario/${encodeURIComponent(email)}`);
      if (!resposta.ok) throw new Error('Erro ao buscar ID');

      const dados = await resposta.json();

      // Atualiza dados do usuário
      document.getElementById('ID_usu').textContent = `ID: ${dados.ID_usuario}`;
      document.getElementById('saldoAtual').textContent = `${dados.saldo}`;
      document.getElementById('totalSaida').textContent = `${dados.totalSaida}`;
      document.getElementById('totalEntrada').textContent = `${dados.totalEntrada}`;

      
      localStorage.setItem('id_usuario', dados.ID_usuario);

      // Chama a função para carregar as movimentações do usuário
      await carregarMovimentacoes(dados.ID_usuario);

    } catch (erro) {
      console.error('Erro ao buscar dados do usuário:', erro);
    }
  }
});
async function carregarMovimentacoes(id_usuario) {
  try {
    const resposta = await fetch(`http://localhost:3000/movimentacoes/${id_usuario}`);
    if (!resposta.ok) throw new Error(`Erro ao buscar movimentações (status ${resposta.status})`);

    const movimentacoes = await resposta.json();
    const containers = document.querySelectorAll('.container-Movimentacao .container');






const totalEntradas = movimentacoes
.filter(movimentacao => movimentacao.ID_tipoMovi === 1)
.reduce((soma, movimentacao) => soma + movimentacao.valor, 0);


const totalSaidas = movimentacoes
.filter(movimentacao => movimentacao.ID_tipoMovi === 2)
.reduce((soma, movimentacao) => soma + movimentacao.valor, 0);

const saldoTotal = totalEntradas - totalSaidas;

   








    document.getElementById('totalEntrada').textContent = `+R$ ${totalEntradas.toFixed(2)}`;
    document.getElementById('totalSaida').textContent = `-R$ ${totalSaidas.toFixed(2)}`;
    document.getElementById('saldoAtual').textContent = `R$ ${saldoTotal.toFixed(2)}`;

    // Mostra as últimas 5 movimentações
    movimentacoes.slice(0, 5).forEach((item, i) => {
      const container = containers[i];
      if (!container) return;

      const dataElem = container.querySelector('.dataMovi');
      const categoriaElem = container.querySelector('.categoriaMovi');
      const nomeElem = container.querySelector('.textMovi');
      const valorElem = container.querySelector('.valorMovi');

      const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
      const sinal = item.ID_tipoMovi === 2 ? '-' : '+';
      const cor = item.ID_tipoMovi === 2 ? 'red' : 'green';

      dataElem.textContent = dataFormatada;
      categoriaElem.textContent = item.ID_Categoria;
      nomeElem.textContent = item.nome;
      valorElem.textContent = `${sinal} R$ ${item.valor.toFixed(2)}`;
      valorElem.style.color = cor;
    });

  } catch (erro) {
    console.error('Erro ao carregar movimentações:', erro);
  }
}