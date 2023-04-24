let id = 1;
let balanceados = [
  17, 12, 25, 27, 39, 74, 35, 41, 52, 54, 56, 58, 63, 72, 60, 50, 84, 86, 88,
  109, 90, 98, 100, 102, 109,
];
let random = balanceados[Math.floor(Math.random() * balanceados.length + 1)];

const getPlayerPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
const getAshPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${random}`;

const PlayerPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
const AshPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`;

playerPokemon = {};
ashPokemon = {};

function setup() {
  Promise.all([getPlayerPokemon(), getAshPokemon()]).then(
    ([playerPokemon, ashPokemon]) => {
      playerPokemon = playerPokemon;
      ashPokemon = ashPokemon;
      loadSprite();
    }
  );
}

async function getPlayerPokemon() {
  return fetch(getPlayerPokemonUrl)
    .then((response) => response.json())
    .then((data) => {
      playerPokemon = {
        id: id,
        name: data.name,
        hp: data.stats[0].base_stat,
        attk: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttk: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        type: data.types[0].type.name,
        sprite: PlayerPokemonUrl,
        moves: getmoves([
          data.moves[0].move.url,
          data.moves[1].move.url,
          data.moves[2].move.url,
          data.moves[3].move.url,
        ]),
      };
    });
}

async function getAshPokemon() {
  return fetch(getAshPokemonUrl)
    .then((response) => response.json())
    .then((data) => {
      ashPokemon = {
        id: random,
        name: data.name,
        hp: data.stats[0].base_stat,
        attk: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttk: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        type: data.types[0].type.name,
        sprite: AshPokemonUrl,
        moves: getmoves([
          data.moves[0].move.url,
          data.moves[1].move.url,
          data.moves[2].move.url,
          data.moves[3].move.url,
        ]),
      };
    });
}

function getmoves(urls) {
  let moves = [];

  urls.forEach((url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        moves.push({
          name: data.name,
          power: data.power,
          type: data.type.name,
        });
      });
  });

  return moves;
}

function loadSprite() {
  const div = document.getElementById("container");

  var imgNew = document.createElement("img");
  imgNew.src = PlayerPokemonUrl;
  var imgNew2 = document.createElement("img");
  imgNew2.src = AshPokemonUrl;

  div.appendChild(imgNew);
  div.appendChild(imgNew2);

  console.log(playerPokemon);
  console.log(ashPokemon);
}

function physicalAttk(pokemon, enemy) {
  let stab = 1;
  let weakness = weaknessresistence();
  let margin = Math.floor(Math.random() * 101);

  if (sametype(pokemon, enemy)) {
    (stab = 1), 5;
  }

  ((((2 * 1) / 5 + 2) * pokemon.attk * "PODER DO GOLPE") / enemy.defense / 50 +
    2) *
    stab *
    "WEAKNESS" *
    "CRITICAL" *
    (margin / 100);
}

function specialAbility(playerPokemon, ashPokemon) {
  ((((2 * 50) / 5 + 2) * 230 * 90) / 130 / 50 + 2) * 1,
    5 * 2 * 1 * 1 * (80 / 100);
}

// function useItem(playerPokemon, ashPokemon) {
//
// }

function runAway(playerPokemon, ashPokemon) {}

function botTurn(playerPokemon, ashPokemon) {}

function sametype(pokemon, enemy) {
  pokemon.type == enemy.type;
}

function weaknessresistence(pokemonATACANDO, pokemonDEFENDENDO) {
  const weaknessTable = {
    normal: {
      Grass: 1.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 1.0,
      Bug: 1.0,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 0.5,
      Dark: 1.0,
      Ice: 1.0,
      Poison: 1.0,
      Steel: 0.5,
      Fighting: 1.0,
      Fairy: 1.0,
      Ghost: 0.0,
    },
    fighting: {
      Grass: 1.0,
      Water: 1.0,
      Normal: 2.0,
      Psychic: 0.5,
      Fire: 1.0,
      Bug: 0.5,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 0.5,
      Rock: 2.0,
      Dark: 2.0,
      Ice: 2.0,
      Poison: 0.5,
      Steel: 2.0,
      Fighting: 1.0,
      Fairy: 0.5,
      Ghost: 0.0,
    },
    flying: {
      Grass: 2.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 1.0,
      Bug: 2.0,
      Ground: 1.0,
      eletric: 0.5,
      Flying: 1.0,
      Rock: 0.5,
      Dark: 1.0,
      Ice: 1.0,
      Poison: 1.0,
      Steel: 0.5,
      Fighting: 2.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    poison: {
      Grass: 2.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 1.0,
      Bug: 1.0,
      Ground: 0.5,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 0.5,
      Dark: 1.0,
      Ice: 1.0,
      Poison: 0.5,
      Steel: 0.0,
      Fighting: 1.0,
      Fairy: 2.0,
      Ghost: 0.5,
    },
    ground: {
      Grass: 0.5,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 2.0,
      Bug: 0.5,
      Ground: 1.0,
      eletric: 2.0,
      Flying: 0.0,
      Rock: 2.0,
      Dark: 1.0,
      Ice: 1.0,
      Poison: 2.0,
      Steel: 2.0,
      Fighting: 1.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    rock: {
      Grass: 1.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 2.0,
      Bug: 2.0,
      Ground: 0.5,
      eletric: 1.0,
      Flying: 2.0,
      Rock: 1.0,
      Dark: 1.0,
      Ice: 2.0,
      Poison: 1.0,
      Steel: 0.5,
      Fighting: 0.5,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    bug: {
      Grass: 2.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 2.0,
      Fire: 0.5,
      Bug: 1.0,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 0.5,
      Rock: 1.0,
      Dark: 2.0,
      Ice: 1.0,
      Poison: 0.5,
      Steel: 0.5,
      Fighting: 0.5,
      Fairy: 0.5,
      Ghost: 0.5,
    },
    ghost: {
      Grass: 1.0,
      Water: 1.0,
      Normal: 0.0,
      Psychic: 2.0,
      Fire: 1.0,
      Bug: 1.0,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 1.0,
      Dark: 0.5,
      Ice: 1.0,
      Poison: 1.0,
      Steel: 1.0,
      Fighting: 1.0,
      Fairy: 1.0,
      Ghost: 2.0,
    },
    steel: {
      Grass: 1.0,
      Water: 0.5,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 0.5,
      Bug: 1.0,
      Ground: 1.0,
      eletric: 0.5,
      Flying: 1.0,
      Rock: 2.0,
      Dark: 1.0,
      Ice: 2.0,
      Poison: 1.0,
      Steel: 0.5,
      Fighting: 1.0,
      Fairy: 2.0,
      Ghost: 1.0,
    },
    fire: {
      Grass: 2.0,
      Water: 0.5,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 0.5,
      Bug: 2.0,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 0.5,
      Dark: 1.0,
      Ice: 2.0,
      Poison: 1.0,
      Steel: 2.0,
      Fighting: 1.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    water: {
      Grass: 0.5,
      Water: 0.5,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 2.0,
      Bug: 1.0,
      Ground: 2.0,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 2.0,
      Dark: 1.0,
      Ice: 1.0,
      Poison: 1.0,
      Steel: 1.0,
      Fighting: 1.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    grass: {
      Grass: 0.5,
      Water: 2.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 0.5,
      Bug: 0.5,
      Ground: 2.0,
      eletric: 1.0,
      Flying: 0.5,
      Rock: 2.0,
      Dark: 1.0,
      Ice: 1.0,
      Poison: 0.5,
      Steel: 0.5,
      Fighting: 1.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    eletric: {
      Grass: 0.5,
      Water: 2.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 1.0,
      Bug: 1.0,
      Ground: 0.0,
      eletric: 0.5,
      Flying: 2.0,
      Rock: 1.0,
      Dark: 1.0,
      Ice: 1.0,
      Poison: 1.0,
      Steel: 1.0,
      Fighting: 1.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    psychic: {
      Grass: 1.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 0.5,
      Fire: 1.0,
      Bug: 1.0,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 1.0,
      Dark: 0.0,
      Ice: 1.0,
      Poison: 2.0,
      Steel: 0.5,
      Fighting: 2.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    ice: {
      Grass: 2.0,
      Water: 0.5,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 0.5,
      Bug: 1.0,
      Ground: 2.0,
      eletric: 1.0,
      Flying: 2.0,
      Rock: 1.0,
      Dark: 1.0,
      Ice: 0.5,
      Poison: 1.0,
      Steel: 0.5,
      Fighting: 1.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
    dragon: {
      Grass: 1.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 1.0,
      Bug: 1.0,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 1.0,
      Dark: 1.0,
      Ice: 1.0,
      Poison: 1.0,
      Steel: 0.5,
      Fighting: 1.0,
      Fairy: 0.0,
      Ghost: 1.0,
    },
    dark: {
      Grass: 1.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 2.0,
      Fire: 1.0,
      Bug: 1.0,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 1.0,
      Dark: 0.5,
      Ice: 1.0,
      Poison: 1.0,
      Steel: 1.0,
      Fighting: 0.5,
      Fairy: 0.5,
      Ghost: 2.0,
    },
    fairy: {
      Grass: 1.0,
      Water: 1.0,
      Normal: 1.0,
      Psychic: 1.0,
      Fire: 1.0,
      Bug: 1.0,
      Ground: 1.0,
      eletric: 1.0,
      Flying: 1.0,
      Rock: 1.0,
      Dark: 2.0,
      Ice: 1.0,
      Poison: 0.5,
      Steel: 0.5,
      Fighting: 2.0,
      Fairy: 1.0,
      Ghost: 1.0,
    },
  };
  const weakness = weaknessTable[pokemonATACANDO][pokemonDEFENDENDO];
  return weakness !== undefined ? weakness : 1;
}
