// Função para atualizar a lista e mostrar mensagem se estiver vazia
async function carregarTodasMovimentacoes(id_usuario) {
    try {
        const resposta = await fetch(`http://localhost:3000/movimentacoes/${id_usuario}`);
        if (!resposta.ok) throw new Error(`Erro ao buscar movimentações (status ${resposta.status})`);

        const movimentacoes = await resposta.json();
        const lista = document.querySelector('.container-Movimentacao');
        lista.innerHTML = "";

        if (movimentacoes.length === 0) {
            const vazioDiv = document.createElement('div');
            vazioDiv.classList.add('movimentacoes-vazias');
            vazioDiv.innerHTML = `
                <p>Nenhuma movimentação encontrada.</p>
                <img  src="../logo2.png" alt="Nenhuma movimentação" style="width:150px; margin-top:10px;">
            `;
            lista.appendChild(vazioDiv);
            return;
        }
// Mapeamento de ID_Categoria para ícone
const iconesCategoria = {
    1: "🎬 Entretenimento",   // Entretenimento
    2: "🍎 Alimentação",   // Alimentação
    3: "📱  Celular",   // Celular
    4: "🎓 Educação",   // Educação
    5: "💻 Tecnologia ",
    6: "❤️ Saúde",   // Saúde
    7: "🏠 Casa",   // Casa
    8: "👕 Vestuario",   // Vestuário
    9: "🧾 Contas",   // Contas
    10: "💄 Beleza",  // Beleza
    11: "🐶 Pets",  // Pets
    12: "🚗 Carro",  // Carro
    13: "🍽️ Restaurante", // Restaurante
    14: "🎵 Musica",  // Música
    15: "📌 Outros",  // Outros
    16: "💵 Salario",  // Salário
    17: "📈 Investimento",  // Investimento
    18: "➕ Extra",  // Extra
    19: "🎁 Décimo",  // Décimo
    20: "🏷️ Outros"   // Outros
};



movimentacoes.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('container');
    div.setAttribute("data-id", item.ID_Movimentacao);


    //FORMATA DATA MODELO BRASIL, DIA/MES/ANO
    const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });


    // Define sinal e cor conforme o tipo de movimento (1 = entrada, 2 = saída)
    const sinal = item.ID_tipoMovi === 2 ? '-' : '+';
    const cor = item.ID_tipoMovi === 2 ? 'red' : 'green'; // saída vermelho, entrada verde

    //NAO TEM PARCELA ENTAO FICA VAZIO
    let parcelasTexto = "";

    //SE EXISTIR PARCELA SUBSTITUA PELO CONTEUDO DA VARIAVEL
    if (item.qntParcela && item.unParcela) parcelasTexto = `${item.unParcela}/${item.qntParcela}`;

  

    // Aqui substituímos o ID pelo ícone
    const icone = iconesCategoria[item.ID_Categoria] ? iconesCategoria[item.ID_Categoria] : "❓";

    //COLOCANDO INFOS
    div.innerHTML = `
        <p class="dataMovi">${dataFormatada}</p>
        <p class="categoriaMovi">${icone}</p>
        <p class="textMovi">${item.nome}</p>
        <p class="parcelas">${parcelasTexto}</p>
        <p class="valorMovi" style="color:${cor};">${sinal} R$ ${item.valor.toFixed(2)}</p>
        <button class="btn-excluir">X</button>
    `;

    lista.appendChild(div);
});

    } catch (erro) {
        console.error('Erro ao carregar movimentações:', erro);
    }
}


//VERIFICAÇÃO SE SALVOU ID NO LOCALSTORAGE
const idUsuario = localStorage.getItem("id_usuario");
if (idUsuario) carregarTodasMovimentacoes(idUsuario);
else console.error("ID do usuário não encontrado no localStorage.");

// função excluir
document.addEventListener("click", async function(e) {
    if (e.target.classList.contains("btn-excluir")) {
        const div = e.target.closest(".container");
        const idMov = div.getAttribute("data-id");
        if (!idMov) return;

        if (!confirm("Tem certeza que deseja excluir esta movimentação?")) return;

        try {
            const resposta = await fetch(`http://localhost:3000/movimentacao/${idMov}`, { method: "DELETE" });
            if (!resposta.ok) throw new Error("Erro ao excluir");

            div.remove(); // remove da tela
            console.log("Movimentação excluída:", idMov);


        } catch (erro) {
            console.error("Erro ao deletar:", erro);
        }
    }
});

