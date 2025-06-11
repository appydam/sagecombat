import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompetitionListDisplay from "@/components/competitions/CompetitionListDisplay";
import GameTypeTabs from "@/components/competitions/GameTypeTabs";
import EquityCompetitionTabs from "@/components/competitions/EquityCompetitionTabs";
import OpinionEventTabs from "@/components/competitions/OpinionEventTabs";
import PolyContestTabs from "@/components/competitions/PolyContestTabs";
import GeoQuestTabs from "@/components/competitions/GeoQuestTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CompetitionProps, OpinionEvent, PolyContest } from "@/types/competitions";
import { fetchCompetitionsData } from "@/services/competitionsService";
import { fetchOpinionEvents } from "@/services/competitionsService";
import { getPolyContests } from "@/services/polyContestsService";
import { getGeoQuestContests, GeoQuestContest } from "@/services/geoQuestService";
import { toast } from "sonner";

const Competitions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeGameType = searchParams.get("gameType") || "equity";
  const activeEquityTab = searchParams.get("equityTab") || "all";
  const activeOpinionTab = searchParams.get("opinionTab") || "all";
  const activePolyTab = searchParams.get("polyTab") || "all";
  const activeGeoQuestTab = searchParams.get("geoQuestTab") || "all";
  const searchQuery = searchParams.get("search") || "";

  const [competitions, setCompetitions] = useState<CompetitionProps[]>([]);
  const [opinionEvents, setOpinionEvents] = useState<OpinionEvent[]>([]);
  const [polyContests, setPolyContests] = useState<PolyContest[]>([]);
  const [geoQuestContests, setGeoQuestContests] = useState<GeoQuestContest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>(searchQuery);
  const [opinionCategories, setOpinionCategories] = useState<string[]>([]);
  const [polyCategories, setPolyCategories] = useState<string[]>([]);
  const [geoQuestCategories, setGeoQuestCategories] = useState<string[]>([]);

  const updateSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const handleGameTypeChange = (value: string) => {
    updateSearchParams({ gameType: value });
    setIsLoading(true);
  };

  const handleEquityTabChange = (value: string) => {
    updateSearchParams({ equityTab: value });
  };

  const handleOpinionTabChange = (value: string) => {
    updateSearchParams({ opinionTab: value });
  };

  const handlePolyTabChange = (value: string) => {
    updateSearchParams({ polyTab: value });
  };

  const handleGeoQuestTabChange = (value: string) => {
    updateSearchParams({ geoQuestTab: value });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams({ search });
  };

  useEffect(() => {
    const fetchCompetitionData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (activeGameType === "equity") {
          const { equityCompetitions, error } = await fetchCompetitionsData();
          if (error) {
            throw new Error(error);
          }
          setCompetitions(equityCompetitions || []);
        } else if (activeGameType === "opinion") {
          const { data, categories, error } = await fetchOpinionEvents();
          if (error) {
            throw new Error(error);
          }
          setOpinionEvents(data || []);
          if (categories) {
            setOpinionCategories(categories);
          }
        } else if (activeGameType === "poly") {
          const { data, categories, error } = await getPolyContests();
          if (error) {
            throw new Error(error);
          }
          setPolyContests(data || []);
          if (categories) {
            setPolyCategories(categories);
          }
        } else if (activeGameType === "geoquest") {
          const { data, error } = await getGeoQuestContests();
          if (error) {
            throw new Error(error);
          }
          
          if (data && data.length > 0) {
            const themes = [...new Set(data.map((contest: GeoQuestContest) => contest.theme))];
            setGeoQuestCategories(themes.filter((theme): theme is string => typeof theme === 'string'));
            setGeoQuestContests(data);
          } else {
            setGeoQuestContests([]);
            setGeoQuestCategories([]);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(`Failed to load ${activeGameType} competitions. ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetitionData();
  }, [activeGameType]);

  const getFilteredCompetitions = () => {
    let filtered = [...competitions];

    if (activeEquityTab !== "all") {
      filtered = filtered.filter(comp => comp.type === activeEquityTab);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comp =>
        comp.name.toLowerCase().includes(query) ||
        comp.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getFilteredOpinionEvents = () => {
    let filtered = [...opinionEvents];

    if (activeOpinionTab === "active") {
      filtered = filtered.filter(event => event.status === "active");
    } else if (activeOpinionTab === "resolved") {
      filtered = filtered.filter(event => event.status === "resolved");
    } else if (activeOpinionTab !== "all" && opinionCategories.includes(activeOpinionTab)) {
      filtered = filtered.filter(event => event.category.toLowerCase() === activeOpinionTab.toLowerCase());
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.question.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getFilteredPolyContests = () => {
    let filtered = [...polyContests];

    if (activePolyTab === "active") {
      filtered = filtered.filter(contest => contest.status === "active");
    } else if (activePolyTab === "resolved" || activePolyTab === "completed") {
      filtered = filtered.filter(contest => 
        contest.status === "resolved" || contest.status === "cancelled"
      );
    } else if (activePolyTab !== "all" && polyCategories.includes(activePolyTab)) {
      filtered = filtered.filter(contest => contest.category.toLowerCase() === activePolyTab.toLowerCase());
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contest =>
        contest.title.toLowerCase().includes(query) ||
        contest.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getFilteredGeoQuestContests = () => {
    let filtered = [...geoQuestContests];

    if (activeGeoQuestTab === "active") {
      filtered = filtered.filter(contest => contest.status === "active");
    } else if (activeGeoQuestTab === "upcoming") {
      filtered = filtered.filter(contest => contest.status === "upcoming");
    } else if (activeGeoQuestTab === "completed") {
      filtered = filtered.filter(contest => contest.status === "completed");
    } else if (activeGeoQuestTab !== "all" && geoQuestCategories.includes(activeGeoQuestTab)) {
      filtered = filtered.filter(contest => contest.theme.toLowerCase() === activeGeoQuestTab.toLowerCase());
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contest =>
        contest.title.toLowerCase().includes(query) ||
        contest.theme.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const handleOpinionAnswerSubmitted = () => {
    toast.success("Answer submitted successfully!");
  };

  const handlePolyBetPlaced = () => {
    toast.success("Bet placed successfully!");
  };

  const handleGeoQuestJoined = () => {
    getGeoQuestContests().then(({ data }) => {
      if (data) {
        setGeoQuestContests(data);
      }
    });
  };

  const filteredCompetitions = getFilteredCompetitions();
  const filteredEvents = getFilteredOpinionEvents();
  const filteredPolyContests = getFilteredPolyContests();
  const filteredGeoQuests = getFilteredGeoQuestContests();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Competitions</h1>
              <p className="text-muted-foreground">
                Join competitions, test your skills, and win prizes!
              </p>
            </div>

            <form onSubmit={handleSearchSubmit} className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search competitions..."
                  className="w-full md:w-[250px] pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" variant="outline" size="sm" className="absolute right-1 top-1 h-7">
                  Search
                </Button>
              </div>
            </form>
          </div>

          <GameTypeTabs
            activeGameType={activeGameType}
            onGameTypeChange={handleGameTypeChange}
          />

          {activeGameType === "equity" && (
            <EquityCompetitionTabs
              activeTab={activeEquityTab}
              onTabChange={handleEquityTabChange}
            />
          )}

          {activeGameType === "opinion" && (
            <OpinionEventTabs
              activeOpinionTab={activeOpinionTab}
              onOpinionTabChange={handleOpinionTabChange}
              categories={opinionCategories}
            />
          )}

          {activeGameType === "poly" && (
            <PolyContestTabs
              activePolyTab={activePolyTab}
              onPolyTabChange={handlePolyTabChange}
              categories={polyCategories}
            />
          )}

          {activeGameType === "geoquest" && (
            <GeoQuestTabs
              activeGeoQuestTab={activeGeoQuestTab}
              onGeoQuestTabChange={handleGeoQuestTabChange}
              categories={geoQuestCategories}
            />
          )}

          {activeGameType === "geoquest" && (
            <div className="bg-gradient-to-r from-violet-200 to-pink-200 text-gray-800 text-center p-4 my-6 rounded-lg shadow-lg">
              <p className="text-2xl font-bold tracking-wider">Coming Soon!</p>
              <p className="text-sm mt-1">We're preparing new and exciting GeoQuest challenges for you. Stay tuned!</p>
              <p className="text-sm mt-1">Development is under progress</p>
            </div>
          )}

          <CompetitionListDisplay
            activeGameType={activeGameType}
            filteredCompetitions={filteredCompetitions}
            filteredEvents={filteredEvents}
            filteredPolyContests={filteredPolyContests}
            filteredGeoQuests={filteredGeoQuests}
            isLoading={isLoading}
            error={error}
            onOpinionAnswerSubmitted={handleOpinionAnswerSubmitted}
            onPolyBetPlaced={handlePolyBetPlaced}
            onGeoQuestJoined={handleGeoQuestJoined}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Competitions;
