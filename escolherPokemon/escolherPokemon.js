const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const initialPokemons = [1, 4, 7];

const initialPokemonsV2 = initialPokemons.map((pokemon) => pokemon + 1);

const fetchPokemon = () => {
  const listaPokemons = [];

  for (let i = 0; i <= 2; i++) {
    listaPokemons.push(
      fetch(getPokemonUrl(initialPokemons[i])).then((response) =>
        response.json()
      )
    );
  }

  Promise.all(listaPokemons).then((pokemons) => {
    const liPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);

      accumulator += `
            <li class="card ${types[0]}" onclick="chosePokemon(${
        pokemon.id
      })" id="${pokemon.id}">
            <img class="card-image" alt="${
              pokemon.name
            }"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        pokemon.id
      }.png" />
            <h2 class="card-title">${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(" | ")}</p>
            </li>
            `;
      return accumulator;
    }, "");

    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = liPokemons;
  });
};

fetchPokemon();

function chosePokemon(pokemonId) {
  let pokemonBag = [];

  if (!pokemonBag.includes(pokemonId)) {
    pokemonBag.push(pokemonId);
    localStorage.setItem("pokemonBag", pokemonBag);

    for (let i = 0; i < initialPokemons.length; i++) {
      if (!pokemonBag.includes(initialPokemons[i])) {
        let pokemonCard = document.getElementById(initialPokemons[i]);
        pokemonCard.remove();
      }
    }
    afterChose();
  }
}

function afterChose() {
  let title = document.querySelector("#titleMenu");
  let body = document.querySelector("#corpo");

  title.innerHTML = "Ótima escolha!";
  body.innerHTML = "Agora pode proseguir para a batatalha pokemon...";

  let content = document.querySelector(".content");
  content.appendChild(createLoad());

  setInterval(() => {
    window.location.replace("../arena/arena.html");
  }, 4500);
}

function getPokemonBag() {
  return pokemonBag;
}

function changeNaneMenu() {
  let title = document.querySelector("#titleMenu");
  playerName = localStorage.getItem("playerName");

  title.innerHTML += " " + playerName + "!";
}
changeNaneMenu();

function createLoad() {
  const h2 = document.createElement("h3");
  let pontos = "";
  h2.innerHTML = pontos;
  setInterval(() => {
    if (pontos.length >= 3) {
      pontos = "";
    } else {
      pontos += ".";
    }
    h2.innerHTML = pontos;
  }, 1000);
  return h2;
}
