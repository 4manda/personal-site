import React from 'react';
import '../styles/TicTac.css';

function Desc() {
  return (
    <div>
    <h1>TicTacToe App</h1>
    <p>This game was created from the React Official Tutorial</p>
    </div>
  );
}

// functional component for each square
function Square(props) {
  if (props.win === true) {
    return (
      <button className="square" onClick={() => props.onClick()} style={{background:'#e4e4e4'}}>
        {props.value}
      </button>
    );
  }
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a,b,c]];
    }
  }
  const catwin = squares.indexOf(null);
  if (catwin === -1) {
    return ['CAT'];
  }
  return null;
}


class Board extends React.Component {
  renderSquare(i) {
    if (calculateWinner(this.props.squares) !== null && calculateWinner(this.props.squares)[1] !== undefined) {
      const winArray = calculateWinner(this.props.squares)[1];
      if (winArray[0] === i || winArray[1] === i || winArray[2] === i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} win={true} />;
      }
    }
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} win={false} />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class TicTacApp extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start';
      if (move === this.state.stepNumber) {
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}><strong>{desc}</strong></a>
          </li>
        );
      }
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="main">
      <Desc />
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares} 
            onClick={(i) => this.handleClick(i)} 
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
      </div>
    );
  }
}

export default TicTacApp;
