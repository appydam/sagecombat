
import { CompetitionsApiResponseData } from "@/types/competitions";

export const mockCompetitionsData: CompetitionsApiResponseData = {
  opinions_contests: [
    {
      id: 1,
      name: "IPL Fantasy League",
      description: "Will MI win against CSK?",
      registeration_deadline: "2025-04-09T23:59:59Z",
      tag: "Sports",
      entry_fee: 20,
      created_at: "2025-04-07T18:55:19.864083Z",
      participant_meta_data: {
        totalParticipants: 450,
        agreed: 250,
        disagreed: 200
      },
      status: "open", // Added this required property
      currency_type: "virtual" // Added this required property
    },
    {
      id: 2,
      name: "Budget Policy Impact",
      description: "Will the new budget policies improve the Sensex by 5% in 30 days?",
      registeration_deadline: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      tag: "Finance",
      entry_fee: 20,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      participant_meta_data: {
        totalParticipants: 982,
        agreed: 500,
        disagreed: 482
      },
      status: "open", // Added this required property
      currency_type: "virtual" // Added this required property
    },
    {
      id: 3,
      name: "Cricket World Cup Final",
      description: "Will India win the Cricket World Cup final?",
      registeration_deadline: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
      tag: "Sports",
      entry_fee: 25,
      created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      participant_meta_data: {
        totalParticipants: 2870,
        agreed: 1500,
        disagreed: 1370
      },
      status: "open", // Added this required property
      currency_type: "virtual" // Added this required property
    },
    {
      id: 4,
      name: "Sensex Prediction",
      description: "Will the Sensex cross 80,000 by June 2024?",
      registeration_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      tag: "Finance",
      entry_fee: 15,
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      participant_meta_data: {
        totalParticipants: 1200,
        agreed: 800,
        disagreed: 400
      },
      status: "open", // Added this required property
      currency_type: "real" // Added this required property
    },
    {
      id: 5,
      name: "Olympics Medal Count",
      description: "Will India win more than 10 gold medals in Olympics 2024?",
      registeration_deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      tag: "Sports",
      entry_fee: 10,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      participant_meta_data: {
        totalParticipants: 650,
        agreed: 300,
        disagreed: 350
      },
      status: "registration_closed", // Added this required property
      currency_type: "virtual" // Added this required property
    },
    {
      id: 6,
      name: "iPhone Release Date",
      description: "Will the new iPhone be released before September 2024?",
      registeration_deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      tag: "Technology",
      entry_fee: 15,
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      participant_meta_data: {
        totalParticipants: 780,
        agreed: 230,
        disagreed: 550
      },
      status: "open", // Added this required property
      currency_type: "virtual" // Added this required property
    }
  ],
  equity_contests: [
    {
      id: 1,
      name: "Weekly Tech Stocks Challenge",
      description: "Select 5 tech stocks and compete for the highest returns",
      type: "equity",
      entry_fee: 100,
      max_participants: 500,
      current_participants: 324,
      status: "open",
      basket_type: "Custom Basket",
      scoring_done: false,
      register_deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      currency_type: "virtual",
      competition_interval: 24
    },
    {
      id: 2,
      name: "Banking Sector Prediction",
      description: "Will banking stocks go up or down? Place your prediction.",
      type: "equity",
      entry_fee: 50,
      max_participants: 1000,
      current_participants: 879,
      status: "open",
      basket_type: "Predefined Basket",
      scoring_done: false,
      register_deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      currency_type: "virtual",
      competition_interval: 48
    },
    {
      id: 3,
      name: "Pharma Giants Showdown",
      description: "Select pharmaceutical stocks that will outperform the market",
      type: "equity",
      entry_fee: 200,
      max_participants: 300,
      current_participants: 142,
      status: "open",
      basket_type: "Custom Basket",
      scoring_done: false,
      register_deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      currency_type: "real",
      competition_interval: 12
    }
  ],
  orderbook_contests: [
    {
      id: 1,
      name: "Will Bitcoin close above $100K by Dec 2025?",
      description: "A prediction market on Bitcoin price as of end of 2025.",
      registration_deadline: "2025-12-01T23:59:59Z",
      tag: "crypto",
      status: "open",
      answer: null,
      currency_type: "virtual",
      created_at: "2025-05-01T00:00:00Z",
      updated_at: "2025-05-01T00:00:00Z"
    },
    {
      id: 2,
      name: "Will SpaceX land humans on Mars by 2030?",
      description: "A prediction on SpaceX successfully landing a human mission on Mars before 2030.",
      registration_deadline: "2029-12-31T23:59:59Z",
      tag: "technology",
      status: "open",
      answer: null,
      currency_type: "virtual",
      created_at: "2025-05-02T00:00:00Z",
      updated_at: "2025-05-02T00:00:00Z"
    },
    {
      id: 3,
      name: "Will India win over 10 gold medals in Olympics 2028?",
      description: "Predicting if India will secure more than 10 gold medals in the 2028 Summer Olympics.",
      registration_deadline: "2028-06-01T23:59:59Z",
      tag: "sports",
      status: "open",
      answer: null,
      currency_type: "virtual",
      created_at: "2025-05-03T00:00:00Z",
      updated_at: "2025-05-03T00:00:00Z"
    }
  ]
};
