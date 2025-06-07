
import { CheckCircle2, Clock, LineChart, ShieldCheck, BrainCircuit, Trophy } from "lucide-react";
import MorphCard from "./ui/MorphCard";

const Features = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-mint-600" />,
      title: "Mind Sport",
      description: "Test your prediction skills and strategic thinking without risking real trades"
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Real Market Data",
      description: "Compete using actual stock performance from major exchanges"
    },
    {
      icon: <Clock className="h-8 w-8 text-gold-500" />,
      title: "Daily Competitions",
      description: "New contests starting every day with flexible entry fees"
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Leaderboards & Prizes",
      description: "Track your performance and win from prize pools based on rankings"
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-mint-600" />,
      title: "Easy to Join",
      description: "Simple entry process with Google or phone number login"
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-gold-500" />,
      title: "Fair & Transparent",
      description: "All competitions follow clear rules with transparent outcomes"
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
            How SageCombat Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Compete in Competitive gaming competitions where your market knowledge and 
            prediction skills determine your success
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
      </div>
    </section>
  );
};

export default Features;
