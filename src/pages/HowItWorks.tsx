
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  LineChart, Users, Sparkles, DollarSign, 
  CheckCircle, BarChart3, BookOpen, Award, 
  ChevronRight, TrendingUp, BookOpenCheck,
  Globe, Coins, HelpCircle, MapPin, MessageSquareText,
  Shield,
  Banknote
} from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("equity");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const processSteps = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Sign Up",
      description: "Create your free account with email",
    },
    {
      icon: <LineChart className="h-8 w-8 text-indigo-500" />,
      title: "Browse Competitions",
      description: "Find daily, weekly, or thematic competitions that interest you",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-teal-500" />,
      title: "Pay Entry Fee",
      description: "Use real or virtual currency to join competitions",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-indigo-500" />,
      title: "Track Performance",
      description: "Watch how your selections perform during the competition period",
    },
    {
      icon: <Award className="h-8 w-8 text-teal-500" />,
      title: "Win Prizes",
      description: "Top performers share the prize pool based on final rankings",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Complete KYC",
      description: "Verify your identity for secure transactions and compliance",
    },
    {
      icon: <Banknote className="h-8 w-8 text-green-500" />,
      title: "Withdraw Winnings",
      description: "Cash out your earnings directly to your bank account or wallet",
    },
  ];

  const compTypes = [
    {
      id: "equity",
      icon: <LineChart className="h-6 w-6" />,
      title: "Equity Basket",
      description: "Build a portfolio of stocks and compete based on performance",
      status: "active",
      color: "from-indigo-500 to-blue-500",
      steps: [
        "Browse available equity competitions",
        "Select 5 stocks from our curated list to form your portfolio",
        "Monitor your portfolio's performance over the competition period",
        "Winners are determined by highest average returns"
      ]
    },
    {
      id: "opinion",
      icon: <MessageSquareText className="h-6 w-6" />,
      title: "Opinion Trading",
      description: "Predict yes/no outcomes for real-world events and get rewarded",
      status: "active",
      color: "from-amber-500 to-orange-500",
      steps: [
        "Browse prediction questions about finance, politics, sports, etc.",
        "Use virtual or real currency to trade YES/NO positions",
        "Trade your position as markets evolve and sentiment changes",
        "Get paid out when the event resolves and you're correct"
      ]
    },
    {
      id: "poly",
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Poly Contests",
      description: "Advanced prediction markets with customizable price points",
      status: "active",
      color: "from-amber-600 to-yellow-500",
      steps: [
        "Browse available prediction markets with various topics",
        "Place bets on YES/NO outcomes at current market rates",
        "Watch how prices change based on trader activity",
        "Earn profits when markets resolve in your favor"
      ]
    },
    {
      id: "geo",
      icon: <Globe className="h-6 w-6" />,
      title: "GeoQuest",
      description: "Test your geography knowledge in fast-paced competitions",
      status: "comingSoon",
      color: "from-teal-500 to-green-500",
      steps: [
        "Join geography-based competitions and trivia",
        "Make predictions about regional markets and economies",
        "Earn points for correct geographical identifications",
        "Climb the leaderboard by demonstrating your global knowledge"
      ]
    },
    {
      id: "crypto",
      icon: <Coins className="h-6 w-6" />,
      title: "Crypto Basket",
      description: "Create a portfolio of cryptocurrencies and compete on returns",
      status: "comingSoon",
      color: "from-purple-500 to-violet-500",
      steps: [
        "Browse crypto competitions with various timeframes",
        "Select cryptocurrencies to form your portfolio",
        "Track your portfolio's performance in a volatile market",
        "Win prizes based on your crypto market knowledge"
      ]
    },
  ];

  const faqs = [
    {
      question: "How do I join competitions?",
      answer: "Browse available competitions, pay the entry fee using real or virtual currency, and follow the specific instructions for that competition type."
    },
    {
      question: "Is real money involved?",
      answer: "SageCombat offers both real money and virtual currency competitions. You can choose which type you prefer to participate in."
    },
    {
      question: "How are winners determined?",
      answer: "Winner determination varies by competition type. In Equity Basket competitions, it's based on portfolio performance. In Opinion Trading and Poly Contests, it's based on correct predictions."
    },
    {
      question: "What is virtual currency?",
      answer: "Virtual currency is in-platform money that can be used to join competitions without risking real funds. It's great for practicing or casual play."
    },
    {
      question: "How are prizes distributed?",
      answer: "Prizes are typically distributed based on final rankings. The prize pool is divided among top performers according to the competition rules."
    },
    {
      question: "Is SageCombat a real trading platform?",
      answer: "No, SageCombat is a skill-based competition platform based on market performance. No actual stocks or assets are purchased when you participate."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="font-sans text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Master the Markets, Win the Game
              </motion.h1>
              <motion.p 
                className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                SageCombat brings competitive learning games to life through fun, skill-based competitions.
                Learn how each game works and start your journey to increase your IQ.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/competitions">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    Get Started <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-slate-600">A simple process to start competing and winning</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-16 max-w-7xl mx-auto">
  {processSteps.map((step, i) => (
    <motion.div
      key={i}
      custom={i}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
          {step.icon}
        </div>
        {i < processSteps.length - 1 && (
          <div className="hidden lg:block absolute top-8 left-[calc(100%_-_8px)] w-[calc(100%_+_32px)] h-0.5 bg-slate-200"></div>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
    </motion.div>
  ))}
</div>
          </div>
        </section>

        {/* Competition Types */}
        <section className="py-16 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Competition Types</h2>
              <p className="text-slate-600">Discover the various ways to compete and test your prediction skills</p>
            </div>

            <Tabs defaultValue="equity" className="max-w-4xl mx-auto" onValueChange={(value) => setActiveTab(value)}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                {compTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id} className="relative">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-1",
                        activeTab === type.id ? `bg-gradient-to-r ${type.color} text-white` : "bg-slate-100"
                      )}>
                        {type.icon}
                      </div>
                      <span className="text-xs">{type.title}</span>
                      {type.status === "comingSoon" && (
                        <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] px-1 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {compTypes.map((type) => (
                <TabsContent key={type.id} value={type.id}>
                  <MorphCard className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${type.color} text-white`}>
                        {type.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{type.title}</h3>
                        <p className="text-slate-600">{type.description}</p>
                      </div>
                      {type.status === "comingSoon" && (
                        <span className="ml-auto bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BookOpenCheck className="h-5 w-5 text-teal-600" />
                          How to Play
                        </h4>
                        <ol className="space-y-3 pl-6 list-decimal">
                          {type.steps.map((step, index) => (
                            <li key={index} className="text-slate-700">{step}</li>
                          ))}
                        </ol>
                      </div>

                      {type.status === "active" && (
                        <div className="flex justify-end">
                          <Link to={`/competitions?gameType=${type.id}`}>
                            <Button className={`bg-gradient-to-r ${type.color} hover:opacity-90 text-white`}>
                              Browse {type.title} Competitions
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </MorphCard>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose SageCombat</h2>
              <p className="text-slate-600">A skill-based platform designed for skill and entertainment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div 
                variants={fadeIn} 
                custom={0} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{once: true}}
                className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-xl shadow-sm border border-slate-100"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Skill-Based Competition</h3>
                <p className="text-slate-600">Success requires market knowledge, analysis, and prediction skill, not just luck.</p>
              </motion.div>

              <motion.div 
                variants={fadeIn} 
                custom={1} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{once: true}}
                className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-xl shadow-sm border border-slate-100"
              >
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real Market Data</h3>
                <p className="text-slate-600">All competitions use actual market performance data from major exchanges.</p>
              </motion.div>

              <motion.div 
                variants={fadeIn} 
                custom={2} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{once: true}}
                className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-xl shadow-sm border border-slate-100"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fair & Transparent</h3>
                <p className="text-slate-600">Clear rules and scoring based solely on market performance and objective outcomes.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Get answers to common questions about SageCombat</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-teal-500 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Put Your Skills to the Test?</h2>
              <p className="text-lg mb-8 text-white/90">
                Join thousands of users making predictions and winning prizes on SageCombat. 
                Put your market knowledge to the test!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/competitions">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90">
                    Browse Competitions
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="border-white text-black hover:bg-white/10">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
