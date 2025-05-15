
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, ChevronLeft, Clock, Users, IndianRupee } from "lucide-react";
import { format } from "date-fns";
import { PolyContest } from "@/types/competitions";

interface PolyContestHeaderProps {
  contest: PolyContest;
  onBack: () => void;
  onShare: () => void;
}

const PolyContestHeader = ({ contest, onBack, onShare }: PolyContestHeaderProps) => {
  return (
    <div className="mb-8">
      <Button 
        variant="ghost" 
        className="mb-6 text-amber-600 hover:text-amber-700 hover:bg-amber-50 -ml-2" 
        onClick={onBack}
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Poly Contests
      </Button>
      
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <Badge variant="outline" className="bg-white/80">
          {contest.category}
        </Badge>
        <Badge 
          variant={contest.status === "active" ? "default" : "secondary"}
          className={contest.status === "active" ? "bg-green-600" : ""}
        >
          {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
        </Badge>
        <Badge
          variant="outline"
          className={`capitalize ${contest.currency_type === "real" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
        >
          {contest.currency_type === "real" ? "Real Money" : "Virtual Money"}
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-amber-500 text-amber-600 hover:bg-amber-50"
            onClick={onShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-3">{contest.title}</h1>
      <p className="text-muted-foreground">{contest.description}</p>
      
      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-amber-500 mr-1" />
          <span className="text-muted-foreground">Closes {format(new Date(contest.end_time), "PP")}</span>
        </div>
        
        <div className="flex items-center">
          <Users className="h-4 w-4 text-amber-500 mr-1" />
          <span className="text-muted-foreground">{contest.participants} participants</span>
        </div>
        
        <div className="flex items-center">
          <IndianRupee className="h-4 w-4 text-amber-500 mr-1" />
          <span className="text-muted-foreground">₹{contest.total_volume.toLocaleString()} volume</span>
        </div>
      </div>
    </div>
  );
};

export default PolyContestHeader;
