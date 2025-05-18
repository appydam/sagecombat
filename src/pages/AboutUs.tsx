
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, 
  Users, 
  LineChart, 
  Target, 
  BookOpen, 
  Linkedin, 
  Award, 
  Globe, 
  CoinsIcon,
  ArrowRight, 
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MorphCard from "@/components/ui/MorphCard";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Arpit Dhamija",
      role: "Co-Founder",
      bio: "A seasoned developer with experience at Amazon and Adobe, Arpit drives Mind Stock Gaming's technical vision. He's built scalable systems and led innovative projects, bringing expertise in full-stack development and a passion for gamified solutions.",
      linkedin: "https://www.linkedin.com/in/arpitdhamija/",
      image: "https://media.licdn.com/dms/image/v2/D5603AQFrqHpmzYsqog/profile-displayphoto-shrink_800_800/B56ZOrwvNbGwAc-/0/1733753501751?e=1748476800&v=beta&t=_dMupVou19iQEbsLVgUPV5xZn-t97GnYGEkXk7uYj4M"
    },
    {
      name: "Yuvraj Gosain",
      role: "Co-Founder",
      bio: "Yuvraj fuels our user acquisition and market strategy. With a knack for understanding Gen Z trends and a background in dynamic problem-solving, he's shaping Mind Stock Gaming into a viral, community-driven platform.",
      linkedin: "https://www.linkedin.com/in/yuvraj-gosain-797a50243/",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEvuxBJgC9pAw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696998173860?e=1748476800&v=beta&t=pvUIrKwxJ6mXXZSwENUOu4Fn0wYy0-c4ECG_XdAEaXE"
    }
  ];

  const features = [
    {
      icon: <TrendingUp className="h-10 w-10 text-green-500" />,
      title: "Equity Basket",
      description: "Select stock portfolios and compete based on real market performance",
      color: "from-green-500/20 to-green-400/5"
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-blue-500" />,
      title: "Opinion Trading",
      description: "Predict yes/no outcomes for real-world events and earn rewards",
      color: "from-blue-500/20 to-blue-400/5"
    },
    {
      icon: <Globe className="h-10 w-10 text-purple-500" />,
      title: "Poly Contests",
      description: "Multi-outcome predictions with dynamic market pricing",
      color: "from-purple-500/20 to-purple-400/5"
    },
    {
      icon: <Globe className="h-10 w-10 text-orange-500" />,
      title: "GeoQuest",
      description: "Geography-based market prediction competitions",
      color: "from-orange-500/20 to-orange-400/5",
      comingSoon: true
    },
    {
      icon: <CoinsIcon className="h-10 w-10 text-amber-500" />,
      title: "Crypto Basket",
      description: "Build and compete with cryptocurrency portfolios",
      color: "from-amber-500/20 to-amber-400/5",
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-50 to-indigo-50"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-b from-primary to-primary/80 bg-clip-text text-transparent">
                About SageCombat
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed">
                Where Strategy Meets Victory
              </p>
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/competitions">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-800">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                SageCombat empowers users to test their market instincts in a fun, risk-free fantasy gaming platform. 
                We combine the excitement of gaming with real market data to create an engaging learning experience 
                without the financial risks of actual trading.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-slate-800">
              Our Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="relative group animate-fade-up hover:scale-[1.03] transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} -z-10`}></div>
                  <MorphCard className="h-full p-8 flex flex-col items-center text-center bg-white/80 backdrop-blur-sm border-0">
                    {feature.comingSoon && (
                      <span className="absolute top-4 right-4 py-1 px-3 bg-slate-200 text-slate-700 rounded-full text-xs font-medium">
                        Coming Soon
                      </span>
                    )}
                    <div className="mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </MorphCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-800">
                  Our Values
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  SageCombat was founded on the belief that stock prediction is both an art and a science.
                  We aim to democratize access to market prediction competitions, providing
                  both educational value and entertainment through our innovative approach to
                  fantasy gaming.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Target className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Focus on skill-based competitions</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Building a community of market enthusiasts</span>
                  </li>
                  <li className="flex items-start">
                    <BookOpen className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Educational approach to financial markets</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 animate-fade-up">
                <MorphCard className="p-6 flex flex-col items-center text-center h-full bg-gradient-to-br from-slate-50 to-white">
                  <Award className="h-10 w-10 text-amber-500 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Excellence</h3>
                  <p className="text-sm text-slate-600">Striving for the highest quality in everything we do</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center h-full bg-gradient-to-br from-slate-50 to-white">
                  <Target className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium text-lg mb-2">Focus on Skill</h3>
                  <p className="text-sm text-slate-600">Rewarding market knowledge and prediction accuracy</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center h-full bg-gradient-to-br from-slate-50 to-white">
                  <Users className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Community</h3>
                  <p className="text-sm text-slate-600">Building a network of market enthusiasts</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center h-full bg-gradient-to-br from-slate-50 to-white">
                  <LineChart className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Data-Driven</h3>
                  <p className="text-sm text-slate-600">Using real market data for competitions</p>
                </MorphCard>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-slate-800">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="animate-fade-up hover:scale-[1.03] transition-all duration-300"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <MorphCard
                    className="p-8 bg-white shadow-sm rounded-2xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white shadow-md">
                        <img
                          src={member.image}
                          alt={`${member.name} profile`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="font-medium text-xl text-center mb-2 text-slate-800">{member.name}</h3>
                    <p className="text-sm text-primary font-semibold text-center mb-4">{member.role}</p>
                    <p className="text-sm text-slate-600 text-center leading-relaxed mb-4 line-clamp-4">{member.bio}</p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center"
                    >
                      <Linkedin className="h-5 w-5 text-primary hover:text-primary/80 transition-colors" />
                    </a>
                  </MorphCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-800">Our Company</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Founded in 2023, SageCombat has quickly grown to become a leading platform for fantasy
                stock trading competitions. We are headquartered in New York City with a distributed team
                of financial experts and developers around the world.
              </p>
              <p className="text-slate-600 mb-10 leading-relaxed">
                As we continue to grow, we remain committed to our core values of transparency, fair competition,
                and educational enrichment. We believe that by creating engaging competitions, we can help
                more people develop their market analysis skills and financial literacy.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                asChild
              >
                <Link to="/contact">
                  Get in touch with us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-slate-800">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <MorphCard className="p-6">
                <h3 className="font-semibold text-lg mb-2">What is SageCombat?</h3>
                <p className="text-slate-600">
                  SageCombat is a fantasy platform where users can test their market prediction skills without the risk of real trading. We offer various competition types from equity baskets to opinion trading.
                </p>
              </MorphCard>
              
              <MorphCard className="p-6">
                <h3 className="font-semibold text-lg mb-2">How do I get started?</h3>
                <p className="text-slate-600">
                  Simply create an account, browse available competitions, and use either real or virtual currency to join. Once in a competition, make your predictions and track your performance on leaderboards.
                </p>
              </MorphCard>
              
              <MorphCard className="p-6">
                <h3 className="font-semibold text-lg mb-2">What is virtual currency?</h3>
                <p className="text-slate-600">
                  Virtual currency allows you to participate in competitions without spending real money. It's a risk-free way to test strategies and learn about market dynamics.
                </p>
              </MorphCard>
              
              <MorphCard className="p-6">
                <h3 className="font-semibold text-lg mb-2">How are winners determined?</h3>
                <p className="text-slate-600">
                  Winners are determined based on competition-specific rules. For equity competitions, the highest portfolio value wins. For opinion trading, correct predictions earn points or rewards.
                </p>
              </MorphCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Test Your Market Instincts?
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Join thousands of users who are already mastering the markets with SageCombat.
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-full px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/competitions">
                  Explore Competitions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
