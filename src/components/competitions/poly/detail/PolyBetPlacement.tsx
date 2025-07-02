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
    if (isNaN(value)) {
      setQuantity(null);
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
      // return (quantity / num).toFixed(2);
      return quantity;
    } else {
      return (quantity * num).toFixed(2);
    }
  };

  const calculateRisk = () => {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0 || num >= 1) return "--";
    if (orderType === "buy") {
      return (quantity * num).toFixed(2);
      // round off this
    } else {
      return (quantity * (1 - num)).toFixed(2);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Place Order</h3>

        <Tabs
          defaultValue="buy"
          value={orderType}
          onValueChange={(value) => setOrderType(value as "buy" | "sell")}
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 h-10 rounded-lg">
            <TabsTrigger 
              value="buy" 
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger 
              value="sell" 
              className="data-[state=active]:bg-rose-600 data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              Sell
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Outcome</p>
          <RadioGroup
            value={selectedOutcome ? "yes" : "no"}
            onValueChange={(value) => setSelectedOutcome(value === "yes")}
            className="grid grid-cols-2 gap-3"
          >
            <div className={`relative flex items-center justify-center h-11 rounded-lg border-2 transition-all duration-200 cursor-pointer group ${selectedOutcome
              ? "bg-emerald-600 border-emerald-600 text-white shadow-md"
              : "border-emerald-200 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
              }`}>
              <RadioGroupItem value="yes" id="place-yes" className="sr-only" />
              <label htmlFor="place-yes" className="flex items-center w-full h-full justify-center cursor-pointer font-medium">
                <CheckCircle className="h-4 w-4 mr-2" />
                YES
              </label>
            </div>

            <div className={`relative flex items-center justify-center h-11 rounded-lg border-2 transition-all duration-200 cursor-pointer group ${!selectedOutcome
              ? "bg-rose-600 border-rose-600 text-white shadow-md"
              : "border-rose-200 text-rose-700 hover:border-rose-300 hover:bg-rose-50"
              }`}>
              <RadioGroupItem value="no" id="place-no" className="sr-only" />
              <label htmlFor="place-no" className="flex items-center w-full h-full justify-center cursor-pointer font-medium">
                <XCircle className="h-4 w-4 mr-2" />
                NO
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Price</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Current: {selectedOutcome ? yesPrice.toFixed(2) : noPrice.toFixed(2)}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-gray-600 hover:text-gray-900"
                onClick={() => setPrice((selectedOutcome ? yesPrice : noPrice).toString())}
              >
                Use current
              </Button>
            </div>
          </div>
          <Input
            type="number"
            min={0.01}
            max={0.99}
            step={0.01}
            value={price}
            onChange={handlePriceChange}
            className="h-10 text-center border-gray-200 focus:border-gray-400 focus:ring-0"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Quantity</p>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <Button
              type="button"
              variant="ghost"
              className="h-10 px-3 rounded-none border-r border-gray-200 hover:bg-gray-100"
              onClick={handleDecreaseBet}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min={0}
              value={quantity}
              onChange={handleQuantityChange}
              className="h-10 border-0 text-center bg-transparent focus:ring-0"
            />
            <Button
              type="button"
              variant="ghost"
              className="h-10 px-3 rounded-none border-l border-gray-200 hover:bg-gray-100"
              onClick={handleIncreaseBet}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(10)}
              className="h-8 text-xs border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <Plus className="h-3 w-3 mr-1" />
              10
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(50)}
              className="h-8 text-xs border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <Plus className="h-3 w-3 mr-1" />
              50
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(100)}
              className="h-8 text-xs border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <Plus className="h-3 w-3 mr-1" />
              100
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(500)}
              className="h-8 text-xs border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <Plus className="h-3 w-3 mr-1" />
              500
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Order type</span>
              <span className="font-semibold text-gray-900 capitalize">{orderType} {selectedOutcome ? "YES" : "NO"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Quantity</span>
              <span className="font-semibold text-gray-900">{quantity}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price per share</span>
                <span className="font-semibold text-gray-900">₹{(() => { const num = parseFloat(price); return (!price || isNaN(num) || num <= 0 || num >= 1) ? "--" : num.toFixed(2); })()}</span>
              </div>
              <div className="text-xs text-gray-400 text-right">
                {(() => {
                  const num = parseFloat(price);
                  if (!price || isNaN(num) || num <= 0 || num >= 1) return null;
                  const rounded = Math.round(num * 20) / 20; // Round to nearest 0.05
                  return `Rounded to ₹${rounded.toFixed(2)}`;
                })()}
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {orderType === "buy" ? "Potential value if YES wins" : "You receive"}
              </span>
              <span className="font-bold text-emerald-600">₹{calculatePotentialValue()}</span>
            </div>
            {orderType === "buy" && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cost</span>
                <span className="font-bold text-rose-600">₹{calculateRisk()}</span>
              </div>
            )}
          </div>
        </div>

        <Button
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
          onClick={() => {
            const num = parseFloat(price);
            if (!price || isNaN(num) || num <= 0 || num >= 1) return;
            onPlaceOrder(selectedOutcome, orderType, num, quantity);
          }}
          disabled={isSubmitting || !price || isNaN(parseFloat(price)) || parseFloat(price) <= 0 || parseFloat(price) >= 1}
        >
          {isSubmitting ? "Processing..." : `${orderType === "buy" ? "Buy" : "Sell"} ${selectedOutcome ? "YES" : "NO"}`}
        </Button>
      </div>
    </Card>
  );
};

export default PolyBetPlacement;