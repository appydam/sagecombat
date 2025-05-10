
import { CompetitionsApiResponseData, FullCompetitionsApiResponse, CompetitionProps, OpinionEvent } from "@/types/competitions";
import { mockCompetitionsData } from "@/components/competitions/data/mockData";
import { BACKEND_HOST } from "@/constants/config";
import { toast } from "sonner";

// Track which contests user has joined (in memory for demo)
const userJoinedContests = new Set<string>();

// Function to transform API data to frontend format
export const mapApiDataToFrontend = (apiData: CompetitionsApiResponseData): {
  equityCompetitions: CompetitionProps[],
  opinionEvents: OpinionEvent[]
} => {
  // Map equity contests, handle missing key gracefully
  const equityCompetitions = (apiData.equity_contests || []).map(contest => {
    const contestId = String(contest.id);
    return {
      id: contestId,
      name: contest.name,
      title: contest.name, // Add title property for consistency
      description: contest.description,
      entryFee: contest.entry_fee,
      maxParticipants: contest.max_participants,
      currentParticipants: contest.current_participants,
      status: contest.status,
      // Calculate prize pool based on entry fee and max participants if not provided directly
      prizePool: contest.entry_fee * contest.max_participants * 0.8, // Assuming 80% of total pool is prize
      registerDeadline: contest.register_deadline,
      type: contest.basket_type === "Custom Basket" ? "custom" as const : "predefined" as const,
      gameType: "equity" as const,
      currency_type: contest.currency_type,
      competition_interval: contest.competition_interval,
      hasJoined: userJoinedContests.has(contestId), // Check if user has joined
      scoringDone: contest.scoring_done // Use scoring_done from API
    };
  });

  // Map opinion contests, handle missing key gracefully
  const opinionEvents = (apiData.opinions_contests || []).map(contest => ({
    id: String(contest.id),
    question: contest.name,
    title: contest.name, // Add title property for consistency
    description: contest.description,
    category: contest.tag,
    deadline: contest.registeration_deadline,
    minTradeAmount: contest.entry_fee,
    currentPool: {
      yes: contest.participant_meta_data.agreed || 0,
      no: contest.participant_meta_data.disagreed || 0
    },
    participants: contest.participant_meta_data.totalParticipants || 0,
    status: "active" as const,
    outcome: null
  }));

  return { equityCompetitions, opinionEvents };
};

// Function to fetch competitions data from API
export const fetchCompetitionsData = async (): Promise<{
  equityCompetitions: CompetitionProps[],
  opinionEvents: OpinionEvent[],
  error: string | null
}> => {
  try {
    const apiPath = `${BACKEND_HOST}getAllComp`;

    const response = await fetch(apiPath, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.warn(`API returned status ${response.status}. Using mock data instead.`);
      const mockData = mapApiDataToFrontend(mockCompetitionsData);
      return { ...mockData, error: null };
    }

    const data = await response.json() as FullCompetitionsApiResponse;

    if (data.code === 200 && data.data) {
      return { ...mapApiDataToFrontend(data.data), error: null };
    } else {
      console.warn("API returned unexpected data format. Using mock data instead.");
      const mockData = mapApiDataToFrontend(mockCompetitionsData);
      return { ...mockData, error: null };
    }
  } catch (error) {
    console.error("Error fetching competitions:", error);
    toast.error("Failed to load competitions. Using sample data instead.");
    const mockData = mapApiDataToFrontend(mockCompetitionsData);
    return { ...mockData, error: "Failed to fetch competitions data" };
  }
};

// Alias fetchCompetitionsData as fetchCompetitions for compatibility
export const fetchCompetitions = async () => {
  const { equityCompetitions, error } = await fetchCompetitionsData();
  return { data: equityCompetitions, error };
};

// Function for fetching opinion events
export const fetchOpinionEvents = async () => {
  const { opinionEvents, error } = await fetchCompetitionsData();

  // Extract unique categories
  const categories = opinionEvents && opinionEvents.length > 0
    ? [...new Set(opinionEvents.map(event => event.category))] as string[]
    : [];

  return { data: opinionEvents, categories, error };
};

// Function to submit opinion answer
export const submitOpinionAnswer = async (
  contestId: number,
  answer: boolean
): Promise<{ success: boolean; message: string }> => {
  try {
    // Get user ID from local storage or other auth mechanism
    const userId = localStorage.getItem("userId") || "1"; // Default to 1 if not found

    const apiPath = `${BACKEND_HOST}EnterOpinionCompetitions`;

    const response = await fetch(apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        user_id: Number(userId),
        contest_id: contestId,
        answer: answer
      })
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Failed to submit response. Status: ${response.status}`
      };
    }

    const data = await response.json();

    if (data.code === 200) {
      return {
        success: true,
        message: "Your prediction has been recorded!"
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to submit your prediction."
      };
    }
  } catch (error) {
    console.error("Error submitting opinion:", error);
    return {
      success: false,
      message: "Network error. Please try again."
    };
  }
};

// Add a function to join a competition
export const joinCompetition = async (competitionId: string): Promise<{ success: boolean; message: string }> => {
  try {
    // In a real implementation, this would call an API
    // For now, we'll just track it in memory
    userJoinedContests.add(competitionId);
    
    return {
      success: true,
      message: "Successfully joined competition!"
    };
  } catch (error) {
    console.error("Error joining competition:", error);
    return {
      success: false,
      message: "Failed to join competition. Please try again."
    };
  }
};

// Add a function to check if a user has already joined a competition
export const hasUserJoinedCompetition = (competitionId: string): boolean => {
  return userJoinedContests.has(competitionId);
};

// Update the mock competitions data to include the scoringDone field
export const updateMockCompetitionsData = () => {
  // This would normally not be necessary with real API data that includes scoring_done
  for (const contestType in mockCompetitionsData) {
    if (contestType === 'equity_contests') {
      mockCompetitionsData.equity_contests = mockCompetitionsData.equity_contests.map(contest => ({
        ...contest,
        scoring_done: contest.status === 'closed' ? Math.random() > 0.5 : false // Randomly mark closed contests as scored
      }));
    }
  }
};

// Call this once to ensure our mock data has the scoringDone field
updateMockCompetitionsData();
