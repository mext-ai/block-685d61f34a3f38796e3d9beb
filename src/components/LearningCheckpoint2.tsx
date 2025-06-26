import React, { useState } from 'react';

interface LearningCheckpoint2Props {
  onComplete: (score: number) => void;
}

const LearningCheckpoint2: React.FC<LearningCheckpoint2Props> = ({ onComplete }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const constructionSteps = [
    { id: 'foundation', text: '1. Build strong foundation', emoji: '🗿' },
    { id: 'transport', text: '2. Transport massive stones', emoji: '🚛' },
    { id: 'ramps', text: '3. Use ramps to lift blocks', emoji: '📐' },
    { id: 'precision', text: '4. Place blocks with precision', emoji: '🎯' }
  ];

  const correctOrder = ['foundation', 'transport', 'ramps', 'precision'];

  const handleDragStart = (e: React.DragEvent, stepId: string) => {
    setDraggedItem(stepId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && !droppedItems.includes(draggedItem)) {
      const newDroppedItems = [...droppedItems, draggedItem];
      setDroppedItems(newDroppedItems);
      
      if (newDroppedItems.length === 4) {
        // Check if order is correct
        const correct = newDroppedItems.every((item, index) => item === correctOrder[index]);
        setIsCorrect(correct);
        setShowFeedback(true);
        
        setTimeout(() => {
          onComplete(correct ? 1 : 0);
        }, 2500);
      }
    }
    setDraggedItem(null);
  };

  const resetChallenge = () => {
    setDroppedItems([]);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  return (
    <div className="learning-checkpoint">
      <div className="checkpoint-header">
        <h2>🏗️ Chamber of Construction #2</h2>
        <p>Ancient engineering secrets await your discovery...</p>
      </div>

      <div className="learning-content">
        <div className="fact-box">
          <h3>⚒️ How Did They Build These Giants?</h3>
          <p>
            The ancient Egyptians were incredible engineers! They moved 2.3 million stone blocks, 
            each weighing 2-15 tons, using only simple tools like copper chisels, wooden levers, 
            and rope. They built ramps to move blocks up the pyramid and used the stars to align 
            everything perfectly. It took over 100,000 workers and 20+ years!
          </p>
        </div>

        <div className="challenge-section">
          <h3>🧩 Challenge: Rebuild the Pyramid</h3>
          <p>Drag the construction steps into the correct order to unlock the next chamber!</p>
          
          <div className="construction-game">
            <div className="available-steps">
              <h4>Available Steps:</h4>
              {constructionSteps
                .filter(step => !droppedItems.includes(step.id))
                .map(step => (
                  <div
                    key={step.id}
                    className="construction-step draggable"
                    draggable
                    onDragStart={(e) => handleDragStart(e, step.id)}
                  >
                    <span className="step-emoji">{step.emoji}</span>
                    <span className="step-text">{step.text}</span>
                  </div>
                ))}
            </div>

            <div className="drop-zone-container">
              <h4>Construction Sequence:</h4>
              <div 
                className="drop-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {droppedItems.length === 0 && (
                  <div className="drop-placeholder">
                    Drop construction steps here in order! 🏗️
                  </div>
                )}
                {droppedItems.map((stepId, index) => {
                  const step = constructionSteps.find(s => s.id === stepId)!;
                  return (
                    <div key={index} className="dropped-step">
                      <span className="step-emoji">{step.emoji}</span>
                      <span className="step-text">{step.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {showFeedback && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <div>
                  <h4>🎉 Amazing! You've Mastered Ancient Engineering!</h4>
                  <p>Perfect! You understand how the ancient Egyptians built these wonders. The secret passage opens to reveal the final chamber...</p>
                </div>
              ) : (
                <div>
                  <h4>🤔 Almost There!</h4>
                  <p>The construction sequence isn't quite right. Remember: foundation first, then transport, then ramps, then precision placement!</p>
                  <button className="retry-button" onClick={resetChallenge}>
                    Try Again 🔄
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningCheckpoint2;