const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
   
    const listaPokemons = []
    localStorage
    var pokemonWhiteList = JSON.parse(localStorage.getItem('pokemonBag'))
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
            <li class="card ${types[0]}" onclick="selectPokemon(${pokemon.id})">
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

function selectPokemon(pokemonId) {
    localStorage.setItem('pokemonSelected', pokemonId)
    window.location.replace("../arena/arena.html");
}

fetchPokemon()