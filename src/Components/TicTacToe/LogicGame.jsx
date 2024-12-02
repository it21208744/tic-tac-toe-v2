import React, { useState, useEffect } from 'react';
import './LogicGame.css';

class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getTopBox() {
    if (this.y === 0) return null;
    return new Box(this.x, this.y - 1);
  }

  getRightBox() {
    if (this.x === 3) return null;
    return new Box(this.x + 1, this.y);
  }

  getBottomBox() {
    if (this.y === 3) return null;
    return new Box(this.x, this.y + 1);
  }

  getLeftBox() {
    if (this.x === 0) return null;
    return new Box(this.x - 1, this.y);
  }

  getNextdoorBoxes() {
    return [
      this.getTopBox(),
      this.getRightBox(),
      this.getBottomBox(),
      this.getLeftBox(),
    ].filter((box) => box !== null);
  }

  getRandomNextdoorBox() {
    const nextdoorBoxes = this.getNextdoorBoxes();
    return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
  }
}

const swapBoxes = (grid, box1, box2) => {
  const temp = grid[box1.y][box1.x];
  grid[box1.y][box1.x] = grid[box2.y][box2.x];
  grid[box2.y][box2.x] = temp;
};

const isSolved = (grid) => {
  return (
    grid[0][0] === 1 &&
    grid[0][1] === 2 &&
    grid[0][2] === 3 &&
    grid[0][3] === 4 &&
    grid[1][0] === 5 &&
    grid[1][1] === 6 &&
    grid[1][2] === 7 &&
    grid[1][3] === 8 &&
    grid[2][0] === 9 &&
    grid[2][1] === 10 &&
    grid[2][2] === 11 &&
    grid[2][3] === 12 &&
    grid[3][0] === 13 &&
    grid[3][1] === 14 &&
    grid[3][2] === 15 &&
    grid[3][3] === 0
  );
};

const getRandomGrid = () => {
  let grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ];

  let blankBox = new Box(3, 3);
  for (let i = 0; i < 1000; i++) {
    const randomNextdoorBox = blankBox.getRandomNextdoorBox();
    swapBoxes(grid, blankBox, randomNextdoorBox);
    blankBox = randomNextdoorBox;
  }

  if (isSolved(grid)) return getRandomGrid();
  return grid;
};

function LogicGame() {
  const [grid, setGrid] = useState(getRandomGrid());
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState('ready');
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (status === 'playing') {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [status]);

  const handleClickBox = (box) => {
    const nextdoorBoxes = box.getNextdoorBoxes();
    const blankBox = nextdoorBoxes.find(
      (nextdoorBox) => grid[nextdoorBox.y][nextdoorBox.x] === 0
    );
    if (blankBox) {
      const newGrid = [...grid];
      swapBoxes(newGrid, box, blankBox);
      setGrid(newGrid);
      setMoves((prevMoves) => prevMoves + 1);

      if (isSolved(newGrid)) {
        clearInterval(intervalId);
        setStatus('won');
      }
    }
  };

  const handlePlayReset = () => {
    if (status === 'ready' || status === 'won') {
      setGrid(getRandomGrid());
      setMoves(0);
      setTime(0);
      setStatus('playing');
    } else {
      setStatus('ready');
      clearInterval(intervalId);
    }
  };

  return (
    <div className="game">
      <div className="grid">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleClickBox(new Box(j, i))}
              disabled={status !== 'playing'}
            >
              {cell === 0 ? '' : cell}
            </button>
          ))
        )}
      </div>

      <div className="footer">
        <button onClick={handlePlayReset}>
          {status === 'ready' || status === 'won' ? 'Play' : 'Reset'}
        </button>
        <span id="move">Move: {moves}</span>
        <span id="time">Time: {time}</span>
      </div>

      {status === 'won' && <h1 className="message">You win!</h1>}
    </div>
  );
}

export default LogicGame;
