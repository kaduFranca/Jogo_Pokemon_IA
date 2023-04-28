function showComponent(id) {
  var element = document.getElementById(id);

  if (element.classList.contains("show")) {
    element.classList.remove("show");
  } else {
    element.classList.add("show");
  }
}

function getName(id) {
  var element = document.getElementById(id);
  if (element.value != "") {
    localStorage.setItem("playerName", element.value);

    window.open("./escolherPokemon/escolherPokemon.html", "_self");
  }
}

function optionJogar() {
  pokemonBag = JSON.parse(localStorage.getItem("pokemonBag")) ?? []
  if (pokemonBag.length == 0) {
    showComponent('bem-vindo')
  } else {
    window.open("./arena/arena.html", "_self");
  }
}