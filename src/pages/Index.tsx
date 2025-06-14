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
  const stats = [{
    icon: Users,
    value: "10K+",
    label: "Active Players"
  }, {
    icon: TrendingUp,
    value: "₹2.5M+",
    label: "Prizes Won"
  }, {
    icon: Star,
    value: "4.8/5",
    label: "User Rating"
  }];
  const howItWorksSteps = [{
    step: "01",
    title: "Choose Your Game",
    description: "Select from equity baskets, crypto predictions, or opinion trading contests",
    icon: "🎯"
  }, {
    step: "02",
    title: "Make Predictions",
    description: "Use your market knowledge to predict outcomes and build winning strategies",
    icon: "🧠"
  }, {
    step: "03",
    title: "Win Prizes",
    description: "Compete with others and earn real money based on your prediction accuracy",
    icon: "🏆"
  }];
  return <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
          {/* Animated Background Elements */}
          <div className="absolute top-0 -left-40 right-0 h-[500px] bg-gradient-to-br from-mint-100/40 via-secondary/60 to-transparent rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-gold-200/30 rounded-full blur-3xl animate-bounce -z-10" style={{
          animationDuration: '6s'
        }} />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-mint-200/30 rounded-full blur-3xl animate-float -z-10" />

          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              {/* Trust Signals */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full justify-center animate-fade-in">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-mint-50 border border-green-200">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Trusted by 10K+ Players</span>
                </div>
                
                <a href="https://mindstockpapertrading.vercel.app/" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center px-4 py-2 rounded-full border border-border transition-all duration-300 cursor-pointer animate-fade-in shadow-sm overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700">
                  <span className="relative z-10 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-white" />
                    <span className="text-sm font-semibold text-white">
                      🚀 Paper Trading App — <span className="text-yellow-300">Coming Soon!</span>
                    </span>
                  </span>
                </a>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-up">
                <span className="block mb-2 text-7xl ">The Future of</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-mint-600 to-gold-500 animate-gradient text-8xl ">Competitive Fantasy Gaming</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-up leading-relaxed" style={{
              animationDelay: '200ms'
            }}>
                Transform your market knowledge into real rewards. Compete in skill-based prediction games without the risk of actual trading.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto animate-fade-up" style={{
              animationDelay: '400ms'
            }}>
                <Link to="/competitions" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-4 text-lg bg-gradient-to-r from-primary to-mint-600 hover:from-primary/90 hover:to-mint-600/90 shadow-lg transform hover:scale-105 transition-all duration-300">
                    Start Playing Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-4 text-lg border-2 hover:bg-accent/50 transform hover:scale-105 transition-all duration-300" onClick={() => {
                const element = document.getElementById('how-it-works');
                element?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}>
                  <Play className="mr-2 h-5 w-5" />
                  See How It Works
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl animate-fade-up" style={{
              animationDelay: '600ms'
            }}>
                {stats.map((stat, index) => <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Product Demo Image */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-mint-600/20 rounded-3xl blur-3xl transform rotate-1"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
                <img src="/newbg.png" alt="SageCombat Platform Preview - Equity, Opinion and Poly Contest Interfaces" className="w-full h-auto rounded-xl shadow-lg animate-fade-in" loading="eager" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent -z-10" />
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                How SageCombat Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{
              animationDelay: '200ms'
            }}>
                Three simple steps to start earning with your market predictions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {howItWorksSteps.map((step, index) => <div key={index} className="relative text-center animate-fade-up group hover:scale-105 transition-transform duration-300" style={{
              animationDelay: `${(index + 1) * 200}ms`
            }}>
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 h-full">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <div className="text-sm font-mono text-primary mb-2">{step.step}</div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {index < howItWorksSteps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>}
                </div>)}
            </div>

            <div className="text-center mt-12">
              <Link to="/competitions">
                <Button size="lg" className="rounded-full px-8 animate-fade-up" style={{
                animationDelay: '800ms'
              }}>
                  Explore Competitions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Game Types */}
        <GameTypes />

        {/* Features Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-mint-100/30 rounded-full blur-3xl -z-10" />
          
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
            }].map((feature, index) => <div key={index} className="text-center p-6 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300 animate-fade-up group hover:scale-105" style={{
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
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-50/30 to-transparent -z-10" />
          
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
                    <Button size="lg" className="rounded-full px-8">
                      View Global Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/competitions">
                    <Button variant="outline" size="lg" className="rounded-full px-8">
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
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-mint-100/40 via-secondary/60 to-gold-100/40 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
          
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
                <Button variant="outline" size="lg" className="rounded-full px-12 py-4 text-lg border-2 hover:bg-accent/50 transform hover:scale-105 transition-all duration-300">
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
                <span className="text-sm">Trusted by 10K+</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;