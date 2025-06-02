
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trophy, Medal, Award, Star, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { fetchContestLeaderboard, LeaderboardEntry } from "@/services/leaderboardService";

interface ContestDetails {
  id: string;
  name: string;
  status: "open" | "closed" | "completed";
  description: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  maxParticipants?: number;
  prizePool: number;
  type: "custom" | "predefined";
  entryFee?: number;
  maxSelectionsAllowed?: number;
  currencyType?: string;
}

import { useSearchParams } from "react-router-dom";

const ContestLeaderboard = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [searchParams] = useSearchParams();
  const [participants, setParticipants] = useState<LeaderboardEntry[]>([]);
  const [contestDetails, setContestDetails] = useState<ContestDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch contest details from backend only; do not use mock data or URL params
        if (!contestId) {
          setContestDetails(null);
          setParticipants([]);
          toast.error('Contest ID is missing in URL.');
          setLoading(false);
          return;
        }
        // Fetch all competitions and find the matching contest
        const competitionsModule = await import('@/services/competitionsService');
        const { equityCompetitions, error } = await competitionsModule.fetchCompetitionsData();
        if (error) {
          toast.error('Failed to fetch contest details from backend.');
          setContestDetails(null);
          setParticipants([]);
          setLoading(false);
          return;
        }
        const contest = equityCompetitions.find((c: any) => c.id === contestId);
        if (!contest) {
          toast.error('Contest not found.');
          setContestDetails(null);
          setParticipants([]);
          setLoading(false);
          return;
        }
        // Map backend contest object to ContestDetails interface, using only valid CompetitionProps fields
        // Map status: 'open' | 'closed' | 'upcoming' (CompetitionProps) to 'open' | 'closed' | 'completed' (ContestDetails)
        let mappedStatus: 'open' | 'closed' | 'completed' = 'open';
        if (contest.status === 'closed') mappedStatus = 'closed';
        else if (contest.status === 'upcoming') mappedStatus = 'open'; // treat upcoming as open for leaderboard
        // else if contest is completed, backend should ideally send 'closed' or have a scoring flag
        const details: ContestDetails = {
          id: contest.id,
          name: contest.name,
          status: mappedStatus,
          description: contest.description || '',
          startDate: contest.registerDeadline || '',
          endDate: contest.registerDeadline || '',
          participantCount: contest.currentParticipants || 0,
          maxParticipants: contest.maxParticipants,
          prizePool: contest.prizePool || 0,
          type: contest.type || 'custom',
          entryFee: contest.entryFee,
          maxSelectionsAllowed: 5,
          currencyType: contest.currency_type || 'virtual',
        };
        setContestDetails(details);
        // Fetch leaderboard data from our service
        const leaderboardData = await fetchContestLeaderboard(contestId);
        setParticipants(leaderboardData);
      } catch (error) {
        console.error("Error fetching contest data:", error);
        toast.error("Failed to load contest data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contestId, searchParams]);

  const renderRankIndicator = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-gold-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    if (rank <= 10) return <Star className="h-5 w-5 text-blue-500" />;
    return <span>{rank}</span>;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateProfit = (avg: number, contestDetails: ContestDetails | null) => {
    if (!contestDetails || !contestDetails.entryFee) return 0;
    // Assuming a standard investment amount of 10,000 for simplicity
    const investmentAmount = 10000;
    return (investmentAmount * avg) / 100;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          ) : (
            <>
              {contestDetails && (
  <div className="max-w-4xl mx-auto text-center mb-8">
    <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-secondary">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contestDetails.status === "open" ? "bg-green-100 text-green-800" :
        contestDetails.status === "closed" ? "bg-amber-100 text-amber-800" :
          "bg-blue-100 text-blue-800"
        }`}>
        {contestDetails.status.charAt(0).toUpperCase() + contestDetails.status.slice(1)}
      </span>
      <span className="mx-2 text-muted-foreground">•</span>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contestDetails.type === "custom" ? "bg-mint-100 text-mint-800" : "bg-gold-100 text-gold-800"
        }`}>
        {contestDetails.type === "custom" ? "Custom Basket" : "Predefined Basket"}
      </span>
    </div>

    <h1 className="font-display text-4xl font-bold mb-4">{contestDetails.name}</h1>

    <p className="text-muted-foreground text-lg mb-4">
      {contestDetails.description}
    </p>

    <div className="flex flex-wrap justify-center gap-6 mb-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Duration</p>
        <p className="font-medium">
          {formatDate(contestDetails.startDate)} - {formatDate(contestDetails.endDate)}
        </p>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Participants</p>
        <p className="font-medium flex items-center justify-center">
          <Users className="w-4 h-4 mr-1" />
          {contestDetails.participantCount}
          {contestDetails.maxParticipants ? <span className="text-xs ml-1">/ {contestDetails.maxParticipants}</span> : null}
        </p>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Prize Pool</p>
        <p className="font-medium">{contestDetails.prizePool > 0 ? `₹${contestDetails.prizePool.toLocaleString()}` : <span className="font-semibold">number of players × entry fee</span>}</p>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Entry Fee</p>
        <p className="font-medium">₹{contestDetails.entryFee?.toLocaleString() || "Free"}</p>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Selection Requirement</p>
        <p className="font-medium">{contestDetails.maxSelectionsAllowed || 5} stocks</p>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Currency Type</p>
        <p className="font-medium capitalize">{contestDetails.currencyType || 'virtual'}</p>
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
    {/* Back to Contest button with all contest details */}
    <Link to={`/custom-basket?id=${contestId}&name=${encodeURIComponent(contestDetails?.name || '')}&description=${encodeURIComponent(contestDetails?.description || '')}&entryFee=${contestDetails?.entryFee || 0}&maxParticipants=${contestDetails?.maxParticipants || 0}&currentParticipants=${contestDetails?.participantCount || 0}&prizePool=${contestDetails?.prizePool || 0}&startDate=${contestDetails?.startDate}&endDate=${contestDetails?.endDate}&currencyType=${contestDetails?.currencyType || 'virtual'}`}>
      <Button variant="outline" className="mb-8 mt-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Contest
      </Button>
    </Link>
  </div>
)}

              <MorphCard className="overflow-hidden mb-6">
                <div className="p-4 bg-secondary/70 flex flex-col sm:flex-row justify-between items-center">
                  <h2 className="text-2xl font-bold flex items-center mb-2 sm:mb-0">
                    <Trophy className="h-6 w-6 mr-2 text-gold-500" />
                    Top 10 Performers
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {participants.length} participants ranked by performance
                  </div>
                </div>

                {/* Desktop Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 px-6 bg-secondary/30 text-sm font-semibold">
                  <div className="col-span-1 text-center">Rank</div>
                  {/* <div className="col-span-3">User ID</div> */}
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2 text-right">Return %</div>
                  <div className="col-span-3 text-right">Bucket</div>
                  <div className="col-span-3 text-right">Prize Money (₹)</div>
                </div>

                {/* Table Content */}
                <div className="divide-y">
                  {participants.slice(0, 10).map((participant) => (
                    <div
                      key={participant.UserId}
                      className={`grid grid-cols-2 md:grid-cols-12 gap-4 p-4 md:px-6 transition-colors ${participant.Rank <= 3 ? "bg-secondary/20" : "hover:bg-secondary/10"
                        }`}
                    >
                      {/* Rank */}
                      <div className="col-span-1 flex justify-center items-center font-bold">
                        {renderRankIndicator(participant.Rank)}
                      </div>

                      {/* User ID */}
                      <div className="col-span-1 md:col-span-3 flex items-center">
                        <div className="flex flex-col">
                          <span className="font-medium">{participant.Name}</span>
                        </div>
                      </div>

                      {/* Return % (mobile) */}
                      <div className="col-span-1 md:hidden text-right">
                        <div className="text-xs text-muted-foreground">Return</div>
                        <div className="font-semibold text-green-600">
                          +{participant.Avg.toFixed(2)}%
                        </div>
                      </div>

                      {/* Return % (desktop) */}
                      <div className="hidden md:block md:col-span-2 text-right self-center">
                        <div className="font-semibold text-green-600">
                          +{participant.Avg.toFixed(2)}%
                        </div>
                      </div>

                      {/* Bucket (desktop) */}
                      <div className="hidden md:block md:col-span-3 text-right self-center">
                        <div className="text-xs text-muted-foreground truncate">
                          {participant.Bucket.join(", ")}
                        </div>
                      </div>

                      {/* Prize Money (desktop) */}
                      <div className="hidden md:block md:col-span-3 text-right self-center">
                        <div className="font-semibold text-gold-700">
                          ₹{participant.Prize.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MorphCard>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContestLeaderboard;
