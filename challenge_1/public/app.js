var Model = {
  nextPlayer: 'X',
  playerXName: '',
  playerOName: '',
  board: {},
  xWins: 0,
  oWins: 0,
}

var View = {
  message: document.getElementById('board').caption,
  playerXName:  document.getElementById('X'),
  playerOName: document.getElementById('O'),
  boxes:  Array.from(document.getElementsByTagName('td')),
  reset: document.getElementById('reset'),
  XWins: document.getElementById('XWins'),
  OWins: document.getElementById('OWins')
}

var Controller = {
  addListeners: function() {
    View.boxes.forEach(element => element.addEventListener("click", Controller.changePlayer));
  },
  removeListeners: function() {
    View.boxes.forEach(element => element.removeEventListener("click", Controller.changePlayer));
  },
  updateMessage: function(str) {
    console.log(View.message)
    View.message.innerText = str
    console.log(View.message)
  },
  checkBoardForWin: function() {
    var rowone = Model.board[1] + Model.board[2] + Model.board[3];
    var rowtwo = Model.board[4] + Model.board[5] + Model.board[6];
    var rowthree = Model.board[7] + Model.board[8] + Model.board[9];
    var colOne = Model.board[1] + Model.board[4] + Model.board[7];
    var colTwo = Model.board[2] + Model.board[5] + Model.board[8];
    var colThree = Model.board[3] + Model.board[6] + Model.board[9];
    var majDiag = Model.board[1] + Model.board[5] + Model.board[9];
    var minDiag = Model.board[3] + Model.board[5] + Model.board[7];
    if (rowone === 'XXX' || rowone === 'OOO') {
      Controller.updateMessage(`${rowone[0]} WINS`)
      return true;
    }
    if (rowtwo === 'XXX' || rowtwo === 'OOO') {
      Controller.updateMessage(`${rowtwo[0]} WINS`)
      return true;
    }
    if (rowthree === 'XXX' || rowthree === 'OOO') {
      Controller.updateMessage(`${rowthree[0]} WINS`)
      return true;
    }
    if (colOne === 'XXX' || colOne === 'OOO') {
      Controller.updateMessage(`${colOne[0]} WINS`)
      return true;
    }
    if (colTwo === 'XXX' || colTwo === 'OOO') {
      Controller.updateMessage(`${colTwo[0]} WINS`)
      return true;
    }
    if (colThree === 'XXX' || colThree === 'OOO') {
      Controller.updateMessage(`${colThree[0]} WINS`)
      return true;
    }
    if (minDiag === 'XXX' || minDiag === 'OOO') {
      Controller.updateMessage(`${minDiag[0]} WINS`)
      return true;
    }
    if (majDiag === 'XXX' || majDiag === 'OOO') {
      Controller.updateMessage(`${majDiag[0]} WINS`)
      return true;
    }
  if (Object.values(board).length === 9) {
    Controller.updateMessage(`X Ties O Please Restart`)
    return true;
  }
    return false;
  },

  changePlayer: function() {
    // if its already been clicked, do nothing
    if (this.innerHTML) {
      return;
    }
    //Set the inside Text to be the X || O plus the player name
    this.innerHTML = Model.nextPlayer + ' ' + Model[`player${Model.nextPlayer}Name`];
    //Tell our Model who is where
    Model.board[this.id] = Model.nextPlayer;
    //Check for Win
    if(Controller.checkBoardForWin()) {
      //if there is a win disable clicking
      Controller.removeListeners();
      //Increment the current winner's count
      eval('Model.'+ Model.nextPlayer.toLowerCase() + `Wins++`)
      //update the view to reflect that count
      View[`${Model.nextPlayer}Wins`].innerText = `Player ${Model.nextPlayer} has wins: ${eval('Model.'+ Model.nextPlayer.toLowerCase() + 'Wins')}`
      return;
    } else {
      //change the turn and update the message
      Model.nextPlayer === 'X' ? Model.nextPlayer = 'O' : Model.nextPlayer = 'X'
      Controller.updateMessage(`Player ${Model.nextPlayer}'s Turn`)
    }
  },
  prepareReset: function() {
    View.reset.addEventListener('click', function() {
      View.boxes.forEach(element => element.innerHTML = "")
      Controller.updateMessage(`Game Restarted, Player ${Model.nextPlayer}'s Turn`);
      Controller.addListeners();
      Model.board = {};
    })
  },
  onPlayerNameChange: function() {
    View.playerXName.addEventListener('input', function(e) {
      console.log('Player X Name Change')
      Model.playerXName = e.target.value;
    })
    View.playerOName.addEventListener('input', function(e) {
      Model.playerOName = e.target.value;
    })
  }
}



  Controller.prepareReset();
  Controller.onPlayerNameChange();
  Controller.addListeners();

