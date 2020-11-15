var nextPlayer = 'X'
var board = {}
var rowone = board[1] + board[2] + board[3];
var rowtwo = board[4]+ board[5] + board[6];
var rowthree = board[7]+ board[8] + board[9];
var colOne = board[1]+ board[4] + board[7];
var colTwo = board[2]+ board[5] + board[8];
var colThree = board[3]+ board[6] + board[9];
var majDiag = board[1]+ board[5] + board[9];
var minDiag = board[3]+ board[5] + board[7];

var updateMessage = function(str) {
  console.log(str)
  document.getElementById('board').caption.innerText = str
}
var checkBoardForWin = function() {
  var rowone = board[1] + board[2] + board[3];
  var rowtwo = board[4] + board[5] + board[6];
  var rowthree = board[7] + board[8] + board[9];
  var colOne = board[1] + board[4] + board[7];
  var colTwo = board[2] + board[5] + board[8];
  var colThree = board[3] + board[6] + board[9];
  var majDiag = board[1] + board[5] + board[9];
  var minDiag = board[3] + board[5] + board[7];
  if (rowone === 'XXX' || rowone === 'OOO') {
    updateMessage(`${rowone} WINS`)
    return true;
  }
  if (rowtwo === 'XXX' || rowtwo === 'OOO') {
    updateMessage(`${rowtwo} WINS`)
    return true;
  }
  if (rowthree === 'XXX' || rowthree === 'OOO') {
    updateMessage(`${rowthree} WINS`)
    return true;
  }
  if (colOne === 'XXX' || colOne === 'OOO') {
    updateMessage(`${colOne} WINS`)
    return true;
  }
  if (colTwo === 'XXX' || colTwo === 'OOO') {
    updateMessage(`${colTwo} WINS`)
    return true;
  }
  if (colThree === 'XXX' || colThree === 'OOO') {
    updateMessage(`${colThree} WINS`)
    return true;
  }
  if (minDiag === 'XXX' || minDiag === 'OOO') {
    updateMessage(`${minDiag} WINS`)
    return true;
  }
  if (majDiag === 'XXX' || majDiag === 'OOO') {
    updateMessage(`${majDiag} WINS`)
    return true;
  }
if (Object.values(board).length === 9) {
  updateMessage(`Tie Game Please Restart`)
  return true;
}
  return false;
}
var changePlayer = function(){
  if (this.innerHTML) {
    return;
  }
  this.innerHTML = nextPlayer;
  board[this.id] = nextPlayer;
  if(checkBoardForWin()) {
    removeListeners();
    return;
  } else if (nextPlayer === 'X') {
    nextPlayer = 'O'
  } else {
    nextPlayer = 'X'
  }
  updateMessage(`Player ${nextPlayer}'s Turn`)
}
var boxes = Array.from(document.getElementsByTagName('td'));

var addListeners = function() {
  boxes.forEach(element => element.addEventListener("click", changePlayer))
}
var removeListeners = function() {
  boxes.forEach(element => element.removeEventListener("click", changePlayer))
}




document.getElementsByTagName('button')[0].addEventListener("click", function() {
  boxes.forEach(element => element.innerHTML = "");
  nextPlayer = 'X'
  updateMessage(`Game Restarted Player X's Turn`)
  addListeners();
  board = {}
})
addListeners();

