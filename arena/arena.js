let id = 1;
let balanceados = [
  17, 12, 25, 27, 39, 74, 35, 41, 52, 54, 56, 58, 63, 72, 60, 50, 84, 86, 88,
  109, 90, 98, 100, 102, 109,
];
let random = balanceados[Math.floor(Math.random() * balanceados.length + 1)];

const getPlayerPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
const getAshPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${random}`;

let playerPokemon = {};
let ashPokemon = {};

fetch(getPlayerPokemonUrl)
  .then((response) => response.json())
  .then((data) => {
    playerPokemon = {
      id: id,
      name: data.forms[0].name,
      hp: data.stats[0].base_stat,
      attk: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttk: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
    };
  });

fetch(getAshPokemonUrl)
  .then((response) => response.json())
  .then((data) => {
    ashPokemon = {
      id: random,
      name: data.forms[0].name,
      hp: data.stats[0].base_stat,
      attk: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttk: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`,
    };
  });

function choseAction() {
  const div = document.getElementById("container");

  var imgNew = document.createElement("img");
  imgNew.src = playerPokemon.sprite;
  var imgNew2 = document.createElement("img");
  imgNew2.src = ashPokemon.sprite;

  div.appendChild(imgNew);
  div.appendChild(imgNew2);

  console.log(playerPokemon);
  console.log(ashPokemon);
}
