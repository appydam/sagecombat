
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MorphCard from "@/components/ui/MorphCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, TrendingUp, TrendingDown, ArrowUpRight, Info } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data structure for the shared profile
interface SharedProfileData {
  username: string;
  name: string;
  profileImage: string;
  totalPnL: number;
  contestsCount: number;
  activeContestsCount: number;
  winRate: number;
}

const SharedProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<SharedProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, this would be an API call to get shared profile data
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        
        // Mock data loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock profile data - in real app, this would come from an API
        const mockData: SharedProfileData = {
          username: userId || "trader",
          name: "Trader Profile",
          profileImage: "",
          totalPnL: 0,
          contestsCount: 0,
          activeContestsCount: 3,
          winRate: 0,
        };
        
        setProfileData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load profile data");
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16 flex items-center justify-center">
          <MorphCard className="p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Profile Not Available</h2>
            <p className="text-muted-foreground mb-6">
              This profile may be private or doesn't exist.
            </p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </MorphCard>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto mb-6 p-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">Feature Coming Soon</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Public profile sharing is currently in development. The data shown on this page is for demonstration purposes only.
              </p>
            </div>
          </div>
          <MorphCard className="max-w-3xl mx-auto p-8">
            <div className="text-center mb-8">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage
                  src={profileData.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${profileData.username}`}
                  alt="User Avatar"
                />
                <AvatarFallback>{profileData.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <h1 className="text-3xl font-bold mb-1">{profileData.name || `@${profileData.username}'s Profile`}</h1>
              <p className="text-muted-foreground">@{profileData.username}</p>
              
              <div className="flex justify-center mt-3 space-x-2">
                <Badge variant="secondary">Trader</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Public Profile</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <MorphCard className="p-5 text-center">
                <h3 className="text-sm text-muted-foreground mb-1">Total P&L</h3>
                <div className="flex items-center justify-center">
                  {profileData.totalPnL >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <span className={`text-2xl font-bold ${profileData.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ₹{Math.abs(profileData.totalPnL).toFixed(2)}
                  </span>
                </div>
              </MorphCard>
              
              <MorphCard className="p-5 text-center">
                <h3 className="text-sm text-muted-foreground mb-1">Contests Played</h3>
                <div className="flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-2xl font-bold">{profileData.contestsCount}</span>
                </div>
              </MorphCard>
              
              <MorphCard className="p-5 text-center">
                <h3 className="text-sm text-muted-foreground mb-1">Win Rate</h3>
                <div className="flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">{profileData.winRate}%</span>
                </div>
              </MorphCard>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-muted-foreground mb-5">
                Want to join {profileData.username} and start trading in stock competitions?
              </p>
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                <Link to="/register">
                  Join the Platform
                </Link>
              </Button>
            </div>
          </MorphCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SharedProfile;
