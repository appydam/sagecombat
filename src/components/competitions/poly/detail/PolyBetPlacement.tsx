
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Plus, Minus, AlertTriangle } from "lucide-react";

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
  const [price, setPrice] = useState<number>(yesPrice);
  const [error, setError] = useState<string>("");

  // Update price when outcome or current prices change
  React.useEffect(() => {
    setPrice(selectedOutcome ? yesPrice : noPrice);
  }, [selectedOutcome, yesPrice, noPrice]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setError("");
    
    if (isNaN(value)) {
      setQuantity(10);
    } else if (value < 10) {
      setQuantity(10);
      setError("Minimum bet amount is 10");
    } else {
      setQuantity(value);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setError("");
    
    if (isNaN(value)) {
      setPrice(selectedOutcome ? yesPrice : noPrice);
    } else if (value <= 0 || value >= 1) {
      setPrice(selectedOutcome ? yesPrice : noPrice);
      setError("Price must be between 0 and 1");
    } else {
      setPrice(value);
    }
  };

  const handleQuickAdd = (amount: number) => {
    setQuantity(prev => prev + amount);
    setError("");
  };

  const handleIncreaseBet = () => {
    setQuantity(prev => prev + 50);
    setError("");
  };

  const handleDecreaseBet = () => {
    if (quantity <= 50) {
      setQuantity(10);
      setError("Minimum bet amount is 10");
    } else {
      setQuantity(prev => prev - 50);
      setError("");
    }
  };

  const calculatePotentialValue = () => {
    if (orderType === "buy") {
      // When buying, potential payout if correct = quantity / price
      return (quantity / price).toFixed(2);
    } else {
      // When selling, you get the sale price = quantity * price
      return (quantity * price).toFixed(2);
    }
  };

  const calculateRisk = () => {
    if (orderType === "buy") {
      // When buying, risk is the cost = quantity * price
      return (quantity * price).toFixed(2);
    } else {
      // When selling, risk is potential payout if wrong = quantity * (1 - price)
      return (quantity * (1 - price)).toFixed(2);
    }
  };
  
  const handlePlaceOrder = () => {
    if (quantity < 10) {
      setError("Minimum bet amount is 10");
      return;
    }
    
    if (price <= 0 || price >= 1) {
      setError("Price must be between 0 and 1");
      return;
    }
    
    setError("");
    onPlaceOrder(selectedOutcome, orderType, price, quantity);
  };

  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl border-0 transition-all animate-fade-in">
      <h3 className="font-medium text-lg mb-6 text-center">Place Your Order</h3>
      
      <Tabs 
        defaultValue="buy" 
        value={orderType} 
        onValueChange={(value) => setOrderType(value as "buy" | "sell")} 
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-2 p-1 bg-slate-100 rounded-lg">
          <TabsTrigger 
            value="buy" 
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger 
            value="sell" 
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
          >
            Sell
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3 font-medium">Select Your Prediction</p>
        
        <RadioGroup 
          value={selectedOutcome ? "yes" : "no"} 
          onValueChange={(value) => setSelectedOutcome(value === "yes")}
          className="grid grid-cols-2 gap-4"
        >
          <div className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all hover:shadow-md cursor-pointer ${
            selectedOutcome 
              ? "border-green-500 bg-green-50 shadow-sm"
              : "border-slate-200 hover:border-green-300"
          }`}>
            <RadioGroupItem value="yes" id="place-yes" className="sr-only" />
            <label htmlFor="place-yes" className="flex items-center w-full h-full justify-center cursor-pointer">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span className={selectedOutcome ? "font-medium" : ""}>YES</span>
            </label>
          </div>
          
          <div className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all hover:shadow-md cursor-pointer ${
            !selectedOutcome 
              ? "border-red-500 bg-red-50 shadow-sm"
              : "border-slate-200 hover:border-red-300"
          }`}>
            <RadioGroupItem value="no" id="place-no" className="sr-only" />
            <label htmlFor="place-no" className="flex items-center w-full h-full justify-center cursor-pointer">
              <XCircle className="h-5 w-5 mr-2 text-red-500" />
              <span className={!selectedOutcome ? "font-medium" : ""}>NO</span>
            </label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-600 mb-2 font-medium">Price</p>
          <div className="relative">
            <Input
              type="number"
              min={0.01}
              max={0.99}
              step={0.01}
              value={price}
              onChange={handlePriceChange}
              className="h-12 text-center font-medium rounded-xl border-slate-200 focus:border-primary/50 transition-all"
              aria-label="Bet price"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-slate-500">₹</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground">Current: {selectedOutcome ? yesPrice.toFixed(2) : noPrice.toFixed(2)}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 py-0 text-xs text-primary hover:text-primary/80"
              onClick={() => setPrice(selectedOutcome ? yesPrice : noPrice)}
            >
              Use current
            </Button>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-slate-600 mb-2 font-medium">Quantity</p>
          <div className="flex items-center border rounded-xl overflow-hidden bg-white shadow-sm">
            <Button
              type="button"
              variant="ghost"
              className="h-12 px-4 rounded-none border-r hover:bg-slate-50"
              onClick={handleDecreaseBet}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min={10}
              value={quantity}
              onChange={handleQuantityChange}
              className="h-12 border-0 text-center font-medium"
              aria-label="Bet quantity"
            />
            <Button
              type="button"
              variant="ghost"
              className="h-12 px-4 rounded-none border-l hover:bg-slate-50"
              onClick={handleIncreaseBet}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(10)}
              className="text-xs border-slate-200 hover:bg-slate-50"
            >
              <Plus className="h-3 w-3 mr-1" />
              10
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(50)}
              className="text-xs border-slate-200 hover:bg-slate-50"
            >
              <Plus className="h-3 w-3 mr-1" />
              50
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(100)}
              className="text-xs border-slate-200 hover:bg-slate-50"
            >
              <Plus className="h-3 w-3 mr-1" />
              100
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickAdd(500)}
              className="text-xs border-slate-200 hover:bg-slate-50"
            >
              <Plus className="h-3 w-3 mr-1" />
              500
            </Button>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 py-2 px-3 bg-red-50 border border-red-100 rounded-lg flex items-center text-sm text-red-600">
          <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
      
      <div className="bg-slate-50 rounded-xl p-4 mt-6 border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">Order type:</span>
          <span className="font-medium capitalize">{orderType} {selectedOutcome ? "YES" : "NO"}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">Quantity:</span>
          <span className="font-medium">{quantity}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">Price per share:</span>
          <span className="font-medium">₹{price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">
            {orderType === "buy" ? "Potential value if YES wins:" : "You receive:"}
          </span>
          <span className="font-semibold text-green-600">₹{calculatePotentialValue()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">
            {orderType === "buy" ? "Cost:" : "Maximum loss:"}
          </span>
          <span className="font-semibold text-red-600">₹{calculateRisk()}</span>
        </div>
      </div>
      
      <Button
        className="w-full h-12 mt-6 bg-primary hover:bg-primary/90 font-medium text-white rounded-xl shadow-sm transition-all hover:shadow"
        onClick={handlePlaceOrder}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : `${orderType === "buy" ? "Buy" : "Sell"} ${selectedOutcome ? "YES" : "NO"}`}
      </Button>
    </Card>
  );
};

export default PolyBetPlacement;
