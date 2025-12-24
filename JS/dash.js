window.addEventListener('DOMContentLoaded', async () => {
  const nome = localStorage.getItem('usuarioNome');
  const email = localStorage.getItem('usuarioEmail');

  document.getElementById('nomeBD').textContent = nome || 'Usuário';
  document.getElementById('emailBD').textContent = email || '';

  if (email) {
    try {
      const resposta = await fetch(`http://localhost:3000/usuario/${encodeURIComponent(email)}`);
      if (!resposta.ok) throw new Error('Erro ao buscar ID');

      const dados = await resposta.json();

      document.getElementById('ID_usu').textContent = `ID: ${dados.ID_usuario}`;
      document.getElementById('saldoAtual').textContent = `${dados.saldo}`;
      document.getElementById('totalSaida').textContent = `${dados.totalSaida}`;
      document.getElementById('totalEntrada').textContent = `${dados.totalEntrada}`;

      localStorage.setItem('id_usuario', dados.ID_usuario);

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

    const containerMov = document.querySelector('.container-Movimentacao');
    const containerVerMais = document.querySelector('.containerVerMais');
    const containers = document.querySelectorAll('.container-Movimentacao .container');

    // =========================
    // CALCULA TOTAIS (TODAS)
    // =========================
    const totalEntradas = movimentacoes
      .filter(m => m.ID_tipoMovi === 1)
      .reduce((soma, m) => soma + m.valor, 0);

    const totalSaidas = movimentacoes
      .filter(m => m.ID_tipoMovi === 2)
      .reduce((soma, m) => soma + m.valor, 0);

    const saldoTotal = totalEntradas - totalSaidas;

    document.getElementById('totalEntrada').textContent = `+R$ ${totalEntradas.toFixed(2)}`;
    document.getElementById('totalSaida').textContent = `-R$ ${totalSaidas.toFixed(2)}`;
    document.getElementById('saldoAtual').textContent = `R$ ${saldoTotal.toFixed(2)}`;

    // =========================
    // SEM MOVIMENTAÇÕES
    // =========================
    if (movimentacoes.length === 0) {
      containerMov.classList.add("vazio");

      const msgAntiga = document.getElementById("msgVazia");
      if (msgAntiga) msgAntiga.remove();

      const msg = document.createElement("p");
      msg.id = "msgVazia";
      msg.textContent = "Nenhuma movimentação encontrada...";
      msg.style.textAlign = "center";
      msg.style.marginTop = "15px";
      msg.style.color = "#888";
      msg.style.fontSize = "1rem";
      containerMov.appendChild(msg);

      if (containerVerMais) containerVerMais.style.display = "none";
      return;
    }

    // =========================
    // EXISTEM MOVIMENTAÇÕES
    // =========================
    containerMov.classList.remove("vazio");

    const msgV = document.getElementById("msgVazia");
    if (msgV) msgV.remove();

    if (containerVerMais) containerVerMais.style.display = "flex";

    // ORDENA (MAIS RECENTE PRIMEIRO)
    movimentacoes.sort((a, b) => new Date(b.data) - new Date(a.data));

    // PEGA SÓ AS 5 ÚLTIMAS
    const ultimas5 = movimentacoes.slice(0, 5);

    // ESCONDE TODOS OS CONTAINERS
    containers.forEach(c => c.style.display = "none");

    // ÍCONES
    const iconesCategoria = {
      1: "🎬", 2: "🍎", 3: "📱", 4: "🎓",
      5: "💻", 6: "❤️", 7: "🏠", 8: "👕",
      9: "🧾", 10: "💄", 11: "🐶", 12: "🚗",
      13: "🍽️", 14: "🎵", 15: "📌", 16: "💵",
      17: "📈", 18: "➕", 19: "🎁", 20: "🏷️"
    };

    // DISTRIBUI AS 5 MOVIMENTAÇÕES
    ultimas5.forEach((item, i) => {
      const container = containers[i];
      if (!container) return;

      container.style.display = "flex";

      const dataElem = container.querySelector('.dataMovi');
      const categoriaElem = container.querySelector('.categoriaMovi');
      const nomeElem = container.querySelector('.textMovi');
      const valorElem = container.querySelector('.valorMovi');

      const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
      const sinal = item.ID_tipoMovi === 2 ? '-' : '+';
      const cor = item.ID_tipoMovi === 2 ? 'red' : 'green';

      dataElem.textContent = dataFormatada;
      categoriaElem.textContent = iconesCategoria[item.ID_Categoria] || "❓";
      nomeElem.textContent = item.nome;
      valorElem.textContent = `${sinal} R$ ${item.valor.toFixed(2)}`;
      valorElem.style.color = cor;
    });

  } catch (erro) {
    console.error('Erro ao carregar movimentações:', erro);
  }
}
