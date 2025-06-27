import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Info, CheckCircle, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import availableStocks from "../../stocksData/generatedStocksList/editStocksList";


interface ContestType {
  contest_id: number;
  user_id: number;
  contest_name: string;
  stocks_in_basket: string[];
  join_time: string;
  status: string;
  returns: number;
  entry_fee: number;
  rank: number;
  totalParticipants: number;
}

interface EditStocksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contest: ContestType;
  onUpdate: (contestId: number, newStocks: string[]) => void;
}

const EditStocksDialog = ({ open, onOpenChange, contest, onUpdate }: EditStocksDialogProps) => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [stockToAdd, setStockToAdd] = useState("");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [stockToRemove, setStockToRemove] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (contest) {
      setSelectedStocks([...contest.stocks_in_basket]);
    }
  }, [contest]);

  const filteredStocks = availableStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableToAdd = filteredStocks.filter(stock =>
    !selectedStocks.includes(stock.symbol)
  );

  const handleAddStock = () => {
    if (stockToAdd && !selectedStocks.includes(stockToAdd)) {
      if (selectedStocks.length >= 5) {
        const newStocks = [...selectedStocks.slice(1), stockToAdd];
        setSelectedStocks(newStocks);
      } else {
        setSelectedStocks([...selectedStocks, stockToAdd]);
      }
      setStockToAdd("");
    }
  };

  const handleRemoveStock = (stock: string) => {
    setStockToRemove(stock);
    setIsConfirmDialogOpen(true);
  };

  const confirmRemoveStock = () => {
    setSelectedStocks(selectedStocks.filter(s => s !== stockToRemove));
    setIsConfirmDialogOpen(false);
  };

  const handleSave = () => {
    if (selectedStocks.length === contest.stocks_in_basket.length) {
      onUpdate(contest.contest_id, selectedStocks);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Stock Selection</DialogTitle>
          <DialogDescription>
            Update your stock selection for {contest?.contest_name}. You can replace stocks but must maintain a total of {contest?.stocks_in_basket.length} stocks.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Current Selection ({selectedStocks.length}/{contest?.stocks_in_basket.length})</div>
            <div className="flex flex-wrap gap-2">
              {selectedStocks.map(stock => (
                <Badge
                  key={stock}
                  variant="secondary"
                  className="px-2 py-1 flex items-center gap-1"
                >
                  {stock}
                  <button
                    onClick={() => handleRemoveStock(stock)}
                    className="ml-1 text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="stock-search" className="text-sm font-medium">
                Search Stocks
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search by stock name and then click on dropdown</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="stock-search"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="stock-select" className="text-sm font-medium">
              Select Stock to Add
            </label>
            <div className="flex gap-2">
              <Select value={stockToAdd} onValueChange={setStockToAdd}>
                <SelectTrigger id="stock-select" className="flex-1">
                  <SelectValue placeholder="Select a stock" />
                </SelectTrigger>
                <SelectContent>
                  {availableToAdd.length > 0 ? (
                    availableToAdd.map(stock => (
                      <SelectItem key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No available stocks
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddStock}
                disabled={!stockToAdd || selectedStocks.includes(stockToAdd)}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="pt-2">
            {selectedStocks.length === contest?.stocks_in_basket.length ? (
              <div className="flex items-center text-green-500 text-sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Ready to save changes
              </div>
            ) : (
              <div className="flex items-center text-amber-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                You must select exactly {contest?.stocks_in_basket.length} stocks
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={selectedStocks.length !== contest?.stocks_in_basket.length}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Stock</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {stockToRemove} from your selection?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveStock}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

export default EditStocksDialog;
