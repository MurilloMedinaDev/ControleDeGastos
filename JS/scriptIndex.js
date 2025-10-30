
const botaoEntrar = document.getElementById('entrarBtn');
const botaoCadastrar = document.getElementById('cadastrarBtn');
const campoEmail = document.getElementById('email');
const campoSenha = document.getElementById('senha');


// BOTÃO "ENTRAR" — FAZ LOGIN DO USUÁRIO

botaoEntrar.addEventListener('click', async () => {
  // Pega o valor digitado nos campos e (trim) = remove espaços extras
  const email = campoEmail.value.trim();
  const senha = campoSenha.value.trim();


  if (!email || !senha) {
    alert('Por favor, preencha o e-mail e a senha antes de continuar.');
    return;
  }

  try {
    // Envia os dados para o servidor (rota /login)
    const resposta = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Informamos que estamos enviando JSON
      body: JSON.stringify({ email, senha }) // Converte os dados em texto JSON
    });

    // Lê a resposta do servidor e transforma em objeto JavaScript
    const dados = await resposta.json();

    // Caso o servidor diga que o login foi bem-sucedido
    if (dados.sucesso) {
      alert(`Bem-vindo`);
    
      // Salva nome e email no localStorage
  
      localStorage.setItem('usuarioEmail', dados.email);
    
      // Redireciona para o dashboard
      window.location.href = '/ControleDeGastos/HTML/dashBoard.html';
    }

     else {
      // Se o login não for bem-sucedido, mostra a mensagem do servidor
      alert(dados.mensagem || 'E-mail ou senha incorretos.');
    }
  } catch (erro) {

    // Caso o servidor não esteja rodando ou ocorra outro erro
    console.error('Erro ao tentar fazer login:', erro);
    alert('Não foi possível conectar ao servidor. Verifique se o servidor está ativo.');
  }
});


botaoCadastrar.addEventListener('click', () => {

  window.location.href = '/ControleDeGastos/HTML/cadastro.html';
});
