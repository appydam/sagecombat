
export const BACKEND_HOST = "https://api.sagecombat.com/";
// export const BACKEND_HOST = "http://localhost:8082/";

export const API_ENDPOINTS = {
  GET_ALL_COMP: `${BACKEND_HOST}getAllComp`,
  GET_CONTEST_BY_ID: (marketId: number) => `${BACKEND_HOST}markets/${marketId}`,
  GET_MARKET_PRICE: (marketId: number) => `${BACKEND_HOST}markets/${marketId}/price`,
  GET_PRICE_HISTORY: (marketId: number) => `${BACKEND_HOST}markets/${marketId}/priceHistory`,
  PLACE_ORDER: `${BACKEND_HOST}order`
};
