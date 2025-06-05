import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceHistoryPoint, PolyContest } from '@/types/competitions';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Sparkles } from 'lucide-react';

interface AISummaryViewProps {
  contest: PolyContest | null;
  priceHistory: PriceHistoryPoint[];
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.0-flash-lite"; // Or your specific "Gemini 2.0 Flash-Lite" model ID

const fetchGeminiSummary = async (contestName: string, contestDescription: string, priceData: PriceHistoryPoint[]): Promise<string> => {
  if (!API_KEY) {
    console.error("Gemini API Key not found. Please set VITE_GEMINI_API_KEY environment variable.");
    return "AI Summary is unavailable: API Key not configured.";
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `
    Analyze the following contest and its recent price activity to provide a concise summary (2-3 sentences) 
    highlighting key insights or potential trends. 
    Focus on the interplay between the contest's subject matter and its price movements.

    Contest Name: ${contestName}
    Contest Description: ${contestDescription}
    
    Recent Price Data (last 10 points):
    ${priceData.slice(-10).map(p => `Timestamp: ${new Date(p.timestamp).toLocaleString()}, Yes Price: ${p.yes_price}, No Price: ${p.no_price}`).join('\n    ')}

    Provide a brief, insightful summary:
  `;

  try {
    const generationConfig = {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 200,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    if (response.promptFeedback?.blockReason) {
      console.error('Prompt blocked:', response.promptFeedback.blockReason, response.promptFeedback.safetyRatings);
      return `AI summary generation failed due to content policy: ${response.promptFeedback.blockReason}.`;
    }
    if (!response.candidates || response.candidates.length === 0 || !response.candidates[0].content.parts[0].text) {
        console.error('No content in Gemini response:', response);
        return 'AI summary generation failed: No content received from model.';
    }
    return response.candidates[0].content.parts[0].text.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Failed to generate AI summary due to an API error. Check console for details.";
  }
};

// Helper to check if price history has semantically changed (e.g., new data point)
// Compares based on the timestamp of the last entry as a heuristic.
const arePriceHistoriesSemanticallyEqual = (ph1: PriceHistoryPoint[] | undefined, ph2: PriceHistoryPoint[]): boolean => {
  if (!ph1) return false; // If previous is undefined, treat as different for initial load comparison
  if (ph1.length === 0 && ph2.length === 0) return true; // Both empty
  if (ph1.length === 0 || ph2.length === 0) return false; // One empty, one not
  if (ph1.length !== ph2.length) return false; // Different number of points

  // Compare the last entry's timestamp and prices
  const last1 = ph1[ph1.length - 1];
  const last2 = ph2[ph2.length - 1];
  return last1.timestamp === last2.timestamp && last1.yes_price === last2.yes_price && last1.no_price === last2.no_price;
};

const AISummaryView: React.FC<AISummaryViewProps> = ({ contest, priceHistory }) => {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const prevContestIdRef = useRef<string | undefined>();
  const prevPriceHistoryRef = useRef<PriceHistoryPoint[] | undefined>();

  useEffect(() => {
    if (!contest || !contest.description) {
      setSummary("Not enough information available to generate a summary.");
      setIsLoading(false);
      // Update refs even if no summary is generated, to reflect current state
      prevContestIdRef.current = contest?.id;
      prevPriceHistoryRef.current = priceHistory;
      return;
    }

    const contestChanged = prevContestIdRef.current !== contest.id;
    const priceHistorySemanticallyChanged = !arePriceHistoriesSemanticallyEqual(prevPriceHistoryRef.current, priceHistory);

    // Regenerate summary if:
    // 1. The contest itself has changed.
    // 2. The price history data has semantically changed.
    // 3. There's no summary loaded yet for the current contest context (e.g., initial load or after an error).
    if (contestChanged || priceHistorySemanticallyChanged || !summary) {
      const generateSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const contestName = contest.title;
        const contestDescription = contest.description;
        const summaryText = await fetchGeminiSummary(contestName, contestDescription, priceHistory);
        setSummary(summaryText);
        // Store the successfully processed contest ID and price history
        prevContestIdRef.current = contest.id;
        prevPriceHistoryRef.current = priceHistory;
      } catch (err) {
        console.error("Error generating AI summary:", err);
        setError("Failed to generate AI summary. Please try again later.");
        setSummary("Could not load AI summary.");
      } finally {
        setIsLoading(false);
      }
    };

      generateSummary();
    } else if (isLoading) {
      // If no update needed but was previously loading (e.g. quick successive non-changing updates)
      setIsLoading(false);
    }
  }, [contest, priceHistory, summary, isLoading]); // Added isLoading to dependencies to handle the else if case

  return (
    <Card className="mt-4">
      <CardHeader className="py-3 px-4"> {/* Reduced vertical padding, adjusted horizontal padding slightly if needed */}
        <CardTitle className="text-base font-semibold flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-purple-500" /> {/* Added Sparkles icon */}
          AI Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {summary}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-3">
          Powered by Gemini (Flash Model). For informational purposes only.
        </p>
      </CardContent>
    </Card>
  );
};

export default AISummaryView;
