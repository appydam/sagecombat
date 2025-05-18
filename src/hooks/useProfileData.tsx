import { useState, useEffect } from 'react';
import { ContestType, mockParticipations, mockOpinionParticipations, mockPolyParticipations } from '@/components/profile/data/mockProfileData';
import { BACKEND_HOST } from '@/constants/config';
import { supabase } from '@/integrations/supabase/client';

interface UserBalanceData {
  user_id: number;
  balance: number;
  profit: number;
  virtual_balance: number;
  virtual_profit: number;
}

export const useProfileData = () => {
  const [participations, setParticipations] = useState<ContestType[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [activeContestNumber, setActiveContestNumber] = useState(0);
  const [completedContestsNumber, setCompletedContestsNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasUserContests, setHasUserContests] = useState(false);
  const [userBalanceData, setUserBalanceData] = useState<UserBalanceData | null>(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        // Check if user is authenticated
        const isAuthenticatedUser = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(isAuthenticatedUser);
        
        if (!isAuthenticatedUser) {
          // Use mock data for non-authenticated users (combination of equity, opinion, and poly trading contests)
          const combinedMocks = [...mockParticipations, ...mockOpinionParticipations, ...mockPolyParticipations];
          const mocksWithKeys = combinedMocks.map((item, index) => ({
            ...item,
            uniqueKey: `${item.contest_id}-${index}`
          }));
          
          setParticipations(mocksWithKeys);
          setTotalProfit(combinedMocks.reduce((sum, contest) => {
            return sum + (contest.entry_fee * contest.returns / 100);
          }, 0));
          
          setActiveContestNumber(combinedMocks.filter(p => p.status === 'active').length);
          setCompletedContestsNumber(combinedMocks.filter(p => p.status === 'completed').length);
          setHasUserContests(true);
          setLoading(false);
          return;
        }
        
        // Fetch user balance data for authenticated users
        try {
          const userId = Number(JSON.parse(localStorage.getItem("userId") || "0"));
          
          console.log("About to call fetchUserBallance API with userId:", userId);
          
          const balanceResponse = await fetch(BACKEND_HOST + 'fetchUserBallance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
          });
          
          const balanceResult = await balanceResponse.json();
          console.log("Balance API response:", balanceResult);
          
          if (balanceResult.code === 200) {
            setUserBalanceData(balanceResult.data);
          }
        } catch (balanceError) {
          console.error("Error fetching user balance:", balanceError);
        }
        
        // For authenticated users, try to fetch GeoQuest data first
        try {
          // Get user's GeoQuest contest participations
          const { data: { data }, error } = await supabase.functions.invoke('geo-quest-api', {
            body: { path: 'get-user-profile' }
          });
          
          if (error) throw error;
          
          if (data?.participations?.length > 0) {
            const geoParticipations = data.participations.map((p: any) => ({
              contest_id: p.contest_id,
              user_id: p.user_id,
              contest_name: p.title,
              join_time: p.joined_at,
              status: p.status,
              returns: p.profit ? (p.profit / p.entry_fee * 100) : 0,
              entry_fee: p.entry_fee,
              rank: p.rank || 0,
              totalParticipants: p.total_participants || 0,
              uniqueKey: `geo-${p.contest_id}`,
              gameType: "geoquest",
              stocks_in_basket: [] // GeoQuest doesn't use stocks
            }));
            
            // Add GeoQuest participations to state
            setParticipations(prev => [...prev, ...geoParticipations]);
            
            // Update totals
            setTotalProfit(prev => prev + (data.total_profit || 0));
            setActiveContestNumber(prev => prev + (data.active_contests || 0));
            setCompletedContestsNumber(prev => prev + (data.completed_contests || 0));
            
            // Mark that user has contests
            setHasUserContests(true);
          }
        } catch (geoError) {
          console.error("Error fetching GeoQuest profile:", geoError);
        }
        
        // Fetch data from legacy API for equity/opinion/poly contests
        try {
          const apiPath = BACKEND_HOST + 'recentContests';
          const userId = Number(JSON.parse(localStorage.getItem("userId") || "0"));
          
          console.log("About to call recentContests API with userId:", userId);
          console.log("API URL:", apiPath);
          
          const response = await fetch(apiPath, {
            method: 'POST',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
              'DNT': '1',
              'Referer': BACKEND_HOST + 'competitions',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
          });
  
          const result = await response.json();
          console.log("API response:", result);
          
          if (result.code === 200) {
            let equityContests: ContestType[] = [];
            let opinionContests: ContestType[] = [];
            let polyContests: ContestType[] = [];
            let equityTotalProfit = 0;
            let equityCompletedContests = 0;
            let opinionActiveContests = 0;
            let polyActiveContests = 0;
            
            // Process equity contests data
            if (result.data.EquityRecentData) {
              equityTotalProfit = result.data.EquityRecentData.totalProfit || 0;
              equityCompletedContests = result.data.EquityRecentData.completedContest || 0;
              
              if (result.data.EquityRecentData.recentContests && result.data.EquityRecentData.recentContests.length > 0) {
                equityContests = result.data.EquityRecentData.recentContests.map((contest: any, index: number) => ({
                  contest_id: contest.contestId,
                  user_id: userId,
                  contest_name: contest.contestName,
                  stocks_in_basket: contest.bucket || [],
                  join_time: contest.joinedTime,
                  status: contest.status === 'open' ? 'active' : 'completed',
                  returns: contest.pnl ? (contest.pnl / contest.entryFee * 100) : 0,
                  entry_fee: contest.entryFee,
                  rank: contest.rank || 0,
                  totalParticipants: contest.totalParticipants || 0,
                  uniqueKey: `equity-${contest.contestId}-${index}`,
                  gameType: "equity"
                }));
              }
            }
            
            // Process opinion contests data
            if (result.data.OpinionRecentData) {
              opinionActiveContests = result.data.OpinionRecentData.activeContest || 0;
              
              if (result.data.OpinionRecentData.recentOpinionActivity && result.data.OpinionRecentData.recentOpinionActivity.length > 0) {
                opinionContests = result.data.OpinionRecentData.recentOpinionActivity.map((contest: any, index: number) => ({
                  contest_id: contest.competition_id,
                  user_id: userId,
                  contest_name: contest.competition_name,
                  stocks_in_basket: [], // Opinion contests don't have stocks
                  join_time: new Date().toISOString(), // Use current date as join time isn't provided
                  status: contest.status === 'registration_closed' ? 'active' : 'completed',
                  returns: (contest.prize_money ? (contest.prize_money / contest.entry_fee * 100) : 0),
                  entry_fee: contest.entry_fee,
                  rank: 0, // Rank isn't provided
                  totalParticipants: 0, // Total participants isn't provided
                  uniqueKey: `opinion-${contest.competition_id}-${index}`,
                  gameType: "opinion"
                }));
              }
            }
            
            // Process orderbook (poly) contests data
            if (result.data.OrderBookRecentData) {
              polyActiveContests = result.data.OrderBookRecentData.activeContest || 0;
              
              if (result.data.OrderBookRecentData.recentContests && result.data.OrderBookRecentData.recentContests.length > 0) {
                polyContests = result.data.OrderBookRecentData.recentContests.map((contest: any, index: number) => ({
                  contest_id: contest.market_id,
                  user_id: userId,
                  contest_name: contest.name,
                  stocks_in_basket: [], // Poly contests don't have stocks
                  join_time: contest.created_at,
                  status: contest.status === 'open' ? 'active' : 'completed',
                  returns: 0, // No returns info provided yet
                  entry_fee: 50, // Default entry fee
                  orders: contest.orders,
                  uniqueKey: `poly-${contest.market_id}-${index}`,
                  gameType: "poly"
                }));
              }
            }
  
            // Add all contests to participations
            const allContests = [...equityContests, ...opinionContests, ...polyContests];
            if (allContests.length > 0) {
              setParticipations(prev => [...prev, ...allContests]);
              setHasUserContests(true);
            }
            
            // Update totals
            setTotalProfit(prev => prev + equityTotalProfit);
            setActiveContestNumber(prev => prev + opinionActiveContests + polyActiveContests);
            setCompletedContestsNumber(prev => prev + equityCompletedContests);
          }
        } catch (legacyError) {
          console.error("Error fetching legacy contests:", legacyError);
          console.error("Error details:", legacyError instanceof Error ? legacyError.message : String(legacyError));
        }
      } catch (error) {
        console.error('Error fetching contests:', error);
        // For authenticated users, don't fall back to mock data
        if (localStorage.getItem("isAuthenticated") === "true") {
          setParticipations([]);
          setHasUserContests(false);
        } else {
          // Only use mock data for non-authenticated users
          const combinedMocks = [...mockParticipations, ...mockOpinionParticipations, ...mockPolyParticipations];
          const mocksWithKeys = combinedMocks.map((item, index) => ({
            ...item,
            uniqueKey: `${item.contest_id}-${index}`
          }));
          setParticipations(mocksWithKeys);
          setHasUserContests(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return {
    participations,
    setParticipations,
    totalProfit,
    activeContestNumber,
    completedContestsNumber,
    loading,
    isAuthenticated,
    hasUserContests,
    userBalanceData
  };
};
