
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

  // Function to get order details for poly contests
  const getOrderDetails = () => {
    if (!contest.orders || contest.orders.length === 0) return null;
    
    const order = contest.orders[0];
    return (
      <div className="flex flex-col text-sm mt-2 space-y-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Type:</span>
          <Badge variant={order.type === "buy" ? "default" : "destructive"} className="capitalize">
            {order.type}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Outcome:</span>
          <span>{order.outcome ? "Yes" : "No"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Price:</span>
          <span>{order.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Quantity:</span>
          <span>{order.quantity}</span>
        </div>
      </div>
    );
  };

  return (
    <MorphCard className="p-4 animate-fade-in">
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
        <Badge variant={contest.status === 'active' ? 'default' : 'secondary'} className="capitalize">
          {contest.status}
        </Badge>
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
    </MorphCard>
  );
};

export default ContestCard;
