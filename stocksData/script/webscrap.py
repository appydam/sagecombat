import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def scrape_tata_motors_stock_price():
    """Scrape Tata Motors stock price from NSE website."""
    start_time = time.time()
    
    # URL for Tata Motors stock information
    url = "https://www.nseindia.com/get-quotes/equity?symbol=TATAMOTORS"
    
    # Headers to mimic a browser request
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.nseindia.com/"
    }
    
    try:
        # Send a GET request to the URL
        session = requests.Session()
        session.get("https://www.nseindia.com/", headers=headers, timeout=10)  # Visit homepage first
        response = session.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the closing price
        # Note: Selectors may need adjustment based on the website structure
        closing_price_element = soup.select_one('div.securityInfo span#lastPrice')
        
        execution_time = time.time() - start_time
        
        if closing_price_element:
            closing_price = closing_price_element.text.strip()
            logger.info(f"Tata Motors Closing Price: {closing_price}")
            logger.info(f"Web scraping execution time: {execution_time:.2f} seconds")
            return closing_price, execution_time
        else:
            logger.warning("Could not find the closing price element.")
            logger.info(f"Web scraping execution time: {execution_time:.2f} seconds")
            return None, execution_time
    
    except requests.exceptions.RequestException as e:
        execution_time = time.time() - start_time
        logger.error(f"Error fetching the webpage: {e}")
        logger.info(f"Web scraping execution time: {execution_time:.2f} seconds")
        return None, execution_time

def get_tata_motors_using_yfinance():
    """Get Tata Motors stock price using Yahoo Finance API."""
    start_time = time.time()
    
    try:
        import yfinance as yf
        
        # Tata Motors ticker symbol on Yahoo Finance
        ticker = "TATAMOTORS.NS"  # For NSE
        
        # Get the stock information
        stock_info = yf.Ticker(ticker)
        
        # Get historical market data
        hist = stock_info.history(period="1d")
        
        execution_time = time.time() - start_time
        
        # Extract the most recent closing price
        if not hist.empty:
            latest_close = hist['Close'].iloc[-1]
            logger.info(f"Tata Motors Closing Price: {latest_close}")
            
            # Create a DataFrame with the data and execution time
            data = {
                'Date': datetime.now().strftime('%Y-%m-%d'),
                'Closing Price': latest_close,
                'Execution Time (seconds)': execution_time
            }
            df = pd.DataFrame([data])
            
            # Save to CSV
            df.to_csv('tata_motors_closing_price.csv', index=False)
            logger.info("Data saved to tata_motors_closing_price.csv")
            logger.info(f"YFinance execution time: {execution_time:.2f} seconds")
            
            return latest_close, execution_time
        else:
            logger.warning("No historical data found.")
            logger.info(f"YFinance execution time: {execution_time:.2f} seconds")
            return None, execution_time
    
    except Exception as e:
        execution_time = time.time() - start_time
        logger.error(f"Error fetching data using yfinance: {e}")
        logger.info(f"YFinance execution time: {execution_time:.2f} seconds")
        return None, execution_time

def compare_methods():
    """Compare both methods and return the faster one with its result."""
    logger.info("Attempting to fetch Tata Motors stock price...")
    
    # Try yfinance method
    logger.info("Using YFinance method...")
    yf_price, yf_time = get_tata_motors_using_yfinance()
    
    # Try web scraping method
    logger.info("Using Web Scraping method...")
    ws_price, ws_time = scrape_tata_motors_stock_price()
    
    # Compare results and times
    results = {
        "YFinance": {"price": yf_price, "time": yf_time, "success": yf_price is not None},
        "Web Scraping": {"price": ws_price, "time": ws_time, "success": ws_price is not None}
    }
    
    # Determine the faster successful method
    faster_method = None
    faster_time = float('inf')
    faster_price = None
    
    for method, data in results.items():
        if data["success"] and data["time"] < faster_time:
            faster_method = method
            faster_time = data["time"]
            faster_price = data["price"]
    
    # Create performance comparison DataFrame
    performance_df = pd.DataFrame([
        {"Method": "YFinance", "Success": results["YFinance"]["success"], "Execution Time (s)": results["YFinance"]["time"], "Price": results["YFinance"]["price"]},
        {"Method": "Web Scraping", "Success": results["Web Scraping"]["success"], "Execution Time (s)": results["Web Scraping"]["time"], "Price": results["Web Scraping"]["price"]}
    ])
    
    # Save performance comparison
    performance_df.to_csv('method_performance_comparison.csv', index=False)
    logger.info("Performance comparison saved to method_performance_comparison.csv")
    
    if faster_method:
        logger.info(f"Fastest successful method: {faster_method} ({faster_time:.2f} seconds)")
        return faster_price, faster_method, faster_time
    else:
        logger.error("Both methods failed to retrieve the stock price.")
        return None, None, None

if __name__ == "__main__":
    price, method, execution_time = compare_methods()
    
    if price:
        print(f"\nResults Summary:")
        print(f"Tata Motors Closing Price: {price}")
        print(f"Retrieved using: {method}")
        print(f"Execution time: {execution_time:.2f} seconds")
    else:
        print("\nFailed to retrieve Tata Motors stock price using both methods.")