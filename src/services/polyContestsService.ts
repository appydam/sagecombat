import { PolyContest, PriceHistoryPoint, PolyOrder, PolyOrderResponse } from "@/types/competitions";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/constants/config";

// Mock price history data generator for chart visualization
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

// Transforming API data to our frontend model
const transformApiPolyContest = (apiContest: any): PolyContest => {
  return {
    id: apiContest.id.toString(),
    title: apiContest.name,
    description: apiContest.description,
    category: apiContest.tag || "General",
    status: apiContest.status === "open" ? "active" :
      apiContest.status === "closed" ? "resolved" : "cancelled",
    participants: 0, // Will be populated from other API or estimations
    yes_price: 0.5, // Will be fetched separately
    no_price: 0.5, // Will be fetched separately
    total_volume: 0, // Will be populated from other API or estimations
    end_time: apiContest.registration_deadline || new Date().toISOString(),
    created_at: apiContest.created_at || new Date().toISOString(),
    outcome: apiContest.answer === true ? "yes" :
      apiContest.answer === false ? "no" : null,
    currency_type: apiContest.currency_type || "virtual" // Adding currency_type
  };
};

// Get all PolyContests
export const getPolyContests = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.GET_ALL_COMP);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !data.data.orderbook_contests) {
      throw new Error("Invalid API response format");
    }

    // Transform API data to our frontend model
    const polyContests = await Promise.all(data.data.orderbook_contests.map(async (contest: any) => {
      const transformed = transformApiPolyContest(contest);

      // Fetch the current price for each contest
      try {
        const priceResponse = await fetch(API_ENDPOINTS.GET_MARKET_PRICE(contest.id));
        if (priceResponse.ok) {
          const priceData = await priceResponse.json();
          transformed.yes_price = priceData.yes_price;
          transformed.no_price = priceData.no_price;
        }
      } catch (error) {
        console.error(`Failed to fetch price for contest ${contest.id}:`, error);
      }

      return transformed;
    }));

    // Extract unique categories
    const categories = [...new Set(polyContests.map(contest => contest.category))];

    return { data: polyContests, categories, error: null };
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
    const response = await fetch(API_ENDPOINTS.GET_ALL_COMP);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !data.data.orderbook_contests) {
      throw new Error("Invalid API response format");
    }

    // Find the requested contest
    const apiContest = data.data.orderbook_contests.find((c: any) => c.id.toString() === id);

    if (!apiContest) {
      throw new Error(`Contest with ID ${id} not found`);
    }

    // Transform into our model
    const contest = transformApiPolyContest(apiContest);

    // Fetch the current price
    const priceResponse = await fetch(API_ENDPOINTS.GET_MARKET_PRICE(parseInt(id)));
    if (priceResponse.ok) {
      const priceData = await priceResponse.json();
      contest.yes_price = priceData.yes_price;
      contest.no_price = priceData.no_price;
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
    // Use the real API endpoint to fetch price history
    const response = await fetch(API_ENDPOINTS.GET_PRICE_HISTORY(parseInt(contestId)));
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid API response format for price history");
    }
    
    // Transform the API data into our PriceHistoryPoint format
    const priceHistory: PriceHistoryPoint[] = data.data.map((point: any) => ({
      timestamp: point.timestamp,
      yes_price: point.yes_price,
      no_price: point.no_price
    }));
    
    // Sort by timestamp to ensure chronological order
    priceHistory.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    return { priceHistory, error: null };
  } catch (error) {
    console.error("Error fetching price history:", error);
    
    // If the API fails, fall back to the mock data for development purposes
    // In production, we would return an error and handle it appropriately
    return { priceHistory: [], error: "Failed to fetch price history" };
  }
};

// Place an order (buy/sell) for a poly contest
export const placePolyOrder = async (
  userId: string,
  marketId: string,
  outcome: boolean,
  orderType: "buy" | "sell",
  price: number,
  quantity: number
) => {
  try {
    const userId = Number(JSON.parse(localStorage.getItem("userId")));
    const payload = {
      user_id: userId,
      market_id: parseInt(marketId),
      outcome,
      type: orderType,
      order_type: "limit", // Currently only supporting limit orders
      price,
      quantity
    };

    // console.log("poly contest place order payload = ", payload);

    const response = await fetch(API_ENDPOINTS.PLACE_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed with status: ${response.status}`);
    }

    const data = await response.json() as PolyOrderResponse;

    return {
      success: true,
      data,
      message: `Order placed successfully! ${orderType === "buy" ? "Bought" : "Sold"} ${quantity} shares at ₹${price.toFixed(2)}`,
      error: null
    };
  } catch (error) {
    console.error("Error placing order:", error);
    return {
      success: false,
      data: null,
      message: null,
      error: error instanceof Error ? error.message : "Failed to place order. Please try again."
    };
  }
};

// Legacy method - for backward compatibility
export const placePolyBet = async (
  userId: string,
  contestId: string,
  prediction: "yes" | "no",
  coins: number
) => {
  try {
    const outcome = prediction === "yes";
    const marketId = contestId;

    // Determine price based on prediction
    const priceResponse = await fetch(API_ENDPOINTS.GET_MARKET_PRICE(parseInt(marketId)));
    if (!priceResponse.ok) {
      throw new Error("Failed to get current price");
    }

    const priceData = await priceResponse.json();
    const price = outcome ? priceData.yes_price : priceData.no_price;

    // Place the order
    const orderResult = await placePolyOrder(
      userId,
      marketId,
      outcome,
      "buy",
      price,
      coins
    );

    if (!orderResult.success) {
      throw new Error(orderResult.error || "Failed to place bet");
    }

    return {
      success: true,
      message: orderResult.message,
      error: null
    };
  } catch (error) {
    console.error("Error placing bet:", error);
    return {
      success: false,
      message: null,
      error: error instanceof Error ? error.message : "Failed to place bet. Please try again."
    };
  }
};

// Get user bets for a specific contest
export const getUserBetsForContest = async (contestId: string) => {
  try {
    // In a real implementation, we would call an API endpoint
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
