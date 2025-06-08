
import { CheckCircle2, Clock, LineChart, ShieldCheck, BrainCircuit, Trophy } from "lucide-react";
import MorphCard from "./ui/MorphCard";

const Features = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-mint-600" />,
      title: "Best Fantasy Gaming Platform",
      description: "India's #1 skill-based gaming app where market knowledge earns real money without trading risks"
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Real Market Data Games",
      description: "Fantasy equity games using live stock data from NSE, BSE and crypto exchanges for authentic gaming"
    },
    {
      icon: <Clock className="h-8 w-8 text-gold-500" />,
      title: "Daily Real Money Contests",
      description: "Multiple earning opportunities daily with fantasy trading competitions and opinion trading markets"
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Guaranteed Prize Money",
      description: "Transparent leaderboards with confirmed cash payouts - best real money gaming app in India"
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-mint-600" />,
      title: "Easy Registration",
      description: "Quick signup to start earning money through games - join thousands on India's top gaming platform"
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-gold-500" />,
      title: "100% Legal & Safe",
      description: "RNG certified skill-based games with secure payments - trusted real money gaming platform"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-mint-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/30 to-transparent -z-10" />

      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why SageCombat is the Best Real Money Gaming Platform
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience India's premier fantasy trading platform combining stock market games, 
            crypto competitions, and opinion trading for maximum earning potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <MorphCard
              key={i}
              className="animate-fade-up"
              style={{animationDelay: `${i * 100}ms`}}
              hoverEffect
            >
              <div className="rounded-full p-3 bg-secondary inline-flex mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </MorphCard>
          ))}
        </div>

        {/* Additional SEO content */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-gradient-to-r from-mint-50 to-gold-50 rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold mb-4">
              Start Your Journey in Fantasy Trading Games Today
            </h3>
            <p className="text-muted-foreground mb-6">
              Join over 100,000+ players earning real money through skill-based fantasy trading. 
              Whether you're interested in stock market games, crypto trading competitions, or 
              opinion trading markets, SageCombat offers the best gaming experience with 
              guaranteed real money prizes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 rounded-lg p-4">
                <strong>₹50L+</strong><br />
                Prize Money Distributed
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <strong>100K+</strong><br />
                Active Players
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <strong>4.8★</strong><br />
                User Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
