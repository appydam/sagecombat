
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Plus, Wallet } from "lucide-react";

interface MoneyManagementDialogsProps {
  isDepositDialogOpen: boolean;
  setIsDepositDialogOpen: (open: boolean) => void;
  isWithdrawDialogOpen: boolean;
  setIsWithdrawDialogOpen: (open: boolean) => void;
  userBalance: number;
  onDeposit: (amount: string) => void;
  onWithdraw: (amount: string) => void;
}

interface Beneficiary {
  userId: number;
  bId: string;
  vpa: string;
}

const MoneyManagementDialogs = ({
  isDepositDialogOpen,
  setIsDepositDialogOpen,
  isWithdrawDialogOpen,
  setIsWithdrawDialogOpen,
  userBalance,
  onDeposit,
  onWithdraw
}: MoneyManagementDialogsProps) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [newBeneficiaryVpa, setNewBeneficiaryVpa] = useState("");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
  const [isLoadingBeneficiaries, setIsLoadingBeneficiaries] = useState(false);
  const [isAddingBeneficiary, setIsAddingBeneficiary] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  // Replace with your actual Razorpay Key ID
  const [razorpayKeyId, setRazorpayKeyId] = useState('rzp_test_oAhkVTO3FQCfqJ');

  // Track if Razorpay script is loaded
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Check if Razorpay is already loaded
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      setIsRazorpayLoaded(true);
      console.log('Razorpay already loaded');
      return;
    }
    
    // Load Razorpay script
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        setIsRazorpayLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        setIsRazorpayLoaded(false);
      };
      document.body.appendChild(script);
    }

    // Set Razorpay key from environment variables if available
    if (typeof window !== 'undefined') {
      // Safely access environment variables
      let envKey;
      try {
        envKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 
                (window as any).RAZORPAY_KEY_ID || 
                (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_RAZORPAY_KEY_ID : undefined);
      } catch (e) {
        console.log('Error accessing environment variables:', e);
      }
      if (envKey) setRazorpayKeyId(envKey);
    }
  }, []);

  // Fetch beneficiaries when withdraw dialog opens
  useEffect(() => {
    if (isWithdrawDialogOpen) {
      fetchBeneficiaries();
    }
  }, [isWithdrawDialogOpen]);

  const getUserId = () => {
    const userIdStr = localStorage.getItem("userId");
    return userIdStr ? Number(JSON.parse(userIdStr)) : 1; // Default to 1 if not found
  };

  const fetchBeneficiaries = async () => {
    setIsLoadingBeneficiaries(true);
    try {
      const userId = getUserId();
      const response = await fetch('https://api.sagecombat.com/get-user-beneficiaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch beneficiaries');
      }

      const data = await response.json();
      if (data.code === 200) {
        setBeneficiaries(data.data || []);
      } else {
        throw new Error('Failed to fetch beneficiaries');
      }
    } catch (error) {
      console.error('Error fetching beneficiaries:', error);
      toast({
        title: "Error",
        description: "Failed to load beneficiaries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingBeneficiaries(false);
    }
  };

  const addBeneficiary = async () => {
    if (!newBeneficiaryVpa.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid VPA.",
        variant: "destructive",
      });
      return;
    }

    setIsAddingBeneficiary(true);
    try {
      const userId = getUserId();
      const response = await fetch('https://api.sagecombat.com/add-beneficiary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          vpa: newBeneficiaryVpa.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add beneficiary');
      }

      const data = await response.json();
      if (data.code === 200) {
        toast({
          title: "Success",
          description: "Beneficiary added successfully",
          variant: "default",
        });
        setNewBeneficiaryVpa("");
        setShowAddBeneficiary(false);
        // Refresh beneficiaries list
        await fetchBeneficiaries();
      } else {
        throw new Error('Failed to add beneficiary');
      }
    } catch (error) {
      console.error('Error adding beneficiary:', error);
      toast({
        title: "Error",
        description: "Failed to add beneficiary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingBeneficiary(false);
    }
  };

  const transferFunds = async () => {
    if (!selectedBeneficiary || !withdrawAmount) {
      toast({
        title: "Error",
        description: "Please select a beneficiary and enter an amount.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    if (amount > userBalance) {
      toast({
        title: "Error",
        description: "Insufficient balance.",
        variant: "destructive",
      });
      return;
    }

    setIsTransferring(true);
    try {
      const userId = getUserId();
      const response = await fetch('https://api.sagecombat.com/transfer-funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          benefId: selectedBeneficiary,
          amount: Math.round(amount * 100), // Convert to paise
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to transfer funds');
      }

      const data = await response.json();
      if (data.code === 200) {
        toast({
          title: "🎉 Transfer Successful!",
          description: `₹${amount} has been transferred successfully to your selected beneficiary.`,
          variant: "default",
        });
        onWithdraw(withdrawAmount);
        setWithdrawAmount("");
        setSelectedBeneficiary("");
        setIsWithdrawDialogOpen(false);
      } else {
        throw new Error('Failed to transfer funds');
      }
    } catch (error) {
      console.error('Error transferring funds:', error);
      toast({
        title: "Transfer Failed",
        description: "Failed to transfer funds. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTransferring(false);
    }
  };

  // Call backend to create order
  const createOrder = async (amount: number, email: string) => {
    try {
      const res = await fetch('https://api.sagecombat.com/create-order', { // Fixed endpoint path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: amount, // amount in paise
          currency: 'INR',
          email, 
          userId: 2
        }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to create order');
      }
      
      return res.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  // Call backend to verify payment
  const verifyPayment = async (paymentData: any) => {
    try {
      const res = await fetch('https://api.sagecombat.com/verify-payment', { // Fixed endpoint path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: paymentData.razorpay_order_id,
          payment_id: paymentData.razorpay_payment_id,
          signature: paymentData.razorpay_signature
        }),
      });
      
      if (!res.ok) {
        throw new Error('Payment verification failed');
      }
      
      return res.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const [depositStatus, setDepositStatus] = useState<'idle' | 'processing' | 'success' | 'error'>("idle");
  const [depositMessage, setDepositMessage] = useState<string>("");

  const handleDeposit = async () => {
    setDepositStatus('processing');
    setDepositMessage('Creating payment order...');
    
    try {
      const amountNum = parseFloat(depositAmount);
      if (isNaN(amountNum) || amountNum <= 0) {
        setDepositStatus('error');
        setDepositMessage('Please enter a valid amount');
        return;
      }

      // Get user email - replace with your actual user management logic
      let userEmail = 'user@example.com';
      if (typeof window !== 'undefined') {
        const storedEmail = localStorage.getItem('userEmail');
        userEmail = storedEmail ? storedEmail.replace(/^"|"$/g, '') : 'user@example.com';
      }

      // Create order with amount in paise (multiply by 100)
      const orderResponse = await createOrder(Math.round(amountNum * 100), userEmail);
      
      console.log('Full order response:', orderResponse);
      
      if (!orderResponse) {
        throw new Error('Empty order response');
      }
      
      // Extract the actual order data from the response structure
      // The API returns: { code: 200, data: { id: 'order_xyz', ... } }
      const order = orderResponse.data || orderResponse;
      console.log('Order data:', order);
      
      // Get the order ID from the data
      const orderId = order.id;
      console.log('Order ID:', orderId);
      
      if (!orderId) {
        console.error('Order ID not found in response:', orderResponse);
        throw new Error('Order ID not found in response');
      }

      setDepositMessage('Opening payment gateway...');

      // Check if Razorpay is loaded
      if (typeof window === 'undefined') {
        throw new Error('Browser environment not available');
      }
      
      if (!(window as any).Razorpay) {
        console.error('Razorpay is not loaded yet');
        // Try to load it again
        if (!isRazorpayLoaded) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => {
            console.log('Razorpay loaded on demand');
            setIsRazorpayLoaded(true);
            // Try to open checkout again after script loads
            setTimeout(() => handleDeposit(), 1000);
          };
          document.body.appendChild(script);
          setDepositMessage('Loading payment gateway...');
          return;
        }
        throw new Error('Razorpay is not available. Please refresh and try again.');
      }
      
      console.log('Razorpay is available, proceeding with checkout');

      // Use the orderId we extracted earlier
      console.log('Setting up Razorpay options with orderId:', orderId);
      console.log('Order amount:', order.amount);
      console.log('Order currency:', order.currency);
      
      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Mind Stock Gaming',
        description: 'Account Deposit',
        order_id: orderId, // Use the extracted orderId
        handler: async function (response: any) {
          setDepositMessage('Verifying payment...');
          try {
            const verifyRes = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes && verifyRes.success) {
              setDepositStatus('success');
              setDepositMessage('Deposit successful! Your account has been credited.');
              onDeposit(depositAmount); // Update parent component
              setTimeout(() => {
                setIsDepositDialogOpen(false);
                setDepositAmount("");
                setDepositStatus('idle');
                setDepositMessage('');
              }, 2000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            setDepositStatus('error');
            setDepositMessage('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          email: userEmail,
        },
        theme: { 
          color: '#3399cc' 
        },
        modal: {
          ondismiss: () => {
            setDepositStatus('idle');
            setDepositMessage('');
          }
        }
      };

      try {
        console.log('Creating Razorpay instance with options:', { 
          ...options, 
          key: '***', // Hide key in logs
          order_id: options.order_id // Show order_id explicitly
        });
        
        // Check if Razorpay constructor is available
        if (typeof (window as any).Razorpay !== 'function') {
          console.error('Razorpay is not a constructor function:', typeof (window as any).Razorpay);
          throw new Error('Razorpay is not properly loaded');
        }
        
        // Create Razorpay instance
        console.log('Calling Razorpay constructor...');
        const rzp = new (window as any).Razorpay(options);
        console.log('Razorpay instance created successfully');
        
        // Open the checkout
        console.log('Opening Razorpay checkout...');
        rzp.open();
        console.log('Razorpay open method called');
      } catch (rzpError) {
        console.error('Error opening Razorpay:', rzpError);
        throw new Error('Failed to open payment gateway: ' + (rzpError instanceof Error ? rzpError.message : 'Unknown error'));
      }

    } catch (error) {
      console.error('Deposit error:', error);
      setDepositStatus('error');
      setDepositMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">💸</span>
              <DialogTitle className="text-center text-2xl font-bold tracking-tight">Deposit Funds</DialogTitle>
              <DialogDescription className="text-center text-base text-muted-foreground">
                Instantly add money to your account. <br />
                <span className="text-xs text-gray-400">Secured by Razorpay</span>
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="bg-muted rounded-xl shadow-sm px-6 py-8 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center w-full gap-2">
              <label htmlFor="deposit-amount" className="text-sm font-medium text-gray-600">Amount</label>
              <div className="flex items-center w-full max-w-xs bg-white rounded-lg px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-primary">
                <span className="text-2xl font-semibold mr-2 text-gray-500">₹</span>
                <input
                  id="deposit-amount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0.00"
                  className="flex-1 bg-transparent outline-none text-2xl font-semibold text-center"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  disabled={depositStatus === 'processing'}
                />
              </div>
            </div>
            {depositMessage && (
              <div className={`text-sm animate-fade-in mt-2 text-center ${
                depositStatus === 'error' ? 'text-red-500' : 
                depositStatus === 'success' ? 'text-green-600' : 
                'text-blue-600'
              }`}>
                {depositMessage}
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-row gap-4 justify-center mt-6">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-6 py-2 text-base font-medium" 
              onClick={() => {
                setIsDepositDialogOpen(false);
                setDepositStatus('idle');
                setDepositMessage('');
              }} 
              disabled={depositStatus === 'processing'}
            >
              Cancel
            </Button>
            <Button 
              size="lg" 
              className="rounded-full px-8 py-2 text-base font-semibold shadow-md" 
              onClick={handleDeposit} 
              disabled={depositStatus === 'processing' || !depositAmount || isNaN(parseFloat(depositAmount)) || parseFloat(depositAmount) <= 0}
            >
              {depositStatus === 'processing' ? 'Processing...' : 'Deposit'}
            </Button>
          </DialogFooter>
          <div className="flex justify-center mt-4">
            <span className="text-xs text-gray-400">Your payment is 100% secure & encrypted 🔒</span>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">🏦</span>
              <DialogTitle className="text-center text-2xl font-bold tracking-tight">Withdraw Funds</DialogTitle>
              <DialogDescription className="text-center text-base text-muted-foreground">
                Transfer money from your account to your bank.<br />
                <span className="text-xs text-gray-400">Fast & secure</span>
              </DialogDescription>
            </div>
          </DialogHeader>
          
          <div className="bg-muted rounded-xl shadow-sm px-6 py-8 flex flex-col gap-6">
            {/* Beneficiary Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Select Beneficiary</label>
              <div className="flex gap-2">
                <Select value={selectedBeneficiary} onValueChange={setSelectedBeneficiary} disabled={isLoadingBeneficiaries}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={isLoadingBeneficiaries ? "Loading..." : "Choose beneficiary"} />
                  </SelectTrigger>
                  <SelectContent>
                    {beneficiaries.map((beneficiary) => (
                      <SelectItem key={beneficiary.bId} value={beneficiary.bId}>
                        {beneficiary.vpa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowAddBeneficiary(true)}
                  disabled={isLoadingBeneficiaries}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add New Beneficiary */}
            {showAddBeneficiary && (
              <div className="flex flex-col gap-2 p-4 bg-background rounded-lg border">
                <label className="text-sm font-medium text-gray-600">Add New Beneficiary (UPI ID)</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="example@upi"
                    value={newBeneficiaryVpa}
                    onChange={(e) => setNewBeneficiaryVpa(e.target.value)}
                    disabled={isAddingBeneficiary}
                  />
                  <Button
                    size="sm"
                    onClick={addBeneficiary}
                    disabled={isAddingBeneficiary || !newBeneficiaryVpa.trim()}
                  >
                    {isAddingBeneficiary ? "Adding..." : "Add"}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddBeneficiary(false);
                    setNewBeneficiaryVpa("");
                  }}
                  className="self-start"
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* Amount Input */}
            <div className="flex flex-col items-center w-full gap-2">
              <label htmlFor="withdraw-amount" className="text-sm font-medium text-gray-600">Amount</label>
              <div className="flex items-center w-full max-w-xs bg-white rounded-lg px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-primary">
                <span className="text-2xl font-semibold mr-2 text-gray-500">₹</span>
                <input
                  id="withdraw-amount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0.00"
                  className="flex-1 bg-transparent outline-none text-2xl font-semibold text-center"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  disabled={isTransferring}
                />
              </div>
            </div>
            
            <div className="text-xs text-gray-400 text-center">
              Available balance: <span className="font-semibold text-gray-700">₹{userBalance.toLocaleString()}</span>
            </div>
          </div>
          
          <DialogFooter className="flex flex-row gap-4 justify-center mt-6">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-6 py-2 text-base font-medium" 
              onClick={() => {
                setIsWithdrawDialogOpen(false);
                setShowAddBeneficiary(false);
                setNewBeneficiaryVpa("");
                setSelectedBeneficiary("");
                setWithdrawAmount("");
              }}
              disabled={isTransferring}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              className="rounded-full px-8 py-2 text-base font-semibold shadow-md"
              onClick={transferFunds}
              disabled={
                isTransferring || 
                !selectedBeneficiary || 
                !withdrawAmount || 
                isNaN(parseFloat(withdrawAmount)) || 
                parseFloat(withdrawAmount) > userBalance || 
                parseFloat(withdrawAmount) <= 0
              }
            >
              {isTransferring ? 'Processing...' : 'Withdraw'}
            </Button>
          </DialogFooter>
          
          <div className="flex justify-center mt-4">
            <span className="text-xs text-gray-400">Withdrawals are processed quickly & securely ⚡</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoneyManagementDialogs;
