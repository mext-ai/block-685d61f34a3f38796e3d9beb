import React, { useState } from 'react';

interface LearningCheckpoint1Props {
  onComplete: (score: number) => void;
}

const LearningCheckpoint1: React.FC<LearningCheckpoint1Props> = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = selectedAnswer === 'tombs';
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setTimeout(() => {
      onComplete(correct ? 1 : 0);
    }, 2000);
  };

  return (
    <div className="learning-checkpoint">
      <div className="checkpoint-header">
        <h2>🏛️ Chamber of Knowledge #1</h2>
        <p>The hieroglyphs on the wall reveal ancient secrets...</p>
      </div>

      <div className="learning-content">
        <div className="fact-box">
          <h3>📚 Did You Know?</h3>
          <p>
            The Egyptian pyramids were built as eternal resting places for pharaohs and their treasures. 
            These massive structures were designed to protect the pharaoh's body and belongings for the afterlife. 
            The Great Pyramid of Giza took over 20 years to build and contained secret chambers and passages!
          </p>
        </div>

        <div className="challenge-section">
          <h3>🧩 Challenge: Unlock the Chamber</h3>
          <p>What was the main purpose of the Egyptian pyramids?</p>
          
          <div className="answer-options">
            <label className={`option ${selectedAnswer === 'storage' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="purpose"
                value="storage"
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              <span>🏪 Storage warehouses for grain and food</span>
            </label>
            
            <label className={`option ${selectedAnswer === 'tombs' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="purpose"
                value="tombs"
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              <span>⚱️ Tombs for pharaohs and their treasures</span>
            </label>
            
            <label className={`option ${selectedAnswer === 'temples' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="purpose"
                value="temples"
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              <span>🏛️ Temples for daily worship ceremonies</span>
            </label>
          </div>

          {!showFeedback && (
            <button 
              className="submit-button" 
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              Unlock Chamber 🗝️
            </button>
          )}

          {showFeedback && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <div>
                  <h4>🎉 Excellent! Chamber Unlocked!</h4>
                  <p>You're right! Pyramids were magnificent tombs built to ensure pharaohs had everything they needed in the afterlife. The chamber door creaks open...</p>
                </div>
              ) : (
                <div>
                  <h4>🤔 Not quite right...</h4>
                  <p>The pyramids were actually tombs for pharaohs, not storage or temples. But don't worry - ancient magic lets you try again! The correct path becomes clear...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningCheckpoint1;