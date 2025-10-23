const adicionarGasto = document.getElementById('adicionarSaidaBtn');
const adicionarLucro = document.getElementById('adicionarEntradaBtn');
const sairConta = document.getElementById('SairLoginBtn');







adicionarGasto.addEventListener('click',()=>{

window.location.href ="NovaSaida.html"
})

adicionarLucro.addEventListener('click',()=>{

    window.location.href ="NovaEntrada.html"
})


sairConta.addEventListener('click',()=>{

        window.location.href ="index.html"
})


