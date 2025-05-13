import CompetitionCard from "@/components/CompetitionCard";
import OpinionEventCard from "@/components/competitions/OpinionEventCard";
import PolyContestCard from "@/components/competitions/PolyContestCard";
import GeoQuestCard from "@/components/competitions/GeoQuestCard";
import { CompetitionProps, OpinionEvent, PolyContest } from "@/types/competitions";
import { Bitcoin as BitcoinIcon, Clock, BarChart2, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GeoQuestContest {
  id: string;
  title: string;
  theme: string;
  start_time: string;
  end_time: string;
  entry_fee: number;
  prize_pool: number;
  status: "active" | "upcoming" | "completed";
  image_url: string;
}

interface CompetitionListDisplayProps {
  activeGameType: string;
  filteredCompetitions: CompetitionProps[];
  filteredEvents: OpinionEvent[];
  filteredPolyContests?: PolyContest[];
  filteredGeoQuests?: GeoQuestContest[];
  isLoading: boolean;
  error: string | null;
  onOpinionAnswerSubmitted?: () => void;
  onPolyBetPlaced?: () => void;
  onGeoQuestJoined?: () => void;
}

const CompetitionListDisplay = ({
  activeGameType,
  filteredCompetitions,
  filteredEvents,
  filteredPolyContests = [],
  filteredGeoQuests = [],
  isLoading,
  error,
  onOpinionAnswerSubmitted,
  onPolyBetPlaced,
  onGeoQuestJoined
}: CompetitionListDisplayProps) => {

  // Loading State
  if (isLoading) {
    // Show skeletons based on the expected layout
    const skeletonCount = activeGameType === 'equity' ? 3 : 4;
    const gridClasses = activeGameType === 'equity'
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      : "grid grid-cols-1 md:grid-cols-2 gap-6";

    return (
      <div className={gridClasses}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3 p-4 border rounded-lg bg-card">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-8 w-[100px] mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  // Error State with mock data
  if (error) {
    return (
      <>
        <div className="text-center py-6 my-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/30 mb-8">
          <h3 className="text-lg font-medium mb-2">Error loading competitions</h3>
          <p className="text-xs">{error}</p>
          <p className="text-xs mt-1">Displaying sample data instead.</p>
        </div>

        {/* Show appropriate mock data based on game type */}
        {renderContent()}
      </>
    );
  }

  // Render content based on game type
  function renderContent() {
    // Crypto Coming Soon
    if (activeGameType === "crypto") {
      return (
        <div className="text-center py-16 my-4 bg-secondary/40 rounded-lg border">
          <BitcoinIcon className="h-12 w-12 mx-auto mb-4 text-amber-500 animate-pulse" />
          <h3 className="text-2xl font-medium mb-2">Crypto Contests Coming Soon!</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We're working hard to bring you exciting cryptocurrency trading contests.
            Stay tuned for updates!
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Expected launch: Q2 2025</span>
          </div>
        </div>
      );
    }

    // Equity List
    if (activeGameType === "equity") {
      if (filteredCompetitions.length > 0) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompetitions.map(competition => (
              <CompetitionCard key={competition.id} {...competition} />
            ))}
          </div>
        );
      } else {
        return (
          <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg border">
            <h3 className="text-lg font-medium mb-2">No equity competitions found</h3>
            <p className="text-xs">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        );
      }
    }

    // Opinion List
    if (activeGameType === "opinion") {
      if (filteredEvents.length > 0) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredEvents.map(event => (
              <OpinionEventCard
                key={event.id}
                event={event}
                onAnswerSubmitted={onOpinionAnswerSubmitted}
              />
            ))}
          </div>
        );
      } else {
        return (
          <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg border">
            <h3 className="text-lg font-medium mb-2">No opinion events found</h3>
            <p className="text-xs">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        );
      }
    }

    // Poly List
    if (activeGameType === "poly") {
      if (filteredPolyContests && filteredPolyContests.length > 0) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPolyContests.map(contest => (
              <PolyContestCard
                key={contest.id}
                contest={contest}
                onBetPlaced={onPolyBetPlaced}
              />
            ))}
          </div>
        );
      } else {
        return (
          <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg border">
            <BarChart2 className="h-12 w-12 mx-auto mb-4 text-amber-500" />
            <h3 className="text-lg font-medium mb-2">No poly contests found</h3>
            <p className="text-xs">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        );
      }
    }

    // GeoQuest List
    if (activeGameType === "geoquest") {
      if (filteredGeoQuests && filteredGeoQuests.length > 0) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGeoQuests.map(contest => (
              <GeoQuestCard
                key={contest.id}
                contest={contest}
                onContestJoined={onGeoQuestJoined}
              />
            ))}
          </div>
        );
      } else {
        return (
          <div className="text-center py-12 my-4 bg-secondary/40 rounded-lg border">
            <Globe className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-medium mb-2">No GeoQuest contests found</h3>
            <p className="text-xs">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        );
      }
    }

    return null;
  }

  return renderContent();
};

export default CompetitionListDisplay;
