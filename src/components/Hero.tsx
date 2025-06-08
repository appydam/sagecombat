
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
                The Mind Sport of Stock Trading
              </span>
            </div>

            {/* Paper Trading App Div with Animated Gradient */}
            <a
              href="https://mindstockpapertrading.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center px-4 py-1.5 rounded-full border border-border transition-colors cursor-pointer animate-fade-in shadow-sm overflow-hidden bg-gradient"
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

          {/* Main headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up">
            Win at the Markets with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-mint-600">
              Strategy & Skill
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up">
            Join fantasy competitions where smart predictions earn real rewards.
            No actual trading required — just your market insights and strategy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto animate-fade-up">
            <Link to="/competitions" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full">
                Browse Competitions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full">
                How It Works
              </Button>
            </Link>
          </div>

          {/* Game Type cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <Link to="/custom-basket">
              <MorphCard
                className="h-full animate-fade-up hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `100ms` }}
                highlightBorder={true}
              >
                <div className="flex flex-col items-center text-center p-3">
                  <div className="rounded-full p-3 bg-primary/10 mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Equity Basket</h3>
                  <p className="text-muted-foreground text-sm">Create custom stock portfolios and compete based on performance</p>
                </div>
              </MorphCard>
            </Link>
            
            <Link to="/crypto-basket">
              <MorphCard
                className="h-full animate-fade-up hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `200ms` }}
              >
                <div className="flex flex-col items-center text-center p-3">
                  <div className="rounded-full p-3 bg-gold-500/10 mb-4">
                    <Bitcoin className="h-6 w-6 text-gold-500" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Crypto Basket</h3>
                  <p className="text-muted-foreground text-sm">Build crypto portfolios and compete in the digital asset market</p>
                </div>
              </MorphCard>
            </Link>
            
            <Link to="/opinion-trading">
              <MorphCard
                className="h-full animate-fade-up hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `300ms` }}
              >
                <div className="flex flex-col items-center text-center p-3">
                  <div className="rounded-full p-3 bg-mint-600/10 mb-4">
                    <MessageSquare className="h-6 w-6 text-mint-600" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Opinion Trading</h3>
                  <p className="text-muted-foreground text-sm">Predict real-world events with yes/no answers and win rewards</p>
                </div>
              </MorphCard>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
