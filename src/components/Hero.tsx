
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Trophy, BrainCircuit, LineChart, Bitcoin, MessageSquare } from "lucide-react";
import MorphCard from "./ui/MorphCard";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient */}
      <div className="absolute top-0 -left-40 right-0 h-[500px] bg-gradient-to-br from-mint-100/30 via-secondary/50 to-transparent rounded-full blur-3xl -z-10" />

      {/* Orbiting elements (decorative) */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-gold-200/20 rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-mint-200/20 rounded-full blur-3xl animate-float animation-delay-2000 -z-10" />

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Paper Trading App div and original chip in a flex container */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full justify-center">
            {/* Original Chip */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border animate-fade-in">
              <span className="text-xs font-medium text-muted-foreground">
                #1 Fantasy Trading Platform - Earn Real Money
              </span>
            </div>

            {/* Paper Trading App Div with Animated Gradient */}
            <a
              href="https://mindstockpapertrading.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center px-4 py-1.5 rounded-full border border-border transition-colors cursor-pointer animate-fade-in shadow-sm overflow-hidden bg-gradient"
              aria-label="Ultimate Paper Trading App - Coming Soon"
            >
              {/* Content */}
              <span className="relative z-10 flex items-center">
                <LineChart className="w-4 h-4 mr-2 text-white" />
                <span className="text-xs font-semibold text-white tracking-wide">
                  🚀 Ultimate Paper Trading App — <span className="text-yellow-300">Coming Soon!</span>
                </span>
              </span>
            </a>
          </div>

          {/* Main headline with SEO keywords */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up">
            Best Fantasy Trading Game - Earn Real Money with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-mint-600">
              Strategy & Skill
            </span>
          </h1>

          {/* SEO-optimized subheadline with target keywords */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up">
            Join India's leading fantasy trading platform where smart predictions earn real rewards.
            Play stock games, crypto competitions, and opinion trading without actual trading risk.
            Turn your market knowledge into cash prizes through skill-based gaming.
          </p>

          {/* Hidden SEO text for additional keyword coverage */}
          <div className="sr-only">
            SageCombat is the best gaming app for real money in India. Our fantasy equity games and opinion trading platform 
            lets you earn money through games based on stock market predictions. Join thousands playing the top real money 
            gaming platform that combines fantasy sports mechanics with financial markets. Play equity trading games, 
            crypto basket competitions, and opinion trading to win cash prizes. The ultimate skill-based gaming platform 
            for earning real money online through market predictions and fantasy trading competitions.
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto animate-fade-up">
            <Link to="/competitions" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full" aria-label="Browse Fantasy Trading Competitions">
                Start Earning Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full" aria-label="Learn How SageCombat Works">
                How It Works
              </Button>
            </Link>
          </div>

          {/* SEO-enhanced feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
            <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Fantasy Stock Trading</h3>
              <p className="text-sm text-muted-foreground">Best equity games platform for earning real money</p>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
              <MessageSquare className="h-8 w-8 text-mint-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Opinion Trading</h3>
              <p className="text-sm text-muted-foreground">Top opinion trading platform with real cash rewards</p>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
              <Trophy className="h-8 w-8 text-gold-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Real Money Prizes</h3>
              <p className="text-sm text-muted-foreground">Skill-based gaming with guaranteed payouts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
