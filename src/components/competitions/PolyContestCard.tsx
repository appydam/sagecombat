
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Share2, TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { PolyContest } from "@/types/competitions";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { placePolyBet } from "@/services/polyContestsService";

interface PolyContestCardProps {
  contest: PolyContest;
  onBetPlaced?: () => void;
}

const PolyContestCard = ({ contest, onBetPlaced }: PolyContestCardProps) => {
  const navigate = useNavigate();
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no" | null>(null);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [shareTooltip, setShareTooltip] = useState<boolean>(false);
  const [showBetForm, setShowBetForm] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check authentication status from localStorage
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);
  
  const handlePlaceBet = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to place a bet");
      navigate("/login");
      return;
    }

    if (selectedOutcome === null) {
      toast.error("Please select Yes or No before placing your bet.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock user ID
      const userId = localStorage.getItem('userId') || 'demo-user';

      const { success, message, error } = await placePolyBet(
        userId,
        contest.id,
        selectedOutcome,
        betAmount
      );

      if (error) {
        console.error("Error placing bet:", error);
        toast.error("Failed to place your bet. Please try again.");
        setIsSubmitting(false);
        return;
      }

      toast.success(`You've successfully placed a ${selectedOutcome.toUpperCase()} bet on this contest.`);

      // Reset selection and call callback if provided
      setTimeout(() => {
        setSelectedOutcome(null);
        setShowBetForm(false);
        if (onBetPlaced) {
          onBetPlaced();
        }
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error placing bet:", error);
      toast.error("Failed to place your bet. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareText = `I'm predicting "${contest.title}" on Mind Stock. Join me!`;
    const shareUrl = `${window.location.origin}/competitions/poly/${contest.id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Mind Stock Prediction',
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setShareTooltip(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setShareTooltip(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const timeLeft = formatDistanceToNow(new Date(contest.end_time), { addSuffix: true });
  const activeClass = "bg-gradient-to-r from-amber-500 to-amber-400 text-white border-none";

  const handleViewDetails = () => {
    navigate(`/competitions/poly/${contest.id}`);
  };

  const handleIncreaseBet = () => {
    setBetAmount(prev => prev + 50);
  };

  const handleDecreaseBet = () => {
    setBetAmount(prev => Math.max(50, prev - 50));
  };

  const handleShowBetForm = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to place a bet");
      navigate("/login");
      return;
    }
    setShowBetForm(true);
  };

  return (
    <MorphCard className="p-4 flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-md group">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline" className="bg-white/80">
              {contest.category}
            </Badge>
            <Badge 
              variant={contest.status === "active" ? "default" : "secondary"}
              className={contest.status === "active" ? "bg-green-600" : ""}
            >
              {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
            </Badge>
            <Badge
              variant="outline"
              className={`capitalize ${contest.currency_type === "real" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
            >
              {contest.currency_type === "real" ? "Real Money" : "Virtual Money"}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2 leading-tight cursor-pointer" onClick={handleViewDetails}>
            {contest.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{contest.description}</p>
        </div>
      </div>

      {/* Price Visualization */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium mb-1">
          <span className="flex items-center gap-1 text-green-600">
            <TrendingUp className="h-3.5 w-3.5" />
            Yes: ₹{contest.yes_price.toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <TrendingDown className="h-3.5 w-3.5" />
            No: ₹{contest.no_price.toFixed(2)}
          </span>
        </div>
        
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300" 
            style={{ width: `${contest.yes_price * 100}%` }}
          />
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 gap-3 mt-auto"> 
        <div className="flex items-center justify-between text-sm flex-wrap gap-y-1">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-amber-500 mr-1 flex-shrink-0" />
            <span className="text-muted-foreground">Closes {timeLeft}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 text-amber-500 mr-1 flex-shrink-0" />
            <span className="text-muted-foreground">{contest.participants} participants</span>
          </div>
        </div>

        {/* Betting Options */}
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="font-medium">₹{contest.total_volume.toLocaleString()}</p>
          </div>

          <div className="flex gap-2">
            {!showBetForm && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  onClick={handleShowBetForm}
                >
                  Place Bet
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-600 hover:bg-slate-50 w-9 h-9 p-0"
                  onClick={handleViewDetails}
                >
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Expanded Bet Form */}
        {showBetForm && (
          <div className="mt-3 border-t pt-3">
            <p className="text-sm font-medium mb-2">What do you predict?</p>
            
            <RadioGroup 
              value={selectedOutcome || ""} 
              onValueChange={value => setSelectedOutcome(value as "yes" | "no")}
              className="flex space-x-2 mb-3"
            >
              <div className={`flex-1 flex items-center space-x-2 border rounded-md p-2 ${selectedOutcome === "yes" ? "border-green-600 bg-green-50" : ""}`}>
                <RadioGroupItem value="yes" id="yes" className={selectedOutcome === "yes" ? "text-green-600" : ""} />
                <label htmlFor="yes" className="text-sm font-medium flex-grow cursor-pointer">Yes</label>
                <span className="text-xs text-green-600">{(contest.yes_price * 100).toFixed(0)}%</span>
              </div>
              
              <div className={`flex-1 flex items-center space-x-2 border rounded-md p-2 ${selectedOutcome === "no" ? "border-red-600 bg-red-50" : ""}`}>
                <RadioGroupItem value="no" id="no" className={selectedOutcome === "no" ? "text-red-600" : ""} />
                <label htmlFor="no" className="text-sm font-medium flex-grow cursor-pointer">No</label>
                <span className="text-xs text-red-600">{(contest.no_price * 100).toFixed(0)}%</span>
              </div>
            </RadioGroup>
            
            <div className="mb-3">
              <p className="text-sm font-medium mb-1">Bet Amount</p>
              <div className="flex items-center border rounded-md">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 rounded-r-none"
                  onClick={handleDecreaseBet}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <Input 
                  type="number" 
                  className="h-8 border-0 text-center" 
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseInt(e.target.value) || 50)}
                  min="50"
                />
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 rounded-l-none"
                  onClick={handleIncreaseBet}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center text-xs mb-2">
              <span className="text-muted-foreground">Potential payout:</span>
              <span className="ml-auto font-medium">
                ₹{selectedOutcome ? (betAmount / (selectedOutcome === "yes" ? contest.yes_price : contest.no_price)).toFixed(2) : "0.00"}
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm"
                variant="outline"
                className="text-sm flex-1"
                onClick={() => setShowBetForm(false)}
              >
                Cancel
              </Button>
              
              <Button 
                size="sm"
                className="text-sm flex-1 bg-amber-500 hover:bg-amber-600"
                onClick={handlePlaceBet}
                disabled={isSubmitting || !selectedOutcome}
              >
                {isSubmitting ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {!showBetForm && (
          <div className="flex justify-between gap-2 mt-2">
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 border border-input text-sm rounded-md hover:bg-accent hover:text-amber-600 transition-all"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="w-9 h-9 p-0 flex items-center justify-center border border-input rounded-md hover:bg-accent text-amber-600 relative"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              {shareTooltip && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                  Copied!
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </MorphCard>
  );
};

export default PolyContestCard;
