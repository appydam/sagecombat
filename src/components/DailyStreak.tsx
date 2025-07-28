import { Flame, ChevronRight, Clock, Calendar, Check, Gift } from "lucide-react";
import { Link } from "react-router-dom";

interface DailyStreakProps {
  currentStreak?: number;
  nextReward?: string;
  daysCompleted?: number;
  totalDaysForNextReward?: number;
}

const DailyStreak = ({
  currentStreak = 3,
  nextReward = "2x Multiplier",
  daysCompleted = 3,
  totalDaysForNextReward = 7,
}: DailyStreakProps) => {
  const progressPercentage = (daysCompleted / totalDaysForNextReward) * 100;
  
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="absolute top-0 left-0 bg-gradient-to-r from-rose-200 to-pink-300 text-slate-700 text-[13px] font-medium px-3 py-1.5 rounded-br-lg shadow-sm">
        <span className="drop-shadow-sm">Under Development</span>
      </div>
      <div className="flex items-start justify-between mb-3 mt-6">
        <div className="flex items-center">
          <div className="relative">
            <Flame className="w-4 h-4 text-orange-500" />
            <div className="absolute -top-0.5 -right-0.5 bg-white rounded-full w-3 h-3 flex items-center justify-center">
              <span className="text-[9px] font-bold text-orange-600">{currentStreak}</span>
            </div>
          </div>
          <h3 className="font-semibold text-indigo-900 ml-2 text-sm">Daily Streak</h3>
        </div>
        <Link to="/streak-milestones" className="text-[11px] bg-white hover:bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium transition-all flex items-center border border-indigo-100 shadow-sm hover:shadow">
          View All
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </Link>
      </div>
      
      <div className="bg-white rounded-lg p-2.5 mb-3 border border-indigo-50">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center">
            <Gift className="w-3.5 h-3.5 text-pink-500 mr-1" />
            <span className="text-xs font-medium text-slate-700">Next Reward</span>
          </div>
          <div className="flex items-center bg-indigo-50 text-indigo-700 text-[10px] px-1.5 py-0.5 rounded-full">
            <Clock className="w-2.5 h-2.5 mr-0.5" />
            <span>{daysCompleted}/{totalDaysForNextReward} days</span>
          </div>
        </div>
        <p className="text-xs font-semibold text-indigo-900 mb-2">{nextReward}</p>
        
        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }} />
        </div>
        
        <div className="flex justify-between items-center text-[9px] text-slate-500">
          <div className="flex items-center">
            <Calendar className="w-2.5 h-2.5 mr-0.5" />
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div className="flex items-center">
            <Calendar className="w-2.5 h-2.5 mr-0.5" />
            {new Date(Date.now() + (totalDaysForNextReward - daysCompleted) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4, 5].map((day) => (
          <div key={day} className="flex flex-col items-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mb-0.5 ${day <= daysCompleted ? 'bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-md' : 'bg-white text-slate-400 border-2 border-slate-200'}`}>
              {day <= daysCompleted ? <Check className="w-3 h-3" /> : day}
            </div>
            <span className="text-[9px] font-medium text-slate-500">
              {['S', 'M', 'T', 'W', 'T'][day - 1]}
            </span>
          </div>
        ))}
        <Link to="/streak-milestones" className="w-7 h-7 rounded-full bg-white border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors" title="View all milestones">
          <span className="text-[10px] font-bold">+{totalDaysForNextReward - 5}</span>
        </Link>
      </div>
    </div>
  );
};

export default DailyStreak;
