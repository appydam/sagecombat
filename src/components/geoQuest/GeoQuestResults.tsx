import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from 'lucide-react'; // Icon for results

interface GeoQuestResultsProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

const GeoQuestResults: React.FC<GeoQuestResultsProps> = ({ score, totalQuestions, onPlayAgain }) => {
  const maxScore = totalQuestions * 10; // Assuming 10 points per question

  return (
    <Card className="w-full max-w-md mx-auto text-center shadow-lg">
      <CardHeader>
        <Award className="h-12 w-12 mx-auto text-primary mb-4" />
        <CardTitle className="text-2xl font-bold">Game Over!</CardTitle>
        <CardDescription>Here's how you did:</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold mb-2">
          {score}/{maxScore}
        </p>
        <p className="text-muted-foreground">
          You answered {score / 10} out of {totalQuestions} questions correctly.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onPlayAgain} className="rounded-full px-8">
          Play Again
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeoQuestResults;
