const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const initialPokemons = [1,4,7];

const initialPokemonsV2 = initialPokemons.map(pokemon => pokemon + 1);

const pokemonBag = [];

const fetchPokemon = () => {
   
    const listaPokemons = []

   for(let i = 0; i <= 2; i++) {
    listaPokemons.push(fetch(getPokemonUrl(initialPokemons[i]))
    .then(response => response.json()))
   
   }

   Promise.all(listaPokemons)
    .then(pokemons => {
        const liPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `
            <li class="card ${types[0]}" onclick="chosePokemon(${pokemon.id})">
            <img class="card-image" alt="${pokemon.name}"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" />
            <h2 class="card-title">${pokemon.name}</h2>
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

function chosePokemon(pokemonId) {

    if(!pokemonBag.includes(pokemonBag)) {
        pokemonBag += pokemonId;
    }
}