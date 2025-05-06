import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Bitcoin, MessageSquare, Globe } from "lucide-react"; // Added Globe icon

interface GameTypeTabsProps {
  activeGameType: string;
  onGameTypeChange: (value: string) => void;
}

const GameTypeTabs = ({ activeGameType, onGameTypeChange }: GameTypeTabsProps) => {
  return (
    <Tabs value={activeGameType} onValueChange={onGameTypeChange} className="mb-8">
      {/* Adjusted max-w and grid-cols for 4 tabs */}
      <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto"> 
        <TabsTrigger value="equity" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          Equity
        </TabsTrigger>
        <TabsTrigger value="crypto" className="gap-2">
          <Bitcoin className="h-4 w-4" />
          Crypto
        </TabsTrigger>
        <TabsTrigger value="opinion" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Opinion
        </TabsTrigger>
        {/* Added Trivia Tab */}
        <TabsTrigger value="trivia" className="gap-2">
          <Globe className="h-4 w-4" /> 
          Trivia
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default GameTypeTabs;
