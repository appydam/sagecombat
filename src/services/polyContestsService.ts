import { PolyContest, PriceHistoryPoint } from "@/types/competitions";
import { toast } from "sonner";

// Mock data for poly contests
const mockPolyContests: PolyContest[] = [
  {
    id: "1",
    title: "Will Bitcoin reach $110k by 25 May, 2025?",
    description: "Predict if Bitcoin will reach $100,000 before the end of Q4 2025.",
    category: "Crypto",
    status: "active",
    participants: 456,
    yes_price: 0.65,
    no_price: 0.35,
    total_volume: 1250000,
    end_time: "2025-05-25T00:00:00Z",
    created_at: "2025-05-10T12:00:00Z",
    outcome: null
  },
  {
    id: "2",
    title: "Will SpaceX land humans on Mars by 2026?",
    description: "Will SpaceX successfully land a crewed mission on Mars by the end of 2026?",
    category: "Space",
    status: "active",
    participants: 827,
    yes_price: 0.25,
    no_price: 0.75,
    total_volume: 342000,
    end_time: "2025-12-31T00:00:00Z",
    created_at: "2025-04-10T15:30:00Z",
    outcome: null
  },
  {
    id: "4",
    title: "Will Ethereum merge to proof-of-stake in May, 2025?",
    description: "Will Ethereum successfully complete its transition to proof-of-stake consensus mechanism in 2024?",
    category: "Crypto",
    status: "resolved",
    participants: 972,
    yes_price: 0.95,
    no_price: 0.05,
    total_volume: 458000,
    end_time: "2025-05-30T00:00:00Z",
    created_at: "2025-05-10T11:45:00Z",
    outcome: "yes"
  }
];

// Mock price history data generator
const generateMockPriceHistory = (contestId: string): PriceHistoryPoint[] => {
  const points: PriceHistoryPoint[] = [];
  const now = new Date();
  let yesPrice = Math.random() * 0.4 + 0.3; // Between 0.3 and 0.7
  let noPrice = 1 - yesPrice;

  // Generate data points for the last 7 days, every 4 hours
  for (let i = 0; i < 7 * 6; i++) {
    const timestamp = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000) + (i * 4 * 60 * 60 * 1000));

    // Small random changes to prices
    const yesChange = (Math.random() * 0.1) - 0.05;
    yesPrice = Math.max(0.05, Math.min(0.95, yesPrice + yesChange));
    noPrice = 1 - yesPrice;

    points.push({
      timestamp: timestamp.toISOString(),
      yes_price: yesPrice,
      no_price: noPrice
    });
  }

  return points;
};

// Mock user bets
const mockUserBets = new Map<string, Array<{
  id: string;
  user_id: string;
  contest_id: string;
  prediction: "yes" | "no";
  coins: number;
  price: number;
  potential_payout: number;
  created_at: string;
}>>();

// Get all PolyContests
export const getPolyContests = async () => {
  try {
    // Extract unique categories
    const categories = [...new Set(mockPolyContests.map(contest => contest.category))];

    return { data: mockPolyContests, categories, error: null };
  } catch (error) {
    console.error("Error fetching poly contests:", error);
    toast.error("Failed to load poly contests");

    // Return empty data with error
    return { data: [], categories: [], error: "Failed to fetch poly contests" };
  }
};

// Legacy alias
export const fetchPolyContests = getPolyContests;

// Get a single PolyContest by ID
export const getPolyContestById = async (id: string) => {
  try {
    const contest = mockPolyContests.find(c => c.id === id);

    if (!contest) {
      throw new Error(`Contest with ID ${id} not found`);
    }

    return { contest, error: null };
  } catch (error) {
    console.error(`Error fetching poly contest with ID ${id}:`, error);
    return { contest: null, error: "Failed to fetch contest details" };
  }
};

// Get price history for a contest
export const getPolyPriceHistory = async (contestId: string) => {
  try {
    const priceHistory = generateMockPriceHistory(contestId);
    return { priceHistory, error: null };
  } catch (error) {
    console.error("Error fetching price history:", error);
    return { priceHistory: [], error: "Failed to fetch price history" };
  }
};

// Place a bet on a poly contest
export const placePolyBet = async (
  userId: string,
  contestId: string,
  prediction: "yes" | "no",
  coins: number
) => {
  try {
    // Find the contest
    const contestObj = mockPolyContests.find(c => c.id === contestId);
    if (!contestObj) throw new Error("Contest not found");

    const price = prediction === "yes" ? contestObj.yes_price : contestObj.no_price;
    const potentialPayout = +(coins / price).toFixed(2);

    // Create bet object
    const bet = {
      id: `bet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      user_id: userId,
      contest_id: contestId,
      prediction,
      coins,
      price,
      potential_payout: potentialPayout,
      created_at: new Date().toISOString()
    };

    // Store bet in our mock database
    if (!mockUserBets.has(userId)) {
      mockUserBets.set(userId, []);
    }
    mockUserBets.get(userId)?.push(bet);

    // Update contest (increase participation and volume)
    const contestIndex = mockPolyContests.findIndex(c => c.id === contestId);
    if (contestIndex >= 0) {
      mockPolyContests[contestIndex].participants += 1;
      mockPolyContests[contestIndex].total_volume += coins;

      // Adjust prices slightly
      const priceShift = Math.min(0.03, coins / 10000); // Max 3% shift
      if (prediction === "yes") {
        mockPolyContests[contestIndex].yes_price = Math.min(0.95, mockPolyContests[contestIndex].yes_price + priceShift);
        mockPolyContests[contestIndex].no_price = 1 - mockPolyContests[contestIndex].yes_price;
      } else {
        mockPolyContests[contestIndex].no_price = Math.min(0.95, mockPolyContests[contestIndex].no_price + priceShift);
        mockPolyContests[contestIndex].yes_price = 1 - mockPolyContests[contestIndex].no_price;
      }
    }

    return {
      success: true,
      message: `Bet placed successfully! Potential payout: ${potentialPayout} coins`,
      error: null
    };
  } catch (error) {
    console.error("Error placing bet:", error);
    return {
      success: false,
      message: null,
      error: "Failed to place bet. Please try again."
    };
  }
};

// Get user bets for a specific contest
export const getUserBetsForContest = async (contestId: string) => {
  try {
    // In a real implementation, we would filter by user ID and contest ID
    // For mock data, we'll return all bets for this contest
    let allBets: any[] = [];
    mockUserBets.forEach(userBets => {
      allBets = [...allBets, ...userBets.filter(bet => bet.contest_id === contestId)];
    });

    return { data: allBets, error: null };
  } catch (error) {
    console.error("Error fetching user bets:", error);
    return { data: null, error: "Failed to fetch your bets" };
  }
};

// Alias exports for backward compatibility with existing code
export const fetchPolyContestById = getPolyContestById;
export const fetchPriceHistory = getPolyPriceHistory;
export const placeBet = placePolyBet;
