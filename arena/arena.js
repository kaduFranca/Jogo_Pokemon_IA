let id = parseInt(localStorage.getItem("pokemonSelected")) ?? 1;
let balanceados = [
  17, 12, 25, 27, 39, 74, 35, 41, 52, 54, 56, 58, 63, 72, 60, 50, 84, 86, 88,
  109, 90, 98, 100, 129
];
let random = balanceados[Math.floor(Math.random() * balanceados.length)];

const getPlayerPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
const getAshPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${random}`;

const frontPlayerPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const backPlayerPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
const PlayerGifPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${id}.gif`

const frontAshPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`;
const backAshPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${random}.png`;
const AshGifPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${random}.gif`

playerPokemon = {};
ashPokemon = {};

function setUp() {
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
        sprite: backPlayerPokemonUrl,
        moves: getMoves([
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
        sprite: frontAshPokemonUrl,
        moves: getMoves([
          data.moves[0].move.url,
          data.moves[1].move.url,
          data.moves[2].move.url,
          data.moves[3].move.url,
        ]),
      };
    });
}

function getMoves(urls) {
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
  
  var playerImg = document.createElement("img");
  playerImg.src = PlayerGifPokemonUrl;
  playerImg.classList.add("playerImg")
  
  var ashImg = document.createElement("img");
  ashImg.src = AshGifPokemonUrl;
  ashImg.classList.add("ashImg")
  
  
  div.appendChild(playerImg);
  div.appendChild(ashImg);
  
  console.log(playerPokemon);
  console.log(ashPokemon);
}

function physicalAttk(pokemon, enemy) {
  let stab = 1;
  let PokeType = pokemon.type;
  let enemyType = enemy.type;
  
  let attkTypeEfficiency = weaknessResistence(PokeType, enemyType);
  let margin = Math.floor(Math.random() * 101);
  
  if (sameType(pokemon, enemy)) {
    (stab = 1), 5;
  }
  
  damage = Math.floor(((((2 * 1 / 5 + 2) * pokemon.attk * 1) / enemy.defense / 50) + 2) * stab * attkTypeEfficiency * 1 * (margin / 100));
  enemy.hp -= Specialdamage
}

function specialAbility(pokemon, enemy, move) {
  let stab = 1;
  let enemyType = enemy.type;
  let attkTypeEfficiency = weaknessResistence(move.type, enemyType);
  let margin = Math.floor(Math.random() * 101);
  
  if (sameType(move.type, enemy)) {
    (stab = 1), 5;
  }
  
  Specialdamage = Math.floor(((((2 * 1 / 5 + 2) * pokemon.specialAttk * move.power) / enemy.specialDefense / 50) + 2) * stab * attkTypeEfficiency * 1 * (margin / 100));
  enemy.hp -= Specialdamage
}

// function useItem(playerPokemon, ashPokemon) {
//
// }

function runAway(playerPokemon = 1) {
  var id = playerPokemon;

  document.getElementById("container").innerHTML = "";
  fetch('https://pokeapi.co/api/v2/pokemon/1')
  .then(response => response.json())
  .then(data => {
    // 1. Cria um elemento de imagem e define a imagem de fuga do Pokémon como sua fonte
    const img = document.createElement('img');
    img.src = data.sprites.front_default;

    // 2. Define a classe CSS 'run-away' no elemento de imagem do Pokémon
    img.classList.add('run-away');

    // 3. Adiciona o elemento de imagem da fumaça antes do elemento de imagem do Pokémon
    const smoke = document.createElement('img');
    smoke.src = 'https://64.media.tumblr.com/c80381b932df793b0974a741f6282e25/tumblr_mk3eqnxriT1qko4x4o1_500.gifv';
    smoke.classList.add('smoke');
    setTimeout(() => {
      document.body.appendChild(smoke);
    }, 500);

    // 4. Adiciona o elemento de imagem do Pokémon ao corpo do documento após um atraso de 1 segundo
    setTimeout(() => {
      document.body.appendChild(img);
    }, 1000);

    // 5. Define um tempo limite de 3 segundos antes de redirecionar o usuário para a página especificada
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);
  });
}

function botTurn(playerPokemon, ashPokemon) {}

function sameType(pokemon, enemy) {
  pokemon.type == enemy.type;
}

function weaknessResistence(attackerType, defenderType) {
  const attackerUrl = `https://pokeapi.co/api/v2/type/${attackerType}`;
  let attkCoefficient = undefined;
  let containType = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === defenderType) {
        return true;
      }
    }
    return false;
  };
  
  fetch(attackerUrl)
    .then((response) => response.json())
    .then((data) => {
      if (containType(data.damage_relations.no_damage_to)) {
        attkCoefficient = 0;
      } else if (containType(data.damage_relations.half_damage_to)) {
        attkCoefficient = 0.5;
      } else if (containType(data.damage_relations.double_damage_to)) {
        attkCoefficient = 2;
      }
    });
  return attkCoefficient !== undefined ? attkCoefficient : 1;
}
