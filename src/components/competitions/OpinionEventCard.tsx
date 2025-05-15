import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { Calendar, Users, CheckCircle, XCircle } from "lucide-react";
import { OpinionEvent } from "@/types/competitions";
import { useState } from "react";
import { toast } from "sonner";
import { submitOpinionAnswer } from "@/services/competitionsService";
import { BACKEND_HOST } from "@/constants/config";

interface OpinionEventCardProps {
  event: OpinionEvent;
  onAnswerSubmitted?: () => void;
}

const OpinionEventCard = ({ event, onAnswerSubmitted }: OpinionEventCardProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handlePlaceTrade = async () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer before placing your trade.");
      return;
    }

    setIsSubmitting(true);
    const userId = Number(JSON.parse(localStorage.getItem("userId")));



    try {
      const apiPath = `${BACKEND_HOST}EnterOpinionCompetitions`;
      const response = await fetch(apiPath, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          contest_id: Number(event.id),
          answer: selectedAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      toast.success("You've successfully placed your opinion trade.");

      setTimeout(() => {
        if (onAnswerSubmitted) {
          onAnswerSubmitted();
        }
      }, 1000);

    } catch (error) {
      console.error("API call failed:", error);
      toast.error("Failed to place the trade. Please try again.");
    }

  };

  return (
    <MorphCard className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline">{event.category}</Badge>
            <Badge variant={event.status === "active" ? "default" : "secondary"}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
            <Badge variant="outline" className={event.currency_type === "real" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
              {event.currency_type === "real" ? "Real Money" : "Virtual Money"}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-1">{event.question}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-auto">
        <div className="flex items-center justify-between text-sm flex-wrap gap-y-1">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-primary mr-1 flex-shrink-0" />
            <span>Closes: {new Date(event.deadline).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center">
            <Users className="h-4 w-4 text-primary mr-1 flex-shrink-0" />
            <span>{event.participants} participants</span>
          </div>
        </div>

        <div className="mt-1">
          <p className="text-xs font-medium mb-1">Current Distribution</p>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-primary font-medium">Yes: {event.currentPool.yes} people</span>
            <span className="text-destructive font-medium">No: {event.currentPool.no} people</span>
          </div>

          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${event.participants > 0 ? (event.currentPool.yes / event.participants) * 100 : 50}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Entry Fee</p>
            <p className="font-medium">₹{event.minTradeAmount}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedAnswer === true ? "default" : "outline"}
              size="sm"
              className={`flex items-center gap-1 ${selectedAnswer === true ? "" : "border-primary text-primary hover:bg-primary/10"}`}
              onClick={() => setSelectedAnswer(true)}
              disabled={isSubmitting}
            >
              <CheckCircle className="h-3 w-3" />
              Yes
            </Button>
            <Button
              variant={selectedAnswer === false ? "destructive" : "outline"}
              size="sm"
              className={`flex items-center gap-1 ${selectedAnswer === false ? "" : "border-destructive text-destructive hover:bg-destructive/10"}`}
              onClick={() => setSelectedAnswer(false)}
              disabled={isSubmitting}
            >
              <XCircle className="h-3 w-3" />
              No
            </Button>
          </div>
        </div>

        {/* Place Trade Button */}
        <div className="mt-3 flex justify-center">
          <Button
            size="sm"
            variant="ghost"
            className="border border-input text-sm px-4 py-1 rounded-md hover:bg-accent hover:text-primary transition-all"
            onClick={handlePlaceTrade}
            disabled={isSubmitting || selectedAnswer === null}
          >
            {isSubmitting ? "Placing..." : "Place Trade"}
          </Button>
        </div>
      </div>
    </MorphCard>
  );
};

export default OpinionEventCard;
