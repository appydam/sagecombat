import csv
import requests
from bs4 import BeautifulSoup
import os
import time
import re
from urllib.parse import quote

def _fetch_from_source(url: str, parser_func, source_name: str, symbol: str, headers: dict):
    """A generic fetch function for a given URL and parsing logic."""
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        name = parser_func(response.text, symbol)
        if name:
            print(f"  -> Got name from {source_name}: '{name}'")
            return name
    except requests.exceptions.RequestException as e:
        print(f"  -> Failed to fetch from {source_name}: {e}")
        pass
    return None

def _parse_finology(html: str, symbol: str) -> str | None:
    if "Company Not Found" in html:
        return None
    soup = BeautifulSoup(html, 'html.parser')
    h1 = soup.find('h1')
    if h1:
        return re.split(' share price', h1.get_text(strip=True), flags=re.IGNORECASE)[0].strip()
    return None

def _parse_screener(html: str, symbol: str) -> str | None:
    soup = BeautifulSoup(html, 'html.parser')
    h1 = soup.find('h1')
    return h1.get_text(strip=True) if h1 else None

def _parse_yahoo(html: str, symbol: str) -> str | None:
    soup = BeautifulSoup(html, 'html.parser')
    h1 = soup.find('h1')
    if h1:
        return h1.get_text(strip=True).split('(')[0].strip()
    return None

def get_company_name(symbol: str) -> str:
    """
    Gathers names from all sources and intelligently selects the best one.
    """
    print(f"Processing symbol: {symbol}")
    encoded_symbol = quote(symbol)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    sources = [
        {'name': 'screener.in', 'url': f"https://www.screener.in/company/{encoded_symbol}/", 'parser': _parse_screener},
        {'name': 'finology.in', 'url': f"https://ticker.finology.in/company/{encoded_symbol}", 'parser': _parse_finology},
        {'name': 'finance.yahoo.com', 'url': f"https://finance.yahoo.com/quote/{encoded_symbol}.NS", 'parser': _parse_yahoo}
    ]

    possible_names = []
    for source in sources:
        name = _fetch_from_source(source['url'], source['parser'], source['name'], symbol, headers)
        if name:
            possible_names.append(name)
        time.sleep(0.5) # Small delay between source requests

    if not possible_names:
        print(f"  -> FAILED to find any name for {symbol}.")
        return "Not Found"

    # Best name selection logic
    # 1. Prefer names with spaces (likely full names)
    for name in possible_names:
        if ' ' in name:
            print(f"  -> Selected best name: '{name}' (contains spaces)")
            return name

    # 2. Prefer names that are not just the symbol
    for name in possible_names:
        if name.lower() != symbol.lower():
            print(f"  -> Selected best name: '{name}' (differs from symbol)")
            return name

    # 3. Fallback to the first name found
    best_name = possible_names[0]
    print(f"  -> Selected fallback name: '{best_name}'")
    return best_name

def process_raw_csv(input_file: str, output_file: str):
    """
    Reads the raw NSE data, scrapes company names, and writes to a new CSV.
    This version is tailored to the specific format of MW-NIFTY-SMALLCAP-50 CSVs
    which have a multi-line header.
    """
    output_dir = os.path.dirname(output_file)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    try:
        with open(input_file, 'r', encoding='utf-8') as infile, \
             open(output_file, 'w', newline='', encoding='utf-8') as outfile:
            
            reader = csv.reader(infile)
            writer = csv.writer(outfile)
            
            # Write the header for the new file
            writer.writerow(['SYMBOL', 'NAME_OF_COMPANY', 'SERIES', 'DATE_OF_LISTING', 'PAID_UP_VALUE', 'ISIN_NUMBER', 'FACE_VALUE'])
            
            # Skip the messy header until we find the start of the data
            data_started = False
            for row in reader:
                if row and "NIFTY SMALLCAP 50" in row[0]:
                    print("[INFO] Found data start marker. Skipping index row and beginning processing.")
                    data_started = True
                    # The next row is the first actual stock
                    break
            
            if not data_started:
                print("[ERROR] Could not find the data start marker ('NIFTY SMALLCAP 50') in the CSV.")
                return

            # Process the rest of the rows for data
            processed_symbols = 0
            for i, row in enumerate(reader):
                # The reader is now at the first stock row
                if not row or not row[0]:
                    print(f"[DEBUG] Skipping empty row {i+1}.")
                    continue

                # The symbol is in the first column
                symbol = row[0].strip()

                # Validate the symbol
                if not symbol or ' ' in symbol or len(symbol) > 20:
                    print(f"[DEBUG] Skipping invalid or non-stock symbol in row {i+1}: '{symbol}'")
                    continue
                
                print(f"[INFO] Processing symbol: {symbol}")
                company_name = get_company_name(symbol)
                
                if company_name and company_name != "Not Found":
                    writer.writerow([
                        symbol, company_name, 'EQ', 'NA', '10', 'NA', '10'
                    ])
                    processed_symbols += 1
                    print(f"[SUCCESS] Found and wrote company name for {symbol}: {company_name}")
                else:
                    print(f"[FAIL] Could not find company name for {symbol}")
                
                time.sleep(1) # Be respectful to the servers

            print(f"\nProcessing complete. Total symbols processed and written: {processed_symbols}. Output written to {output_file}")

    except FileNotFoundError:
        print(f"Error: Input file not found at {input_file}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_csv_path = os.path.join(script_dir, '..', 'rawNSE-data', 'MW-NIFTY-SMALLCAP-50-29-Jun-2025.csv')
    output_csv_path = os.path.join(script_dir, '..', 'nse data', 'nifty_smallcap_50_formatted.csv')
    process_raw_csv(input_csv_path, output_csv_path)
