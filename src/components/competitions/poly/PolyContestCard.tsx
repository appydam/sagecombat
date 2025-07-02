
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, Share2 } from "lucide-react";
import { toast } from "sonner";
import { PolyContest } from "@/types/competitions";
import { useNavigate } from "react-router-dom";
import PolyPriceBar from "./PolyPriceBar";
import PolyContestMeta from "./PolyContestMeta";

interface PolyContestCardProps {
  contest: PolyContest;
  onBetPlaced?: () => void;
}

const PolyContestCard = ({ contest, onBetPlaced }: PolyContestCardProps) => {
  const navigate = useNavigate();
  const [shareTooltip, setShareTooltip] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check authentication status from localStorage
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);
  
  const handlePlaceBet = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to place a bet");
      navigate("/login");
      return;
    }
    
    // Navigate directly to the contest detail page
    navigate(`/competitions/poly/${contest.id}`);
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

  const handleViewDetails = () => {
    navigate(`/competitions/poly/${contest.id}`);
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
      <PolyPriceBar yesPrice={contest.yes_price} noPrice={contest.no_price} />

      {/* Meta Info */}
      <div className="grid grid-cols-1 gap-3 mt-auto"> 
        <PolyContestMeta 
          endTime={contest.end_time} 
          participants={contest.participants} 
        />

        {/* Betting Options */}
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="font-medium">₹{contest.total_volume.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-amber-500 text-amber-600 hover:bg-amber-50"
              onClick={handlePlaceBet}
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
          </div>
        </div>

        {/* Action buttons */}
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
      </div>
    </MorphCard>
  );
};

export default PolyContestCard;
