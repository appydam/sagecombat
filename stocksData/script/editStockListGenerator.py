import os
import csv
from typing import Dict

def read_csv_to_dict(csv_file_path: str) -> Dict[str, dict]:
    """Read CSV file and return a dictionary with SYMBOL as key."""
    stocks = {}
    try:
        with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
            csv_reader = csv.reader(csv_file)
            # Skip header
            header = next(csv_reader)
            
            for row in csv_reader:
                # Skip empty rows
                if not row or all(cell.strip() == '' for cell in row):
                    continue
                
                symbol = row[0].strip()
                name = row[1].strip()
                stocks[symbol] = {
                    'symbol': symbol,
                    'name': name
                }
    except FileNotFoundError:
        print(f"Error: Could not find {csv_file_path}")
    except Exception as e:
        print(f"Error reading {csv_file_path}: {str(e)}")
    return stocks

def convert_to_ts_format(stocks: Dict[str, dict]) -> str:
    """Convert stock dictionary to TypeScript format."""
    output = "const availableStocks = [\n"

    stock_list = list(stocks.values())

    for i, stock in enumerate(stock_list):
        stock_entry = f"""  {{ symbol: "{stock['symbol']}", name: "{stock['name']}" }}"""
        output += stock_entry
        output += ",\n" if i < len(stock_list) - 1 else "\n"

    output += "];\n\nexport default availableStocks;"
    return output

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))

    csv_file1 = os.path.join(script_dir, 'equity.csv')
    csv_file2 = os.path.join(script_dir, 'sme.csv')
    output_file = os.path.join(script_dir, 'editStocksList.ts')

    stocks1 = read_csv_to_dict(csv_file1)
    stocks2 = read_csv_to_dict(csv_file2)

    combined_stocks = {**stocks1, **stocks2}

    if not combined_stocks:
        print("No valid stock data found in either CSV file.")
        return

    result = convert_to_ts_format(combined_stocks)

    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(result)
        print(f"Conversion successful! Output written to {output_file}")
        print(f"Total unique stocks: {len(combined_stocks)}")
    except Exception as e:
        print(f"Error writing output file: {str(e)}")

if __name__ == "__main__":
    main()
