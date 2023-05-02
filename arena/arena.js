let id = parseInt(localStorage.getItem("pokemonSelected")) ?? 1;
let playerName = localStorage.getItem("playerName");
let balanceados = [
  17, 12, 25, 27, 39, 74, 41, 52, 54, 56, 58, 63, 72, 60, 50, 84, 86, 88,
  109, 90, 98, 100, 129
];
let random = balanceados[Math.floor(Math.random() * balanceados.length)];

const getPlayerPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
const getAshPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${random}`;

const frontPlayerPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const backPlayerPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
const frontPlayerGifPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
const PlayerGifPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${id}.gif`;

const frontAshPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`;
const backAshPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${random}.png`;
const AshGifPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${random}.gif`;

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
        hp_base: data.stats[0].base_stat,
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
        hp_base: data.stats[0].base_stat,
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
          crit: data.meta.crit_rate
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
  playerImg.setAttribute("id", "playerImg");
  
  var ashImg = document.createElement("img");
  ashImg.src = AshGifPokemonUrl;
  ashImg.classList.add("ashImg")
  
  
  div.appendChild(playerImg);
  div.appendChild(ashImg);
  
  console.log(playerPokemon);
  console.log(ashPokemon);

  refreshModalInfo()
}

function setElement(selector, content) {
var auxElement = document.querySelector(selector)
auxElement.innerHTML = content
}

function refreshModalInfo() {
  setElement("#enemyName", ashPokemon.name)
  setElement("#playerName", playerPokemon.name)
  let enemyHP = document.querySelector("#enemyHP")
  enemyHP.id = `${ashPokemon.name}HP`
  let playerHP = document.querySelector("#playerHP")
  playerHP.id = `${playerPokemon.name}HP`
  setElement(`#${enemyHP.id}`, `<p class="textHp">${ashPokemon.hp}</p>`)
  setElement(`#${playerHP.id}`, `<p class="textHp">${playerPokemon.hp}</p>`)

  loadOptions()
}

function loadOptions() {
  setElement(".hudMenu",
  `<p onclick="choseOption('physicalAttk')" id="physicalAttk">Ataque normal</p>
  <p onclick="choseOption('specialAbility')" id="specialAbility">Ataque Especial</p>
  <p onclick="choseOption('runAway')" id="runAway">Fugir</p>`)

  var hudMenu = document.querySelector(".hudMenu")
  hudMenu.style.fontSize = "4vh"
}


function choseOption(id) {
  if(id === "physicalAttk") {
    console.log("UEPA")
    physicalAttk(playerPokemon, ashPokemon)
  } else if(id === "specialAbility") {
    showMoves(playerPokemon)
  } else {
    runAway()
  }
}

function showMoves(pokemon) {
  setElement(".hudMenu",
  `<p onclick="specialAbility(playerPokemon, ashPokemon, playerPokemon.moves[0])">${pokemon.moves[0].name} (${pokemon.moves[0].type})</p>
  <p onclick="specialAbility(playerPokemon, ashPokemon, playerPokemon.moves[1])">${pokemon.moves[1].name} (${pokemon.moves[1].type})</p>
  <p onclick="specialAbility(playerPokemon, ashPokemon, playerPokemon.moves[2])">${pokemon.moves[2].name} (${pokemon.moves[2].type})</p>
  <p onclick="specialAbility(playerPokemon, ashPokemon, playerPokemon.moves[3])">${pokemon.moves[3].name} (${pokemon.moves[3].type})</p>`
  )

  var hudMenu = document.querySelector(".hudMenu")
  hudMenu.style.fontSize = "3vh"
}

function showMessage(pokemonAttacker, PokemonDefender, move) {
  var content = `<h3>${pokemonAttacker.name}(${playerName}) atacou ${PokemonDefender.name} com ${move.name}(${move.type})!</h3>`
  ?? `<h3>${pokemonAttacker.name}(${playerName}) atacou ${PokemonDefender.name} com ataque básico!</h3>`

  console.log(typeof(content))

  setElement(".hudMenu", content)
  
  setTimeout(() => {
    loadOptions()
  }, 2500)
}

function refreshHP(pokemon) {
  let vidaAtual = pokemon.hp
  let vidaTotal = pokemon.hp_base

  if(vidaAtual != vidaTotal) {
    let novaVida = (vidaAtual * 100) / vidaTotal
    let hpDiv = document.querySelector(`#${pokemon.name}HP`)
    hpDiv.innerHTML = vidaAtual;
    hpDiv.style.width = novaVida + "%"
    if (novaVida < 15) {
      hpDiv.style.backgroundColor = "red"
    }
  }
}



function physicalAttk(pokemon, enemy) {
  let stab = 1;
  let PokeType = pokemon.type;
  let enemyType = enemy.type;
  let attkTypeEfficiency = weaknessResistence(PokeType, enemyType);
  let margin = Math.floor(Math.random() * 101);
  let critical = 1
  
  if (Math.floor(Math.random() * 101 <= pokemon.moves.crit)) {
    critical = 1.5
  }
  
  if (sameType(pokemon, enemy)) {
    stab = 1.5;
  }
  
  damage = Math.floor(((((2 * 1 / 5 + 2) * pokemon.attk * 1) / enemy.defense / 50) + 2) * stab * attkTypeEfficiency * critical * (margin / 100) * 2);
  enemy.hp -= damage

  refreshHP(enemy)
  showMessage(pokemon, enemy, null)
}

function specialAbility(pokemon, enemy, move) {
  let stab = 1;
  let enemyType = enemy.type;
  let attkTypeEfficiency = weaknessResistence(move.type, enemyType);
  let margin = Math.floor(Math.random() * 101);
  let critical = 1

  if (Math.floor(Math.random() * 101 <= move.crit)) {
    critical = 1.5
  }
  
  if (sameType(move.type, enemy)) {
    stab = 1.5;
  }
  
  Specialdamage = Math.floor(((((2 * 1 / 5 + 2) * pokemon.specialAttk * move.power) / enemy.specialDefense / 50) + 2) * stab * attkTypeEfficiency * critical * (margin / 100) * 2);
  enemy.hp -= Specialdamage
  console.log(Specialdamage)
  refreshHP(enemy)
  showMessage(pokemon, enemy, move)
}

function runAway() {
  var playerImg = document.getElementById("playerImg");
  playerImg.src = frontPlayerGifPokemonUrl;
  playerImg.style.position = "absolute";
  playerImg.style.left = "1";
  playerImg.style.animation = "runAwayAnimation 1s linear forwards";
  playerImg.addEventListener("animationend", function() {
    window.location.href = "../index.html";
  });
}

function botTurn(pokemon, enemy) {
  const weaknessTable = {
    normal: {
      grass: 1.0,
      water: 1.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 1.0,
      bug: 1.0,
      ground: 1.0,
      eletric: 1.0,
      flying: 1.0,
      rock: 0.5,
      dark: 1.0,
      ice: 1.0,
      poison: 1.0,
      steel: 0.5,
      fighting: 1.0,
      fairy: 1.0,
      ghost: 0.0
    },
    fighting: {
      grass: 1.0,
      water: 1.0,
      normal: 2.0,
      psychic: 0.5,
      fire: 1.0,
      bug: 0.5,
      ground: 1.0,
      eletric: 1.0,
      flying: 0.5,
      rock: 2.0,
      dark: 2.0,
      ice: 2.0,
      poison: 0.5,
      steel: 2.0,
      fighting: 1.0,
      fairy: 0.5,
      ghost: 0.0
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
      Ghost: 1.0
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
      Ghost: 0.5
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
      Ghost: 1.0
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
      Ghost: 1.0
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
      Ghost: 0.5
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
      Ghost: 2.0
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
      Ghost: 1.0
    },
    fire: {
      grass: 2.0,
      water: 0.5,
      normal: 1.0,
      psychic: 1.0,
      fire: 0.5,
      bug: 2.0,
      ground: 1.0,
      eletric: 1.0,
      flying: 1.0,
      rock: 0.5,
      dark: 1.0,
      ice: 2.0,
      poison: 1.0,
      steel: 2.0,
      dighting: 1.0,
      dairy: 1.0,
      ghost: 1.0
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
      Ghost: 1.0
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
      Ghost: 1.0
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
      Ghost: 1.0
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
      Ghost: 1.0
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
      Ghost: 1.0
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
      Ghost: 1.0
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
      Ghost: 2.0
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
      Ghost: 1.0
    }
  }
  raerae = []
  pokemon.moves.map( move => {
    betterchoise = weaknessTable[move.type][enemy.type];
    raerae.push(betterchoise)
  });
  const better = Math.max(...raerae);
  const bettermove = raerae.reduce((acumulador, elemento, index) => {
    if (elemento === better) {
      acumulador.push(index);
    }
    return acumulador;
  }, []);
  let powerfull_move = {power: 0}
  

  if(bettermove.length > 1){
    bettermove.forEach(function(moveindex){
      if(powerfull_move.power < pokemon.moves[moveindex].power){
        powerfull_move = pokemon.moves[moveindex]
      }
    });
    specialAbility(pokemon, enemy, powerfull_move)
  }else{
    specialAbility(pokemon, enemy, pokemon.move[bettermove])
  }
}

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
