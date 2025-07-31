
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GameTypes from "@/components/GameTypes";
import ContestInfo from "@/components/ContestInfo";
import Footer from "@/components/Footer";
import CompetitionCard from "@/components/CompetitionCard";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Play, Star, Users, TrendingUp, Shield, CheckCircle2, Zap, X, Lightbulb } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const leaderboardEntries = [{
    id: "entry-1",
    rank: 1,
    userId: "user-1",
    username: "Arpit",
    return: 12.45,
    prize: 10000
  }, {
    id: "entry-2",
    rank: 2,
    userId: "user-2",
    username: "Kash",
    return: 10.22,
    prize: 5000
  }, {
    id: "entry-3",
    rank: 3,
    userId: "user-3",
    username: "Yuvraj",
    return: 8.17,
    prize: 2500
  }];

  return <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Elegant Grid Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-mint-50/30" />
        
        {/* Primary Grid Layer - Wider spacing, blackish color */}
        <div 
          className="absolute inset-0 opacity-8 animate-grid-float"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15, 23, 42, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15, 23, 42, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />
        
        {/* Secondary Grid Layer - Even wider, subtle */}
        <div 
          className="absolute inset-0 opacity-6 animate-grid-float-reverse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 41, 59, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 41, 59, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '200px 200px',
            backgroundPosition: '60px 60px'
          }}
        />
      </div>

      {/* Subtle Background Orbs - Lower Z-Index */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-primary/5 to-mint-200/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-gradient-to-l from-gold-200/15 to-mint-300/10 rounded-full blur-3xl animate-bounce" style={{
        animationDuration: '8s'
      }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-mint-300/10 to-primary/8 rounded-full blur-3xl animate-float" />
      </div>

      <Navbar />

      {/* Beta Version Banner */}
      {isBannerVisible && (
        <div className="relative overflow-hidden z-20 bg-gradient-to-r from-violet-200 to-pink-200 text-gray-800 text-center p-2.5 text-sm flex items-center justify-center">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          <p className="font-medium relative">🚀 Welcome to the Beta! We're still polishing things up, so please excuse any dust. Your feedback is invaluable! ✨</p>
          <button 
            onClick={() => setIsBannerVisible(false)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors z-10"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <main className="flex-grow relative z-10">
      {/* Enhanced Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            
            {/* Mobile-First Trust Badges */}
            <div className="flex flex-col gap-3 mb-8 w-full max-w-sm md:max-w-none md:flex-row md:justify-center md:gap-4 animate-fade-in">
              <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-green-50 border border-green-200 shadow-sm">
                <Shield className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                <span className="font-medium text-green-700 text-xs">Secure Platform</span>
              </div>
              
              <a href="https://mindstockpapertrading.vercel.app/" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-white" />
                <span className="font-medium text-white text-xs">
                  Paper Trading <span className="text-yellow-300">Coming Soon</span>
                </span>
              </a>
            </div>

            {/* Mobile-Optimized Headline */}
            <div className="space-y-4 mb-6">
              <h1 className="font-display font-bold tracking-tight animate-fade-up">
                <span className="block text-2xl md:text-4xl lg:text-5xl text-slate-900 mb-2">
                  The future of
                </span>
                <span className="block text-3xl md:text-5xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-mint-600 to-gold-500 leading-[1.1] md:leading-tight">
                  Competitive<br className="md:hidden" />
                  <span className="md:ml-2">Skill Gaming</span>
                </span>
              </h1>
              
              {/* Value Prop Badge */}
              <div className="inline-flex items-center px-4 py-2 mx-auto mt-4 text-xs md:text-sm font-medium text-violet-800 bg-violet-50 border border-violet-200 rounded-full shadow-sm animate-fade-up" style={{ animationDelay: '200ms' }}>
                <Lightbulb className="w-4 h-4 mr-2 text-violet-600" />
                Turn Market Knowledge into Real Rewards
              </div>
            </div>

            {/* Subheadline - Mobile Optimized */}
            <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-8 max-w-lg md:max-w-2xl mx-auto leading-relaxed animate-fade-up" 
               style={{ animationDelay: '300ms' }}>
              Join skill-based competitions where smart predictions earn real cash. No trading risk, just pure strategy.
            </p>

            {/* Mobile-First CTA Buttons */}
            <div className="flex flex-col w-full max-w-sm md:max-w-none md:flex-row gap-3 md:gap-4 mb-12 animate-fade-up justify-center items-center" 
                 style={{ animationDelay: '400ms' }}>
              <Link to="/competitions" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-12 md:h-14 rounded-full px-6 md:px-8 bg-gradient-to-r from-primary to-mint-600 hover:from-primary/90 hover:to-mint-600/90 shadow-lg text-base md:text-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                  Start Playing Now 
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 md:h-14 rounded-full px-6 md:px-8 border-2 hover:bg-slate-50 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                  <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Social Proof - Mobile */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-slate-500 animate-fade-up" 
                 style={{ animationDelay: '500ms' }}>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>1000+ Players</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Instant Payouts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

        <ContestInfo />

        <GameTypes />
        {/* Mobile-Optimized Features Section */}
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-3 animate-fade-up">
                Why Choose SageCombat?
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto animate-fade-up" 
                 style={{ animationDelay: '200ms' }}>
                The most advanced platform for skill-based competitive gaming
              </p>
            </div>
            
            {/* Mobile-First Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Instant Rewards",
                  desc: "Get paid immediately when you win. No waiting, no hassle."
                },
                {
                  icon: Shield,
                  title: "100% Risk-Free",
                  desc: "No real trading risk. Pure skill-based competition only."
                },
                {
                  icon: TrendingUp,
                  title: "Real Market Data",
                  desc: "Live feeds from actual markets for authentic experience."
                },
                {
                  icon: Users,
                  title: "Active Community",
                  desc: "Join thousands of players competing daily."
                },
                {
                  icon: CheckCircle2,
                  title: "Quick Start",
                  desc: "Sign up in seconds and start playing immediately."
                },
                {
                  icon: Star,
                  title: "Fair & Transparent",
                  desc: "Clear rules, transparent scoring, merit-based rankings."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 md:p-8 text-center hover:bg-white/80 transition-all duration-300 animate-fade-up group hover:scale-[1.02] shadow-sm hover:shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-mint-600/10 mb-4 group-hover:from-primary/20 group-hover:to-mint-600/20 transition-colors">
                    <feature.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Mobile-Optimized Leaderboard Section */}
        <section className="py-12 md:py-20 relative">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 animate-fade-up">
                  Top Performers Win Big
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-6 md:mb-8 animate-fade-up leading-relaxed" 
                   style={{ animationDelay: '200ms' }}>
                  Merit-based rankings track your performance. Top players earn real cash rewards for their market insights and prediction accuracy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-up justify-center lg:justify-start" 
                     style={{ animationDelay: '400ms' }}>
                  <Link to="/leaderboard" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto rounded-full px-6 md:px-8 h-12 md:h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      View Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/competitions" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-6 md:px-8 h-12 md:h-14 border-2 hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02]">
                      Join Competition
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 animate-fade-up order-1 lg:order-2 w-full" 
                   style={{ animationDelay: '300ms' }}>
                <LeaderboardPreview competitionId="global" entries={leaderboardEntries} title="This Week's Champions" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mobile-Optimized CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-mint-50/50">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 animate-fade-up">
                Ready to turn your market knowledge into
                <span className="block text-3xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-mint-600 to-gold-500 mt-2">
                  Real Rewards?
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up" 
                 style={{ animationDelay: '200ms' }}>
                Join thousands of players competing in skill-based gaming. Your market insights = Real cash rewards.
              </p>
              
              {/* Mobile-First CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-16 animate-fade-up" 
                   style={{ animationDelay: '400ms' }}>
                <Link to="/competitions" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 md:h-16 rounded-full px-8 md:px-12 text-base md:text-lg font-semibold bg-gradient-to-r from-primary to-mint-600 hover:from-primary/90 hover:to-mint-600/90 shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    Start Playing Now <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 md:h-16 rounded-full px-8 md:px-12 text-base md:text-lg font-semibold border-2 hover:bg-white/80 transition-all duration-300 hover:scale-[1.02]">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
              
              {/* Trust Indicators - Mobile Optimized */}
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-70 animate-fade-up" 
                   style={{ animationDelay: '600ms' }}>
                <div className="flex items-center gap-2 text-sm md:text-base text-slate-600">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base text-slate-600">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base text-slate-600">
                  <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                  <span>Trusted</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile-Optimized Testimonials Section */}
      <section className="py-12 md:py-20 bg-white relative z-10">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
              What Players Are Saying
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of satisfied players who've turned their market knowledge into rewards
            </p>
          </div>
          
          {/* Mobile-First Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Gaurav K.",
                role: "Active Trader",
                quote: "Pretty addictive set of mind sport games. This platform is genius!",
                rating: 5
              },
              {
                name: "Mehak D.",
                role: "Finance Professional", 
                quote: "Feels like skill-based sports - but for finance nerds like me.",
                rating: 5
              },
              {
                name: "Rahul A.",
                role: "Investment Analyst",
                quote: "Finally, a platform where I can use my knowledge & leaderboard is on merit :)",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-slate-50 to-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-sm md:text-base text-slate-700 italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Attribution */}
                <div className="text-center">
                  <p className="font-semibold text-slate-900 text-sm md:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs md:text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="relative z-20">
        <Footer />
      </div>
    </div>;
};

export default Index;
