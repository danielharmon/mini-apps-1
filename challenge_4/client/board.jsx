import React from 'react'


class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      turn: 'red',
      board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
      ],
      winner: undefined,
      emptyBoard: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
      ],
    }
    this.onClick = this.onClick.bind(this);
    this.checkBoardForWin = this.checkBoardForWin.bind(this);
  }
  onClick(e) {
    var col = Number(e.target.id)
    var board = this.state.board
    for (let i = board.length - 1; i >= 0; i--) {
      if(board[i][col] === 0) {
        this.state.turn === 'red' ? board[i][col]++ : board[i][col]--
        this.setState({board: board})
        var winner = this.checkBoardForWin();
        this.setState({winner: winner})
        this.state.turn === 'red' ? this.setState({turn: 'yellow'}) : this.setState({turn: 'red'})
        break;
      }
    }
  }

  checkBoardForWin() {
    var board = this.state.board
    var checkLeft = (i, j) => {
      for (let k = j; k > j-4;k--) {
        if(k < 0 || board[i][k] !== board[i][j]) { return false; }
      }
      return true;
    }
    var checkRight = (i, j) => {
      for (let k = j; k < j+4;k++) {
        if(k > 5 || board[i][k] !== board[i][j]) { return false; }
      }
      return true;
    }
    var checkDown = (i, j) => {
      for (let k = i; k < i+4;k++) {
        if(k > 5 || board[k][j] !== board[i][j]) { return false; }
      }
      return true;
    }
    var checkUp = (i, j) => {
      for (let k = i; k > i-4;k--) {
        if(k < 0 || board[k][j] !== board[i][j]) { return false; }
      }
      return true;
    }
    var checkMajorDiags = (i, j) => {
      if (i < 3 || j > 3) { return false;}
      var col = j
      for (let row = i; row > i-4; row--) {
        if (board[row][col] !== board[i][j]) {return false}
        col++;
      }
      return true;
    }
    var checkMinorDiags = (i, j) => {
      if (j < 3 || i > 2) { return false; }
      var col = j
      for (let k = i; k < i+4; k++) {
        if(board[k][col] !== board[i][j] || k < 0) {return false;}
        col++;
      }
      return true;
    }
    var checkTie = () => {

    }
    var won = undefined;
    var tie = true;
    board.forEach((row, i) => {
      row.forEach((piece, j) => {
        if(board[i][j] === 0) {tie = false}
        if(board[i][j] !== 0) {
          if (checkDown(i, j) || checkUp(i, j) || checkLeft(i,j) || checkRight(i,j) || checkMajorDiags(i,j) || checkMinorDiags(i,j)) { won = board[i][j] }
        }
      })
    })
    if (tie && won === undefined) {
      return 'tie'
    } else return won
  }

  render() {
    var won = this.state.winner > 0 ? 'red' : 'yellow'
    if(this.state.winner === 'tie') { won = 'tie'}
    var boardView = this.state.board.map((row, i) => {
      var pieces = row.map((col, j) => {
        if (col === 0) { return <td><div id={`${i}${j}`} className="white"></div></td> }
        else if (col === -1) { return <td><div id={`${i}${j}`} className="yellow"></div></td> }
        else if (col === 1) { return <td><div id={`${i}${j}`} className="red"></div></td> }
      })
      return (
      <tr>{pieces}</tr>)
    })
    return (
      <table >
        {!this.state.winner &&
         <thead>
          <tr>
            <th colSpan="7">Connect Four     Turn: {this.state.turn}</th>
          </tr>

           <tr>
            <td><button id="0"onClick={(e)=>this.onClick(e)}>Drop</button></td>
            <td><button id="1"onClick={(e)=>this.onClick(e)}>Drop</button></td>
            <td><button id="2"onClick={(e)=>this.onClick(e)}>Drop</button></td>
            <td><button id="3"onClick={(e)=>this.onClick(e)}>Drop</button></td>
            <td><button id="4"onClick={(e)=>this.onClick(e)}>Drop</button></td>
            <td><button id="5"onClick={(e)=>this.onClick(e)}>Drop</button></td>
            <td><button id="6"onClick={(e)=>this.onClick(e)}>Drop</button></td>
          </tr>
        </thead>}
        {this.state.winner &&
        <thead>
        <tr>
          <th colSpan="7">Connect Four     WINNER!!!: {won}<button onClick={()=> {
              this.setState({winner: undefined, turn: 'red', board: [
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
              ]})}}>Reset</button></th>
        </tr>
        </thead>
        }

        <tbody>
          {boardView}
        </tbody>
      </table>
    )
  }
}

export default Board