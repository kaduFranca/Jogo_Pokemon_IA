const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
   
    const listaPokemons = []
    localStorage
    var pokemonWhiteList = [60,1,4,7,58,100,86,24,13,10,16,19,25,27,29,32,35,39,41,74,46,48,50,52,54,56,66,69,72,92,88,109,12,98,17,37,77,84,96,120,138,133,137]
    pokemonWhiteList.sort(function(a, b) {
        return a - b;
      });   
   for(let i = 0; i <= pokemonWhiteList.length -1; i++) {
    listaPokemons.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonWhiteList[i]}`)
    .then(response => response.json()))
   
   }

   Promise.all(listaPokemons)
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