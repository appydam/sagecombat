
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  BookOpen,
  Award,
  DollarSign,
  Briefcase,
  Users,
  Shield,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  questions: {
    id: string;
    question: string;
    answer: React.ReactNode;
  }[];
}

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState<string>("general");

  const faqCategories: FAQCategory[] = [
    {
      id: "general",
      name: "General",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          id: "what-is-SageCombat",
          question: "What is SageCombat?",
          answer: (
            <div className="space-y-2">
              <p>
                SageCombat is a competitive fantasy gaming platform that lets you compete with others using your market knowledge, without risking actual money in the stock market.
              </p>
              <p>
                You can join competitions with virtual currency, build portfolios of real stocks, and win prizes based on how well your selections perform against other players.
              </p>
            </div>
          ),
        },
        {
          id: "how-to-get-started",
          question: "How do I get started?",
          answer: (
            <ol className="list-decimal pl-5 space-y-2">
              <li>Create a free account using the Register button in the top right</li>
              <li>Browse active competitions on the Competitions page</li>
              <li>Join a competition that interests you</li>
              <li>Build your portfolio according to the competition rules</li>
              <li>Track your performance on the leaderboard</li>
            </ol>
          ),
        },
        {
          id: "is-it-free",
          question: "Is SageCombat free to use?",
          answer: (
            <p>
              SageCombat offers both free and paid competitions. Free competitions allow you to practice and learn without entry fees, while paid competitions have entry fees that contribute to the prize pool. You can add funds to your account through the deposit option in your profile.
            </p>
          ),
        },
      ],
    },
    {
      id: "competitions",
      name: "Competitions",
      icon: <Award className="h-5 w-5" />,
      questions: [
        {
          id: "competition-types",
          question: "What types of competitions are available?",
          answer: (
            <div className="space-y-2">
              <p>SageCombat offers two main types of competitions:</p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Predefined Basket:</strong> Competitions with a pre-selected set of stocks from which you choose your portfolio.
                </li>
                <li>
                  <strong>Custom Basket:</strong> Competitions where you can select any stocks from the market to build your portfolio.
                </li>
              </ul>
              <p>Each competition may have different durations, entry fees, and prize structures.</p>
            </div>
          ),
        },
        {
          id: "how-winners-determined",
          question: "How are winners determined?",
          answer: (
            <p>
              Winners are determined based on the total return percentage of their portfolio at the end of the competition period. The returns are calculated using real market data. The higher your return percentage, the higher your ranking on the leaderboard.
            </p>
          ),
        },
        {
          id: "claiming-prizes",
          question: "How do I claim my prizes?",
          answer: (
            <p>
              When you win a competition, your prize money is automatically credited to your SageCombat account balance. You can view your winnings in your profile page and withdraw them to your linked bank account using the withdrawal option.
            </p>
          ),
        },
      ],
    },
    {
      id: "portfolio",
      name: "Portfolio Management",
      icon: <Briefcase className="h-5 w-5" />,
      questions: [
        {
          id: "how-to-build-portfolio",
          question: "How do I build my portfolio?",
          answer: (
            <div className="space-y-2">
              <p>
                After joining a competition, you'll be taken to the portfolio building screen where you can:
              </p>
              <ul className="list-disc pl-5">
                <li>Select stocks from the available options (Predefined Basket) or search for stocks (Custom Basket)</li>
                <li>Allocate your virtual funds across different stocks</li>
                <li>Review your selections and submit your final portfolio</li>
              </ul>
              <p>
                Once the competition starts, your portfolio will be locked and tracked based on real market performance.
              </p>
            </div>
          ),
        },
        {
          id: "can-i-modify-portfolio",
          question: "Can I modify my portfolio after submission?",
          answer: (
            <p>
              In most competitions, once you submit your portfolio, it cannot be modified for the duration of the competition. However, some special competitions may allow portfolio rebalancing at specified intervals. The competition details will clearly state whether modifications are allowed.
            </p>
          ),
        },
      ],
    },
    {
      id: "account",
      name: "Account & Payments",
      icon: <DollarSign className="h-5 w-5" />,
      questions: [
        {
          id: "deposit-withdraw",
          question: "How do I deposit or withdraw money?",
          answer: (
            <div className="space-y-2">
              <p>
                To deposit money:
              </p>
              <ol className="list-decimal pl-5">
                <li>Go to your Profile page</li>
                <li>Click on the "Deposit" button</li>
                <li>Select your payment method and follow the instructions</li>
              </ol>
              <p>
                To withdraw money:
              </p>
              <ol className="list-decimal pl-5">
                <li>Go to your Profile page</li>
                <li>Click on the "Withdraw" button</li>
                <li>Enter the amount and your bank details</li>
                <li>Withdrawals typically process within 1-3 business days</li>
              </ol>
            </div>
          ),
        },
        {
          id: "account-security",
          question: "How is my account secured?",
          answer: (
            <p>
              SageCombat employs industry-standard security measures including encrypted password storage, secure payment processing, and regular security audits. We recommend enabling two-factor authentication for additional security. For more information, please review our <Link to="/privacy" className="underline text-primary">Privacy Policy</Link>.
            </p>
          ),
        },
      ],
    },
    {
      id: "community",
      name: "Community",
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          id: "leaderboards",
          question: "How do leaderboards work?",
          answer: (
            <p>
              Leaderboards display rankings for both individual competitions and overall platform performance. Competition leaderboards show participants ranked by their portfolio returns. The global leaderboard tracks users' overall performance across all competitions, considering factors like win rate, average returns, and total winnings.
            </p>
          ),
        },
        {
          id: "social-features",
          question: "Are there social features on SageCombat?",
          answer: (
            <p>
              SageCombat lets you follow other traders, share your portfolio performance, and participate in discussion forums. You can also create private competitions to compete with friends or colleagues.
            </p>
          ),
        },
      ],
    },
    {
      id: "policies",
      name: "Policies",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          id: "terms-of-service",
          question: "Where can I find the Terms of Service?",
          answer: (
            <p>
              Our complete Terms of Service is available on the <Link to="/terms" className="underline text-primary">Terms of Service</Link> page. It details your rights and responsibilities as a SageCombat user.
            </p>
          ),
        },
        {
          id: "privacy-policy",
          question: "How is my data handled?",
          answer: (
            <p>
              SageCombat respects your privacy. Our <Link to="/privacy" className="underline text-primary">Privacy Policy</Link> explains how we collect, use, and protect your personal information.
            </p>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl font-bold mb-4">Help Center</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Find answers to your questions about SageCombat, competitions, and more.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {faqCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className="flex items-center justify-start h-auto py-3"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="mr-2">{category.icon}</div>
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>

            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                {faqCategories.find(cat => cat.id === activeCategory)?.name} FAQ
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {faqCategories
                  .find(cat => cat.id === activeCategory)
                  ?.questions.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>

            <div className="mt-12 bg-secondary/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
              <p className="mb-4">
                Our support team is available to help you with any questions or concerns.
              </p>
              <Link to="/contact">
                <Button>Contact Support</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
