let cardContainer = document.querySelector(".card-container");
let searchInput = document.querySelector(".search-input"); // 1. Seleciona o campo de busca
let searchButton = document.querySelector(".search-button"); // Seleciona o botão de busca

// Seleciona os elementos da tela de detalhes
let detailView = document.querySelector(".detail-view");
let closeDetailButton = document.querySelector(".close-detail-button");

let dados = [];

async function iniciarBusca() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Voltamos a renderizar tudo no início

    // Adiciona o evento de clique no botão
    searchButton.addEventListener("click", realizarBusca);

    // Adiciona o evento de 'input' para filtrar em tempo real conforme o usuário digita
    searchInput.addEventListener("input", realizarBusca);

    // Adiciona evento para fechar a tela de detalhes
    closeDetailButton.addEventListener("click", esconderDetalhes);
}

function realizarBusca() {
    const termoBuscado = searchInput.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => {
        return (
            dado.nome.toLowerCase().includes(termoBuscado) ||
            dado.descrição.toLowerCase().includes(termoBuscado)
        );
    });
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    for (let dado of dados) {
        // Agora o card é um div, não um link
        let card = document.createElement("div");
        card.classList.add("card");
        // Armazena o nome do jogo no elemento para fácil acesso
        card.dataset.gameName = dado.nome;

        // Define a imagem de capa como background do link
        // Usamos uma cor de fallback caso a imagem não carregue
        if (dado.imagem) {
            card.style.backgroundImage = `url('${dado.imagem}')`;
        } else {
            card.style.backgroundColor = 'var(--tertiary-color)';
        }

        // Adiciona o nome do jogo, que será estilizado via CSS
        card.innerHTML = `<span class="game-title">${dado.nome}</span>`;

        // Adiciona o evento de clique para mostrar os detalhes
        card.addEventListener("click", () => {
            mostrarDetalhes(dado);
        });

        cardContainer.appendChild(card);
    }
}

function mostrarDetalhes(dado) {
    // Popula os elementos da tela de detalhes com os dados do jogo clicado
    detailView.querySelector(".detail-image").src = dado.imagem;
    detailView.querySelector(".detail-title").textContent = dado.nome;
    detailView.querySelector(".detail-year").textContent = `Ano: ${dado.ano}`;
    detailView.querySelector(".detail-description").textContent = dado.descrição;
    detailView.querySelector(".detail-link-button").href = dado.link;

    // Limpa e popula as tags
    const tagsContainer = detailView.querySelector(".detail-tags");
    tagsContainer.innerHTML = "";
    dado.tags.forEach(tag => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    // Mostra a tela de detalhes adicionando a classe 'active'
    detailView.classList.add("active");
}

function esconderDetalhes() {
    // Esconde a tela de detalhes removendo a classe 'active'
    detailView.classList.remove("active");
}

iniciarBusca(); // Inicia todo o processo ao carregar a página