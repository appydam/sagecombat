import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DailyStreak from "@/components/DailyStreak";
import Footer from "@/components/Footer";
import { Stock } from "@/components/StockSelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  PlusCircle,
  X,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";
import { Input } from "@/components/ui/input";
import { getStockListByCategory, ContestCategory } from "../../stocksData/mapper/whichStockList";
import { BACKEND_HOST } from "@/constants/config";
import { Calendar } from "lucide-react";
import SelectedStocksNewsSummary from '@/components/SelectedStocksNewsSummary';
import { toast } from "sonner";
import MarketNews from '@/components/MarketNews';


const CustomBasketGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Parse competition data from URL parameters
  const competitionId = searchParams.get("id") || "";
  const competitionData = {
    id: competitionId,
    title: searchParams.get("name") || "Weekly Competition Challenge",
    description:
      searchParams.get("description") ||
      "Select stocks you believe will outperform.",
    entryFee: parseInt(searchParams.get("entryFee") || "0", 10),
    prizePool: parseInt(searchParams.get("prizePool") || "0", 10),
    participants: parseInt(searchParams.get("currentParticipants") || "0", 10),
    maxParticipants: parseInt(searchParams.get("maxParticipants") || "0", 10),
    startDate: new Date(
      searchParams.get("startDate") || new Date().toISOString()
    ).toISOString(),
    endDate: new Date(
      searchParams.get("endDate") || new Date().toISOString()
    ).toISOString(),
    maxSelectionsAllowed: 5, // This seems to be fixed at 5 stocks
    currencyType: searchParams.get("currencyType") || "virtual",
    contestCategory: searchParams.get("contestCategory") as ContestCategory || "ALL",
  };

  const stockList = useMemo(() => {
    return getStockListByCategory(competitionData.contestCategory);
  }, [competitionData.contestCategory]);

  const filteredStocks = useMemo(() => {
    return stockList.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, stockList]);



  const handleStockSelectionsChange = (selections: Stock[]) => {
    setSelectedStocks(selections);
  };

  const handleJoinCompetition = async () => {
    if (selectedStocks.length < competitionData.maxSelectionsAllowed) {
      toast({
        title: "Selection Incomplete",
        description: `Please select ${competitionData.maxSelectionsAllowed} stocks for your basket.`,
        variant: "destructive",
      });
      return;
    }

    const userId = Number(JSON.parse(localStorage.getItem("userId") || "0"));
    console.log("userId = ", userId);

    const contestId = Number.isNaN(Number(competitionId))
      ? 4
      : Number(competitionId);

    try {
      const apiPath = BACKEND_HOST + "enterCustomCompetition";
      const response = await fetch(apiPath, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          contest_id: contestId,
          stocks_in_basket: selectedStocks.map((stock) => stock.symbol),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw { status: response.status, data: errorData };
      }

      const data = await response.json();
      console.log("API response:", data);

      toast({
        title: "Success!",
        description: "You've successfully joined the competition.",
      });

      setTimeout(() => {
        navigate(`/competition-confirmation`);
      }, 1500);
    } catch (error) {
      console.error("API call failed:", error);

      // Extract the error message from the API response
      let errorMessage = "Failed to join the competition. Please try again.";

      // Check if the error contains the data property with the message
      if (error && typeof error === 'object' && 'data' in error) {
        const errorData = error.data;
        if (errorData && errorData.data && errorData.data.message) {
          errorMessage = errorData.data.message;
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleAddStock = (stock: Stock) => {
    if (selectedStocks.length >= competitionData.maxSelectionsAllowed) {
      toast({
        title: "Maximum Selections Reached",
        description: `You can only select ${competitionData.maxSelectionsAllowed} stocks.`,
        variant: "destructive",
      });
      return;
    }

    if (selectedStocks.some((s) => s.symbol === stock.symbol)) {
      toast({
        title: "Stock Already Selected",
        description: `You have already selected ${stock.name}.`,
        variant: "destructive",
      });
      return;
    }

    const newSelections = [...selectedStocks, stock];
    setSelectedStocks(newSelections);
    handleStockSelectionsChange(newSelections);
  };

  const handleRemoveStock = (stockId: string) => {
    const newSelections = selectedStocks.filter(
      (stock) => stock.symbol !== stockId
    );
    setSelectedStocks(newSelections);
    handleStockSelectionsChange(newSelections);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedStocks = filteredStocks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredStocks.length / pageSize);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/competitions")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Competitions
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-3xl font-bold mb-2">
                {competitionData.title}
              </h1>
              <p className="text-muted-foreground mb-4">
                {competitionData.description}
              </p>

              <div className="space-y-5 px-3 py-4 bg-white/70 backdrop-blur-md rounded-xl border border-slate-200 shadow-md">

                {/* Search Input */}
                <Input
                  type="search"
                  placeholder="🔍 Search for a stock..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-md py-1.5 px-3 text-sm shadow-inner border border-gray-300 focus:ring-2 focus:ring-purple-400 placeholder:text-slate-400"
                />

                {/* Progress Bar */}
                <div className="relative h-1.5 rounded-full overflow-hidden bg-slate-200">
                  <div
                    className="absolute h-full bg-gradient-to-r from-purple-300 via-indigo-400 to-purple-300 transition-all duration-500"
                    style={{
                      width: `${(selectedStocks.length / competitionData.maxSelectionsAllowed) * 100}%`,
                    }}
                  />
                </div>

                {/* Stock List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {paginatedStocks.map((stock) => (
                    <MorphCard
                      key={stock.id}
                      className="group flex items-center justify-between px-2 py-1.5 bg-white/90 backdrop-blur-md rounded-lg border border-slate-200 hover:border-indigo-500 hover:shadow-sm transition-all"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition">
                          {stock.symbol}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[160px]">
                          {stock.name}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition"
                        onClick={() => handleAddStock(stock)}
                      >
                        <PlusCircle className="h-3 w-3" />
                      </Button>
                    </MorphCard>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center text-sm text-slate-600">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-2 py-1 rounded-md border-slate-300 hover:bg-slate-100 flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <span>
                    Page <span className="font-semibold text-slate-800">{currentPage}</span> of{" "}
                    <span className="font-semibold text-slate-800">{totalPages}</span>
                  </span>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-2 py-1 rounded-md border-slate-300 hover:bg-slate-100 flex items-center"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                {/* Selection Count */}
                <div className="text-xs text-center text-slate-500">
                  {selectedStocks.length} of {competitionData.maxSelectionsAllowed} stocks selected
                </div>

                {/* Selected Stocks */}
                {selectedStocks.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {selectedStocks.map((stock) => (
                      <MorphCard
                        key={stock.id}
                        className="flex items-center px-2 py-1 gap-x-1 bg-gradient-to-tr from-indigo-50 to-white rounded-md border border-slate-300 hover:border-indigo-400 hover:shadow-sm transition"
                      >
                        <div className="flex-grow truncate text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 group-hover:from-indigo-700 group-hover:to-indigo-500">
                          {stock.symbol}
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 p-0 ml-auto shrink-0 rounded-full hover:bg-red-100 hover:text-red-500"
                          onClick={() => handleRemoveStock(stock.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </MorphCard>
                    ))}
                  </div>
                )}

                {/* Join Button */}
                <div>
                  <Button
                    size="sm"
                    className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full px-5 py-2.5 shadow-md hover:opacity-90 transition text-sm font-medium"
                    onClick={handleJoinCompetition}
                    disabled={selectedStocks.length < competitionData.maxSelectionsAllowed}
                  >
                    🚀 Join Competition for ₹{competitionData.entryFee}
                  </Button>
                </div>
              </div>

              {/* AI News Summary for Selected Stocks */}
              <div className="mt-6">
                <SelectedStocksNewsSummary selectedStocks={selectedStocks} />
              </div>

              {/* Competition Details Section */}
              <div className="mt-8">
                <MorphCard className="p-6">
                  <h2 className="text-xl font-bold mb-4">Competition Details</h2>
                  <Separator className="mb-4" />
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 text-sm">
                    <div className="flex items-start gap-3">
                      <IndianRupee className="h-5 w-5 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Entry Fee</p>
                        <p className="font-semibold text-base">₹{competitionData.entryFee}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-mint-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Participants</p>
                        <p className="font-semibold text-base">
                          {competitionData.participants}/{competitionData.maxParticipants || "∞"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Max Selections</p>
                        <p className="font-semibold text-base">
                          {competitionData.maxSelectionsAllowed} stocks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 col-span-2 md:col-span-3">
                      <IndianRupee className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Prize Pool</p>
                        <p className="font-semibold text-base">
                          {competitionData.prizePool > 0
                            ? `₹${competitionData.prizePool.toLocaleString()}`
                            : <span className="font-medium">Number of players × entry fee</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 col-span-2 md:col-span-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold text-base">
                          {new Date(competitionData.startDate).toLocaleDateString()} - {new Date(competitionData.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-5" />

                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div>
                      <h3 className="font-semibold mb-1">How Scoring Works</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Your score is based on the average % return of your selected stocks over the competition period.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Prize Distribution</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Prizes are distributed based on an exponential decay model to reward top performers.
                      </p>
                    </div>
                  </div>
                </MorphCard>
              </div>

            </div>

            <div className="lg:col-span-4 space-y-6">
              <DailyStreak 
                currentStreak={3}
                nextReward="Amazon Pay ₹20 Voucher"
                daysCompleted={3}
                totalDaysForNextReward={7}
              />

              <MarketNews />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomBasketGame;