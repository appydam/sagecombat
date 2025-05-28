
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MoneyManagementDialogsProps {
  isDepositDialogOpen: boolean;
  setIsDepositDialogOpen: (open: boolean) => void;
  isWithdrawDialogOpen: boolean;
  setIsWithdrawDialogOpen: (open: boolean) => void;
  userBalance: number;
  onDeposit: (amount: string) => void;
  onWithdraw: (amount: string) => void;
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

  // Razorpay Key ID (do NOT hardcode secret)
const [razorpayKeyId, setRazorpayKeyId] = useState('<YOUR_KEY_ID_HERE>');

useEffect(() => {
  if (typeof window !== 'undefined') {
    // Set Razorpay key from env if available
    // Vite/CRA/Next.js exposes env vars to window.process.env or import.meta.env
    const envKey = (window as any).RAZORPAY_KEY_ID || (window as any).env?.NEXT_PUBLIC_RAZORPAY_KEY_ID || (window as any).process?.env?.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (envKey) setRazorpayKeyId(envKey);
  }
  if (typeof window !== 'undefined' && !(window as any).Razorpay) {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }
}, []);

// Call backend to create order
const createOrder = async (amount: number, email: string) => {
  // Amount in paise
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, email, userId: 1 }), // TODO: Replace with actual userId
  });
  return res.json();
};

// Call backend to verify payment
const verifyPayment = async (paymentData: any) => {
  const res = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return res.json();
};

const [depositStatus, setDepositStatus] = useState<'idle' | 'processing' | 'success' | 'error'>("idle");
const [depositMessage, setDepositMessage] = useState<string>("");

const handleDeposit = async () => {
  setDepositStatus('processing');
  setDepositMessage('');
  try {
    const amountNum = parseFloat(depositAmount);
    if (!amountNum || amountNum <= 0) {
      setDepositStatus('error');
      setDepositMessage('Enter a valid amount');
      return;
    }
    // Get user email from localStorage (client-side only)
    let userEmail = 'test@example.com';
    if (typeof window !== 'undefined') {
      userEmail = localStorage.getItem('userEmail') || 'test@example.com';
    }
    const order = await createOrder(Math.round(amountNum * 100), userEmail); // amount in paise
    if (!order || !order.id) {
      setDepositStatus('error');
      setDepositMessage('Failed to create order');
      return;
    }
    const options = {
      key: razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
      name: 'Mind Stock Gaming',
      description: 'Deposit',
      order_id: order.id,
      handler: async function (response: any) {
        // Send payment verification to backend
        const verifyRes = await verifyPayment({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });
        if (verifyRes && verifyRes.status === 200) {
          setDepositStatus('success');
          setDepositMessage('Deposit successful!');
          setIsDepositDialogOpen(false);
        } else {
          setDepositStatus('error');
          setDepositMessage('Payment verification failed');
        }
      },
      prefill: {
        email: userEmail,
      },
      theme: { color: '#3399cc' },
      modal: {
        ondismiss: () => {
          setDepositStatus('idle');
        }
      }
    };
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } else {
      setDepositStatus('error');
      setDepositMessage('Razorpay is not loaded');
      return;
    }
    setDepositAmount("");
  } catch (err) {
    setDepositStatus('error');
    setDepositMessage('Something went wrong');
  }
};

  const handleWithdraw = () => {
    onWithdraw(withdrawAmount);
    setWithdrawAmount("");
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
                />
              </div>
            </div>
            {depositStatus === 'error' && (
              <div className="text-red-500 text-sm animate-fade-in mt-2">{depositMessage}</div>
            )}
            {depositStatus === 'success' && (
              <div className="text-green-600 text-sm animate-fade-in mt-2">{depositMessage}</div>
            )}
          </div>
          <DialogFooter className="flex flex-row gap-4 justify-center mt-6">
            <Button variant="outline" size="lg" className="rounded-full px-6 py-2 text-base font-medium" onClick={() => setIsDepositDialogOpen(false)} disabled={depositStatus === 'processing'}>
              Cancel
            </Button>
            <Button size="lg" className="rounded-full px-8 py-2 text-base font-semibold shadow-md" onClick={handleDeposit} disabled={depositStatus === 'processing' || !depositAmount || parseFloat(depositAmount) <= 0}>
              {depositStatus === 'processing' ? 'Processing...' : 'Deposit'}
            </Button>
          </DialogFooter>
          <div className="flex justify-center mt-4">
            <span className="text-xs text-gray-400">Your payment is 100% secure & encrypted 🔒</span>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent>
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
          <div className="bg-muted rounded-xl shadow-sm px-6 py-8 flex flex-col items-center gap-6">
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
                />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">Available balance: <span className="font-semibold text-gray-700">₹{userBalance.toLocaleString()}</span></div>
          </div>
          <DialogFooter className="flex flex-row gap-4 justify-center mt-6">
            <Button variant="outline" size="lg" className="rounded-full px-6 py-2 text-base font-medium" onClick={() => setIsWithdrawDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              size="lg"
              className="rounded-full px-8 py-2 text-base font-semibold shadow-md"
              onClick={handleWithdraw}
              disabled={parseFloat(withdrawAmount) > userBalance || parseFloat(withdrawAmount) <= 0}
            >
              Withdraw
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
