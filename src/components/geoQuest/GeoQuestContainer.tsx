import React, { useState, useEffect, useCallback } from 'react';
import { mockGeoQuestQuestions, GeoQuestQuestion } from './data/mockGeoQuestData';
import GeoQuestGame from './GeoQuestGame';
import GeoQuestResults from './GeoQuestResults';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle, XCircle } from "lucide-react"; // Added icons for API status
import { toast } from "@/components/ui/use-toast"; // Import toast for feedback

type GameState = 'loading' | 'playing' | 'feedback' | 'submitting' | 'results' | 'error'; // Added 'submitting' state

const GeoQuestContainer: React.FC = () => {
  const [questions, setQuestions] = useState<GeoQuestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'timeout' | null>(null);
  const [gameState, setGameState] = useState<GameState>('loading');
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle'); // Track API submission

  // Load questions (currently mock data)
  useEffect(() => {
    // Placeholder for future API call
    /*
    async function fetchQuestions() {
      try {
        // const response = await fetch('http://localhost:8082/api/trivia/questions'); // Replace with actual API endpoint
        // if (!response.ok) throw new Error('Network response was not ok');
        // const data = await response.json();
        // setQuestions(data);
        setQuestions(mockGeoQuestQuestions); // Use mock data for now
        setGameState('playing');
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setGameState('error');
      }
    }
    fetchQuestions();
    */
    // Using mock data directly for now
    if (mockGeoQuestQuestions && mockGeoQuestQuestions.length > 0) {
      setQuestions(mockGeoQuestQuestions);
      setGameState('playing');
    } else {
      console.error('Mock questions data is missing or empty.');
      setGameState('error');
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && !selectedAnswer) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId);
            handleTimeout();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      setTimerIntervalId(intervalId);

      // Cleanup interval on component unmount or state change
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    } else if (timerIntervalId) {
      // Clear interval if game state changes or answer is selected
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
  }, [gameState, currentQuestionIndex, selectedAnswer]); // Rerun timer when question changes or game starts

  const handleTimeout = useCallback(() => {
    if (selectedAnswer) return; // Already answered
    setSelectedAnswer('timeout'); // Mark as timeout
    setFeedback('timeout');
    setGameState('feedback');
    moveToNextQuestionAfterDelay();
  }, [selectedAnswer]);

  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections

    if (timerIntervalId) clearInterval(timerIntervalId); // Stop timer on selection
    setTimerIntervalId(null);

    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 10);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setGameState('feedback');
    moveToNextQuestionAfterDelay();
  };

  const moveToNextQuestionAfterDelay = () => {
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        resetQuestionState();
      } else {
        // Transition to submitting state before showing results
        setGameState('submitting'); 
      }
    }, 1500); // Delay before moving to next question or results/submitting (1.5 seconds)
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    setTimer(20);
    setGameState('playing');
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    resetQuestionState();
    setSubmissionStatus('idle'); // Reset submission status on play again
  };

  // Function to submit results to backend
  const submitGameResults = async (finalScore: number) => {
    // Assuming userId might be needed later, add placeholder
    const userId = "placeholder-user-id"; // Replace with actual user ID when auth is available
    const payload = {
      userId: userId,
      score: finalScore,
      gameType: "geoQuest",
      timestamp: new Date().toISOString(),
    };

    console.log("Submitting GeoQuest results:", payload); // Log payload

    try {
      const response = await fetch('http://localhost:8082/submitGeoTrivia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Log detailed error if possible
        const errorBody = await response.text();
        console.error(`API Error ${response.status}: ${errorBody}`);
        throw new Error(`API responded with status ${response.status}`);
      }

      const result = await response.json();
      console.log("API Submission successful:", result);
      setSubmissionStatus('success');
      toast({ // Use toast for success feedback
        title: "Score Submitted!",
        description: "Your GeoQuest score has been saved.",
        variant: "default", 
      });

    } catch (error) {
      console.error('Failed to submit game results:', error);
      setSubmissionStatus('error');
      toast({ // Use toast for error feedback
        title: "Submission Failed",
        description: "Could not save your score. Please try again later.",
        variant: "destructive",
      });
    } finally {
      // Transition to results state regardless of submission success/failure
      setGameState('results'); 
    }
  };

  // Effect to trigger submission when gameState becomes 'submitting'
  useEffect(() => {
    if (gameState === 'submitting') {
      submitGameResults(score);
    }
  }, [gameState, score]); // Depend on gameState and score

  // Render logic based on gameState
  if (gameState === 'loading') {
    return <div className="text-center p-10">Loading Trivia...</div>; // Simple loading indicator
  }

  if (gameState === 'error') {
    return (
      <Alert variant="destructive" className="max-w-xl mx-auto my-10">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Trivia</AlertTitle>
        <AlertDescription>
          Could not load the GeoQuest trivia questions. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
  
  // Show submitting indicator or results screen
  if (gameState === 'submitting' || gameState === 'results') {
    return (
      <div className="flex flex-col items-center gap-4">
        {gameState === 'submitting' && (
          <div className="text-center p-10">Submitting score...</div> // Simple submitting indicator
        )}
        {gameState === 'results' && (
          <>
            {/* Optional: Display submission status briefly */}
            {submissionStatus === 'success' && (
              <Alert className="max-w-md mx-auto border-green-500 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your score was submitted successfully.</AlertDescription>
              </Alert>
            )}
            {submissionStatus === 'error' && (
              <Alert variant="destructive" className="max-w-md mx-auto">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Submission Error</AlertTitle>
                <AlertDescription>Failed to submit your score.</AlertDescription>
              </Alert>
            )}
            <GeoQuestResults
              score={score}
              totalQuestions={questions.length}
              onPlayAgain={handlePlayAgain}
            />
          </>
        )}
      </div>
    );
  }

  // Render Game Screen (playing or feedback state)
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <GeoQuestGame
      question={currentQuestion}
      score={score}
      timer={timer}
      selectedAnswer={selectedAnswer}
      feedback={feedback}
      onSelectAnswer={handleSelectAnswer}
    />
  );
};

export default GeoQuestContainer;
