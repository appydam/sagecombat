import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Wallet, Info, User, Mail, Phone, Clock, PlusCircle, MinusCircle, Share2, Copy, ExternalLink, TrendingUp, Sparkles } from "lucide-react";

interface User {
  name: string;
  emailId: string;
  age: string;
  phoneNo: string;
  username: string;
  profileImage: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface ProfileSidebarProps {
  user: User;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
}

const ProfileSidebar = ({ user, onDepositClick, onWithdrawClick }: ProfileSidebarProps) => {
  const [isSharingEnabled, setIsSharingEnabled] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);

  const handleShareLink = () => {
    if (!isLinkGenerated) {
      const userId = user.username || Math.random().toString(36).substring(2, 8);
      const generatedLink = `${window.location.origin}/shared-profile/${userId}`;
      setShareLink(generatedLink);
      setIsLinkGenerated(true);
    } else {
      navigator.clipboard.writeText(shareLink);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard.",
        variant: "default",
      });
    }
  };

  const handleToggleSharing = (checked: boolean) => {
    setIsSharingEnabled(checked);
    if (checked && !isLinkGenerated) {
      const userId = user.username || Math.random().toString(36).substring(2, 8);
      const generatedLink = `${window.location.origin}/shared-profile/${userId}`;
      setShareLink(generatedLink);
      setIsLinkGenerated(true);
    }
    toast({
      title: checked ? "Profile sharing enabled" : "Profile sharing disabled",
      description: checked
        ? "Your profile is now publicly accessible via share link"
        : "Your profile is now private",
      variant: "default",
    });
  };

  return (
    <div className="relative">
      {/* Glow effect background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-2xl blur opacity-20 animate-pulse"></div>
      
      <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl shadow-black/10 p-4 sticky top-16 overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent pointer-events-none"></div>
        
        {/* Profile Section */}
        <div className="relative flex flex-col items-center mb-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <Avatar className="relative h-20 w-20 mb-2 ring-4 ring-white/50 shadow-xl">
              <AvatarImage
                src={user.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                alt="User Avatar"
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold text-lg">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {user.isActive && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1">
            {user.name}
          </h2>
          <span className="text-sm text-gray-500 font-mono bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent dark:bg-gray-800 px-2 py-0.5 rounded-full">
            @{user.username}
          </span>
          
          <div className="flex gap-2 mt-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="w-3 h-3 mr-1" />
              Pro Trader
            </Badge>
            {user.isActive && (
              <Badge variant="outline" className="border-green-500/30 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Online
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            onClick={onDepositClick}
            className="group relative overflow-hidden bg-gradient-to-l from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl h-12"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            <PlusCircle className="w-4 h-4 mr-2" />
            Deposit
          </Button>
          
          <Button
            onClick={onWithdrawClick}
            variant="outline"
            className="group relative overflow-hidden border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 bg-white/50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-700 dark:text-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl h-12"
          >
            <div className="absolute inset-0 bg-blue-500/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            <MinusCircle className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </div>

        {/* KYC/Transaction Hold Banner */}
        <div className="mt-4 p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 border border-amber-300 dark:border-amber-800 rounded-xl text-center">
            <div className="flex items-center justify-center">
                <Info className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <div className="text-xs text-amber-800 dark:text-amber-200 text-left">
                  <p className="font-semibold">Coming Soon</p>
                  <p>We're working on enabling real money features with secure KYC verification. Stay tuned! 🚀</p>
                </div>
            </div>
        </div>

        <Separator className="my-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* User Info */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Profile Information
          </div>
          
          <ModernInfoItem 
            icon={<User className="w-4 h-4" />} 
            label="Full Name" 
            value={user.name}
            gradient="from-gray-100 to-gray-200"
          />
          <ModernInfoItem 
            icon={<Mail className="w-4 h-4" />} 
            label="Email Address" 
            value={user.emailId}
            gradient="from-gray-100 to-gray-200"
          />
          <ModernInfoItem 
            icon={<Phone className="w-4 h-4" />} 
            label="Phone Number" 
            value={user.phoneNo || 'Not provided'}
            gradient="from-gray-100 to-gray-200"
          />
          <ModernInfoItem 
            icon={<Clock className="w-4 h-4" />} 
            label="Member Since" 
            value={new Date(user.createdAt).toLocaleDateString()}
            gradient="from-gray-100 to-gray-200"
          />
        </div>

        <Separator className="my-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Share Profile Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Share Profile
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                    <Info className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-gray-900 text-white border-gray-700">
                  <span className="text-xs">Make your profile publicly accessible</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${isSharingEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <Label htmlFor="sharing-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Public Sharing
              </Label>
            </div>
            <Switch
              id="sharing-toggle"
              checked={isSharingEnabled}
              onCheckedChange={handleToggleSharing}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
            />
          </div>

          {isLinkGenerated && (
            <div className="p-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[180px] font-mono">
                  {shareLink}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink);
                    toast({
                      title: "Copied!",
                      description: "Link copied to clipboard",
                      variant: "default",
                    });
                  }}
                >
                  <Copy className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleShareLink}
              disabled={!isSharingEnabled}
              className={`${
                isLinkGenerated 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
              } text-white border-0 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg`}
            >
              {isLinkGenerated ? (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
            
            {isSharingEnabled && isLinkGenerated && (
              <Button
                variant="outline"
                className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                onClick={() => window.open(shareLink, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Preview
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern info item component with gradient accents
const ModernInfoItem = ({ 
  icon, 
  label, 
  value, 
  gradient 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  gradient: string;
}) => (
  <div className="group flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
    <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} text-gray-600 dark:text-gray-400 shadow-sm group-hover:shadow-md transition-shadow`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
        {value}
      </p>
    </div>
  </div>
);

export default ProfileSidebar;