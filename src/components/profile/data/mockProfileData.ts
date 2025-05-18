export interface ContestType {
  contest_id: number;
  user_id: number;
  contest_name: string;
  stocks_in_basket?: string[];
  join_time: string;
  status: 'active' | 'completed';
  returns: number;
  entry_fee: number;
  rank?: number;
  totalParticipants?: number;
  uniqueKey?: string;
  gameType: "equity" | "opinion" | "poly" | "geoquest";
  orders?: any[];
}

// Mock data for profile contests
export const mockParticipations: ContestType[] = [
  {
    contest_id: 1,
    user_id: 123,
    contest_name: "Weekly Stock Challenge",
    stocks_in_basket: ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"],
    join_time: "2025-05-10T14:22:18Z",
    status: "active",
    returns: 8.5,
    entry_fee: 500,
    rank: 12,
    totalParticipants: 240,
    gameType: "equity"
  },
  {
    contest_id: 2,
    user_id: 123,
    contest_name: "Global Tech Stocks Tournament",
    stocks_in_basket: ["NVDA", "ASML", "TSM", "AVGO", "QCOM"],
    join_time: "2025-05-03T09:15:30Z",
    status: "completed",
    returns: 15.2,
    entry_fee: 1000,
    rank: 3,
    totalParticipants: 100,
    gameType: "equity"
  },
  {
    contest_id: 3,
    user_id: 123,
    contest_name: "Emerging Markets Basket",
    stocks_in_basket: ["BABA", "JD", "TCEHY", "MELI", "CPNG"],
    join_time: "2025-04-26T16:48:52Z",
    status: "completed",
    returns: -3.2,
    entry_fee: 250,
    rank: 87,
    totalParticipants: 500,
    gameType: "equity"
  },
];

export const mockOpinionParticipations: ContestType[] = [
  {
    contest_id: 101,
    user_id: 123,
    contest_name: "Will SpaceX reach Mars by 2026?",
    join_time: "2025-05-05T08:30:00Z",
    status: "active",
    returns: 0,
    entry_fee: 100,
    rank: 45,
    totalParticipants: 1200,
    gameType: "opinion"
  },
  {
    contest_id: 102,
    user_id: 123,
    contest_name: "Will AI surpass human intelligence in the next decade?",
    join_time: "2025-04-28T19:00:00Z",
    status: "completed",
    returns: 5.8,
    entry_fee: 50,
    rank: 210,
    totalParticipants: 1500,
    gameType: "opinion"
  },
  {
    contest_id: 103,
    user_id: 123,
    contest_name: "Is climate change irreversible?",
    join_time: "2025-04-20T11:15:00Z",
    status: "completed",
    returns: -2.5,
    entry_fee: 75,
    rank: 630,
    totalParticipants: 2000,
    gameType: "opinion"
  }
];

// Add mock data for poly participations
export const mockPolyParticipations: ContestType[] = [
  {
    contest_id: 201,
    user_id: 123,
    contest_name: "Predict AI Market Growth",
    join_time: "2025-05-17T10:49:10Z",
    status: "active",
    returns: 0,
    entry_fee: 50,
    orders: [
      {
        id: 2265733269,
        user_id: 123,
        market_id: 2,
        outcome: true,
        type: "buy",
        order_type: "limit",
        price: 0.5,
        quantity: 110,
        status: "open",
        created_at: "2025-05-18T10:49:10Z"
      }
    ],
    gameType: "poly"
  },
  {
    contest_id: 202,
    user_id: 123,
    contest_name: "Will Bitcoin reach $100k by 2026?",
    join_time: "2025-05-16T16:20:00Z",
    status: "completed",
    returns: 12.5,
    entry_fee: 100,
    rank: 8,
    totalParticipants: 350,
    gameType: "poly"
  }
];

// Mock transactions data
export const mockTransactions = [
  {
    id: 'tx1',
    type: 'deposit',
    amount: 1000,
    date: '2025-05-18T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'tx2',
    type: 'withdrawal',
    amount: 250,
    date: '2025-05-15T14:30:00Z',
    status: 'completed'
  },
  {
    id: 'tx3',
    type: 'contest_win',
    contestName: 'Global Tech Stocks Tournament',
    amount: 5000,
    date: '2025-05-03T18:45:00Z',
    status: 'completed'
  },
  {
    id: 'tx4',
    type: 'deposit',
    amount: 500,
    date: '2025-04-29T09:20:00Z',
    status: 'completed'
  },
  {
    id: 'tx5',
    type: 'withdrawal',
    amount: 100,
    date: '2025-04-22T16:00:00Z',
    status: 'pending'
  }
];
