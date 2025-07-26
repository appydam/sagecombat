'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, ExternalLink, Search, Minus, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Stock {
  name: string;
  impact: 'Positive' | 'Negative' | 'Neutral';
  score: number;
  marketCap: 'largecap' | 'midcap' | 'smallcap';
}

interface NewsItem {
  title: string;
  link: string;
  description: string;
  published: string;
  stocks: Stock[];
  sectors: string[];
}

interface ApiResponse {
  data: NewsItem[];
  total_count?: number;
}

const MarketNewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchNews(1);
  }, []);

  const fetchNews = async (page: number) => {
    try {
      setLoading(true);
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(`https://api.sagecombat.com/news?offset=${offset}&limit=${itemsPerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data: ApiResponse = await response.json();
      setNews(data.data);
      
      // If the API returns total count, use it to calculate total pages
      if (data.total_count) {
        setTotalItems(data.total_count);
        setTotalPages(Math.ceil(data.total_count / itemsPerPage));
      } else {
        // Fallback if total_count is not provided
        setTotalPages(page + 1);
      }
      
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'Positive') return 'bg-green-50 text-green-700 border-green-200';
    if (impact === 'Negative') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getImpactIcon = (impact: string) => {
    if (impact === 'Positive') return <TrendingUp className="w-3.5 h-3.5" />;
    if (impact === 'Negative') return <TrendingDown className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredNews = news.filter(item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchNews(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageClickHandler = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    handlePageChange(page);
  };

  if (loading && !isRefreshing) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-5xl mx-auto p-6 space-y-4 pt-24">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 mb-3"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
          <div className="text-center max-w-md p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load News</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchNews}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center mx-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 pt-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Market Pulse</h1>
            <p className="text-gray-600 text-sm">Real-time market movements and impacts</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-gray-900 text-sm pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsRefreshing(true);
              fetchNews(currentPage);
            }}
            disabled={isRefreshing}
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* News Feed */}
        <div className="space-y-3">
          {filteredNews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-gray-400 text-3xl mb-3">📰</div>
              <h3 className="text-gray-700 font-medium mb-1">No matching news found</h3>
              <p className="text-gray-500 text-sm">Try a different search term</p>
            </div>
          ) : (
            filteredNews.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="p-5">
                  {/* Header with title and time */}
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-gray-900 font-medium leading-snug pr-2 text-base">
                      {item.title.replace(/&amp;/g, '&')}
                    </h2>
                    <div className="flex items-center text-xs text-gray-500 whitespace-nowrap ml-2">
                      <Clock className="w-3 h-3 mr-1 text-gray-400" />
                      {formatDate(item.published)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Potentially Affected Stocks */}
                  {item.stocks.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Potentially Affected Stocks</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.stocks.map((stock, stockIndex) => (
                          <div
                            key={stockIndex}
                            className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getImpactColor(stock.impact)}`}
                          >
                            {getImpactIcon(stock.impact)}
                            <span>{stock.name}</span>
                            {stock.score !== 0 && (
                              <span className={`ml-1 font-medium ${stock.score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stock.score > 0 ? '+' : ''}{stock.score}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sectors */}
                  {item.sectors.length > 0 && (
                    <div className="mt-3">
                      <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Sectors</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.sectors.map((sector, sectorIndex) => (
                          <span
                            key={sectorIndex}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                          >
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer with external link */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500">
                        {item.stocks.length} stock{item.stocks.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {item.sectors.length} sector{item.sectors.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center font-medium"
                      title="View full article"
                    >
                      Read more
                      <ExternalLink className="w-3 h-3 ml-1.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 pb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="inline-flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={getPageClickHandler(1)}
                disabled={currentPage === 1 || loading}
                className="px-3 py-1.5 text-sm rounded border border-transparent text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                First
              </button>
              <button
                onClick={getPageClickHandler(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="px-3 py-1.5 text-sm rounded border border-transparent text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Previous
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={getPageClickHandler(pageNum)}
                    disabled={loading}
                    className={`w-10 h-8 text-sm rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={getPageClickHandler(currentPage + 1)}
                disabled={currentPage >= totalPages || loading}
                className="px-3 py-1.5 text-sm rounded border border-transparent text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Next
              </button>
              <button
                onClick={getPageClickHandler(totalPages)}
                disabled={currentPage === totalPages || loading}
                className="px-3 py-1.5 text-sm rounded border border-transparent text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Last
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketNewsPage;