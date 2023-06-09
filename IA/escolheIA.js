const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    
    switch ("pokemon selecionado") {
        case 'pokemon 1':
            const PokemonIA = []
            const i = Math.round(Math.random() * 10);
            PokemonIA.push(fetch(getPokemonUrl(i))
            .then(response => response.json()))
          break;

    }
    
    Promise.all(PokemonIA)
    .then(pokemons => {
        const liPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" />
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
            </li>
            `
            return accumulator
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')

        ul.innerHTML = liPokemons
    })
}

fetchPokemon()