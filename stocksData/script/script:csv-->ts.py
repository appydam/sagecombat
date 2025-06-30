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
                    
                # Handle both CSV formats
                symbol = row[0]
                name = row[1]
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
    interface_definition = """export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
}

"""
    output = interface_definition + "export const availableStocks: Stock[] = [\n"
    
    # Convert dict to list for iteration
    stock_list = list(stocks.values())
    
    for i, stock in enumerate(stock_list):
        stock_entry = f"""  {{
    id: "{stock['symbol']}",
    symbol: "{stock['symbol']}",
    name: "{stock['name']}",
    sector: "NA"
  }}"""
        
        output += stock_entry
        output += ",\n" if i < len(stock_list) - 1 else "\n"
    
    output += "];"
    return output

def main():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define input and output file paths
    data_dir = os.path.join(script_dir, '..', 'nse data')


    
    
    
    csv_file1 = os.path.join(data_dir, 'sme.csv')  # First CSV file
    # csv_file2 = os.path.join(data_dir, 'sme.csv')  # Second CSV file
    output_file = os.path.join(script_dir, '..', 'generatedStocksList', 'sme.ts')
    
    # Read both CSV files into dictionaries
    stocks1 = read_csv_to_dict(csv_file1)
    # stocks2 = read_csv_to_dict(csv_file2)
    
    # Merge dictionaries (stocks2 will override stocks1 if there are duplicates)
    # combined_stocks = {**stocks1, **stocks2}
    combined_stocks = stocks1
    
    if not combined_stocks:
        print("No valid stock data found in either CSV file.")
        return
    
    # Convert to TypeScript format
    result = convert_to_ts_format(combined_stocks)
    
    # Write to output file
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(result)
        print(f"Conversion successful! Output written to {output_file}")
        print(f"Total unique stocks: {len(combined_stocks)}")
    except Exception as e:
        print(f"Error writing output file: {str(e)}")

if __name__ == "__main__":
    main()