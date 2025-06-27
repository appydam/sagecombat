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
        {'name': 'finology.in', 'url': f"https://ticker.finology.in/company/{encoded_symbol}", 'parser': _parse_finology},
        {'name': 'screener.in', 'url': f"https://www.screener.in/company/{encoded_symbol}/", 'parser': _parse_screener},
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
    """
    output_dir = os.path.dirname(output_file)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    try:
        with open(input_file, 'r', encoding='utf-8') as infile, \
             open(output_file, 'w', newline='', encoding='utf-8') as outfile:
            
            reader = csv.reader(infile)
            writer = csv.writer(outfile)
            
            writer.writerow(['SYMBOL', 'NAME_OF_COMPANY', 'SERIES', 'DATE_OF_LISTING', 'PAID_UP_VALUE', 'ISIN_NUMBER', 'FACE_VALUE'])
            
            for row in reader:
                if row and 'NIFTY 50' in row[0]:
                    break
            
            for row in reader:
                if not row or not row[0]:
                    continue
                
                symbol = row[0].strip().replace('"', '')
                
                if ' ' in symbol or len(symbol) > 20:
                    continue

                company_name = get_company_name(symbol)
                
                if company_name != "Not Found":
                    writer.writerow([
                        symbol, company_name, 'EQ', 'NA', '10', 'NA', '10'
                    ])
                
                time.sleep(1) # Delay to be respectful to servers

        print(f"\nProcessing complete. Output written to {output_file}")

    except FileNotFoundError:
        print(f"Error: Input file not found at {input_file}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_csv_path = os.path.join(script_dir, '..', 'rawNSE-data', 'MW-NIFTY-50-27-Jun-2025.csv')
    output_csv_path = os.path.join(script_dir, '..', 'nse data', 'nifty50_formatted.csv')
    process_raw_csv(input_csv_path, output_csv_path)
