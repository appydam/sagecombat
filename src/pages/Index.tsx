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
import { ArrowRight, Play, Star, Users, TrendingUp, Shield, CheckCircle2, Zap } from "lucide-react";
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
  return <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-mint-50/30 relative overflow-hidden">
      {/* Enhanced Global Background Elements */}
      <div className="fixed inset-0 -z-20">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-mint-100/20 to-gold-100/30" />
        
        {/* Animated floating orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-mint-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-gradient-to-l from-gold-200/30 to-mint-300/20 rounded-full blur-3xl animate-bounce" style={{
        animationDuration: '8s'
      }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-mint-300/25 to-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-gradient-to-bl from-gold-300/20 to-mint-200/25 rounded-full blur-3xl animate-float" style={{
        animationDelay: '4s'
      }} />
        
        {/* Geometric patterns */}
        <div className="absolute top-1/3 left-1/2 w-48 h-48 border border-primary/10 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 border border-mint-400/20 rounded-full animate-float" style={{
        animationDelay: '2s'
      }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      </div>

      <Navbar />
      
      <main className="flex-grow relative">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-8 md:pt-28 md:pb-12">
          {/* Section-specific background elements */}
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-mint-50/40 via-transparent to-transparent -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-primary/5 to-mint-400/10 rounded-full blur-3xl -z-10 animate-pulse" style={{
          animationDuration: '4s'
        }} />

          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              {/* Trust Signals */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full justify-center animate-fade-in">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-mint-50 border border-green-200 shadow-sm">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium text-green-700 text-xs">Secure & Trusted Platform</span>
                </div>
                
                <a href="https://mindstockpapertrading.vercel.app/" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center px-4 py-2 rounded-full border border-border transition-all duration-300 cursor-pointer animate-fade-in shadow-sm overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 hover:shadow-md">
                  <span className="relative z-10 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-white" />
                    <span className="font-semibold text-white text-xs">
                      🚀 Paper Trading App — <span className="text-yellow-300">Coming Soon!</span>
                    </span>
                  </span>
                </a>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-up">
                <span className="block mb-2 text-6xl md:text-7xl">The Future of</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-mint-600 to-gold-500 animate-gradient text-7xl md:text-8xl">Competitive Fantasy Gaming</span>
              </h1>

              {/* Subheadline */}
              <p style={{
              animationDelay: '200ms'
            }} className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-up leading-relaxed md:text-xl">Transform your market knowledge into real rewards. Compete in skill-based games without the risk of actual trading.</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto animate-fade-up" style={{
              animationDelay: '400ms'
            }}>
                <Link to="/competitions" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-4 bg-gradient-to-r from-primary to-mint-600 hover:from-primary/90 hover:to-mint-600/90 shadow-lg transform hover:scale-105 transition-all duration-300 text-base">
                    Start Playing Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-4 border-2 hover:bg-accent/50 transform hover:scale-105 transition-all duration-300 text-base">
                    <Play className="mr-2 h-5 w-5" />
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Product Demo Image */}
        <section className="py-12 relative">
          {/* Background elements for this section */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-mint-400/5 -z-10" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-mint-200/20 to-gold-200/15 rounded-full blur-3xl -z-10 animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary/10 to-mint-300/20 rounded-full blur-3xl -z-10 animate-float" style={{
          animationDelay: '3s'
        }} />
          
          <div className="container mx-auto px-4">
            <div className="relative max-w-8xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-mint-600/20 rounded-3xl blur-3xl transform rotate-1 animate-pulse"></div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
                <img src="/newbg.png" alt="SageCombat Platform Preview - Equity, Opinion and Poly Contest Interfaces" className="w-full h-auto rounded-2xl shadow-2xl animate-fade-in transform hover:scale-[1.02] transition-all duration-500" loading="eager" />
              </div>
            </div>
          </div>
        </section>

        {/* Game Types */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-mint-50/20 via-white/50 to-primary/5 -z-10" />
          <GameTypes />
        </div>

        {/* Features Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-mint-50/30 to-gold-100/20 -z-10" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-mint-100/30 rounded-full blur-3xl -z-10 animate-float" />
          <div className="absolute bottom-0 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/15 to-mint-300/25 rounded-full blur-3xl -z-10 animate-float" style={{
          animationDelay: '4s'
        }} />
          
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                Why Choose SageCombat?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{
              animationDelay: '200ms'
            }}>
                The most advanced fantasy gaming platform for market predictions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[{
              icon: Zap,
              title: "Instant Rewards",
              desc: "Get paid immediately when you win competitions"
            }, {
              icon: Shield,
              title: "100% Safe",
              desc: "No real trading risk - pure skill-based predictions"
            }, {
              icon: TrendingUp,
              title: "Real Market Data",
              desc: "Compete using live data from major exchanges"
            }, {
              icon: Users,
              title: "Active Community",
              desc: "Join thousands of active prediction enthusiasts"
            }, {
              icon: CheckCircle2,
              title: "Easy to Start",
              desc: "Simple registration with Google or phone number"
            }, {
              icon: Star,
              title: "Fair & Transparent",
              desc: "Clear rules and transparent prize distribution"
            }].map((feature, index) => <div key={index} className="text-center p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/50 transition-all duration-300 animate-fade-up group hover:scale-105 shadow-lg hover:shadow-xl" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>)}
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-50/40 to-transparent -z-10" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-mint-300/20 rounded-full blur-3xl -z-10 animate-float" />
          
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                  Top Performers Win Big
                </h2>
                <p className="text-xl text-muted-foreground mb-8 animate-fade-up" style={{
                animationDelay: '200ms'
              }}>
                  Our leaderboards track performance across all competitions. Top players earn real cash rewards for their market insights and prediction accuracy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{
                animationDelay: '400ms'
              }}>
                  <Link to="/leaderboard">
                    <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow">
                      View Global Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/competitions">
                    <Button variant="outline" size="lg" className="rounded-full px-8 border-2 hover:bg-white/50 transition-colors">
                      Join Competition
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 animate-fade-up" style={{
              animationDelay: '300ms'
            }}>
                <LeaderboardPreview competitionId="global" entries={leaderboardEntries} title="This Week's Champions" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-mint-100/50 via-secondary/40 to-gold-100/50 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-primary/10 to-mint-400/15 rounded-full blur-3xl -z-10 animate-pulse" style={{
          animationDuration: '6s'
        }} />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-gold-300/20 to-primary/15 rounded-full blur-3xl -z-10 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tl from-mint-400/25 to-gold-200/20 rounded-full blur-3xl -z-10 animate-float" style={{
          animationDelay: '3s'
        }} />
          
          <div className="container px-4 mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-fade-up">
              Ready to Turn Your Market Knowledge Into
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-mint-600 mt-2">
                Real Rewards?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up" style={{
            animationDelay: '200ms'
          }}>
              Join thousands of players competing in skill-based fantasy gaming competitions. Start winning today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-up" style={{
            animationDelay: '400ms'
          }}>
              <Link to="/competitions">
                <Button size="lg" className="rounded-full px-12 py-4 text-lg bg-gradient-to-r from-primary to-mint-600 hover:from-primary/90 hover:to-mint-600/90 shadow-lg transform hover:scale-105 transition-all duration-300">
                  Start Playing Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="rounded-full px-12 py-4 text-lg border-2 hover:bg-white/50 transform hover:scale-105 transition-all duration-300">
                  Sign Up Free
                </Button>
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="flex justify-center items-center gap-8 mt-16 opacity-60 animate-fade-up" style={{
            animationDelay: '600ms'
          }}>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Secure & Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm">Verified Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span className="text-sm">Trusted Platform</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;