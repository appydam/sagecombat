import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Stock } from "@/components/StockSelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Users, TrendingUp, PlusCircle, X, IndianRupee } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";
import { Input } from "@/components/ui/input";
import { availableStocks } from "../../stockSymbolsData/stocks";
import { BACKEND_HOST } from "@/constants/config";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

const CustomBasketGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Parse competition data from URL parameters
  const competitionId = searchParams.get('id') || '';
  const competitionData = {
    id: competitionId,
    title: searchParams.get('name') || "Weekly Competition Challenge",
    description: searchParams.get('description') || "Select stocks you believe will outperform.",
    entryFee: parseInt(searchParams.get('entryFee') || "0", 10),
    prizePool: parseInt(searchParams.get('prizePool') || "0", 10),
    participants: parseInt(searchParams.get('currentParticipants') || "0", 10),
    maxParticipants: parseInt(searchParams.get('maxParticipants') || "0", 10),
    startDate: new Date(searchParams.get('startDate') || new Date().toISOString()).toISOString(),
    endDate: new Date(searchParams.get('endDate') || new Date().toISOString()).toISOString(),
    maxSelectionsAllowed: 5, // This seems to be fixed at 5 stocks
    currencyType: searchParams.get('currencyType') || "virtual"
  };

  const filteredStocks = useMemo(() => {
    return availableStocks.filter(stock =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleStockSelectionsChange = (selections: Stock[]) => {
    setSelectedStocks(selections);
  };

  const handleJoinCompetition = async () => {
    if (selectedStocks.length < competitionData.maxSelectionsAllowed) {
      toast({
        title: "Selection Incomplete",
        description: `Please select ${competitionData.maxSelectionsAllowed} stocks for your basket.`,
        variant: "destructive"
      });
      return;
    }

    const userId = Number(JSON.parse(localStorage.getItem("userId") || "0"));
    console.log("userId = ", userId);

    const contestId = Number.isNaN(Number(competitionId)) ? 4 : Number(competitionId);

    try {
      const apiPath = BACKEND_HOST + 'enterCustomCompetition';
      const response = await fetch(apiPath, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          contest_id: contestId,
          stocks_in_basket: selectedStocks.map(stock => stock.symbol),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
      toast({
        title: "Error",
        description: "Failed to join the competition. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddStock = (stock: Stock) => {
    if (selectedStocks.length >= competitionData.maxSelectionsAllowed) {
      toast({
        title: "Maximum Selections Reached",
        description: `You can only select ${competitionData.maxSelectionsAllowed} stocks.`,
        variant: "destructive"
      });
      return;
    }

    if (selectedStocks.some(s => s.symbol === stock.symbol)) {
      toast({
        title: "Stock Already Selected",
        description: `You have already selected ${stock.name}.`,
        variant: "destructive"
      });
      return;
    }

    const newSelections = [...selectedStocks, stock];
    setSelectedStocks(newSelections);
    handleStockSelectionsChange(newSelections);
  };

  const handleRemoveStock = (stockId: string) => {
    const newSelections = selectedStocks.filter(stock => stock.symbol !== stockId);
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

      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/competitions")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Competitions
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <h1 className="text-3xl font-bold mb-4">{competitionData.title}</h1>
              <p className="text-muted-foreground mb-8">{competitionData.description}</p>

              <div className="space-y-8">
                <Input
                  type="search"
                  placeholder="Search for a stock..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {paginatedStocks.map(stock => (
                    <MorphCard key={stock.id} className="flex items-center justify-between p-3 animate-fade-in">
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[180px]">{stock.name}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleAddStock(stock)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </MorphCard>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {selectedStocks.length} of {competitionData.maxSelectionsAllowed} stocks selected
                </div>

                {selectedStocks.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {selectedStocks.map(stock => (
                      <MorphCard key={stock.id} className="flex items-center justify-between p-3 animate-fade-in">
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[180px]">{stock.name}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleRemoveStock(stock.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </MorphCard>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <Button
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={handleJoinCompetition}
                    disabled={selectedStocks.length < competitionData.maxSelectionsAllowed}
                  >
                    Join Competition for ₹{competitionData.entryFee}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <MorphCard className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Competition Details</h2>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-gold-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Entry Fee</p>
                      <p className="font-medium">₹{competitionData.entryFee}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IndianRupee className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="text-sm text-foreground font-medium leading-snug">
                        {competitionData.prizePool > 0 ? 
                          `₹${competitionData.prizePool.toLocaleString()}` :
                          <span className="font-semibold">number of players × entry fee</span>
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-mint-600 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Participants</p>
                      <p className="font-medium">{competitionData.participants}/{competitionData.maxParticipants || '∞'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {new Date(competitionData.startDate).toLocaleDateString()} - {new Date(competitionData.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-gold-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Selection Requirement</p>
                      <p className="font-medium">{competitionData.maxSelectionsAllowed} stocks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Currency Type</p>
                      <p className="font-medium capitalize">{competitionData.currencyType}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">How Scoring Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Your score is calculated based on the average percentage return of your selected
                    stocks over the competition period. The higher the return, the higher your ranking.
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">Prize Distribution</h3>
                  <ul className="text-sm text-muted-foreground">
                    <li>Exponential decay</li>
                    <li>Will add more details soon</li>
                  </ul>
                </div>
              </MorphCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomBasketGame;
