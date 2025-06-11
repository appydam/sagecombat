
import { useState, useEffect } from 'react';
import MorphCard from '@/components/ui/MorphCard';
import { ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchDepositHistory, fetchWithdrawalHistory } from '@/services/api/transactionService';
import { Deposit, Withdrawal } from '@/types/transaction';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 5;

interface TransactionsListProps {
  isAuthenticated?: boolean;
}

const TransactionsList = ({ isAuthenticated = false }: TransactionsListProps) => {
  const [activeTab, setActiveTab] = useState<'deposits' | 'withdrawals'>('deposits');
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [depositData, withdrawalData] = await Promise.all([
          fetchDepositHistory(),
          fetchWithdrawalHistory(),
        ]);
        setDeposits(depositData);
        setWithdrawals(withdrawalData);
      } catch (err) {
        setError('Failed to fetch transaction history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12 bg-secondary/40 rounded-lg">
        <h3 className="text-xl font-medium mb-2">Login Required</h3>
        <p className="text-muted-foreground">Please log in to view your transaction history.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const totalPages = activeTab === 'deposits' 
    ? Math.ceil(deposits.length / ITEMS_PER_PAGE) 
    : Math.ceil(withdrawals.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => (
    <div className="flex justify-center items-center space-x-4 pt-4">
      <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} variant="outline" size="icon">
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );

  const list = activeTab === 'deposits' ? deposits : withdrawals;
  const paginatedList = list.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderTransactionItem = (tx: Deposit | Withdrawal, index: number) => {
    const isDeposit = !('vpa' in tx);

    return (
      <MorphCard key={index} className="p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${isDeposit ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
              {isDeposit ? (
                <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <p className="font-medium capitalize">{isDeposit ? 'Deposit' : 'Withdrawal'}</p>
              <p className="text-sm text-muted-foreground">
                {!isDeposit && (
                  <>
                    To: {(tx as Withdrawal).vpa} <br />
                  </>
                )}
                {new Date(tx.reqTime).toLocaleDateString()} at {new Date(tx.reqTime).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <p className={`font-medium ${isDeposit ? 'text-green-500' : 'text-blue-500'}`}>
            {isDeposit ? '+' : '-'}₹{tx.amount.toLocaleString()}
          </p>
        </div>
      </MorphCard>
    );
  };

  return (
    <div className="flex flex-col min-h-[32rem]">
      {/* Tabs */}
      <div>
        <div className="flex space-x-2 border-b">
          <Button
            variant={activeTab === 'deposits' ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab('deposits')}
            className="rounded-b-none"
          >
            Deposits
          </Button>
          <Button
            variant={activeTab === 'withdrawals' ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab('withdrawals')}
            className="rounded-b-none"
          >
            Withdrawals
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-3 pt-4">
        {paginatedList.length > 0 ? (
          paginatedList.map(renderTransactionItem)
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground">
              No {activeTab} history found.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Area */}
      <div className="mt-auto">
        {totalPages > 1 && renderPagination()}
      </div>
    </div>
  );
};

export default TransactionsList;
