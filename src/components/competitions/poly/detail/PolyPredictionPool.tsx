
import React from 'react';
import { Card } from "@/components/ui/card";
import { Percent } from "lucide-react";

interface PolyPredictionPoolProps {
  yesPrice: number;
  noPrice: number;
}

const PolyPredictionPool = ({ yesPrice, noPrice }: PolyPredictionPoolProps) => {
  return (
    <Card className="p-3"> {/* Further reduced padding to p-3 */}
      <h3 className="font-semibold text-sm mb-2">Current Prediction Pool</h3> {/* Reduced text size and margin */}
      
      <div className="grid grid-cols-2 gap-2"> {/* Further reduced gap to gap-2 */}
        <div className="border rounded-md p-2 relative overflow-hidden"> {/* Further reduced padding and rounding */}
          <div 
            className="absolute inset-0 bg-green-50 z-0" 
            style={{ width: `${yesPrice * 100}%` }}
          />
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-green-700">YES</span> {/* Further reduced text size */}
              <span className="flex items-center text-green-700">
                <Percent className="h-3 w-3 mr-0.5" /> {/* Reduced icon size and margin */}
                <span className="text-sm">{(yesPrice * 100).toFixed(0)}%</span> {/* Reduced text size for percentage */}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between"> {/* Reduced margin */}
              <span className="text-xs text-muted-foreground">Current Price</span> {/* Reduced text size */}
              <span className="text-sm text-green-700 font-medium">₹{yesPrice.toFixed(2)}</span> {/* Reduced text size */}
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-2 relative overflow-hidden"> {/* Further reduced padding and rounding */}
          <div 
            className="absolute inset-0 bg-red-50 z-0" 
            style={{ width: `${noPrice * 100}%` }}
          />
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-red-700">NO</span> {/* Further reduced text size */}
              <span className="flex items-center text-red-700">
                <Percent className="h-3 w-3 mr-0.5" /> {/* Reduced icon size and margin */}
                <span className="text-sm">{(noPrice * 100).toFixed(0)}%</span> {/* Reduced text size for percentage */}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between"> {/* Reduced margin */}
              <span className="text-xs text-muted-foreground">Current Price</span> {/* Reduced text size */}
              <span className="text-sm text-red-700 font-medium">₹{noPrice.toFixed(2)}</span> {/* Reduced text size */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PolyPredictionPool;
