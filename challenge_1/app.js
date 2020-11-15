var nextPlayer = 'X'
var changePlayer = function(){
  if(this.innerHTML) {
    return;
  }
  this.innerHTML = nextPlayer;
  if (nextPlayer === 'X') {
    nextPlayer = 'O'
  } else {
    nextPlayer = 'X'
  }
}
var updateMessage = function(str) {
  document.getElementByTagName('caption').innerHTML = str
}
var boxes = Array.from(document.getElementsByTagName('td'));


boxes.forEach(element => element.addEventListener("click", changePlayer))
document.getElementsByTagName('button')[0].addEventListener("click", function() {
  boxes.forEach(element => element.innerHTML = "");
  nextPlayer = 'X'
  updateMessage(`Player ${nextPlayer}'s Turn`)
})

