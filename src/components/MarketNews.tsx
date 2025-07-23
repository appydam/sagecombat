import { useState, useEffect } from 'react';

import { Separator } from '@/components/ui/separator';
import MorphCard from '@/components/ui/MorphCard';

interface NewsArticle {
  title: string;
  link: string;
  description: string;
  published: string;
  stocks: { name: string; impact: string; score: number; marketCap: string }[];
  sectors: string[];
}

const MarketNews = () => {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoadingNews(true);
    setError(null);
    try {
      const response = await fetch('https://api.sagecombat.com/news');
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }
      const result = await response.json();
      setNewsData(result.data as NewsArticle[]);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const getStockSentimentClass = (stock: string) => {
    // Simple logic to determine sentiment based on stock name
    if (stock.toLowerCase().includes('up')) return 'bg-green-100 text-green-800';
    if (stock.toLowerCase().includes('down')) return 'bg-red-100 text-red-800';
    return 'bg-blue-100 text-blue-800';
  };


  return (
    <MorphCard className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Top Market News Snapshot</h2>
      <Separator className="mb-4" />
      
      {isLoadingNews ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">
          <p>Could not load market news.</p>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {newsData.map((news, index) => (
          <article 
            key={index} 
            className="relative bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 overflow-hidden"
          >
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-500"></div>
            
            <div className="p-3 pl-5">
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="text-sm font-semibold text-gray-800 leading-snug flex-1">
                  <a 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
                    aria-label={`Read full article: ${news.title}`}
                  >
                    {news.title}
                  </a>
                </h3>
                <time 
                  className="text-[11px] text-gray-500 font-medium whitespace-nowrap bg-gray-50 px-1.5 py-0.5 rounded-md"
                  dateTime={news.published}
                >
                  {new Date(news.published).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
      
              <p className="text-xs text-gray-600 mb-3 leading-normal">
                {news.description}
              </p>
      
              <div className="flex flex-col gap-3 text-xs min-w-0">
                <div>
                  <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Sectors
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {news.sectors.map((sector, sectorIndex) => (
                      <div key={sectorIndex} className="px-2 py-1 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700">
                        {sector}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Potentially Affected Stocks
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {news.stocks.map((stock, stockIndex) => (
                      <div 
                        key={stockIndex} 
                        className={`group relative px-2 py-1 rounded-md text-[11px] font-medium transition-all duration-200 cursor-default ${
                          getStockSentimentClass(stock.name)
                        }`}
                        title={`${stock.name}: Impact ${stock.impact}, Score ${stock.score}`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{stock.name}</span>
                          <div className="text-[10px] opacity-80">
                            <span className="font-medium">{stock.impact}</span>
                            <span className="mx-0.5">/</span>
                            <span className="font-medium">{stock.score}</span>
                            <span className="mx-0.5">/</span>
                            <span className="font-medium capitalize">{stock.marketCap}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
      
            {/* External link indicator */}
            <div className="absolute top-3 right-3 opacity-30 hover:opacity-60 transition-opacity">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </article>
        ))}
      </div>
      )}
    </MorphCard>
  );
};

export default MarketNews;
