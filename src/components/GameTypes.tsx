
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MorphCard from "./ui/MorphCard";

const GameTypes = () => {
  const gameTypes = [
    {
      title: "Fantasy Equity Trading Games",
      description: "Best stock market games in India - Create your fantasy portfolio of 5 stocks and compete for real money prizes",
      features: [
        "Choose from 500+ NSE/BSE listed stocks",
        "Real-time market data and live tracking",
        "Highest returns win guaranteed cash prizes",
        "Join India's largest fantasy equity community"
      ],
      cta: "Start Fantasy Stock Trading",
      path: "/competitions",
      color: "from-[#C7F8DC] to-[#98BEFC]",
      seoKeywords: "fantasy stock trading, equity games, stock market games"
    },
    {
      title: "Advanced Opinion Trading",
      description: "India's premier opinion trading platform - Predict real-world events and market outcomes to earn money",
      features: [
        "Trade on live prediction markets with dynamic pricing",
        "Advanced analytics and market depth charts",
        "Higher profit potential for skilled opinion traders",
        "Professional trading tools and real-time data"
      ],
      cta: "Trade Opinion Markets",
      path: "/competitions?gameType=poly",
      color: "from-[#FFE4B5] to-[#FFA07A]",
      seoKeywords: "opinion trading, prediction markets, real money trading"
    },
    {
      title: "Real Money Opinion Games",
      description: "Earn money answering Yes/No questions on trending events - Best opinion trading app for quick earnings",
      features: [
        "Simple Yes/No predictions on real events",
        "Daily trending questions on sports, politics, markets",
        "Fast payouts for correct predictions",
        "Easiest way to earn money through opinion trading"
      ],
      cta: "Start Opinion Trading",
      path: "/competitions?gameType=opinion",
      color: "from-[#98BEFC] to-[#C7F8DC]",
      seoKeywords: "opinion trading app, earn money games, prediction games"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background element */}
      <div className="absolute -bottom-60 -right-60 w-96 h-96 bg-gold-100/20 rounded-full blur-3xl -z-10" />

      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your Real Money Gaming Format
          </h2>
          <p className="text-muted-foreground text-lg">
            Select from India's best fantasy trading games and opinion trading platforms. 
            Each format offers unique earning opportunities based on your skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gameTypes.map((game, i) => (
            <MorphCard
              key={i}
              className="flex flex-col animate-fade-up overflow-hidden"
              style={{animationDelay: `${i * 150}ms`}}
              hoverEffect
            >
              {/* Header with gradient */}
              <div className={`-mx-6 -mt-6 px-6 py-6 mb-6 bg-gradient-to-r ${game.color} text-white`}>
                <h3 className="text-2xl font-bold text-gray-700">{game.title}</h3>
                <p className="mt-2 text-gray-500">{game.description}</p>
                {/* Hidden SEO keywords */}
                <span className="sr-only">{game.seoKeywords}</span>
              </div>
              
              {/* Features */}
              <div className="flex-grow mb-6">
                <ul className="space-y-3">
                  {game.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA */}
              <div className="mt-auto">
                <Link to={game.path}>
                  <Button className="w-full rounded-md" aria-label={`Join ${game.title} competitions`}>
                    {game.cta}
                  </Button>
                </Link>
              </div>
            </MorphCard>
          ))}
        </div>

        {/* Additional SEO section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-mint-100/20 rounded-2xl p-8 text-center border border-border/50">
            <h3 className="text-2xl font-bold mb-4">
              Why SageCombat is India's Best Real Money Gaming Platform
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2 text-primary">🏆 Proven Track Record</h4>
                <p className="text-sm text-muted-foreground">
                  Over ₹50 Lakhs distributed to players through our fantasy trading games and opinion trading platforms. 
                  Join thousands earning real money through skill-based gaming.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">⚡ Instant Payouts</h4>
                <p className="text-sm text-muted-foreground">
                  Fast and secure payment processing for all winning players. Your earnings from fantasy equity games 
                  and opinion trading are transferred directly to your bank account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">📱 Best Mobile Experience</h4>
                <p className="text-sm text-muted-foreground">
                  Optimized for mobile gaming with smooth performance across all devices. The best gaming app for 
                  real money earnings in India with intuitive design and easy navigation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">🛡️ 100% Legal & Safe</h4>
                <p className="text-sm text-muted-foreground">
                  All our games are skill-based and legally compliant. Play fantasy trading games and opinion trading 
                  with complete confidence on India's most trusted real money gaming platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameTypes;
