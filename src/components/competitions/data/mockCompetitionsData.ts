import { CompetitionProps, OpinionEvent } from "@/types/competitions";

// Mock data reflecting the structure derived for the frontend components,
// including defaults for fields potentially missing from the API.

export const mockOpinionEvents: OpinionEvent[] = [
    {
      id: "ev-1",
      question: "Will MI win against CSK?", // Mapped from description
      description: "Will MI win against CSK?", // Kept description
      category: "Sports", // Mapped from tag
      deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // Mapped from registeration_deadline
      minTradeAmount: 20, // Mapped from entry_fee
      currentPool: { // Mapped from participant_meta_data
        yes: 15000, // Assuming agreed maps to yes pool value/amount
        no: 12000  // Assuming disagreed maps to no pool value/amount
      },
      participants: 450, // Mapped from totalParticipants
      status: 'active', // Defaulted as missing in API
      outcome: null, // Missing in API
      currency_type: "virtual", // Added this required property
    },
    {
      id: "ev-2",
      question: "Will RBI increase interest rates?", // Example mapping
      description: "Will RBI increase interest rates?",
      category: "Finance",
      deadline: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      minTradeAmount: 10,
      currentPool: {
        yes: 25000,
        no: 30000
      },
      participants: 890,
      status: 'active', // Defaulted
      outcome: null,
      currency_type: "virtual", // Added this required property
    },
     {
      id: "ev-3",
      question: "Will Sensex cross 80,000 by June 2024?",
      description: "Will Sensex cross 80,000 by June 2024?",
      category: "Finance",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      minTradeAmount: 50,
      currentPool: {
        yes: 45000,
        no: 32000
      },
      participants: 1200,
      status: 'active', // Defaulted
      outcome: null,
      currency_type: "real", // Added this required property
    },
  ];

// Mock data for Equity contests, matching CompetitionProps structure
export const getMockCompetitions = (): CompetitionProps[] => {
    return [
      {
        id: "comp-1",
        name: "Daily Stock Challenge",
        description: "Compete daily by selecting the best stocks.",
        entryFee: 50, // Mapped from entry_fee
        maxParticipants: 1000, // Mapped from max_participants
        currentParticipants: 324, // Mapped from current_participants
        status: "open", // Mapped from status
        prizePool: 0, // Defaulted as missing in API
        registerDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Mapped from register_deadline
        type: "custom", // Derived from basket_type
        gameType: "equity", // Hardcoded
        currency_type: "virtual", // Added to match the type
        competition_interval: 24, // Added to match the type, 24 hours
        contestCategory: "tech"
      },
      {
        id: "comp-2",
        name: "Weekly Banking Prediction",
        description: "Predict the top banking stock of the week.",
        entryFee: 100,
        maxParticipants: 500,
        currentParticipants: 150,
        status: "open",
        prizePool: 0, // Defaulted
        registerDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        type: "predefined", // Derived
        gameType: "equity",
        currency_type: "virtual", // Added to match the type
        competition_interval: 48, // Added to match the type, 48 hours
        contestCategory: "banking"
      },
      {
        id: "comp-3",
        name: "Pharma Giants Showdown",
        description: "Select pharmaceutical stocks that will outperform.",
        entryFee: 75,
        maxParticipants: 300,
        currentParticipants: 290,
        status: "open",
        prizePool: 0, // Defaulted
        registerDeadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        type: "custom", // Derived
        gameType: "equity",
        currency_type: "real", // Added to match the type
        competition_interval: 12, // Added to match the type, 12 hours
        contestCategory: "pharma"
      }
    ];
  };
