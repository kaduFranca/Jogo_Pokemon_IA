var playerName = '' 

function showComponent(id) {
    var element = document.getElementById(id);

    if (element.classList.contains('show')) {
        element.classList.remove('show')
    } else {
        element.classList.add('show')
    }
} 

function getName(id) {
var element = document.getElementById(id);
if(element.value != '') {
    playerName = element.value
    window.open('./escolherPokemon/escolherPokemon.html', '_self')

}
}

