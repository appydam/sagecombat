
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ContestCard from "./ContestCard";
import { ContestType } from "./data/mockProfileData";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination";

interface ContestsListProps {
  participations: ContestType[];
  onEditStocks: (contest: ContestType) => void;
  isAuthenticated?: boolean;
  hasUserContests?: boolean;
}

const ITEMS_PER_PAGE = 5;

const ContestsList = ({ 
  participations, 
  onEditStocks,
  isAuthenticated = false,
  hasUserContests = false
}: ContestsListProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter contests by game type
  const equityContests = participations.filter(contest => contest.gameType === "equity");
  const opinionContests = participations.filter(contest => contest.gameType === "opinion");
  const polyContests = participations.filter(contest => contest.gameType === "poly");
  
  // Get contests to display based on active tab
  const getContestsToDisplay = () => {
    switch (activeTab) {
      case "equity":
        return equityContests;
      case "opinion":
        return opinionContests;
      case "poly":
        return polyContests;
      case "all":
      default:
        return participations;
    }
  };

  const contestsToDisplay = getContestsToDisplay();

  // Pagination logic
  const totalPages = Math.ceil(contestsToDisplay.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedContests = contestsToDisplay.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      pageNumbers.push("ellipsis1");
    }
    
    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis2");
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // If user is not authenticated or doesn't have contests, show appropriate message
  if (!isAuthenticated || !hasUserContests || participations.length === 0) {
    return (
      <div className="text-center py-12 bg-secondary/40 rounded-lg">
        <h3 className="text-xl font-medium mb-2">No Contests Yet</h3>
        <p className="text-muted-foreground mb-6">
          {isAuthenticated 
            ? "You haven't participated in any contests yet."
            : "Login to see your contest history."}
        </p>
        <Button variant="outline" asChild>
          <a href="/competitions">Explore Contests</a>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="equity">Equity</TabsTrigger>
          <TabsTrigger value="opinion">Opinion</TabsTrigger>
          <TabsTrigger value="poly">Poly</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {paginatedContests.length > 0 ? (
            paginatedContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-${contest.gameType}`} 
                contest={contest}
                onEditStocks={onEditStocks}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-secondary/40 rounded-lg">
              <p>No contests found</p>
            </div>
          )}
          
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage > 1) handlePageChange(currentPage - 1); 
                    }} 
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page, i) => (
                  page === "ellipsis1" || page === "ellipsis2" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={`page-${page}`}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          handlePageChange(Number(page)); 
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage < totalPages) handlePageChange(currentPage + 1); 
                    }} 
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>

        <TabsContent value="equity" className="space-y-4 mt-4">
          {paginatedContests.length > 0 ? (
            paginatedContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-equity`} 
                contest={contest}
                onEditStocks={onEditStocks}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-secondary/40 rounded-lg">
              <p>No equity contests found</p>
            </div>
          )}
          
          {/* Add pagination for equity tab */}
          {totalPages > 1 && activeTab === "equity" && (
            <Pagination className="mt-6">
              {/* ... Same pagination content as in "all" tab ... */}
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage > 1) handlePageChange(currentPage - 1); 
                    }} 
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page, i) => (
                  page === "ellipsis1" || page === "ellipsis2" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={`page-${page}`}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          handlePageChange(Number(page)); 
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage < totalPages) handlePageChange(currentPage + 1); 
                    }} 
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>

        <TabsContent value="opinion" className="space-y-4 mt-4">
          {paginatedContests.length > 0 ? (
            paginatedContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-opinion`} 
                contest={contest}
                onEditStocks={onEditStocks}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-secondary/40 rounded-lg">
              <p>No opinion contests found</p>
            </div>
          )}
          
          {/* Add pagination for opinion tab */}
          {totalPages > 1 && activeTab === "opinion" && (
            <Pagination className="mt-6">
              {/* ... Same pagination content as in "all" tab ... */}
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage > 1) handlePageChange(currentPage - 1); 
                    }} 
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page, i) => (
                  page === "ellipsis1" || page === "ellipsis2" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={`page-${page}`}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          handlePageChange(Number(page)); 
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage < totalPages) handlePageChange(currentPage + 1); 
                    }} 
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>

        <TabsContent value="poly" className="space-y-4 mt-4">
          {paginatedContests.length > 0 ? (
            paginatedContests.map((contest) => (
              <ContestCard 
                key={contest.uniqueKey || `${contest.contest_id}-poly`} 
                contest={contest}
                onEditStocks={onEditStocks}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-secondary/40 rounded-lg">
              <p>No poly contests found</p>
            </div>
          )}
          
          {/* Add pagination for poly tab */}
          {totalPages > 1 && activeTab === "poly" && (
            <Pagination className="mt-6">
              {/* ... Same pagination content as in "all" tab ... */}
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage > 1) handlePageChange(currentPage - 1); 
                    }} 
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page, i) => (
                  page === "ellipsis1" || page === "ellipsis2" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={`page-${page}`}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          handlePageChange(Number(page)); 
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage < totalPages) handlePageChange(currentPage + 1); 
                    }} 
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContestsList;
