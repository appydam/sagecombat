import { availableStocks as allStocks, Stock } from "../generatedStocksList/stocks";
import { availableStocks as nifty50Stocks } from "../generatedStocksList/nifty50";
import { availableStocks as niftySmallcap50Stocks } from "../generatedStocksList/niftySmallcap50";
import { availableStocks as smeStocks } from "../generatedStocksList/sme";

// All possible contest categories from the API
export type ContestCategory =
  | 'ALL'
  | 'NIFTY_50'
  | 'SME'
  | 'NIFTY_PHARMA'
  | 'NIFTY_BANK'
  | 'NIFTY_AUTO'
  | 'NIFTY_ENERGY'
  | 'NIFTY_MIDCAP_50'
  | 'NIFTY_SMALLCAP_50'
  | 'NIFTY_MICROCAP_250';

// A mapping from contest category to the corresponding stock list.
const stockMap: Record<string, Stock[]> = {
  'ALL': allStocks,
  'NIFTY_50': nifty50Stocks,
  'NIFTY_SMALLCAP_50': niftySmallcap50Stocks,
  'SME': smeStocks,
  // --TODO--
  // The following are placeholders.
  // Replace 'allStocks' with the correct stock list when it becomes available.
  'NIFTY_PHARMA': allStocks,
  'NIFTY_BANK': allStocks,
  'NIFTY_AUTO': allStocks,
  'NIFTY_ENERGY': allStocks,
  'NIFTY_MIDCAP_50': allStocks,
  'NIFTY_MICROCAP_250': allStocks,
};

/**
 * Retrieves the list of stocks for a given contest category.
 * @param category The category of the contest.
 * @returns An array of stocks for the specified category. Defaults to 'ALL' stocks if the category is not found or is undefined.
 */
export const getStockListByCategory = (
  category?: ContestCategory
): Stock[] => {
  if (!category) {
    return allStocks;
  }

  const normalize = (str: string) => str.toUpperCase().replace(/[_\s]/g, "");

  const normalizedCategory = normalize(category);

  for (const key in stockMap) {
    if (normalize(key) === normalizedCategory) {
      return stockMap[key as ContestCategory];
    }
  }

  return allStocks;
};

// Re-export the Stock type for convenience.
export type { Stock };
