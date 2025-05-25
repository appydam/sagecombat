import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Plus, Minus } from "lucide-react";

interface PolyBetPlacementProps {
  yesPrice: number;
  noPrice: number;
  isSubmitting: boolean;
  onPlaceOrder: (outcome: boolean, orderType: "buy" | "sell", price: number, quantity: number) => Promise<void>;
}

const PolyBetPlacement = ({
  yesPrice,
  noPrice,
  isSubmitting,
  onPlaceOrder
}: PolyBetPlacementProps) => {
  const [selectedOutcome, setSelectedOutcome] = useState<boolean>(true); // true = yes, false = no
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState<number>(100);
  const [price, setPrice] = useState<string>(yesPrice.toString());

  // Update price when outcome or current prices change
  React.useEffect(() => {
    setPrice((selectedOutcome ? yesPrice : noPrice).toString());
  }, [selectedOutcome, yesPrice, noPrice]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 10) {
      setQuantity(10);
    } else {
      setQuantity(value);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleQuickAdd = (amount: number) => {
    setQuantity(prev => prev + amount);
  };

  const handleIncreaseBet = () => {
    setQuantity(prev => prev + 50);
  };

  const handleDecreaseBet = () => {
    setQuantity(prev => Math.max(50, prev - 50));
  };

  const calculatePotentialValue = () => {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0 || num >= 1) return "--";
    if (orderType === "buy") {
      return (quantity / num).toFixed(2);
    } else {
      return (quantity * num).toFixed(2);
    }
  };

  const calculateRisk = () => {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0 || num >= 1) return "--";
    if (orderType === "buy") {
      return (quantity * num).toFixed(2);
    } else {
      return (quantity * (1 - num)).toFixed(2);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Place Your Order</h3>

      <Tabs
        defaultValue="buy"
        value={orderType}
        onValueChange={(value) => setOrderType(value as "buy" | "sell")}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            Sell
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">I think this will happen:</p>

        <RadioGroup
          value={selectedOutcome ? "yes" : "no"}
          onValueChange={(value) => setSelectedOutcome(value === "yes")}
          className="grid grid-cols-2 gap-4"
        >
          <div className={`flex items-center justify-center gap-2 h-12 rounded-md border ${selectedOutcome
            ? "bg-gradient-to-r from-green-600 to-green-500 border-green-600 text-white"
            : "border-green-600 text-green-700 hover:bg-green-50"
            } cursor-pointer`}>
            <RadioGroupItem value="yes" id="place-yes" className="sr-only" />
            <label htmlFor="place-yes" className="flex items-center w-full h-full justify-center cursor-pointer">
              <CheckCircle className="h-4 w-4 mr-2" />
              YES
            </label>
          </div>

          <div className={`flex items-center justify-center gap-2 h-12 rounded-md border ${!selectedOutcome
            ? "bg-gradient-to-r from-red-600 to-red-500 border-red-600 text-white"
            : "border-red-600 text-red-700 hover:bg-red-50"
            } cursor-pointer`}>
            <RadioGroupItem value="no" id="place-no" className="sr-only" />
            <label htmlFor="place-no" className="flex items-center w-full h-full justify-center cursor-pointer">
              <XCircle className="h-4 w-4 mr-2" />
              NO
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">Price:</p>
        <div className="flex items-center border rounded-md overflow-hidden">
          <Input
            type="number"
            min={0.01}
            max={0.99}
            step={0.01}
            value={price}
            onChange={handlePriceChange}
            className="h-9 text-center"
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">Current: {selectedOutcome ? yesPrice.toFixed(2) : noPrice.toFixed(2)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 py-0 text-xs"
            onClick={() => setPrice((selectedOutcome ? yesPrice : noPrice).toString())}
          >
            Use current
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Quantity:</p>
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            type="button"
            variant="ghost"
            className="h-9 px-2 rounded-none border-r"
            onClick={handleDecreaseBet}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min={10}
            value={quantity}
            onChange={handleQuantityChange}
            className="h-9 border-0 text-center"
          />
          <Button
            type="button"
            variant="ghost"
            className="h-9 px-2 rounded-none border-l"
            onClick={handleIncreaseBet}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(10)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            10
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(50)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            50
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(100)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            100
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(500)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            500
          </Button>
        </div>
      </div>

      <div className="bg-secondary/30 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Order type:</span>
          <span className="font-medium capitalize">{orderType} {selectedOutcome ? "YES" : "NO"}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Quantity:</span>
          <span className="font-medium">{quantity}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Price per share:</span>
          <span className="font-medium">₹{(() => { const num = parseFloat(price); return (!price || isNaN(num) || num <= 0 || num >= 1) ? "--" : num.toFixed(2); })()}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            {orderType === "buy" ? "Potential value if YES wins:" : "You receive:"}
          </span>
          <span className="font-semibold text-green-600">₹{calculatePotentialValue()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {orderType === "buy" ? "Cost:" : "Maximum loss:"}
          </span>
          <span className="font-semibold text-red-600">₹{calculateRisk()}</span>
        </div>
      </div>

      <Button
        className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-400"
        onClick={() => {
          const num = parseFloat(price);
          if (!price || isNaN(num) || num <= 0 || num >= 1) return;
          onPlaceOrder(selectedOutcome, orderType, num, quantity);
        }}
        disabled={isSubmitting || !price || isNaN(parseFloat(price)) || parseFloat(price) <= 0 || parseFloat(price) >= 1}
      >
        {isSubmitting ? "Processing..." : `${orderType === "buy" ? "Buy" : "Sell"} ${selectedOutcome ? "YES" : "NO"}`}
      </Button>
    </Card>
  );
};

export default PolyBetPlacement;
