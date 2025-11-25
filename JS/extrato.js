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

        movimentacoes.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('container');
            div.setAttribute("data-id", item.ID_Movimentacao);

            const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            const sinal = item.ID_tipoMovi === 2 ? '-' : '+';
            const cor = item.ID_tipoMovi === 2 ? 'red' : 'green';

            let parcelasTexto = "";
            if (item.qntParcela && item.unParcela) parcelasTexto = `${item.unParcela}/${item.qntParcela}`;
            else if (item.qntParcela || item.unParcela) parcelasTexto = "-/-";

            div.innerHTML = `
                <p class="dataMovi">${dataFormatada}</p>
                <p class="categoriaMovi">${item.ID_Categoria}</p>
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
