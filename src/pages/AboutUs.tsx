
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Users, LineChart, Target, BookOpen, Linkedin } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";

const AboutUs = () => {
  const teamMembers = [
    // {
    //   name: "Arpit Dhamija",
    //   role: "Co-Founder",
    //   bio: "A seasoned developer with experience at Amazon and Adobe, Arpit drives Mind Stock Gaming’s technical vision. He’s built scalable systems and led innovative projects, bringing expertise in full-stack development and a passion for gamified solutions.",
    //   linkedin: "https://www.linkedin.com/in/arpitdhamija/",
    //   image: "https://media.licdn.com/dms/image/v2/D5603AQFrqHpmzYsqog/profile-displayphoto-shrink_800_800/B56ZOrwvNbGwAc-/0/1733753501751?e=1748476800&v=beta&t=_dMupVou19iQEbsLVgUPV5xZn-t97GnYGEkXk7uYj4M"
    // },
    // {
    //   name: "Yuvraj Gosain",
    //   role: "Co-Founder",
    //   bio: "Yuvraj fuels our user acquisition and market strategy. With a knack for understanding Gen Z trends and a background in dynamic problem-solving, he’s shaping Mind Stock Gaming into a viral, community-driven platform.",
    //   linkedin: "https://www.linkedin.com/in/yuvraj-gosain-797a50243/",
    //   image: "https://media.licdn.com/dms/image/v2/D4D03AQEvuxBJgC9pAw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696998173860?e=1748476800&v=beta&t=pvUIrKwxJ6mXXZSwENUOu4Fn0wYy0-c4ECG_XdAEaXE"
    // }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                About SageCombat
              </h1>
              <p className="text-lg text-muted-foreground">
                Combining market knowledge and prediction skills in a competitive platform
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  SageCombat was founded on the belief that stock prediction is both an art and a science.
                  Our mission is to create a platform where financial enthusiasts can test their market
                  intuition and analytical skills without the risk of actual trading losses.
                </p>
                <p className="text-muted-foreground">
                  We aim to democratize access to market prediction competitions, providing
                  both educational value and entertainment through our innovative approach to
                  fantasy gaming.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MorphCard className="p-6 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-medium text-lg mb-2">Focus on Skill</h3>
                  <p className="text-sm text-muted-foreground">Rewarding market knowledge and prediction accuracy</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "200ms" }}>
                  <Users className="h-12 w-12 text-gold-500 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">Building a network of market enthusiasts</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "300ms" }}>
                  <BookOpen className="h-12 w-12 text-mint-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Educational</h3>
                  <p className="text-sm text-muted-foreground">Learning through competition and analysis</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "400ms" }}>
                  <LineChart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-medium text-lg mb-2">Data-Driven</h3>
                  <p className="text-sm text-muted-foreground">Using real market data for competitions</p>
                </MorphCard>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6 mx-auto">
            {/* <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Meet Our Team
            </h2> */}
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {teamMembers.map((member, i) => (
                <MorphCard
                  key={i}
                  className="p-8 bg-background shadow-lg rounded-lg animate-fade-up hover:shadow-xl transition-shadow duration-300"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <img
                    src={member.image}
                    alt={`${member.name} profile`}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="font-medium text-xl text-center mb-2 text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold text-center mb-4">{member.role}</p>
                  {/* <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">{member.bio}</p> */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center"
                  >
                    <Linkedin className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
                  </a>
                </MorphCard>
              ))}
            </div>
            </>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold mb-6">Our Company</h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2023, SageCombat has quickly grown to become a leading platform for fantasy
                stock trading competitions. We are headquartered in New York City with a distributed team
                of financial experts and developers around the world.
              </p>
              <p className="text-muted-foreground mb-8">
                As we continue to grow, we remain committed to our core values of transparency, fair competition,
                and educational enrichment. We believe that by creating engaging competitions, we can help
                more people develop their market analysis skills and financial literacy.
              </p>
              <Link to="/contact" className="text-primary font-medium hover:underline">
                Get in touch with us →
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
