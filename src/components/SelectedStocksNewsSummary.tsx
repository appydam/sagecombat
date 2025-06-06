import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Stock } from "@/components/StockSelector"; // Assuming Stock type is exported from here or adjust path if needed
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Newspaper, Sparkles } from 'lucide-react';

interface SelectedStocksNewsSummaryProps {
  selectedStocks: Stock[];
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.0-flash-lite";

const TYPING_SPEED_MS = 5;
const PLACEHOLDER_MESSAGE = "Select stocks to see AI-powered news summary.";
const API_UNAVAILABLE_MESSAGE = "AI News Summary is unavailable: API Key not configured.";
const API_ERROR_MESSAGE_PREFIX = "Failed to generate AI news summary"; // Prefix for actual API errors

const decodeHtmlEntities = (html: string): string => {
  let text = html;
  if (typeof document !== 'undefined' && typeof window !== 'undefined') { // Ensure browser environment
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html; // Use original html here for full decoding
    text = textarea.value;
  } else {
    // Fallback for non-browser environments or if document/window is unavailable
    // This is a limited decoder, focusing on entities critical for this component
    text = text.replace(/&ast;/g, '*')
               .replace(/&#42;/g, '*')
               .replace(/&#x2A;/g, '*') // Hex version of asterisk (lowercase 'a')
               .replace(/&#x2a;/g, '*'); // Hex version of asterisk (uppercase 'A')
    // Decode other common entities that might interfere or be part of the content
    text = text.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#039;/g, "'")
               .replace(/&#39;/g, "'");
  }
  return text;
};

const fetchNewsSummaryForStocks = async (stocks: Stock[]): Promise<string> => {
  if (!API_KEY) {
    console.error("Gemini API Key not found. Please set VITE_GEMINI_API_KEY environment variable.");
    return "AI News Summary is unavailable: API Key not configured.";
  }
  if (stocks.length === 0) {
    return "Select stocks to see AI-powered news summary.";
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const stockSymbols = stocks.map(stock => stock.symbol).join(', ');

  const prompt = `
    Provide a concise market news summary (3 sentences per stock in bullet points in a clean and concise format) for the following companies based on their stock symbols:
    ${stockSymbols}.
    Focus on the latest significant news, earnings reports, or market-moving events for these specific companies.
    If news is sparse for some, prioritize the most impactful information available.
    Format the output as a brief, informative paragraph.
  `;

  try {
    const generationConfig = {
      temperature: 0.5,
      topK: 1,
      topP: 0.9,
      maxOutputTokens: 400,
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
    const rawTextFromApi = response.candidates[0].content.parts[0].text.trim();
    console.log('[AI_SUMMARY_DEBUG] Raw text from API:', JSON.stringify(rawTextFromApi));

    const decodedText = decodeHtmlEntities(rawTextFromApi);
    console.log('[AI_SUMMARY_DEBUG] After decodeHtmlEntities:', JSON.stringify(decodedText));

    // Remove leading bullet point asterisks more robustly from decoded text
    const textAfterBulletRemoval = decodedText.replace(/^\s*\*+\s+/gm, '');
    console.log('[AI_SUMMARY_DEBUG] After bullet removal:', JSON.stringify(textAfterBulletRemoval));

    // Convert markdown bold (**word**) to HTML <strong>word</strong>
    const finalProcessedText = textAfterBulletRemoval.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    console.log('[AI_SUMMARY_DEBUG] Final processed text (to be returned):', JSON.stringify(finalProcessedText));

    return finalProcessedText;

  } catch (error) {
    console.error("Error calling Gemini API for news summary:", error);
    return "Failed to generate AI news summary due to an API error. Check console for details.";
  }
};

// Helper to check if selected stocks have meaningfully changed (e.g., different symbols)
const haveStocksChanged = (prevStocks: Stock[] | undefined, currentStocks: Stock[]): boolean => {
  if (!prevStocks && currentStocks.length > 0) return true; // Initial load with stocks
  if (!prevStocks && currentStocks.length === 0) return false; // Initial load no stocks
  if (prevStocks && prevStocks.length !== currentStocks.length) return true;
  if (!prevStocks) return false; // Should not happen if logic above is correct

  const prevSymbols = prevStocks.map(s => s.id).sort().join(',');
  const currentSymbols = currentStocks.map(s => s.id).sort().join(',');
  return prevSymbols !== currentSymbols;
};

const SelectedStocksNewsSummary: React.FC<SelectedStocksNewsSummaryProps> = ({ selectedStocks }) => {
  const [summary, setSummary] = useState<string>(PLACEHOLDER_MESSAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedSummary, setDisplayedSummary] = useState<string>(PLACEHOLDER_MESSAGE);

    const [summaryVisible, setSummaryVisible] = useState<boolean>(false);
  // const prevSelectedStocksRef = useRef<Stock[] | undefined>(); // Keep if needed for more complex logic later

  const handleGenerateSummary = async () => {
    if (selectedStocks.length === 0) {
      setError("Please select stocks first.");
      setSummary("");
      setSummaryVisible(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummaryVisible(true);
    try {
      const summaryText = await fetchNewsSummaryForStocks(selectedStocks);
      setSummary(summaryText);
    } catch (err) {
      console.error("Error generating news summary:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate news summary: ${errorMessage}`);
      setSummary(""); // Clear previous summary on error
    } finally {
      setIsLoading(false);
    }
  };

  // Reset visibility if stocks are cleared after a summary was shown
  useEffect(() => {
    if (selectedStocks.length === 0 && summaryVisible) {
      setSummaryVisible(false);
      setSummary(PLACEHOLDER_MESSAGE); // Reset initial message
      setDisplayedSummary(PLACEHOLDER_MESSAGE);
      setError(null);
    }
  }, [selectedStocks, summaryVisible]);

  useEffect(() => {
    // If summary is a placeholder, error, or loading, display it directly without animation
    if (isLoading || error || summary === PLACEHOLDER_MESSAGE || summary === API_UNAVAILABLE_MESSAGE || summary.startsWith(API_ERROR_MESSAGE_PREFIX)) {
      setDisplayedSummary(summary);
      return () => {}; // No cleanup needed for interval
    }

    // If summary is actual API content, then animate
    setDisplayedSummary(''); // Clear previous animation text for new API content
    let charIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedSummary(prev => summary.substring(0, charIndex + 1));
      charIndex++;
      if (charIndex >= summary.length) {
        clearInterval(intervalId);
      }
    }, TYPING_SPEED_MS);

    return () => clearInterval(intervalId); // Cleanup on unmount or if summary/isLoading/error changes
  }, [summary, isLoading, error]);

  return (
    <Card className="mt-6">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-base font-semibold flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
          AI Market News Snapshot
          {/* <Sparkles className="h-4 w-4 ml-1.5 text-purple-500 opacity-80" /> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleGenerateSummary} 
          disabled={selectedStocks.length === 0 || isLoading}
          className="w-full bg-gradient-to-r from-[#fdf6e3] to-[#ffd498] text-black transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          
          {isLoading ? 'Generating...' : <><Sparkles className="h-4 w-4 mr-2" /> Generate AI Analysis</>}
        </Button>

        {!summaryVisible && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            {selectedStocks.length === 0 
              ? "Select stocks to enable summary generation." 
              : "Add 5 stocks and generate AI market summary."}
          </p>
        )}

        {summaryVisible && (
          <>
            {/* Added mt-3 to the content blocks below for spacing after the button or the new text */}
            {isLoading ? (
          <div className="space-y-2 mt-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600 mt-3">{error}</p>
        ) : (
          <div 
            className="text-sm text-muted-foreground whitespace-pre-line mt-3"
            dangerouslySetInnerHTML={{ __html: displayedSummary }}
          />
        )}
          </>
        )}
        <p className="text-xs text-gray-400 mt-3">
          Powered by Gemini. For informational purposes only.
        </p>
      </CardContent>
    </Card>
  );
};

export default SelectedStocksNewsSummary;
