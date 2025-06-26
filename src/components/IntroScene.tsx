import React from 'react';

interface IntroSceneProps {
  onStart: () => void;
}

const IntroScene: React.FC<IntroSceneProps> = ({ onStart }) => {
  return (
    <div className="intro-scene">
      <div className="scene-content">
        <h1>🏺 The Mystery of the Pyramids 🏺</h1>
        <div className="story-text">
          <p>
            Welcome, young time traveler! You've just arrived in Ancient Egypt, 4,500 years ago. 
            The Great Pyramid of Giza towers before you, its limestone blocks gleaming in the desert sun. 
            Your mission: explore the pyramid's secret chambers and recover the lost Pharaoh's Scroll 
            of Wisdom. But beware—ancient traps and riddles guard the treasure! 
            Use your knowledge of Egyptian history to navigate safely through the mysterious passages.
          </p>
        </div>
        <div className="character-selection">
          <div className="explorer-avatar">
            <div className="avatar-icon">🔍</div>
            <p>Young Archaeologist</p>
          </div>
        </div>
        <button className="start-button" onClick={onStart}>
          Enter the Pyramid! 🗿
        </button>
      </div>
    </div>
  );
};

export default IntroScene;