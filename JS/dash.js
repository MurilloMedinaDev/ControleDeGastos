
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('ativa');
}

window.addEventListener('DOMContentLoaded', () => {
  const nome = localStorage.getItem('usuarioNome');
  const email = localStorage.getItem('usuarioEmail');

  document.getElementById('nomeBD').textContent = nome || 'Usuário';
  document.getElementById('emailBD').textContent = email || '';
});
