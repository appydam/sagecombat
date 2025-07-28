import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Zap, Award, Star, Rocket, Trophy, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const StreakMilestones = () => {
  const navigate = useNavigate();

    const milestones = [
  { days: 3, reward: "2x Multiplier", icon: <Zap className="..." />, description: "Double your next competition winnings" },
  { days: 7, reward: "₹50 Amazon Voucher", icon: <Award className="..." />, description: "Get ₹50 Amazon gift card for consistent activity" },
  { days: 14, reward: "₹100 SageCoins + Premium Stock Filter", icon: <Star className="..." />, description: "Use coins for entry + access premium filters" },
  { days: 30, reward: "₹200 Amazon Voucher + VIP Status", icon: <Rocket className="..." />, description: "Get ₹200 gift card + early feature access" },
  { days: 60, reward: "Custom Avatar + ₹300 Flipkart Voucher", icon: <Sparkles className="..." />, description: "Style your profile & enjoy real perks" },
  { days: 100, reward: "Legendary Badge + ₹500 Amazon Voucher", icon: <Trophy className="..." />, description: "Honor your streak with badge & ₹500 gift card" },
];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow pt-40 pb-8">
        <div className="container px-3 sm:px-4 mx-auto max-w-3xl">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-2 hover:bg-slate-100 p-1.5 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-indigo-600" />
            </button>
            <h1 className="text-xl font-bold flex items-center text-slate-800">
              <Flame className="h-5 w-5 text-orange-500 mr-2" />
              Streak Milestones
            </h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-4">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-orange-400 to-pink-500 text-white p-1.5 rounded-lg mr-3">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Current Streak</p>
                    <p className="text-xl font-bold text-slate-800">3 Days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Next Reward</p>
                  <p className="text-base font-semibold text-indigo-600">2x Multiplier</p>
                </div>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-pink-500 h-1.5 rounded-full" 
                  style={{ width: '30%' }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1 text-right">3/7 days to next milestone</p>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-base text-slate-800 mb-3">Upcoming Milestones</h3>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.days}
                    className={`flex items-start p-3 rounded-lg border text-sm ${
                      index === 0 ? 'border-2 border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg mr-3 ${
                      index === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-slate-800">{milestone.days} Days</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
                          index === 0 ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {milestone.reward}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-sm">
            <h3 className="font-semibold text-slate-800 mb-2">How Streaks Work</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Log in daily and place at least one trade to maintain your streak</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Miss a day and your streak resets</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Longer streaks unlock better rewards</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StreakMilestones;
