
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('ativa');
}

// window.addEventListener('DOMContentLoaded', async () => {
//   const emailUsuario = localStorage.getItem('usuarioEmail');

//   if (!emailUsuario) {
//     alert('Usuário não identificado. Faça login novamente.');
//     window.location.href = '/ControleDeGastos/index.html';
//     return;
//   }

//   try {
//     const resposta = await fetch(`http://localhost:3000/usuario/${emailUsuario}`);
//     const usuario = await resposta.json();

//     if (resposta.ok) {
//       document.getElementById('nomeBD').textContent = usuario.nome;
//       document.getElementById('emailBD').textContent = usuario.email;
//     } else {
//       alert(usuario.mensagem || 'Erro ao buscar dados do usuário.');
//     }
//   } catch (erro) {
//     console.error('Erro ao buscar dados do usuário:', erro);
//     alert('Não foi possível conectar ao servidor.');
//   }
// });