import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, FileText, CreditCard, Loader2, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { AadhaarVerificationInitiationReq, AadhaarVerificationInitiationResp, OTPGenerationReq, OTPGenerationResp, AADHAAR_KYC_STEPS, PAN_KYC_STEPS, KycStep } from './types';
import { PanVerification } from './PanVerification';
import { KYCProgressBar } from './KYCProgressBar';

interface KYCDialogProps {
  onClose: () => void;
}

export const KYCDialog = ({ onClose }: KYCDialogProps) => {
  const [kycStep, setKycStep] = useState<KycStep>('selection');
  const [activeSteps, setActiveSteps] = useState<readonly KycStep[]>(AADHAAR_KYC_STEPS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [token, setToken] = useState('');
  const [otp, setOtp] = useState('');
  const [refNo, setRefNo] = useState('');
  const [verificationResult, setVerificationResult] = useState<{name: string, dob: string, address: string} | null>(null);

  const getUserId = () => {
    try {
      return Number(JSON.parse(localStorage.getItem("userId") || "0"));
    } catch {
      return 0;
    }
  };

  const getAadhaarCaptcha = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getUserId();
      const requestData = {
        userId,
        aadhaarnumber: aadhaarNumber
      };

      const response = await fetch('https://api.sagecombat.com/getAadhaarCaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const data = await response.json();
        // The API returns a nested structure, check for success codes
        if (data.code === 200 && data.data.respcode === "200") {
          setCaptchaImage(data.data.captcha);
          setToken(data.data.token);
          setKycStep('captcha');
        } else {
          setError(data.data.respdesc || "Failed to generate captcha");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to generate captcha");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateOTP = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getUserId();
      const requestData = {
        userId,
        token: token,
        captcha: captchaInput
      };

      const response = await fetch('https://api.sagecombat.com/generateAadhaarOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
          const data = await response.json();
          if (data.code === 200 && data.data.respcode === "200") {
            setKycStep('otp');
            toast({ title: "OTP Sent", description: data.data.respdesc });
          } else {
             setError(data.data.respdesc || "Failed to generate OTP");
          }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to generate OTP");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyAadhaar = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getUserId();
      const requestData = {
        userId,
        token: token,
        otp: otp
      };

      const response = await fetch('https://api.sagecombat.com/verifyAadhaar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (data.code === 200 && data.data.Verfied === 'true') {
        localStorage.setItem('aadharStatus', 'VERIFIED');
        setKycStep('success');
        // Populate the verification result with data from the API response
        setVerificationResult({ 
          name: data.data.name || 'N/A', 
          dob: data.data.dob || 'N/A', 
          address: data.data.address || 'N/A' 
        });
      } else {
        localStorage.setItem('aadharStatus', 'REJECTED');
        setError(data.data.respdesc || "Aadhaar verification failed. Please check the OTP and try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">KYC Verification</span>
        </DialogTitle>
        <div className="!mt-4">
          {kycStep !== 'selection' && kycStep !== 'pan-verification' && kycStep !== 'success' && (
            <KYCProgressBar currentStep={kycStep} steps={activeSteps} />
          )}
        </div>
      </DialogHeader>
      
      <div className="space-y-4 pt-4">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {kycStep === 'selection' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">Verification methods [both are required]:</p>
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={() => { setKycStep('aadhaar-input'); setActiveSteps(AADHAAR_KYC_STEPS); }} className="flex items-center justify-center h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Aadhaar Verification
              </Button>
              <Button onClick={() => { setKycStep('pan-verification'); setActiveSteps(PAN_KYC_STEPS); }} className="flex items-center justify-center h-12 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white">
                <CreditCard className="w-4 h-4 mr-2" />
                PAN Verification
              </Button>
            </div>
          </div>
        )}

        {kycStep === 'pan-verification' && (
          <PanVerification 
            onSuccess={() => setKycStep('success')} 
            onBack={() => { setKycStep('selection'); setActiveSteps(AADHAAR_KYC_STEPS); }} 
          />
        )}

        {kycStep === 'aadhaar-input' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="aadhaar" className="text-sm font-medium">Aadhaar Number</label>
              <Input id="aadhaar" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} placeholder="Enter your 12-digit Aadhaar" className="mt-1" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setKycStep('selection')} variant="outline" className="w-full">Back</Button>
              <Button onClick={getAadhaarCaptcha} disabled={loading || aadhaarNumber.length !== 12} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Get Captcha
              </Button>
            </div>
          </div>
        )}

        {kycStep === 'captcha' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img src={`data:image/jpeg;base64,${captchaImage}`} alt="Captcha" className="rounded-lg border" />
            </div>
            <div>
              <label htmlFor="captcha" className="text-sm font-medium">Captcha</label>
              <Input id="captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Enter captcha from image" className="mt-1" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setKycStep('selection')} variant="outline" className="w-full">Back</Button>
              <Button onClick={generateOTP} disabled={loading || !captchaInput} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Generate OTP
              </Button>
            </div>
          </div>
        )}

        {kycStep === 'otp' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="text-sm font-medium">Enter OTP</label>
              <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" className="mt-1" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setKycStep('selection')} variant="outline" className="w-full">Back</Button>
              <Button onClick={verifyAadhaar} disabled={loading || otp.length !== 6} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Verify OTP
              </Button>
            </div>
          </div>
        )}

        {kycStep === 'success' && verificationResult && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-12 h-12 bg-green-200 dark:bg-green-800/60 rounded-full flex items-center justify-center animate-pulse">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Verification Successful!</h3>
            <p className="text-sm text-gray-500">Your KYC has been completed successfully.</p>
            <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-left border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Name:</span>
                <span className="text-sm font-medium">{verificationResult.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">DOB:</span>
                <span className="text-sm font-medium">{verificationResult.dob}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-500">Address:</span>
                <span className="text-sm font-medium text-right max-w-[70%]">{verificationResult.address}</span>
              </div>
            </div>
            <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white">Done</Button>
          </div>
        )}
      </div>
    </DialogContent>
  );
};
