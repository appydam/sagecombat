import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react'; // Using Globe icon

interface GeoQuestCardProps {
  onPlay: () => void; // Function to call when "Play Now" is clicked
}

const GeoQuestCard: React.FC<GeoQuestCardProps> = ({ onPlay }) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Globe className="h-8 w-8 text-primary" />
        <div>
          <CardTitle className="text-xl font-bold">GeoQuest Trivia</CardTitle>
          <CardDescription>Test your knowledge of world landmarks!</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Identify famous places from around the globe. Answer 5 questions, each with a 20-second timer. Can you get a perfect score?
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onPlay} className="w-full rounded-full">
          Play Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeoQuestCard;
