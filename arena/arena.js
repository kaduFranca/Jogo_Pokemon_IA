let id = parseInt(localStorage.getItem("pokemonSelected")) ?? 1;
let playerName = localStorage.getItem("playerName");

let balanceados = [60,1,4,7,58,100,86,24,13,10,16,19,25,27,29,32,35,39,41,74,46,48,50,52,54,56,66,69,72,92,88,109,12,98,17,37,77,84,96,120,138,133,137]
var pokemonBag = getStore('pokemonBag') ?? id
let enemyBag = getStore('enemyBag') ?? balanceados
let playerTurn = true;
let random = enemyBag[Math.floor(Math.random() * enemyBag.length)];

const getPlayerPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
const getAshPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${random}`;

const frontPlayerPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const backPlayerPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
const frontPlayerGifPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
const splashPlayerUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
const PlayerGifPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${id}.gif`;

const frontAshPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`;
const backAshPokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${random}.png`;
const splashAshUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${random}.png`
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
        splashImg: splashPlayerUrl,
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
        splashImg: splashAshUrl,
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
 
  setInitialTurn()
  refreshModalInfo()
}

function setInitialTurn() {
  playerTurn = playerPokemon.speed > ashPokemon.speed ? true : false
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
  let content = ""
  let options = ["Ataque normal", "Ataque especial", "Fugir"];
  let functionOption = ['physicalAttk','specialAbility','Fugir']
  for(i = 5; i <= 7; i++) {
    content += `
    <img class="imgHover${i}" src="../img/icone_hover.png"/>
    <p onclick="choseOption('${functionOption[i-5]}')" id=${functionOption[i-5]}
    onmouseover="showComponent('imgHover${i}')"
    onmouseout="showComponent('imgHover${i}')">${options[i-5]}</p>`
  }

  if(playerTurn == true) {
    setElement(".hudMenu", content)
  
    var hudMenu = document.querySelector(".hudMenu")
    hudMenu.style.fontSize = "4vh"
  } else {
    botTurn(ashPokemon, playerPokemon)
  }
  
}

function choseOption(id) {
  if(id === "physicalAttk") {
    physicalAttk(playerPokemon, ashPokemon)
  } else if(id === "specialAbility") {
    showMoves(playerPokemon)
  } else {
    runAway()
  }
}

function showMoves(pokemon) {
  let content = ""
  for (i = 1; i <= 4; i++) {
   content += `<img class="imgHover${i}" src="../img/icone_hover.png"/>
    <p onclick="specialAbility(playerPokemon, ashPokemon, playerPokemon.moves[${i-1}])"
    onmouseover="showComponent('imgHover${i}')"
    onmouseout="showComponent('imgHover${i}')">${pokemon.moves[i-1].name} (${pokemon.moves[i-1].type})</p>`
  }
  setElement(".hudMenu", content)

  var hudMenu = document.querySelector(".hudMenu")
  hudMenu.style.fontSize = "3vh"
}

function endAtack(pokemon, enemy, move, damage) {
  showMsg(pokemon, enemy, move, damage)

  playerTurn = playerTurn ? false : true;
  
  setTimeout(() => {
    loadOptions()
  }, 2500)
}

function showMsg(pokemon, enemy, move, damage) {
  nameAtacker = playerTurn == true ? playerName : 'bot'
  let msgLog
  let hudMenu
  if (damage == 0) {
    msgLog = `<h3>${pokemon.name}(${nameAtacker}) <span style="color: red;">errou</span> o ataque!</h3>`
  }else if (move !== null) {
    msgLog = `<h3>${pokemon.name}(${nameAtacker}) <span style="color: blue;">atacou</span> ${enemy.name} com ${move.name}(${move.type})<span style="color: red;">[-${damage}]</span></h3>`
  } else {
    msgLog = `<h3>${pokemon.name}(${nameAtacker}) <span style="color: blue;">atacou</span> ${enemy.name} com ataque básico! <span style="color: red;">[-${damage}]</span></h3>`
  }
  setElement(".msgLog", msgLog)

  
  hudMenu = `
  <img src="${pokemon.splashImg}" class="imgHud atacker">
  <img src="../img/espada.png" class="imgHud espada">
  <img src="${enemy.splashImg}" class="imgHud defender">
  `

  setElement(".hudMenu", hudMenu)

}

function refreshHP(pokemon, enemy) {
  let vidaAtual = pokemon.hp
  let vidaTotal = pokemon.hp_base

  if (vidaAtual <= 0) {
    endGame(pokemon, enemy)
  } else if(vidaAtual != vidaTotal) {
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
  console.log(pokemon.name + " deu " + damage + " de dano")
  refreshHP(pokemon, enemy)
  endAtack(pokemon, enemy, null, damage)
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
  
  Specialdamage = Math.floor(((((2 * 1 / 5 + 2) * pokemon.specialAttk * move.power) / enemy.specialDefense / 50) + 2) * stab * attkTypeEfficiency * critical * (margin / 98) * 2);
  enemy.hp -= Specialdamage
  refreshHP(enemy, pokemon)
  endAtack(pokemon, enemy, move, Specialdamage)
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

function endGame(pokemon, enemy) {
  document.querySelector(".hubModal").remove()
  document.querySelector(".modal-background").classList.add("show")
  if (playerTurn == true) {
    setElement(".endGame", `
    <h2>Você Ganhou!</h2>
    <p>${pokemon.name} foi derrotado!</p>
    `)
  } else {
    setElement(".endGame", `
    <h2>Você Perdeu :(</h2>
    <p>${enemy.name} derrotou seu ${pokemon.name}!</p>
    `)
  }
  capturePokemon()

  setInterval(() => {
    window.location.replace("../pokeBag/pokeBag.html");
  }, 4500);}

function getStore(idStore) {
  return JSON.parse(localStorage.getItem(idStore))
}

function setStore(idStore, content) {
  localStorage.setItem(idStore, JSON.stringify(content))
}

function capturePokemon() {
  let playerArray
  let enemyArray
  if (playerTurn == true) {
    pokemonBag.push(ashPokemon.id)
    playerArray = pokemonBag
    enemyArray = enemyBag.splice(pokemonBag.indexOf(ashPokemon.id))
  } else {
    enemyBag.push(playerPokemon.id)
    enemyArray = enemyBag
    playerArray = pokemonBag.splice(pokemonBag.indexOf(playerPokemon.id))
  }
  setStore('pokemonBag', playerArray)
  setStore('enemyBag', enemyArray)
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
      electric: 1.0,
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
      electric: 1.0,
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
      grass: 2.0,
      water: 1.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 1.0,
      bug: 2.0,
      ground: 1.0,
      electric: 0.5,
      flying: 1.0,
      rock: 0.5,
      dark: 1.0,
      ice: 1.0,
      poison: 1.0,
      steel: 0.5,
      fighting: 2.0,
      fairy: 1.0,
      ghost: 1.0
    },
    poison: {
      grass: 2.0,
      water: 1.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 1.0,
      bug: 1.0,
      ground: 0.5,
      electric: 1.0,
      flying: 1.0,
      rock: 0.5,
      dark: 1.0,
      ice: 1.0,
      poison: 0.5,
      steel: 0.0,
      fighting: 1.0,
      fairy: 2.0,
      ghost: 0.5
    },
    ground: {
      grass: 0.5,
      water: 1.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 2.0,
      bug: 0.5,
      ground: 1.0,
      electric: 2.0,
      flying: 0.0,
      rock: 2.0,
      dark: 1.0,
      ice: 1.0,
      poison: 2.0,
      steel: 2.0,
      fighting: 1.0,
      fairy: 1.0,
      ghost: 1.0
    },
    rock: {
      grass: 1.0,
      water: 1.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 2.0,
      bug: 2.0,
      ground: 0.5,
      electric: 1.0,
      flying: 2.0,
      rock: 1.0,
      dark: 1.0,
      ice: 2.0,
      poison: 1.0,
      steel: 0.5,
      fighting: 0.5,
      fairy: 1.0,
      ghost: 1.0
    },
    bug: {
      grass: 2.0,
      water: 1.0,
      normal: 1.0,
      psychic: 2.0,
      fire: 0.5,
      bug: 1.0,
      ground: 1.0,
      electric: 1.0,
      flying: 0.5,
      rock: 1.0,
      dark: 2.0,
      ice: 1.0,
      poison: 0.5,
      steel: 0.5,
      fighting: 0.5,
      fairy: 0.5,
      ghost: 0.5
    },
    ghost: {
      grass: 1.0,
      water: 1.0,
      normal: 0.0,
      psychic: 2.0,
      fire: 1.0,
      bug: 1.0,
      ground: 1.0,
      electric: 1.0,
      flying: 1.0,
      rock: 1.0,
      dark: 0.5,
      ice: 1.0,
      poison: 1.0,
      steel: 1.0,
      fighting: 1.0,
      fairy: 1.0,
      ghost: 2.0
    },
    steel: {
      grass: 1.0,
      water: 0.5,
      normal: 1.0,
      psychic: 1.0,
      fire: 0.5,
      bug: 1.0,
      ground: 1.0,
      electric: 0.5,
      flying: 1.0,
      rock: 2.0,
      dark: 1.0,
      ice: 2.0,
      poison: 1.0,
      steel: 0.5,
      fighting: 1.0,
      fairy: 2.0,
      ghost: 1.0
    },
    fire: {
      grass: 2.0,
      water: 0.5,
      normal: 1.0,
      psychic: 1.0,
      fire: 0.5,
      bug: 2.0,
      ground: 1.0,
      electric: 1.0,
      flying: 1.0,
      rock: 0.5,
      dark: 1.0,
      ice: 2.0,
      poison: 1.0,
      steel: 2.0,
      fighting: 1.0,
      fairy: 1.0,
      ghost: 1.0
    },
    water: {
      grass: 0.5,
      water: 0.5,
      normal: 1.0,
      psychic: 1.0,
      fire: 2.0,
      bug: 1.0,
      ground: 2.0,
      electric: 1.0,
      flying: 1.0,
      rock: 2.0,
      dark: 1.0,
      ice: 1.0,
      poison: 1.0,
      steel: 1.0,
      fighting: 1.0,
      fairy: 1.0,
      ghost: 1.0
    },
    grass: {
      grass: 0.5,
      water: 2.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 0.5,
      bug: 0.5,
      ground: 2.0,
      electric: 1.0,
      flying: 0.5,
      rock: 2.0,
      dark: 1.0,
      ice: 1.0,
      poison: 0.5,
      steel: 0.5,
      fighting: 1.0,
      fairy: 1.0,
      ghost: 1.0
    },
    electric: {
      grass: 0.5,
      water: 2.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 1.0,
      bug: 1.0,
      ground: 0.0,
      electric: 0.5,
      flying: 2.0,
      rock: 1.0,
      dark: 1.0,
      ice: 1.0,
      poison: 1.0,
      steel: 1.0,
      fighting: 1.0,
      fairy: 1.0,
      ghost: 1.0
    },
    psychic: {
      grass: 1.0,
      water: 1.0,
      normal: 1.0,
      psychic: 0.5,
      fire: 1.0,
      bug: 1.0,
      ground: 1.0,
      electric: 1.0,
      flying: 1.0,
      rock: 1.0,
      dark: 0.0,
      ice: 1.0,
      poison: 2.0,
      steel: 0.5,
      fighting: 2.0,
      fairy: 1.0,
      ghost: 1.0
    },
    ice: {
      grass: 2.0,
      water: 0.5,
      normal: 1.0,
      psychic: 1.0,
      fire: 0.5,
      bug: 1.0,
      ground: 2.0,
      electric: 1.0,
      flying: 2.0,
      rock: 1.0,
      dark: 1.0,
      ice: 0.5,
      poison: 1.0,
      steel: 0.5,
      fighting: 1.0,
      fairy: 1.0,
      ghost: 1.0
    },
    dragon: {
      grass: 1.0,
      water: 1.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 1.0,
      bug: 1.0,
      ground: 1.0,
      electric: 1.0,
      flying: 1.0,
      rock: 1.0,
      dark: 1.0,
      ice: 1.0,
      poison: 1.0,
      steel: 0.5,
      fighting: 1.0,
      fairy: 0.0,
      ghost: 1.0
    },
    dark: {
      grass: 1.0,
      water: 1.0,
      normal: 1.0,
      psychic: 2.0,
      fire: 1.0,
      bug: 1.0,
      ground: 1.0,
      electric: 1.0,
      flying: 1.0,
      rock: 1.0,
      dark: 0.5,
      ice: 1.0,
      poison: 1.0,
      steel: 1.0,
      fighting: 0.5,
      fairy: 0.5,
      ghost: 2.0
    },
    fairy: {
      grass: 1.0,
      water: 1.0,
      normal: 1.0,
      psychic: 1.0,
      fire: 1.0,
      bug: 1.0,
      ground: 1.0,
      electric: 1.0,
      flying: 1.0,
      rock: 1.0,
      dark: 2.0,
      ice: 1.0,
      poison: 0.5,
      steel: 0.5,
      fighting: 2.0,
      fairy: 1.0,
      ghost: 1.0
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
  }else if (bettermove.length != 0){
    specialAbility(pokemon, enemy, pokemon.moves[bettermove])
  } else {
    physicalAttk(pokemon, enemy)
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

function showComponent(selector) {
  var element = document.querySelector(`.${selector}`);
  if (element.classList.contains("show")) {
    element.classList.remove("show");
  } else {
    element.classList.add("show");
  }
}