
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { Lightbulb, Sparkles } from 'lucide-react';
import { PolyContest, PriceHistoryPoint } from '@/types/competitions';

interface AISummaryViewProps {
  contest: PolyContest;
  priceHistory: PriceHistoryPoint[];
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.0-flash-lite"; // Consistent with user's recent change
const TYPING_SPEED_MS = 3;
const PLACEHOLDER_MESSAGE = "Click 'Generate AI Analysis' to get insights.";
const API_UNAVAILABLE_MESSAGE = "AI Analysis is unavailable: API Key not configured.";
const API_ERROR_MESSAGE_PREFIX = "Failed to generate AI analysis";

const decodeHtmlEntities = (html: string): string => {
  let text = html;
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    text = textarea.value;
  } else {
    text = text.replace(/&ast;/g, '*')
               .replace(/&#42;/g, '*')
               .replace(/&#x2A;/g, '*')
               .replace(/&#x2a;/g, '*');
    text = text.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#039;/g, "'")
               .replace(/&#39;/g, "'");
  }
  return text;
};

const fetchGeminiSummary = async (contestTitle: string, contestDescription: string, priceData: PriceHistoryPoint[]): Promise<string> => {
  if (!API_KEY) {
    console.error("Gemini API Key not found. Please set VITE_GEMINI_API_KEY environment variable.");
    return API_UNAVAILABLE_MESSAGE;
  }
  if (priceData.length < 3) { // Require some data points
    return "Not enough price data to generate a meaningful analysis.";
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const recentPrices = priceData.slice(-10).map(p => `Date: ${new Date(p.timestamp).toLocaleDateString()}, Price: ${p.yes_price.toFixed(2)}`).join('\n');

  const prompt = `
    Analyze the provided market data for the prediction market contest: "${contestTitle}".
    Contest Description: "${contestDescription}"
    Recent Price Points (last 10):
    ${recentPrices}

    Provide a concise (3-5 sentences) analysis focusing on potential trends, volatility, or key price levels based *only* on the provided price history. Format the output as a brief, informative paragraph. Highlight key observations using markdown bold (e.g., **significant increase**).
  `;

  try {
    const generationConfig = {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 300, 
    };
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig, safetySettings });
    
    const rawTextFromApi = result.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    console.log('[AI_SUMMARY_DEBUG_POLY] Raw text from API:', JSON.stringify(rawTextFromApi));
    if (!rawTextFromApi) {
        console.error('No content in Gemini response for AISummaryView:', result.response);
        return 'AI summary generation failed: No content received from model.';
    }

    const decodedText = decodeHtmlEntities(rawTextFromApi);
    console.log('[AI_SUMMARY_DEBUG_POLY] After decodeHtmlEntities:', JSON.stringify(decodedText));

    let processedText = decodedText.replace(/^\s*\*+\s+/gm, ''); // Remove bullets
    console.log('[AI_SUMMARY_DEBUG_POLY] After bullet removal:', JSON.stringify(processedText));

    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Markdown bold to HTML
    console.log('[AI_SUMMARY_DEBUG_POLY] Final processed text:', JSON.stringify(processedText));

    return processedText;

  } catch (error) {
    console.error("Error calling Gemini API for AISummaryView:", error);
    return `${API_ERROR_MESSAGE_PREFIX}: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};

const AISummaryView: React.FC<AISummaryViewProps> = ({ contest, priceHistory }) => {
  const [summary, setSummary] = useState<string>(PLACEHOLDER_MESSAGE);
  const [displayedSummary, setDisplayedSummary] = useState<string>(PLACEHOLDER_MESSAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(false);

  const handleGenerateSummary = useCallback(async () => {
    if (!contest || priceHistory.length < 3) {
      setError("Not enough data to generate AI summary.");
      setSummary("Not enough data to generate AI summary."); 
      setSummaryVisible(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummaryVisible(true); 
    try {
      const fetchedSummary = await fetchGeminiSummary(contest.title, contest.description, priceHistory);
      setSummary(fetchedSummary);
    } catch (e) {
      const errorMessage = `${API_ERROR_MESSAGE_PREFIX}: ${e instanceof Error ? e.message : 'An unknown error occurred'}`;
      setError(errorMessage);
      setSummary(errorMessage); 
    }
    setIsLoading(false);
  }, [contest, priceHistory]);

 useEffect(() => {
    // Conditions to display summary directly without animation
    if (isLoading || error || 
        summary === PLACEHOLDER_MESSAGE || 
        summary === API_UNAVAILABLE_MESSAGE || 
        summary.startsWith(API_ERROR_MESSAGE_PREFIX) || 
        summary === "Not enough price data to generate a meaningful analysis." ||
        summary === "Not enough data to generate AI summary.") {
      setDisplayedSummary(summary);
      return; 
    }

    // If summary is not visible or empty, reset displayed summary or show placeholder
    if (!summaryVisible || !summary) {
        if (!summaryVisible) {
            setDisplayedSummary(PLACEHOLDER_MESSAGE);
        } else {
            setDisplayedSummary(''); // If visible but summary is empty, show nothing before animation
        }
        return;
    }
    
    // Start animation for actual content
    setDisplayedSummary(''); 
    let charIndex = 0;
    const intervalId = setInterval(() => {
      const currentFullSummary = typeof summary === 'string' ? summary : ''; // Ensure summary is a string
      setDisplayedSummary(prev => currentFullSummary.substring(0, charIndex + 1));
      charIndex++;
      if (charIndex >= currentFullSummary.length) {
        clearInterval(intervalId);
      }
    }, TYPING_SPEED_MS);

    return () => clearInterval(intervalId); // Cleanup interval on unmount or dependency change
  }, [summary, isLoading, error, summaryVisible]); // Added summaryVisible

  return (
    <Card className="mt-6 bg-background/80 backdrop-blur-sm border-border/40 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
          AI Market Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Button 
          onClick={handleGenerateSummary} 
          disabled={isLoading || !priceHistory || priceHistory.length < 3} 
          className="w-full mb-4 bg-gradient-to-r from-[#fdf6e3] to-[#ffd498] text-black hover:from-[#ffe7a4] hover:to-[#fdc06a] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          {isLoading ? 'Generating...' : <><Sparkles className="h-4 w-4 mr-2" /> Generate AI Analysis</>}
        </Button>

        {summaryVisible && (
          <>
            {isLoading ? (
              <div className="space-y-2 mt-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : error ? (
              <p className="text-sm text-red-500 mt-3">{error}</p>
            ) : (
              <div 
                className="text-sm text-muted-foreground whitespace-pre-line mt-3 min-h-[60px]"
                dangerouslySetInnerHTML={{ __html: displayedSummary }}
              />
            )}
          </>
        )}
        {!summaryVisible && !isLoading && ( 
             <p className="text-sm text-muted-foreground mt-3 text-center min-h-[60px]">{PLACEHOLDER_MESSAGE}</p>
        )}
        
        <p className="text-xs text-muted-foreground/70 mt-4 pt-2 border-t border-border/20">
          AI-generated analysis based on recent price history. For informational purposes only.
        </p>
      </CardContent>
    </Card>
  );
};

export default AISummaryView;
