
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Trophy, ArrowRight, TrendingUp, Bitcoin, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface CompetitionProps {
  id: string;
  name: string;
  description: string;
  entryFee: number;
  maxParticipants: number;
  currentParticipants: number;
  status: "open" | "closed" | "upcoming";
  prizePool: number;
  registerDeadline: string;
  type: "custom" | "predefined" | "opinion";
  gameType: "equity" | "crypto" | "opinion";
  currency_type: "real" | "virtual";
  competition_interval: number;
  hasJoined?: boolean;
  scoringDone?: boolean;
}

const CompetitionCard = ({
  id,
  name,
  description,
  entryFee,
  maxParticipants,
  currentParticipants,
  status,
  prizePool,
  registerDeadline,
  type,
  gameType,
  currency_type,
  competition_interval,
  hasJoined = false,
  scoringDone = false
}: CompetitionProps) => {
  const [leaderboardDialogOpen, setLeaderboardDialogOpen] = useState(false);
  const percentFilled = (currentParticipants / maxParticipants) * 100;
  const isExpired = new Date(registerDeadline) < new Date();

  // Parse the register_deadline
  const registerDeadlineDate = new Date(registerDeadline);

  // Calculate the contest end time
  const contestEndTime = new Date(registerDeadlineDate.getTime() + competition_interval * 60 * 60 * 1000);

  // Calculate remaining time
  const remainingTime = contestEndTime.getTime() - new Date().getTime();

  const remainingHours = Math.max(0, Math.floor(remainingTime / (1000 * 60 * 60)));
  const remainingDays = Math.floor(remainingHours / 24);

  const statusDisplay = isExpired ? "closed" : status;
  
  // Determine if leaderboard is available (only for closed competitions with scoring done)
  const isLeaderboardAvailable = statusDisplay === "closed" && scoringDone;

  // Generate contest URL with all relevant params
  const getGameLink = () => {
    const baseUrl = getBaseGameUrl();
    
    // Create URLSearchParams object for query parameters
    const params = new URLSearchParams();
    params.append('id', id);
    params.append('name', name);
    params.append('description', description);
    params.append('entryFee', entryFee.toString());
    params.append('maxParticipants', maxParticipants.toString());
    params.append('currentParticipants', currentParticipants.toString());
    params.append('prizePool', prizePool.toString());
    params.append('startDate', registerDeadlineDate.toISOString());
    params.append('endDate', contestEndTime.toISOString());
    params.append('currencyType', currency_type);
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Get the base URL based on game type
  const getBaseGameUrl = () => {
    if (gameType === "opinion") {
      return `/opinion-trading`;
    } else if (gameType === "crypto") {
      return type === "custom" ? `/crypto-basket` : `/predefined-basket`;
    } else {
      return type === "custom" ? `/custom-basket` : `/predefined-basket`;
    }
  };

  const renderGameTypeIcon = () => {
    switch (gameType) {
      case "crypto":
        return <Bitcoin className="h-4 w-4 text-gold-500" />;
      case "opinion":
        return <MessageSquare className="h-4 w-4 text-mint-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-primary" />;
    }
  };

  const handleLeaderboardClick = (e: React.MouseEvent) => {
    if (!isLeaderboardAvailable) {
      e.preventDefault();
      setLeaderboardDialogOpen(true);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 bg-secondary/30">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Badge
              variant={statusDisplay === "open" ? "default" : "secondary"}
              className="mb-2"
            >
              {statusDisplay === "open" ? "Open" : "Closed"}
            </Badge>

            <div className="flex items-center gap-2 mb-1">
              {renderGameTypeIcon()}
              <Badge variant="outline" className="capitalize">
                {gameType}
                {gameType !== "opinion" && ` - ${type === "custom" ? "Custom" : "Predefined"}`}
              </Badge>

              <Badge
                variant="outline"
                className={`capitalize ${currency_type === "real" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                {currency_type === "real" ? "Real Money" : "Virtual Money"}
              </Badge>

            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Entry Fee</p>
            <p className="font-bold">₹{entryFee}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-medium text-lg mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{currentParticipants}/{maxParticipants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-gold-500" />
            <span className="text-sm font-medium">₹{prizePool.toLocaleString()}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Filling up</span>
            <span className="text-xs font-medium">{percentFilled.toFixed(0)}%</span>
          </div>
          <Progress value={percentFilled} className="h-1.5" />
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "p-4 bg-secondary/20 flex justify-between items-center",
          statusDisplay !== "open" && "bg-secondary/40"
        )}
      >
        <div className="flex items-center gap-1">
          <Clock className={cn(
            "h-4 w-4",
            remainingHours <= 24 && statusDisplay === "open" ? "text-destructive" : "text-muted-foreground"
          )} />
          <span className={cn(
            "text-xs",
            remainingHours <= 24 && statusDisplay === "open" ? "text-destructive font-medium" : "text-muted-foreground"
          )}>
            {statusDisplay === "open" && remainingTime > 0 ? (
              remainingDays > 0 ? (
                <>
                  {remainingDays}d {remainingHours % 24}h
                  <br />
                  to register
                </>
              ) : (
                <>
                  {remainingHours}h
                  <br />
                  to register
                </>
              )
            ) : (
              "Competition closed"
            )}
          </span>
        </div>

        <div className="flex gap-2">
          {statusDisplay === "closed" ? (
            <Link to={isLeaderboardAvailable ? `/contest-leaderboard/${id}` : "#"} onClick={handleLeaderboardClick}>
              <Button variant="outline" size="sm">
                Leaderboard
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLeaderboardClick}
            >
              Leaderboard
            </Button>
          )}
          
          <Link to={getGameLink()}>
            <Button
              variant={statusDisplay === "open" && !hasJoined ? "default" : "secondary"}
              size="sm"
              disabled={statusDisplay !== "open" || hasJoined}
            >
              {hasJoined ? "Already Joined" : statusDisplay === "open" ? "Join Now" : "View Details"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardFooter>

      {/* Leaderboard Dialog */}
      <Dialog open={leaderboardDialogOpen} onOpenChange={setLeaderboardDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Leaderboard Not Available</DialogTitle>
            <DialogDescription>
              {statusDisplay === "closed" 
                ? "The leaderboard for this competition is still being calculated. Please check back later."
                : "Leaderboard will be available after the competition ends."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Trophy className="h-16 w-16 text-gray-300" />
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setLeaderboardDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CompetitionCard;
