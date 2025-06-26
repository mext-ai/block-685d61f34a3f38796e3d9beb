import React, { useState, useEffect } from 'react';
import IntroScene from './components/IntroScene';
import LearningCheckpoint1 from './components/LearningCheckpoint1';
import LearningCheckpoint2 from './components/LearningCheckpoint2';
import FinalChallenge from './components/FinalChallenge';
import CompletionScreen from './components/CompletionScreen';
import './styles.css';

interface BlockProps {
  title?: string;
  description?: string;
}

type GameState = 'intro' | 'checkpoint1' | 'checkpoint2' | 'final' | 'complete';

const Block: React.FC<BlockProps> = ({ title, description }) => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [scores, setScores] = useState<number[]>([]);
  const [escaped, setEscaped] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const maxScore = 4; // 1 for each checkpoint + up to 3 for final challenge

  useEffect(() => {
    // Send completion event when game is complete
    if (gameState === 'complete') {
      const totalScore = scores.reduce((sum, score) => sum + score, 0);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      const completionData = {
        type: 'BLOCK_COMPLETION',
        blockId: 'ancient-egypt-adventure',
        completed: true,
        score: totalScore,
        maxScore: maxScore,
        timeSpent: timeSpent,
        data: {
          escaped: escaped,
          checkpointScores: scores,
          explorerTitle: getExplorerTitle(totalScore)
        }
      };

      // Send to both parent and current window
      window.postMessage(completionData, '*');
      window.parent.postMessage(completionData, '*');
    }
  }, [gameState, scores, escaped, startTime, maxScore]);

  const getExplorerTitle = (totalScore: number) => {
    if (totalScore === maxScore) return "Master Egyptologist";
    if (totalScore >= 3) return "Junior Egyptologist";
    if (totalScore >= 2) return "Pyramid Explorer";
    return "Curious Adventurer";
  };

  const handleStart = () => {
    setStartTime(Date.now());
    setGameState('checkpoint1');
  };

  const handleCheckpoint1Complete = (score: number) => {
    setScores([score]);
    setTimeout(() => {
      setGameState('checkpoint2');
    }, 1000);
  };

  const handleCheckpoint2Complete = (score: number) => {
    setScores(prev => [...prev, score]);
    setTimeout(() => {
      setGameState('final');
    }, 1000);
  };

  const handleFinalComplete = (score: number, hasEscaped: boolean) => {
    setScores(prev => [...prev, score]);
    setEscaped(hasEscaped);
    setTimeout(() => {
      setGameState('complete');
    }, 1000);
  };

  const handlePlayAgain = () => {
    setGameState('intro');
    setScores([]);
    setEscaped(false);
    setStartTime(Date.now());
  };

  const totalScore = scores.reduce((sum, score) => sum + score, 0);

  return (
    <div className="ancient-egypt-adventure">
      <div className="game-container">
        {gameState === 'intro' && (
          <IntroScene onStart={handleStart} />
        )}
        
        {gameState === 'checkpoint1' && (
          <LearningCheckpoint1 onComplete={handleCheckpoint1Complete} />
        )}
        
        {gameState === 'checkpoint2' && (
          <LearningCheckpoint2 onComplete={handleCheckpoint2Complete} />
        )}
        
        {gameState === 'final' && (
          <FinalChallenge 
            onComplete={handleFinalComplete}
            totalScore={totalScore}
          />
        )}
        
        {gameState === 'complete' && (
          <CompletionScreen
            escaped={escaped}
            totalScore={totalScore}
            maxScore={maxScore}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
};

export default Block;