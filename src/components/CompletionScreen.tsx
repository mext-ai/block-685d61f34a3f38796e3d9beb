import React from 'react';

interface CompletionScreenProps {
  escaped: boolean;
  totalScore: number;
  maxScore: number;
  onPlayAgain: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ 
  escaped, 
  totalScore, 
  maxScore, 
  onPlayAgain 
}) => {
  const getExplorerTitle = () => {
    if (totalScore === maxScore) return "🏆 Master Egyptologist";
    if (totalScore >= 3) return "🎖️ Junior Egyptologist";
    if (totalScore >= 2) return "📚 Pyramid Explorer";
    return "🔍 Curious Adventurer";
  };

  const getBadgeEmoji = () => {
    if (totalScore === maxScore) return "🏆";
    if (totalScore >= 3) return "🎖️";
    if (totalScore >= 2) return "🏅";
    return "⭐";
  };

  return (
    <div className="completion-screen">
      <div className="completion-header">
        <h1>🎉 Mission Complete! 🎉</h1>
        <div className="badge-display">
          <div className="badge-icon">{getBadgeEmoji()}</div>
          <h2>{getExplorerTitle()}</h2>
        </div>
      </div>

      <div className="mission-summary">
        {escaped ? (
          <div className="success-summary">
            <h3>🗿 You Successfully Escaped the Pyramid! 🗿</h3>
            <p>
              Incredible work, young archaeologist! You've uncovered the mysteries of Ancient Egypt, 
              solved the pharaoh's riddles, and retrieved the legendary Scroll of Wisdom. 
              Your knowledge of pyramid construction and Egyptian history has proven invaluable!
            </p>
          </div>
        ) : (
          <div className="learning-summary">
            <h3>📚 A Valuable Learning Adventure! 📚</h3>
            <p>
              While the tomb remained sealed, you've gained incredible knowledge about Ancient Egypt! 
              Every great explorer learns from their journey, and you've discovered amazing secrets 
              about how the pyramids were built and why they were so important to the pharaohs.
            </p>
          </div>
        )}

        <div className="learning-recap">
          <h3>🧠 What You Discovered:</h3>
          <ul>
            <li>🏺 Pyramids were built as eternal tombs for pharaohs and their treasures</li>
            <li>⚒️ Ancient Egyptians used ramps, levers, and incredible teamwork to build these wonders</li>
            <li>🕐 It took over 20 years and 100,000+ workers to build the Great Pyramid</li>
            <li>✨ The pyramids were aligned perfectly with the stars using amazing engineering skills</li>
          </ul>
        </div>

        <div className="final-score">
          <div className="score-display">
            <span className="score-number">{totalScore}</span>
            <span className="score-total">/ {maxScore}</span>
          </div>
          <p>Challenges Mastered</p>
        </div>
      </div>

      <div className="next-adventures">
        <h3>🗺️ Ready for Your Next Adventure?</h3>
        <div className="adventure-options">
          <div className="adventure-card">
            <div className="adventure-icon">🧟‍♂️</div>
            <h4>The Curse of the Mummy</h4>
            <p>Explore ancient burial rituals and mummification secrets</p>
          </div>
          <div className="adventure-card">
            <div className="adventure-icon">🗿</div>
            <h4>Decode the Rosetta Stone</h4>
            <p>Learn hieroglyphics and unlock ancient messages</p>
          </div>
          <div className="adventure-card">
            <div className="adventure-icon">🏺</div>
            <h4>Treasures of Tutankhamun</h4>
            <p>Discover the boy king's incredible tomb treasures</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="play-again-button" onClick={onPlayAgain}>
          🔄 Explore the Pyramid Again
        </button>
        <button className="share-button" onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'I just explored Ancient Egypt!',
              text: `I earned the title "${getExplorerTitle()}" by solving pyramid mysteries! 🏺`,
              url: window.location.href
            });
          }
        }}>
          📱 Share Your Achievement
        </button>
      </div>

      <div className="educational-note">
        <p>
          <strong>Keep Exploring:</strong> The ancient world is full of mysteries waiting to be discovered! 
          Visit museums, read books about archaeology, and never stop asking questions about history. 
          Who knows? Maybe you'll become a real archaeologist someday! 🔍✨
        </p>
      </div>
    </div>
  );
};

export default CompletionScreen;