
import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { ContestType } from "./data/mockProfileData";
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  Edit3Icon,
  GlobeIcon,
  CloudIcon,
  TrendingUpIcon
} from "lucide-react";
import { Button } from "../ui/button";

interface ContestCardProps {
  contest: ContestType;
  onEditStocks: (contest: ContestType) => void;
}

const ContestCard = ({ contest, onEditStocks }: ContestCardProps) => {
  // Color mapping for contest type badges
  const getGameTypeBadgeColor = (gameType: string) => {
    switch (gameType) {
      case "equity":
        return "bg-gradient-to-r from-blue-500 to-blue-700 text-white";
      case "opinion":
        return "bg-gradient-to-r from-pink-500 to-pink-700 text-white";
      case "poly":
        return "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white";
      case "geoquest":
        return "bg-gradient-to-r from-purple-500 to-purple-700 text-white";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
    }
  };

  const formattedDate = new Date(contest.join_time).toLocaleDateString();
  
  const renderGameTypeIcon = () => {
    switch (contest.gameType) {
      case "equity":
        return <TrendingUpIcon className="w-5 h-5" />;
      case "opinion":
        return <CloudIcon className="w-5 h-5" />;
      case "poly":
        return <GlobeIcon className="w-5 h-5" />;
      case "geoquest":
        return <GlobeIcon className="w-5 h-5" />;
      default:
        return <TrendingUpIcon className="w-5 h-5" />;
    }
  };

  // Get yes/no counts for poly contests
  const getPolyOrderCounts = () => {
    if (!contest.orders || contest.orders.length === 0) return { yes: 0, no: 0, totalQuantity: 0 };
    
    return contest.orders.reduce((acc, order) => {
      if (order.outcome === true) {
        acc.yes += order.quantity;
      } else {
        acc.no += order.quantity;
      }
      acc.totalQuantity += order.quantity;
      return acc;
    }, { yes: 0, no: 0, totalQuantity: 0 });
  };

  // Function to get order details for poly contests
  const getOrderDetails = () => {
    if (!contest.orders || contest.orders.length === 0) return null;
    
    const { yes, no, totalQuantity } = getPolyOrderCounts();
    
    return (
      <div className="mt-3">
        <div className="flex flex-col text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category:</span>
            <Badge variant="outline" className="capitalize">
              {contest.tag || "General"}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Orders:</span>
            <span>{contest.orders.length}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Position:</span>
            <div className="flex gap-2">
              {yes > 0 && (
                <Badge className="bg-green-500">Yes: {yes}</Badge>
              )}
              {no > 0 && (
                <Badge className="bg-red-500">No: {no}</Badge>
              )}
            </div>
          </div>
          
          {contest.description && (
            <div className="mt-1">
              <span className="text-xs text-muted-foreground">{contest.description}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <MorphCard className="p-4 animate-fade-in relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-full">
            {renderGameTypeIcon()}
          </div>
          <div>
            <h4 className="font-medium">{contest.contest_name}</h4>
            <p className="text-sm text-muted-foreground">Joined on {formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={contest.status === 'active' ? 'default' : 'secondary'} className="capitalize">
            {contest.status}
          </Badge>
          <Badge
            variant="outline"
            className={`capitalize ${getGameTypeBadgeColor(contest.gameType)}`}
          >
            {contest.gameType}
          </Badge>
        </div>
      </div>

      {contest.gameType === "equity" && contest.stocks_in_basket && contest.stocks_in_basket.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-1">Selected Stocks:</p>
          <div className="flex flex-wrap gap-1">
            {contest.stocks_in_basket.map((stock, index) => (
              <Badge key={index} variant="outline" className="bg-secondary/30">
                {stock}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {contest.gameType === "poly" && getOrderDetails()}

      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-sm text-muted-foreground">Entry Fee</p>
          <p className="font-medium">₹{contest.entry_fee}</p>
        </div>

        {(contest.returns !== undefined && contest.returns !== null) && (
          <div>
            <p className="text-sm text-muted-foreground">Returns</p>
            <div className={`flex items-center font-medium ${contest.returns > 0 ? 'text-green-600' : contest.returns < 0 ? 'text-red-600' : 'text-gray-600'}`}>
              {contest.returns > 0 ? (
                <ArrowUpIcon className="w-4 h-4 mr-1" />
              ) : contest.returns < 0 ? (
                <ArrowDownIcon className="w-4 h-4 mr-1" />
              ) : null}
              {contest.returns}%
            </div>
          </div>
        )}

        {(contest.rank !== undefined && contest.totalParticipants !== undefined) && (
          <div>
            <p className="text-sm text-muted-foreground">Rank</p>
            <p className="font-medium">{contest.rank}/{contest.totalParticipants}</p>
          </div>
        )}
      </div>

      {contest.status === 'active' && contest.gameType === 'equity' && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEditStocks(contest)} 
            className="w-full"
          >
            <Edit3Icon className="w-4 h-4 mr-2" /> Edit Stocks
          </Button>
        </div>
      )}
      
      {contest.status === 'active' && contest.gameType === 'poly' && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="w-full"
          >
            <a href={`/competitions/poly/${contest.contest_id}`}>
              View Details
            </a>
          </Button>
        </div>
      )}
    </MorphCard>
  );
};

export default ContestCard;
