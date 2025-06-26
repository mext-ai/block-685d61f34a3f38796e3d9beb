import React, { useState } from 'react';

interface FinalChallengeProps {
  onComplete: (score: number, escaped: boolean) => void;
  totalScore: number;
}

const FinalChallenge: React.FC<FinalChallengeProps> = ({ onComplete, totalScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [escaped, setEscaped] = useState(false);

  const questions = [
    {
      question: "The pharaoh's riddle echoes: 'What was my eternal resting place built for?'",
      options: [
        { id: 'afterlife', text: 'To protect me and my treasures for the afterlife', correct: true },
        { id: 'worship', text: 'For daily worship by my people', correct: false },
        { id: 'storage', text: 'To store grain for famines', correct: false }
      ]
    },
    {
      question: "The ancient inscription asks: 'How did my builders move the massive stones?'",
      options: [
        { id: 'magic', text: 'Using ancient magic spells', correct: false },
        { id: 'ramps', text: 'With ramps, levers, and thousands of workers', correct: true },
        { id: 'machines', text: 'With advanced machines', correct: false }
      ]
    },
    {
      question: "The final seal demands: 'How long did it take to build my Great Pyramid?'",
      options: [
        { id: 'few', text: 'A few years', correct: false },
        { id: 'twenty', text: 'Over 20 years', correct: true },
        { id: 'century', text: 'A full century', correct: false }
      ]
    }
  ];

  const handleAnswer = (answerId: string) => {
    const newAnswers = [...answers, answerId];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1000);
    } else {
      // Calculate final score
      const correctAnswers = newAnswers.filter((answer, index) => 
        questions[index].options.find(opt => opt.id === answer)?.correct
      ).length;
      
      const finalScore = correctAnswers;
      const hasEscaped = correctAnswers >= 2; // Need at least 2/3 correct to escape
      
      setEscaped(hasEscaped);
      setShowFeedback(true);
      
      setTimeout(() => {
        onComplete(finalScore, hasEscaped);
      }, 3000);
    }
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="final-challenge">
      <div className="challenge-header">
        <h2>🏺 The Pharaoh's Final Test 🏺</h2>
        <p>The tomb's exit is sealed! Answer the pharaoh's riddles to escape with the Scroll of Wisdom...</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}></div>
        </div>
        <span className="progress-text">Question {currentQuestion + 1} of {questions.length}</span>
      </div>

      {!showFeedback ? (
        <div className="riddle-section">
          <div className="pharaoh-avatar">
            <div className="pharaoh-icon">👑</div>
            <div className="speech-bubble">
              <p>{currentQ.question}</p>
            </div>
          </div>

          <div className="riddle-options">
            {currentQ.options.map(option => (
              <button
                key={option.id}
                className={`riddle-option ${selectedAnswer === option.id ? 'selected' : ''}`}
                onClick={() => handleAnswer(option.id)}
                disabled={selectedAnswer !== undefined}
              >
                {option.text}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <div className="answer-feedback">
              {currentQ.options.find(opt => opt.id === selectedAnswer)?.correct ? (
                <p className="correct-answer">✅ Correct! The pharaoh nods approvingly...</p>
              ) : (
                <p className="wrong-answer">❌ The pharaoh frowns, but shows mercy...</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="escape-result">
          {escaped ? (
            <div className="escaped">
              <h3>🎉 ESCAPED! You Are Free! 🎉</h3>
              <div className="success-animation">
                <div className="scroll">📜</div>
                <p>Congratulations! You've successfully retrieved the Pharaoh's Scroll of Wisdom!</p>
              </div>
              <div className="final-stats">
                <p>🏆 Final Score: {answers.filter((answer, index) => 
                  questions[index].options.find(opt => opt.id === answer)?.correct).length}/3 riddles solved</p>
                <p>⭐ Total Learning Score: {totalScore + answers.filter((answer, index) => 
                  questions[index].options.find(opt => opt.id === answer)?.correct).length}/4</p>
              </div>
            </div>
          ) : (
            <div className="trapped">
              <h3>🔒 The Tomb Remains Sealed...</h3>
              <p>The pharaoh's magic is too strong! But fear not, young explorer - your knowledge has grown, and you may try again when ready.</p>
              <div className="consolation-stats">
                <p>📚 Knowledge Gained: {answers.filter((answer, index) => 
                  questions[index].options.find(opt => opt.id === answer)?.correct).length}/3 riddles solved</p>
                <p>💡 You've learned valuable secrets of Ancient Egypt!</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinalChallenge;