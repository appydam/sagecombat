
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GameTypes from "@/components/GameTypes";
import Footer from "@/components/Footer";
import CompetitionCard from "@/components/CompetitionCard";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GameTypeToggle from "@/components/GameTypeToggle";

const Index = () => {
  const [selectedGameType, setSelectedGameType] = useState<"equity" | "crypto" | "opinion">("equity");

  // Sample data for demo purposes - filtered based on selected game type
  const allCompetitions = [
    {
      id: "comp-1",
      name: "Weekly Tech Stocks Challenge",
      description: "Select 5 tech stocks and compete for the highest returns",
      entryFee: 100,
      maxParticipants: 500,
      currentParticipants: 324,
      status: "open" as const,
      prizePool: 45000,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      type: "custom" as const,
      gameType: "equity" as const
    },
    {
      id: "comp-2",
      name: "Banking Sector Prediction",
      description: "Will banking stocks go up or down? Place your prediction.",
      entryFee: 50,
      maxParticipants: 1000,
      currentParticipants: 879,
      status: "closed" as const,
      prizePool: 35000,
      deadline: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      type: "predefined" as const,
      gameType: "equity" as const
    },
    {
      id: "comp-3",
      name: "Pharma Giants Showdown",
      description: "Select pharmaceutical stocks that will outperform the market",
      entryFee: 200,
      maxParticipants: 300,
      currentParticipants: 142,
      status: "closed" as const,
      prizePool: 50000,
      deadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      type: "custom" as const,
      gameType: "equity" as const
    },
    {
      id: "crypto-1",
      name: "Alt Coin Championship",
      description: "Select 5 alternative coins that will outperform Bitcoin",
      entryFee: 150,
      maxParticipants: 400,
      currentParticipants: 287,
      status: "open" as const,
      prizePool: 38000,
      deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      type: "custom" as const,
      gameType: "crypto" as const
    },
    {
      id: "crypto-2",
      name: "DeFi Protocol Performance",
      description: "Predict which DeFi tokens will lead the market",
      entryFee: 100,
      maxParticipants: 600,
      currentParticipants: 412,
      status: "open" as const,
      prizePool: 51000,
      deadline: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
      type: "predefined" as const,
      gameType: "crypto" as const
    },
    {
      id: "opinion-1",
      name: "IPL Match Predictions",
      description: "Will Mumbai Indians win their next match?",
      entryFee: 10,
      maxParticipants: 2000,
      currentParticipants: 1756,
      status: "open" as const,
      prizePool: 15000,
      deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      type: "opinion" as const,
      gameType: "opinion" as const
    },
    {
      id: "opinion-2",
      name: "Budget Policy Impact",
      description: "Will the new budget policies improve the Sensex by 5% in 30 days?",
      entryFee: 20,
      maxParticipants: 1500,
      currentParticipants: 982,
      status: "open" as const,
      prizePool: 25000,
      deadline: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      type: "opinion" as const,
      gameType: "opinion" as const
    }
  ];

  // Filter competitions based on selected game type
  const filteredCompetitions = allCompetitions.filter(comp => comp.gameType === selectedGameType);

  const leaderboardEntries = [
    { id: "entry-1", rank: 1, userId: "user-1", username: "StockGuru", return: 12.45, prize: 10000 },
    { id: "entry-2", rank: 2, userId: "user-2", username: "MarketMaven", return: 10.22, prize: 5000 },
    { id: "entry-3", rank: 3, userId: "user-3", username: "TradingKing", return: 8.17, prize: 2500 },
    { id: "entry-4", rank: 4, userId: "user-4", username: "BullishTrader", return: 6.89, prize: 1000 },
    { id: "entry-5", rank: 5, userId: "user-5", username: "StockWhisperer", return: 4.32, prize: 500 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Game Type Toggles */}
        {/* <section className="py-8 bg-secondary/20">
          <div className="container px-4 mx-auto">
            <GameTypeToggle 
              selectedGameType={selectedGameType} 
              onSelectGameType={setSelectedGameType} 
            />
          </div>
        </section> */}
        
        {/* Featured Competitions */}
        {/* <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent -z-10" />
          
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="font-display text-3xl font-bold mb-2">
                  {selectedGameType === "equity" && "Featured Equity Competitions"}
                  {selectedGameType === "crypto" && "Featured Crypto Competitions"}
                  {selectedGameType === "opinion" && "Featured Opinion Competitions"}
                </h2>
                <p className="text-muted-foreground">
                  {selectedGameType === "equity" && "Join these popular stock competitions and test your prediction skills"}
                  {selectedGameType === "crypto" && "Participate in crypto competitions and showcase your crypto market knowledge"}
                  {selectedGameType === "opinion" && "Answer Yes/No questions on real-world events and win rewards"}
                </p>
              </div>
              <Link to="/competitions" className="mt-4 md:mt-0">
                <Button variant="outline" className="rounded-full">
                  View All Competitions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {filteredCompetitions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCompetitions.map(competition => (
                  <CompetitionCard key={competition.id} {...competition} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No competitions found</h3>
                <p className="text-muted-foreground">
                  Check back soon for new competitions
                </p>
              </div>
            )}
          </div>
        </section> */}

        {/*  */}

        

        


        {/* Image container for overlay */}
        <div className="relative -my-36 container mx-auto pb-10"> {/* Added container and adjusted margin/padding */}
          <img src="/ggg.png" alt="Background Image" className="w-full h-auto" />
        </div>
        <Features />
        
        <GameTypes />
        
        {/* Leaderboard Preview */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-50/30 to-transparent -z-10" />
          
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="max-w-md">
                  <h2 className="font-display text-3xl font-bold mb-4">Top Performers Win Big</h2>
                  <p className="text-muted-foreground mb-6">
                    Our leaderboards track performance across all competitions. Top players earn real cash rewards for their market insights.
                  </p>
                  <Link to="/leaderboard">
                    <Button className="rounded-full">
                      View Global Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <LeaderboardPreview 
                  competitionId="global"
                  entries={leaderboardEntries}
                  title="This Week's Champions"
                />
              </div>
            </div>
          </div>
        </section>

        
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-mint-100/30 via-secondary to-gold-100/30 opacity-20 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="container px-4 mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto">
              Ready to Test Your Market Intelligence?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join SageCombat today and start competing in fantasy gaming competitions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/competitions">
                <Button size="lg" className="rounded-full px-8">
                  Browse Competitions <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
