
import { Trophy, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MorphCard from "./ui/MorphCard";

export interface LeaderboardEntry {
  id: string;
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  return: number;
  prize?: number;
}

interface LeaderboardPreviewProps {
  competitionId: string;
  entries: LeaderboardEntry[];
  title?: string;
}

const LeaderboardPreview = ({ 
  competitionId, 
  entries, 
  title = "Top Performers" 
}: LeaderboardPreviewProps) => {
  return (
    <MorphCard className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-gold-500" />
          {title}
        </h3>
        <Link to={`/leaderboard`}>
          <Button variant="ghost" size="sm" className="text-xs">
            View Full Leaderboard
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-1">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center p-2 rounded-lg ${
              entry.rank <= 3 ? "bg-secondary/80" : ""
            }`}
          >
            <div className="flex-shrink-0 w-8 text-center font-semibold">
              {entry.rank === 1 && <span className="text-gold-500">🥇</span>}
              {entry.rank === 2 && <span className="text-slate-400">🥈</span>}
              {entry.rank === 3 && <span className="text-amber-700">🥉</span>}
              {entry.rank > 3 && <span>{entry.rank}</span>}
            </div>
            
            <div className="flex-grow ml-3">
              <span className="font-medium">{entry.username}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`font-semibold ${
                entry.return >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {entry.return >= 0 ? "+" : ""}{entry.return.toFixed(2)}%
              </div>
              
              {entry.prize && (
                <div className="text-sm font-semibold bg-gold-100 text-gold-800 px-2 py-0.5 rounded">
                  ₹{entry.prize.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </MorphCard>
  );
};

export default LeaderboardPreview;
