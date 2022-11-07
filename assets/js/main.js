const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="PokTitle">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
            </div>
   
            <div class="container">
                <div class="detail">
                    <p class="title">Types</p>
                    <ul class="types">${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}</ul>
                    <p class="title">Habilities</p>
                </div>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div class="status">
                <div>
                    <p class="title">Height</p>
                    <p class="habilities height">${pokemon.height}m</p>
                </div>
                <div>
                    <p class="title">Weight</p>
                    <p class="habilities weight">${pokemon.weight}kg</p>
                </div>
            </div>
    </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})