
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MorphCard from "@/components/ui/MorphCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Trophy, Medal, Award, Calendar, Code, Zap } from "lucide-react";

const UnderDevelopmentBanner = () => (
  <div className="bg-gradient-to-r from-violet-200 to-pink-200 text-gray-800 py-3 px-4 border-b border-blue-400/30">
    <div className="max-w-7xl mx-auto flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <Code className="h-4 w-4" />
        <span className="text-sm font-medium">Leaderboard is under development. Coming soon! 🚀</span>
      </div>
    </div>
  </div>
);

interface LeaderboardEntry {
  id: string;
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  return: number;
  prize?: number;
  winCount?: number;
  streak?: number;
}

const Leaderboard = () => {
  const { competitionId } = useParams();
  const [timeframe, setTimeframe] = useState("weekly");
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  
  // Sample data for demo purposes
  const mockLeaderboardData: Record<string, LeaderboardEntry[]> = {
    daily: [
      { id: "entry-1", rank: 1, userId: "user-1", username: "StockGuru", return: 8.45, prize: 5000, winCount: 12, streak: 3 },
      { id: "entry-2", rank: 2, userId: "user-2", username: "MarketMaven", return: 7.22, prize: 2500, winCount: 10, streak: 2 },
      { id: "entry-3", rank: 3, userId: "user-3", username: "TradingKing", return: 6.17, prize: 1000, winCount: 8, streak: 1 },
      { id: "entry-4", rank: 4, userId: "user-4", username: "BullishTrader", return: 5.89, prize: 500, winCount: 7, streak: 1 },
      { id: "entry-5", rank: 5, userId: "user-5", username: "StockWhisperer", return: 4.32, prize: 250, winCount: 5, streak: 0 },
      { id: "entry-6", rank: 6, userId: "user-6", username: "MarketMaster", return: 3.85, winCount: 4, streak: 0 },
      { id: "entry-7", rank: 7, userId: "user-7", username: "TradingPro", return: 3.56, winCount: 4, streak: 0 },
      { id: "entry-8", rank: 8, userId: "user-8", username: "InvestorElite", return: 3.21, winCount: 3, streak: 0 },
      { id: "entry-9", rank: 9, userId: "user-9", username: "StockExpert", return: 2.94, winCount: 3, streak: 0 },
      { id: "entry-10", rank: 10, userId: "user-10", username: "MarketAnalyst", return: 2.75, winCount: 2, streak: 0 },
    ],
    weekly: [
      { id: "entry-1", rank: 1, userId: "user-1", username: "StockGuru", return: 12.45, prize: 10000, winCount: 24, streak: 5 },
      { id: "entry-2", rank: 2, userId: "user-2", username: "MarketMaven", return: 10.22, prize: 5000, winCount: 20, streak: 3 },
      { id: "entry-3", rank: 3, userId: "user-3", username: "TradingKing", return: 8.17, prize: 2500, winCount: 18, streak: 2 },
      { id: "entry-4", rank: 4, userId: "user-4", username: "BullishTrader", return: 6.89, prize: 1000, winCount: 15, streak: 2 },
      { id: "entry-5", rank: 5, userId: "user-5", username: "StockWhisperer", return: 5.32, prize: 500, winCount: 12, streak: 1 },
      { id: "entry-6", rank: 6, userId: "user-6", username: "InvestorPro", return: 4.75, winCount: 10, streak: 1 },
      { id: "entry-7", rank: 7, userId: "user-7", username: "MarketWiz", return: 4.23, winCount: 9, streak: 0 },
      { id: "entry-8", rank: 8, userId: "user-8", username: "TradingChamp", return: 3.91, winCount: 8, streak: 0 },
      { id: "entry-9", rank: 9, userId: "user-9", username: "StockStrategist", return: 3.45, winCount: 7, streak: 0 },
      { id: "entry-10", rank: 10, userId: "user-10", username: "MarketSage", return: 3.12, winCount: 6, streak: 0 },
    ],
    monthly: [
      { id: "entry-1", rank: 1, userId: "user-1", username: "StockGuru", return: 24.87, prize: 25000, winCount: 45, streak: 8 },
      { id: "entry-2", rank: 2, userId: "user-2", username: "MarketMaven", return: 21.34, prize: 12500, winCount: 42, streak: 6 },
      { id: "entry-3", rank: 3, userId: "user-3", username: "TradingKing", return: 18.56, prize: 7500, winCount: 38, streak: 5 },
      { id: "entry-4", rank: 4, userId: "user-4", username: "BullishTrader", return: 16.93, prize: 5000, winCount: 35, streak: 4 },
      { id: "entry-5", rank: 5, userId: "user-5", username: "InvestmentGuru", return: 15.21, prize: 2500, winCount: 32, streak: 3 },
      { id: "entry-6", rank: 6, userId: "user-6", username: "MarketStrategist", return: 14.65, prize: 1000, winCount: 30, streak: 2 },
      { id: "entry-7", rank: 7, userId: "user-7", username: "TradingExpert", return: 12.87, prize: 500, winCount: 28, streak: 2 },
      { id: "entry-8", rank: 8, userId: "user-8", username: "StockSage", return: 11.54, winCount: 25, streak: 1 },
      { id: "entry-9", rank: 9, userId: "user-9", username: "MarketMaster", return: 10.32, winCount: 22, streak: 0 },
      { id: "entry-10", rank: 10, userId: "user-10", username: "InvestorElite", return: 9.87, winCount: 20, streak: 0 },
    ],
    allTime: [
      { id: "entry-1", rank: 1, userId: "user-1", username: "StockGuru", return: 156.23, prize: 100000, winCount: 245, streak: 12 },
      { id: "entry-2", rank: 2, userId: "user-2", username: "MarketMaven", return: 132.87, prize: 50000, winCount: 210, streak: 8 },
      { id: "entry-3", rank: 3, userId: "user-3", username: "TradingKing", return: 118.45, prize: 25000, winCount: 195, streak: 7 },
      { id: "entry-4", rank: 4, userId: "user-4", username: "BullishTrader", return: 105.62, prize: 10000, winCount: 180, streak: 6 },
      { id: "entry-5", rank: 5, userId: "user-5", username: "StockWhisperer", return: 98.34, prize: 5000, winCount: 165, streak: 5 },
      { id: "entry-6", rank: 6, userId: "user-6", username: "MarketMaster", return: 86.75, prize: 2500, winCount: 150, streak: 4 },
      { id: "entry-7", rank: 7, userId: "user-7", username: "TradingPro", return: 82.43, prize: 1000, winCount: 135, streak: 3 },
      { id: "entry-8", rank: 8, userId: "user-8", username: "InvestorElite", return: 78.21, prize: 500, winCount: 120, streak: 2 },
      { id: "entry-9", rank: 9, userId: "user-9", username: "StockExpert", return: 72.94, winCount: 110, streak: 1 },
      { id: "entry-10", rank: 10, userId: "user-10", username: "MarketAnalyst", return: 67.56, winCount: 100, streak: 0 },
    ]
  };

  useEffect(() => {
    // In a real app, this would fetch data from the API based on competitionId and timeframe
    setLeaderboardData(mockLeaderboardData[timeframe]);
  }, [timeframe]);

  const filteredData = searchQuery
    ? leaderboardData.filter(entry => 
        entry.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : leaderboardData;

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case "daily": return "Today's";
      case "weekly": return "This Week's";
      case "monthly": return "This Month's";
      case "allTime": return "All-Time";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <UnderDevelopmentBanner />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">Leaderboard</h1>
            <p className="text-muted-foreground text-lg">
              See who's leading the pack with their market predictions
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-col w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4 md:flex-row">
              <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="allTime">All Time</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="relative w-full md:w-auto max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Leaderboard */}
          <MorphCard className="overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-gold-500" />
                {getTimeframeLabel()} Top Performers
              </h2>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[150px] md:hidden">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Timeframe" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="allTime">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-secondary/70 rounded-lg text-sm font-semibold">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-5 md:col-span-3">User</div>
              <div className="col-span-3 text-right">Return</div>
              <div className="col-span-3 md:col-span-2 text-right">Prize</div>
              <div className="hidden md:block md:col-span-2 text-right">Wins</div>
              <div className="hidden md:block md:col-span-1 text-right">Streak</div>
            </div>
            
            {/* Table Content */}
            <div className="space-y-2 mt-2">
              {filteredData.length > 0 ? (
                filteredData.map((entry) => (
                  <div
                    key={entry.id}
                    className={`grid grid-cols-12 gap-4 p-4 rounded-lg transition-colors ${
                      entry.rank <= 3 ? "bg-secondary/40" : "hover:bg-secondary/20"
                    }`}
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex justify-center items-center font-bold">
                      {entry.rank === 1 && <Trophy className="h-5 w-5 text-gold-500" />}
                      {entry.rank === 2 && <Medal className="h-5 w-5 text-slate-400" />}
                      {entry.rank === 3 && <Award className="h-5 w-5 text-amber-700" />}
                      {entry.rank > 3 && <span>{entry.rank}</span>}
                    </div>
                    
                    {/* User */}
                    <div className="col-span-5 md:col-span-3 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3">
                        {entry.username.charAt(0)}
                      </div>
                      <span className="font-medium truncate">{entry.username}</span>
                    </div>
                    
                    {/* Return */}
                    <div className={`col-span-3 text-right self-center font-semibold ${
                      entry.return >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {entry.return >= 0 ? "+" : ""}{entry.return.toFixed(2)}%
                    </div>
                    
                    {/* Prize */}
                    <div className="col-span-3 md:col-span-2 text-right self-center font-semibold">
                      {entry.prize ? `₹${entry.prize.toLocaleString()}` : "-"}
                    </div>
                    
                    {/* Wins */}
                    <div className="hidden md:block md:col-span-2 text-right self-center">
                      {entry.winCount} wins
                    </div>
                    
                    {/* Streak */}
                    <div className="hidden md:block md:col-span-1 text-right self-center">
                      {entry.streak} 🔥
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No results found</p>
                </div>
              )}
            </div>
          </MorphCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
