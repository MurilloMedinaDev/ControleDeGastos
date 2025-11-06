
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('ativa');
}

window.addEventListener('DOMContentLoaded', async() => {
  const nome = localStorage.getItem('usuarioNome');
  const email = localStorage.getItem('usuarioEmail');

 


  document.getElementById('nomeBD').textContent = nome || 'Usuário';
  document.getElementById('emailBD').textContent = email || '';


   // 🔹 NOVO: buscar o ID no banco usando o e-mail
   if (email) {
    try {
      const resposta = await fetch(`http://localhost:3000/usuario/${encodeURIComponent(email)}`);
      if (!resposta.ok) throw new Error('Erro ao buscar ID');

      const dados = await resposta.json();

      // Atualiza o campo ID no HTML
      document.getElementById('ID_usu').textContent = `ID : ${dados.ID_usuario}`;  
      document.getElementById('saldoAtual').textContent = `${dados.saldo}`
     


    } catch (erro) {
      console.error('Erro ao buscar ID do usuário:', erro);
      document.getElementById('ID_usu').textContent = 'ID não encontrado';
    }
  }


});

