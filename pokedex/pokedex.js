const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
   
    const listaPokemons = []
    var lista = [60, 1, 4, 7, 58, 100, 86, 24, 13, 10, 16,19,21,25,27,29,32,35,39,41,74,46,48,50,52,54,56,60,63,66,69,72,92].sort() 
    lista.sort()
    
   for(let i = 0; i <= lista.length -1; i++) {
    let aux = lista[i]
    console.log(aux)
    listaPokemons.push(fetch(`https://pokeapi.co/api/v2/pokemon/${aux}`)
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