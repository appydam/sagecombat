
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  LineChart, 
  Target, 
  BookOpen, 
  Linkedin,
  TrendingUp,
  Trophy,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Play
} from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";

const AboutUs = () => {
  const platformFeatures = [
    {
      icon: LineChart,
      title: "Diverse Competitions",
      description: "From equity baskets to opinion trading, explore multiple ways to test your market knowledge."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Tracking",
      description: "Follow your performance with live updates and detailed analytics across all competitions."
    },
    {
      icon: Trophy,
      title: "Dynamic Leaderboards",
      description: "Compete with traders worldwide and climb the ranks in our global leaderboard system."
    },
    {
      icon: Shield,
      title: "Risk-Free Environment",
      description: "Practice and learn without financial risk using our virtual currency system."
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get immediate results and insights to improve your trading strategies."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with traders from around the world and share strategies and insights."
    }
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Co-Founder & CEO",
      bio: "Former quantitative analyst with 8+ years in fintech, passionate about democratizing financial education through gamification.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Sarah Rodriguez",
      role: "Co-Founder & CTO",
      bio: "Full-stack engineer and former senior developer at major tech companies, specializing in scalable platform architecture.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e22d5c?w=150&h=150&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Michael Thompson",
      role: "Head of Product",
      bio: "Product strategist with expertise in user experience design and behavioral psychology in trading platforms.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Emma Watson",
      role: "Head of Marketing",
      bio: "Digital marketing expert focused on community building and user engagement in the fintech space.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      linkedin: "#"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6 mx-auto relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 animate-fade-up">
                <Play className="w-4 h-4 mr-2" />
                Welcome to the Future of Market Gaming
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent animate-fade-up" style={{ animationDelay: "100ms" }}>
                Welcome to
                <span className="block text-primary">SageCombat</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
                Where strategy meets victory. Test your market instincts in our 
                <span className="font-semibold text-primary"> risk-free fantasy gaming platform</span> and compete with traders worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "300ms" }}>
                <Link to="/competitions">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    Explore Competitions
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-8 py-4 text-lg rounded-full transition-all duration-300">
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                SageCombat empowers users to test their market instincts in a fun, risk-free fantasy gaming platform. 
                We believe that everyone should have the opportunity to learn about markets and trading through 
                engaging, competitive experiences that build real skills without real financial risk.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Platform Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the tools and experiences that make SageCombat the premier destination for market gaming.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <MorphCard 
                  key={index}
                  className="p-8 bg-white hover:bg-blue-50 transition-all duration-300 group cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-4 text-gray-900 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </MorphCard>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate experts building the future of market gaming and financial education.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="group animate-fade-up hover:shadow-lg transition-all duration-300 bg-gray-50 rounded-xl overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden h-64">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent z-10"></div>
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {member.bio}
                    </p>
                    <a 
                      href={member.linkedin}
                      className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-10">
                Our Values
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <Target className="w-12 h-12 text-blue-300 mb-6 mx-auto" />
                  <h3 className="text-xl font-semibold mb-3">Education First</h3>
                  <p className="text-blue-100">
                    We believe learning about markets should be accessible, engaging, and risk-free for everyone.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <Users className="w-12 h-12 text-blue-300 mb-6 mx-auto" />
                  <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                  <p className="text-blue-100">
                    Our platform grows through collaboration, shared knowledge, and friendly competition.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <Shield className="w-12 h-12 text-blue-300 mb-6 mx-auto" />
                  <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
                  <p className="text-blue-100">
                    We maintain clear rules, fair play, and honest communication in everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Ready to Test Your Market Skills?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Join thousands of traders on SageCombat today and start your journey to market mastery.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
                  Create Your Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
