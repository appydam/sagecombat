
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GameTypes from "@/components/GameTypes";
import Footer from "@/components/Footer";
import CompetitionCard from "@/components/CompetitionCard";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Play, Star, Users, TrendingUp, Shield, CheckCircle2, Zap, Sparkles, Target, Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const leaderboardEntries = [{
    id: "entry-1",
    rank: 1,
    userId: "user-1",
    username: "StockGuru",
    return: 12.45,
    prize: 10000
  }, {
    id: "entry-2",
    rank: 2,
    userId: "user-2",
    username: "MarketMaven",
    return: 10.22,
    prize: 5000
  }, {
    id: "entry-3",
    rank: 3,
    userId: "user-3",
    username: "TradingKing",
    return: 8.17,
    prize: 2500
  }];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Global Background Elements */}
      <div className="fixed inset-0 -z-20">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Floating orbs with better visibility */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-gradient-to-l from-emerald-500/30 to-blue-600/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s'}} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-purple-500/25 to-pink-500/15 rounded-full blur-3xl animate-float" />
        
        {/* Moving particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/60 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <Navbar />
      
      <main className="flex-grow relative">
        {/* Compact Hero Section with Better Animations */}
        <section className="relative overflow-hidden pt-16 pb-6 md:pt-20 md:pb-8">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
              {/* Trust Signals with Slide Animation */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 w-full justify-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                  <Shield className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="font-medium text-emerald-100 text-sm">Secure & Trusted Platform</span>
                </div>
                
                <a href="https://mindstockpapertrading.vercel.app/" target="_blank" rel="noopener noreferrer" className="relative group inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 transition-all duration-300 cursor-pointer backdrop-blur-sm overflow-hidden bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-105">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-300 group-hover:text-blue-200" />
                  <span className="font-semibold text-blue-100 text-sm group-hover:text-white transition-colors">
                    🚀 Paper Trading App — <span className="text-yellow-300">Coming Soon!</span>
                  </span>
                </a>
              </div>

              {/* Main Headline with Text Animation */}
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
                <span className="block mb-2 text-4xl md:text-5xl opacity-90">The Future of</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient text-5xl md:text-7xl inline-block transform hover:scale-105 transition-transform duration-300">
                  Competitive Fantasy Gaming
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed md:text-xl">
                Transform your market knowledge into real rewards. Compete in skill-based games without the risk of actual trading.
              </p>

              {/* CTA Buttons with Hover Effects */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
                <Link to="/competitions" className="w-full sm:w-auto group">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg group-hover:shadow-blue-500/25 transform group-hover:scale-105 transition-all duration-300 text-base border-0 relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Start Playing Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
                <Link to="/how-it-works" className="w-full sm:w-auto group">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-4 border-2 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:border-slate-500 backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300 text-base">
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Product Demo with 3D Hover Effect */}
        <section className="py-8 relative">
          <div className="container mx-auto px-4">
            <div className="relative max-w-6xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500 transform group-hover:-translate-y-2">
                <img 
                  src="/newbg.png" 
                  alt="SageCombat Platform Preview" 
                  className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02]" 
                  loading="eager" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Compact Game Types */}
        <div className="relative py-8">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 via-slate-900/30 to-slate-800/50 -z-10" />
          <GameTypes />
        </div>

        {/* Compact Features Section with Cards Animation */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-slate-800/40 -z-10" />
          
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
                Why Choose 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ml-2">
                  SageCombat?
                </span>
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                We're building the world's most advanced competitive fantasy gaming platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Zap, title: "Instant Rewards", desc: "Get paid immediately when you win competitions", color: "from-yellow-400 to-orange-500" },
                { icon: Shield, title: "100% Safe", desc: "No real trading risk - pure skill-based predictions", color: "from-emerald-400 to-teal-500" },
                { icon: TrendingUp, title: "Real Market Data", desc: "Compete using live data from major exchanges", color: "from-blue-400 to-cyan-500" },
                { icon: Users, title: "Active Community", desc: "Join thousands of active prediction enthusiasts", color: "from-purple-400 to-pink-500" },
                { icon: CheckCircle2, title: "Easy to Start", desc: "Simple registration with Google or phone number", color: "from-green-400 to-emerald-500" },
                { icon: Target, title: "Fair & Transparent", desc: "Clear rules and transparent prize distribution", color: "from-indigo-400 to-purple-500" }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="group text-center p-6 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-200 transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Leaderboard Preview */}
        <section className="py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/40 to-transparent -z-10" />
          
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
                  Top Performers 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    Win Big
                  </span>
                </h2>
                <p className="text-lg text-slate-300 mb-6">
                  Our leaderboards track performance across all competitions. Top players earn real cash rewards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/leaderboard">
                    <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
                      View Global Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/competitions">
                    <Button variant="outline" size="lg" className="rounded-full px-8 border-2 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:border-slate-500 backdrop-blur-sm transition-all duration-300">
                      Join Competition
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <LeaderboardPreview competitionId="global" entries={leaderboardEntries} title="This Week's Champions" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section with Sparkle Effects */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 via-slate-900/90 to-slate-800/80 -z-10" />
          
          {/* Sparkle effects */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-blue-400/30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
                size={12 + Math.random() * 8}
              />
            ))}
          </div>
          
          <div className="container px-4 mx-auto text-center relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto text-white">
              Ready to Turn Your Market Knowledge Into
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 mt-2">
                Real Rewards?
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of players competing in skill-based fantasy gaming competitions. Start winning today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/competitions" className="group">
                <Button size="lg" className="rounded-full px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg group-hover:shadow-blue-500/25 transform group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Start Playing Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link to="/login" className="group">
                <Button variant="outline" size="lg" className="rounded-full px-12 py-4 text-lg border-2 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:border-slate-500 backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300">
                  Sign Up Free
                </Button>
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="flex justify-center items-center gap-8 mt-12 opacity-70">
              <div className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Secure & Safe</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm">Verified Platform</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors">
                <Star className="h-5 w-5" />
                <span className="text-sm">Trusted Platform</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
