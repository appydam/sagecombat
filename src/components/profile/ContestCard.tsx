
import { Badge } from "@/components/ui/badge";
import MorphCard from "@/components/ui/MorphCard";
import { ContestType } from "./data/mockProfileData";
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  Edit3Icon,
  GlobeIcon,
  CloudIcon,
  TrendingUpIcon,
  CoinsIcon,
  CheckCircleIcon
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
      case "crypto":
        return <CoinsIcon className="w-5 h-5" />;
      default:
        return <TrendingUpIcon className="w-5 h-5" />;
    }
  };
  
  // Get category badge based on game type
  const getCategoryBadge = () => {
    switch (contest.gameType) {
      case "equity":
        return <Badge className="bg-green-500 text-white" aria-label="Equity Basket Competition">Equity</Badge>;
      case "opinion":
        return <Badge className="bg-blue-500 text-white" aria-label="Opinion Trading Competition">Opinion</Badge>;
      case "poly":
        return <Badge className="bg-purple-500 text-white" aria-label="Poly Contest">Poly</Badge>;
      case "geoquest":
        return <Badge className="bg-orange-500 text-white" aria-label="GeoQuest Competition">GeoQuest</Badge>;
      case "crypto":
        return <Badge className="bg-amber-400 text-black" aria-label="Crypto Basket Competition">Crypto</Badge>;
      default:
        return null;
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
      {/* Add category badge to top-right corner */}
      <div className="absolute top-2 right-2">
        {getCategoryBadge()}
      </div>
      
      <div className="flex items-center justify-between mt-1">
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
