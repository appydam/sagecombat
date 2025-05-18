
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ContestCard from "./ContestCard";
import { ContestType } from "./data/mockProfileData";

interface ContestsListProps {
  participations: ContestType[];
  onEditStocks: (contest: ContestType) => void;
  isAuthenticated?: boolean;
  hasUserContests?: boolean;
}

const ContestsList = ({ 
  participations, 
  onEditStocks,
  isAuthenticated = false,
  hasUserContests = false
}: ContestsListProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter contests by game type
  const equityContests = participations.filter(contest => contest.gameType === "equity");
  const opinionContests = participations.filter(contest => contest.gameType === "opinion");
  const polyContests = participations.filter(contest => contest.gameType === "poly");
  
  // Get contests to display based on active tab
  const getContestsToDisplay = () => {
    switch (activeTab) {
      case "equity":
        return equityContests;
      case "opinion":
        return opinionContests;
      case "poly":
        return polyContests;
      case "all":
      default:
        return participations;
    }
  };

  const contestsToDisplay = getContestsToDisplay();

  // If user is not authenticated or doesn't have contests, show appropriate message
  if (!isAuthenticated || !hasUserContests || participations.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/40 rounded-lg">
        <h3 className="text-xl font-medium mb-2">No Contests Yet</h3>
        <p className="text-muted-foreground mb-6">
          {isAuthenticated 
            ? "You haven't participated in any contests yet."
            : "Login to see your contest history."}
        </p>
        <Button variant="outline" asChild>
          <a href="/competitions">Explore Contests</a>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="equity">Equity</TabsTrigger>
          <TabsTrigger value="opinion">Opinion</TabsTrigger>
          <TabsTrigger value="poly">Poly</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {contestsToDisplay.length > 0 ? (
            contestsToDisplay.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-${contest.gameType}`} 
                contest={contest}
                onEditStocks={onEditStocks}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-secondary/40 rounded-lg">
              <p>No contests found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="equity" className="space-y-4 mt-4">
          {equityContests.length > 0 ? (
            equityContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-equity`} 
                contest={contest}
                onEditStocks={onEditStocks}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-secondary/40 rounded-lg">
              <p>No equity contests found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="opinion" className="space-y-4 mt-4">
          {opinionContests.length > 0 ? (
            opinionContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-opinion`} 
                contest={contest}
                onEditStocks={onEditStocks}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-secondary/40 rounded-lg">
              <p>No opinion contests found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="poly" className="space-y-4 mt-4">
          {polyContests.length > 0 ? (
            polyContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-poly`} 
                contest={contest}
                onEditStocks={onEditStocks}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-secondary/40 rounded-lg">
              <p>No poly contests found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContestsList;
