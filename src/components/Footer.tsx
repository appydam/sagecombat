
import { Link } from "react-router-dom";
import { BarChart3, Twitter, Instagram, Linkedin, Mail, HelpCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 font-display text-2xl font-bold mb-4">
             
              <img
              src="/logo2wbg.png"
              alt="MindStock Logo"
              className="h-24 w-auto object-contain"
            />

            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              A competitive skill-based gaming platform that lets you compete with your market
              knowledge without the risk of actual trading.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contact@sagecombat.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/competitions" className="text-muted-foreground hover:text-primary transition-colors">
                  Competitions
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
              {/* <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li> */}
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} SageCombat. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Not a real investment platform</span>
            <HelpCircle className="h-4 w-4" />
            <span>Results based on market data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
