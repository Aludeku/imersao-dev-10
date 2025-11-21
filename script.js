let cardContainer = document.querySelector(".card-container");
let searchInput = document.querySelector(".search-input"); // 1. Seleciona o campo de busca
let searchButton = document.querySelector(".search-button"); // Seleciona o botão de busca

let dados = [];

async function iniciarBusca() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Voltamos a renderizar tudo no início

    // Adiciona o evento de clique no botão
    searchButton.addEventListener("click", realizarBusca);

    // Adiciona o evento de pressionar "Enter" no campo de busca
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            realizarBusca();
        }
    });
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
        // Cria um link <a> que envolve todo o card
        let cardLink = document.createElement("a");
        cardLink.href = dado.link;
        cardLink.target = "_blank";
        cardLink.classList.add("card");

        // Define a imagem de capa como background do link
        // Usamos uma cor de fallback caso a imagem não carregue
        if (dado.imagem) {
            cardLink.style.backgroundImage = `url('${dado.imagem}')`;
        } else {
            cardLink.style.backgroundColor = 'var(--tertiary-color)';
        }

        // Adiciona o nome do jogo, que será estilizado via CSS
        cardLink.innerHTML = `<span class="game-title">${dado.nome}</span>`;
        cardContainer.appendChild(cardLink);
    }
}

iniciarBusca(); // Inicia todo o processo ao carregar a página