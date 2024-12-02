import React, { useState } from "react";
import "./Home.css"; // Add CSS for styling the component

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("Memory Activity");
 
  
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  // Define the content for each activity
  const renderContent = () => {
    switch (selectedOption) {
      case "Memory Activity":
        return <div>Welcome to the Memory Activity Section</div>;
      case "Attention Training":
        return <div>Welcome to the Attention Training Section</div>;
      case "Logic Thinking":
        return <div>Welcome to the Logic Thinking Section</div>;
      case "Suggestion Activity":
        return <div>Welcome to the Suggestion Activity Section</div>;
      default:
        return <div>Select an activity from the navigation bar</div>;
    }
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2>Activities</h2>
        <ul className="nav-links">
          <li
            className={selectedOption === "Memory Activity" ? "active" : ""}
            onClick={() => setSelectedOption("Memory Activity")}
          >
            Memory Activity
          </li>
          
          <li
            className={selectedOption === "Attention Training" ? "active" : ""}
            onClick={() => setSelectedOption("Attention Training")}
          >
            Attention Training
          </li>
          <li
            className={selectedOption === "Logic Thinking" ? "active" : ""}
            onClick={() => setSelectedOption("Logic Thinking")}
          >
            Logic Thinking
          </li>
          <li
            className={selectedOption === "Suggestion Activity" ? "active" : ""}
          >
            <div onClick={toggleDropdown}>Suggestion Activity</div>
            {showDropdown && (
              <ul className="dropdown">
                <li
                  className={selectedOption === "Memory" ? "active" : ""}
                  onClick={() => setSelectedOption("Memory")}
                >
                  Memory
                </li>
                <li
                  className={selectedOption === "Attention" ? "active" : ""}
                  onClick={() => setSelectedOption("Attention")}
                >
                  Attention
                </li>
                <li
                  className={selectedOption === "Logic" ? "active" : ""}
                  onClick={() => setSelectedOption("Logic")}
                >
                  Logic
                </li>
              </ul>
            )}
          </li>
        </ul>
      </aside>
      <main className="content">
      <div>{selectedOption ? `You selected: ${selectedOption}` : "Select an activity from the navigation bar."}</div>

      </main>
    </div>
  );
};

export default Home; 