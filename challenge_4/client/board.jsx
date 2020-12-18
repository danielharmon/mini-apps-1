import React from 'react'
import Red from './red.jsx'
import Yellow from './yellow.jsx'

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
      winner: undefined
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
        console.log(`${board[i][col]} i is ${i} col is ${col}`)
        this.setState({board: board})
        var winner = checkBoardForWin();
        this.setState({winner: winner})
        this.state.turn === 'red' ? this.setState({turn: 'yellow'}) : this.setState({turn: 'red'})
        break;
      }
    }
  }

  checkBoardForWin() {
    var board = this.state.board
    var checkLeft = (i, j) => {
      for (let k = i; k > i-5;k--) {
        if(board[k][j] !== board[i][j] || k < 0) { return false; }
      }
      return true;
    }
    var checkRight = (i, j) => {
      for (let k = i; k < i+5;k++) {
        if(board[k][j] !== board[i][j] || k > 7) { return false; }
      }
      return true;
    }
    var checkUp = (i, j) => {
      for (let k = i; k < i+5;k++) {
        if(board[i][k] !== board[i][j] || k > 6) { return false; }
      }
      return true;
    }
    var checkDown = (i, j) => {
      for (let k = j; k < j-5;k--) {
        if(board[i][k] !== board[i][j] || j < 0) { return false; }
      }
      return true;
    }
    var checkMajorDiags = (i, j) => {
      for (let k = i; k < i+5; k++) {
        if(board[k][k] !== board[i][j] || k > 6) {return false;}
      }
      return true;
    }
    var checkMinorDiags = (i, j) => {
      for (let k = i; k < i-5; k--) {
        if(board[k][k] !== board[i][j] || k < 0) {return false;}
      }
      return true;
    }
    board.forEach((row, i) => {
      row.forEach((piece, j) => {
        if (checkDown(i, j) || checkUp(i, j) || checkLeft(i,j) || checkRight(i,j) || checkMajorDiags(i,j) || checkMinorDiags(i,j)) { return board[i][j] }
      })
    })
  }

  render() {
    var boardView = this.state.board.map((row, i) => {
      var pieces = row.map((col, j) => {
        if (col === 0) { return <td><div id={`${i}${j}`} className="white"></div></td> }
        else if (col === -1) { return <td><div id={`${i}${j}`} className="yellow"></div></td> }
        else if (col === 1) { return <td><div id={`${i}${j}`} className="red"></div></td> }
      })
      return (
      <tr>{pieces}</tr>)
    })
    var won = this.state.winner > 0 ? 'red' : 'yellow'
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
          <th colSpan="7">Connect Four     WINNER!!!: {won}</th>
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