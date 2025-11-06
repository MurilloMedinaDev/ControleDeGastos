
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('ativa');
}

window.addEventListener('DOMContentLoaded', () => {
  const nome = localStorage.getItem('usuarioNome');
  const email = localStorage.getItem('usuarioEmail');

 


  document.getElementById('nomeBD').textContent = nome || 'Usuário';
  document.getElementById('emailBD').textContent = email || '';
  document.getElementById('saldoAtual').textContent = saldoBD || 'não deu certo';
  document.getElementById('ID_usu').textContent = IdBD || 'não deu certo';

});

