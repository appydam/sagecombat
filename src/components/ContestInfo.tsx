import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const contests = [
  {
    name: "Equity Contest",
    image: "/equity_contest.png",
    howToPlay: [
      "Browse available equity competitions",
      "Make a basket of 5 stocks from our curated list of all NSE listed companies",
      "Monitor your portfolio's performance over the competition period",
      "Winners are determined by highest average returns of their stock basket"
    ],
    howToWin: "Compete for the highest portfolio return. Top performers win cash prizes based on their rank.",
    link: "/competitions?gameType=equity",
    imageClass: "transform scale-110 hover:scale-115 transition-transform duration-300 ease-in-out",
  },
  {
    name: "Opinion Trading",
    image: "/opinion_contest.png",
    howToPlay: [
      "Browse questions about future events.",
      'Predict the outcome by choosing "Yes" or "No".',
      "Your investment grows as more people agree with you.",
    ],
    howToWin: "Hold your position until the event resolves. If your prediction is correct, you win a share of the prize pool.",
    link: "/competitions?gameType=opinion",
    imageClass: "transform scale-75 hover:scale-80 transition-transform duration-300 ease-in-out",
  },
  {
    name: "Poly Contest",
    image: "/poly_contest.png",
    howToPlay: [
      "choose as asset to Trade on: Yes/No for an event.",
      "Here, Yes/No are tradable assets, like stocks. Prices move based on demand and volume.",
      "Hold your assets for long term until the contest ends or trade them anytime.",
      "At settlement, correct outcome wins, incorrect one lose their value.",      
    ],
    howToWin: "The shares of the correct outcome become worth the maximum value. Your profit is the value of your correct shares.",
    link: "/competitions?gameType=poly",
    imageClass: "transform scale-105 hover:scale-110 transition-transform duration-300 ease-in-out",
  },
];

const ContestInfo = () => {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">How to Play & Win</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer multiple game formats, each designed to test your market knowledge and prediction skills in a unique way.
          </p>
        </div>

        <div className="space-y-24">
          {contests.map((contest, index) => (
            <div key={contest.name} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* <div className={`relative order-2 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <div className={`bg-white/40 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/30 ${contest.imageClass || ''}`}>
                    <img src={contest.image} alt={`${contest.name} screenshot`} className="rounded-2xl w-full h-auto shadow-lg" />
                </div>
              </div> */}

              <div className={`relative order-2 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <div className={`bg-white/40 backdrop-blur-sm rounded-2xl p-1 sm:p-2 shadow-xl border border-white/30 ${contest.imageClass || ''}`}>
                    <img src={contest.image} alt={`${contest.name} screenshot`} className="rounded-md w-full h-auto" />
                </div>
              </div>

              <div className={`order-1 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                <h3 className="font-display text-3xl font-bold mb-4">{contest.name}</h3>
                
                <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-3">How to Play:</h4>
                    <ul className="space-y-2">
                        {contest.howToPlay.map((step, i) => (
                            <li key={i} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-3 mt-1" />
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-8">
                    <h4 className="font-semibold text-lg mb-3">How You Make Money:</h4>
                    <p className="text-muted-foreground">{contest.howToWin}</p>
                </div>

                <Link to={contest.link}>
                  <Button className="rounded-full px-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Explore {contest.name} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContestInfo;
