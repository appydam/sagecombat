
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form data submitted:", formData);

    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll respond shortly.",
    });

    // Clear form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "contact@sagecombat.com",
      action: "mailto:contact@sagecombat.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "+91 9971677857",
      action: "tel:+919971677857"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "in our heart :)",
      action: "https://maps.google.com/?q=Bangalore"
    },
    // {
    //   icon: <MessageSquare className="h-6 w-6" />,
    //   title: "Live Chat",
    //   description: "Available 9am-5pm EST",
    //   action: "#chat"
    // }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions or feedback? We're here to help.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((item, i) => (
                <a
                  href={item.action}
                  key={i}
                  className="no-underline"
                  target={item.action.startsWith("http") ? "_blank" : "_self"}
                  rel={item.action.startsWith("http") ? "noopener noreferrer" : ""}
                >
                  <MorphCard className="p-6 h-full text-center animate-fade-up hover:shadow-md transition-shadow" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </MorphCard>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      required
                    />
                  </div>
                  <div className="text-sm text-muted-foreground border bg-gray-100 border-gray-300 p-2 rounded-md">
                    This feature is not working right now. Send us a mail if you wanna contact us.
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                  
                </form>
              </div>

              <div className="lg:pl-8">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">How do I join a competition?</h3>
                    <p className="text-muted-foreground">
                      Visit our competitions page, select your preferred competition, and click "Join".
                      You'll be guided through the process of creating your stock basket.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">How are winners determined?</h3>
                    <p className="text-muted-foreground">
                      Winners are determined based on the performance of their selected stock baskets
                      over the competition duration. The best performing baskets top the leaderboard.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Can I change my stock selections?</h3>
                    <p className="text-muted-foreground">
                      Once a competition begins, stock selections are locked in. Make sure you're
                      confident in your choices before finalizing your entry.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">How do I withdraw my winnings?</h3>
                    <p className="text-muted-foreground">
                      Winnings are automatically credited to your account. You can withdraw them
                      to your connected bank account from your profile page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
