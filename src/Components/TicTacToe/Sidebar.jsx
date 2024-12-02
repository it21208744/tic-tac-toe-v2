import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css' // Link to the CSS file

const Sidebar = () => {
  const navigate = useNavigate()
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)

  const toggleSuggestions = () => {
    setIsSuggestionsOpen(!isSuggestionsOpen)
  }

  return (
    <div className="sidebar">
      <ul className="menu">
        <li className="menu-item" onClick={() => navigate('/')}>
          Calibrator
        </li>
        <li className="menu-item" onClick={() => navigate('/memoryActivity')}>
          Memory Activity
        </li>
        <li
          className="menu-item"
          onClick={() => navigate('/attentionTraining')}
        >
          Attention Training
        </li>
        <li className="menu-item" onClick={() => navigate('/logicThinking')}>
          Logic Thinking
        </li>
        <li className="menu-item" onClick={() => navigate('/results')}>
          Results
        </li>
        <li className="menu-item" onClick={toggleSuggestions}>
          Suggestion Activity
          <span className="arrow">{isSuggestionsOpen ? '▼' : '▶'}</span>
        </li>
        {isSuggestionsOpen && (
          <ul className="sub-menu">
            <li className="sub-menu-item" onClick={() => navigate('/memory')}>
              Memory
            </li>
            <li
              className="sub-menu-item"
              onClick={() => navigate('/attention')}
            >
              Attention
            </li>
            <li className="sub-menu-item" onClick={() => navigate('/logic')}>
              Logic
            </li>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
