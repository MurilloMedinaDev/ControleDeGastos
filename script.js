const botao = document.getElementById('verGastosBtn');
  const divItens = document.querySelector('.itensLista');

  botao.addEventListener('click', () => {
    if (divItens.style.display === 'none' || divItens.style.display === '') {
      divItens.style.display = 'block'; // Mostra a div
    } else {
      divItens.style.display = 'none';  // Esconde a div
    }
  });