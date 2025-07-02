import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  Loader2,
  ZoomIn,
  ZoomOut,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { PriceHistoryPoint } from "@/types/competitions";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceArea,
} from "recharts";

interface PolyContestChartProps {
  priceHistory: PriceHistoryPoint[];
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  isLoading?: boolean;
}

const PolyContestChart = ({ 
  priceHistory, 
  timeRange, 
  onTimeRangeChange,
  isLoading = false
}: PolyContestChartProps) => {
  const [left, setLeft] = useState<string | null>(null);
  const [right, setRight] = useState<string | null>(null);
  const [zoomMode, setZoomMode] = useState<boolean>(false);
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<PriceHistoryPoint[]>([]);
  const [showYes, setShowYes] = useState<boolean>(true);
  const [showNo, setShowNo] = useState<boolean>(true);

  useEffect(() => {
    setFilteredData(getFilteredPriceHistory());
  }, [priceHistory, timeRange]);

  const getFilteredPriceHistory = () => {
    if (!priceHistory.length) return [];
    
    const now = new Date();
    let cutoff = new Date();
    
    switch (timeRange) {
      case "1h":
        cutoff.setHours(now.getHours() - 1);
        break;
      case "6h":
        cutoff.setHours(now.getHours() - 6);
        break;
      case "1d":
        cutoff.setDate(now.getDate() - 1);
        break;
      case "1w":
        cutoff.setDate(now.getDate() - 7);
        break;
      case "1m":
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case "all":
      default:
        return priceHistory;
    }
    
    return priceHistory.filter(
      point => new Date(point.timestamp) >= cutoff
    );
  };

  const handleMouseDown = (e: any) => {
    if (!zoomMode || !e) return;
    const { activeLabel } = e;
    setRefAreaLeft(activeLabel);
  };

  const handleMouseMove = (e: any) => {
    if (!zoomMode || !refAreaLeft || !e) return;
    const { activeLabel } = e;
    setRefAreaRight(activeLabel);
  };

  const handleMouseUp = () => {
    if (!zoomMode || !refAreaLeft || !refAreaRight) {
      setRefAreaLeft(null);
      setRefAreaRight(null);
      return;
    }

    // Ensure left is always less than right
    if (refAreaLeft && refAreaRight) {
      const leftIndex = priceHistory.findIndex(d => d.timestamp === refAreaLeft);
      const rightIndex = priceHistory.findIndex(d => d.timestamp === refAreaRight);

      if (leftIndex !== -1 && rightIndex !== -1) {
        const [startIndex, endIndex] = leftIndex <= rightIndex 
          ? [leftIndex, rightIndex] 
          : [rightIndex, leftIndex];

        setFilteredData(priceHistory.slice(startIndex, endIndex + 1));
      }
    }

    setRefAreaLeft(null);
    setRefAreaRight(null);
  };

  const handleZoomReset = () => {
    setFilteredData(getFilteredPriceHistory());
    setLeft(null);
    setRight(null);
  };

  const toggleZoomMode = () => {
    setZoomMode(!zoomMode);
    if (zoomMode) {
      handleZoomReset();
    }
  };

  const formatTooltipTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "PPp");
    } catch (error) {
      return timestamp;
    }
  };

  const formatAxisTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "HH:mm");
    } catch (error) {
      return timestamp;
    }
  };

  return (
    <Card className="p-6 mb-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-amber-600" />
          Price History
          {isLoading && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </h3>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md overflow-hidden h-8">
            <button
              onClick={() => setShowYes(!showYes)}
              className={`px-3 h-full flex items-center text-xs gap-1 transition-colors ${showYes ? 'bg-green-100 text-green-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {showYes && <Check className="h-3 w-3" />}
              Yes
            </button>
            <div className="w-px h-4 bg-gray-200" />
            <button
              onClick={() => setShowNo(!showNo)}
              className={`px-3 h-full flex items-center text-xs gap-1 transition-colors ${showNo ? 'bg-red-100 text-red-800' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {showNo && <Check className="h-3 w-3" />}
              No
            </button>
          </div>
          
          <Tabs 
            value={timeRange} 
            onValueChange={(value) => {
              onTimeRangeChange(value);
              handleZoomReset();
            }} 
            className="h-8"
          >
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="1h" className="text-xs px-2">1H</TabsTrigger>
              <TabsTrigger value="6h" className="text-xs px-2">6H</TabsTrigger>
              <TabsTrigger value="1d" className="text-xs px-2">1D</TabsTrigger>
              <TabsTrigger value="1w" className="text-xs px-2">1W</TabsTrigger>
              <TabsTrigger value="1m" className="text-xs px-2">1M</TabsTrigger>
              <TabsTrigger value="all" className="text-xs px-2">ALL</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="h-64">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div>
        ) : filteredData.length > 0 ? (
          <ChartContainer
            className="h-64"
            config={{
              yes: {
                color: "#10B981",
              },
              no: {
                color: "#EF4444",
              },
            }}
          >
            <AreaChart 
              data={filteredData}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <defs>
                <linearGradient id="yes-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="no-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatAxisTimestamp}
                tickLine={false}
                axisLine={false}
                dy={10}
                minTickGap={30}
              />
              <YAxis
                tickFormatter={(value) => `₹${value.toFixed(2)}`}
                domain={[0, 1]}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <Tooltip 
                content={(props: any) => {
                  const { active, payload } = props;
                  if (
                    active &&
                    payload &&
                    payload.length &&
                    typeof payload[0].value === "number" &&
                    typeof payload[1]?.value === "number"
                  ) {
                    return (
                      <div className="bg-card p-3 border rounded-md shadow-sm">
                        <p className="text-xs font-medium mb-1">
                          {formatTooltipTimestamp(payload[0].payload.timestamp)}
                        </p>
                        {showYes && (
                          <p className="text-sm flex items-center text-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Yes: ₹{Number(payload[0].value).toFixed(2)}
                          </p>
                        )}
                        {showNo && (
                          <p className="text-sm flex items-center text-red-600">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            No: ₹{Number(payload[1]?.value || 0).toFixed(2)}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {refAreaLeft && refAreaRight && (
                <ReferenceArea
                  x1={refAreaLeft}
                  x2={refAreaRight}
                  strokeOpacity={0.3}
                  fill="#8884d8"
                  fillOpacity={0.1}
                />
              )}
              {showYes && (
                <Area
                  type="monotone"
                  dataKey="yes_price"
                  stroke="#10B981"
                  fill="url(#yes-gradient)"
                  name="Yes"
                  animationDuration={500}
                  activeDot={{ r: 6, fill: "#10B981" }}
                />
              )}
              {showNo && (
                <Area
                  type="monotone"
                  dataKey="no_price"
                  stroke="#EF4444"
                  fill="url(#no-gradient)"
                  name="No"
                  animationDuration={500}
                  activeDot={{ r: 6, fill: "#EF4444" }}
                />
              )}
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-muted-foreground mb-2">No price history data available</p>
            <p className="text-sm text-muted-foreground">Price data will appear here once trades are made</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PolyContestChart;
