import React from 'react'
import cogni from '../Assets/group.png' // Ensure the path to the image file is correct
import logicGame from '../Assets/logicgame.PNG'
import memoryGame from '../Assets/memory.PNG' // Path to the memory game image
import attentionGame from '../Assets/sa.PNG' // Path to the attention game image
import { useEffect } from 'react'
import './Calibrator.css' // Link to the CSS file

const Calibrator = () => {
  const webgazer = window.webgazer

  useEffect(() => {
    // const listener = (data, elapsedTime) => {
    //   if (data) {
    //     setGazeDataCollection((prev) => [
    //       ...prev,
    //       { x: data.x, y: data.y, time: elapsedTime / 1000 },
    //     ])
    //   }
    // }
    webgazer
      // .setGazeListener(listener)
      .setRegression('ridge') // 'weightedRidge' 'threadedRidge'
      .showVideo(false)
      .begin()
      .then(() => console.log('WebGazer initialized'))
    return () => {
      webgazer.clearGazeListener()
    }
  })
  return (
    <div className="calibrator-container">
      {/* Header Section */}
      <div className="image-container">
        <img src={cogni} alt="Calibrator Logo" className="calibrator-image" />
        <div className="student-overlay">
          Cognitive Skills Empowerment for Autism
        </div>
      </div>
      <h1 className="calibrator-title"></h1>

      {/* Game Section */}
      <div className="game-row">
        {/* Logic Game */}
        <div className="game-card">
          <img src={logicGame} alt="Logic Game" className="game-image" />
          <div className="game-title">Logic Game</div>
          <button className="game-button">Start Game</button>
        </div>

        <div className="game-card">
          <img src={memoryGame} alt="Memory Game" className="game-image" />
          <div className="game-title">Memory Game</div>
          <button className="game-button">Start Game</button>
        </div>
        <div className="game-card">
          <img
            src={attentionGame}
            alt="Attention Game"
            className="game-image"
          />
          <div className="game-title">Attention Game</div>
          <button className="game-button">Start Game</button>
        </div>
      </div>
    </div>
  )
}

export default Calibrator
