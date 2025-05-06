import React from 'react';
import { GeoQuestQuestion } from './data/mockGeoQuestData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // For timer visualization
import { cn } from '@/lib/utils'; // Utility for conditional classes

interface GeoQuestGameProps {
  question: GeoQuestQuestion;
  score: number;
  timer: number; // Seconds remaining
  selectedAnswer: string | null;
  feedback: 'correct' | 'incorrect' | 'timeout' | null;
  onSelectAnswer: (answer: string) => void;
}

const GeoQuestGame: React.FC<GeoQuestGameProps> = ({
  question,
  score,
  timer,
  selectedAnswer,
  feedback,
  onSelectAnswer,
}) => {
  const timerPercentage = (timer / 20) * 100; // Calculate timer progress percentage

  const getButtonVariant = (option: string): 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' | null | undefined => {
    if (!selectedAnswer) return 'outline'; // Default state
    if (option === selectedAnswer) {
      if (feedback === 'correct') return 'default'; // Use primary color for correct selected answer
      if (feedback === 'incorrect') return 'destructive'; // Use destructive for incorrect selected answer
    }
    if (option === question.correctAnswer && feedback !== null) {
      return 'default'; // Highlight correct answer after selection/timeout
    }
    return 'secondary'; // Dim unselected/incorrect options
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="relative pb-4">
        <CardTitle className="text-center text-lg md:text-xl font-semibold">{question.question}</CardTitle>
        <div className="absolute top-2 right-4 text-sm font-medium text-primary">
          Score: {score}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        {/* Image Display */}
        <div className="w-full aspect-video overflow-hidden rounded-lg bg-muted">
          <img
            src={question.imageUrl}
            alt={`Image related to question: ${question.question}`} // More descriptive alt text
            className="w-full h-full object-cover"
            onError={(e) => {
              // Handle image load error - replace with placeholder
              (e.target as HTMLImageElement).src = '/placeholder.svg'; // Assuming a placeholder image exists
              (e.target as HTMLImageElement).alt = 'Placeholder image - failed to load';
            }}
          />
        </div>

        {/* Timer */}
        <div className="w-full px-4">
          <Progress value={timerPercentage} className="h-2 [&>*]:bg-primary" />
          <p className="text-center text-sm text-muted-foreground mt-1">Time remaining: {timer}s</p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full px-4">
          {question.options.map((option) => (
            <Button
              key={option}
              variant={getButtonVariant(option)}
              size="lg"
              className={cn(
                "justify-start text-left h-auto py-3 px-4 whitespace-normal", // Allow text wrapping
                selectedAnswer && option !== question.correctAnswer && option !== selectedAnswer ? 'opacity-70' : '', // Dim others after selection
                feedback === 'correct' && option === question.correctAnswer ? 'ring-2 ring-green-500' : '', // Green ring for correct
                feedback === 'incorrect' && option === selectedAnswer ? 'ring-2 ring-red-500' : '' // Red ring for incorrect selected
              )}
              onClick={() => onSelectAnswer(option)}
              disabled={!!selectedAnswer} // Disable buttons after an answer is selected
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className={`mt-2 text-center font-medium ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
            {feedback === 'correct' && "Correct!"}
            {feedback === 'incorrect' && `Wrong! It was ${question.correctAnswer}.`}
            {feedback === 'timeout' && `Time's up! The answer was ${question.correctAnswer}.`}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeoQuestGame;
