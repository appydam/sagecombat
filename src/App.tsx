
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Competitions from "./pages/Competitions";
import Leaderboard from "./pages/Leaderboard";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import CustomBasketGame from "./pages/CustomBasketGame";
import PredefinedBasketGame from "./pages/PredefinedBasketGame";
import CryptoBasketGame from "./pages/CryptoBasketGame";
import OpinionTradingGame from "./pages/OpinionTradingGame";
import PolyContestDetail from "./pages/PolyContestDetail";
import CompetitionConfirmation from "./pages/CompetitionConfirmation";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ContestLeaderboard from "./pages/ContestLeaderboard";
import HelpCenter from "./pages/HelpCenter";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SharedProfile from "./pages/SharedProfile";
import GeoQuest from "./pages/GeoQuest";
import GeoQuestLeaderboard from "./pages/GeoQuestLeaderboard";
import MarketNewsPage from "./pages/MarketNewsPage";
import StreakMilestones from "./pages/StreakMilestones";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/competitions/poly/:id" element={<PolyContestDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/custom-basket" element={<CustomBasketGame />} />
          <Route path="/predefined-basket" element={<PredefinedBasketGame />} />
          <Route path="/crypto-basket" element={<CryptoBasketGame />} />
          <Route path="/opinion-trading" element={<OpinionTradingGame />} />
          <Route path="/competition-confirmation" element={<CompetitionConfirmation />} />
          <Route path="/leaderboard/contest/:contestId" element={<ContestLeaderboard />} />
          <Route path="/streak-milestones" element={<StreakMilestones />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/contest-leaderboard/:contestId" element={<ContestLeaderboard />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/shared-profile/:userId" element={<SharedProfile />} />
          {/* New GeoQuest routes */}
          <Route path="/geoquest/:contestId" element={<GeoQuest />} />
          <Route path="/geoquest/:contestId/leaderboard" element={<GeoQuestLeaderboard />} />
          <Route path="/market-news" element={<MarketNewsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
