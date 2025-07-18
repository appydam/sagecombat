import { useState, useEffect } from 'react';

// Helper function to convert PEM key to ArrayBuffer
function pemToArrayBuffer(pem: string) {
  const b64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, "")
    .replace(/-----END PUBLIC KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(b64);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PanVerificationProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const PanVerification = ({ onSuccess, onBack }: PanVerificationProps) => {
  const [panNumber, setPanNumber] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<CryptoKey | null>(null);

  useEffect(() => {
    const importPublicKey = async () => {
        try {
            const publicKeyPem = import.meta.env.VITE_PUBLIC_KEY_ENCRYPTION;
            if (!publicKeyPem) {
                console.error("Public key not found in environment variables.");
                setError("Configuration error: Cannot perform verification.");
                return;
            }

            const keyBuffer = pemToArrayBuffer(atob(publicKeyPem));
            const cryptoKey = await window.crypto.subtle.importKey(
                "spki",
                keyBuffer,
                {
                    name: "RSA-OAEP",
                    hash: "SHA-256",
                },
                true,
                ["encrypt"]
            );
            setPublicKey(cryptoKey);
        } catch (err) {
            console.error("Error importing public key:", err);
            setError("Failed to initialize security features.");
        }
    };

    importPublicKey();
  }, []);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      try {
        setNameOnCard(JSON.parse(storedUserName));
      } catch (e) {
        setNameOnCard(storedUserName); // Fallback if not JSON
      }
    }
  }, []);

  const getUserId = () => {
    try {
      return Number(JSON.parse(localStorage.getItem('userId') || '0'));
    } catch {
      return 0;
    }
  };

  const handleVerifyPan = async () => {
    setLoading(true);
    setError(null);

    const userId = getUserId();
    if (!userId) {
      setError('User not found. Please log in again.');
      setLoading(false);
      return;
    }

    if (!publicKey) {
      setError("Security features not initialized. Please try again.");
      setLoading(false);
      return;
    }

    const requestData = {
      pannumber: panNumber.toUpperCase(),
      userId,
      nameoncard: nameOnCard,
      father_name: fatherName,
      dob,
    };

    const encodedPayload = new TextEncoder().encode(JSON.stringify(requestData));

    const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedPayload
    );

    const encryptedArray = new Uint8Array(encryptedBuffer);
    const b64Encrypted = btoa(String.fromCharCode.apply(null, Array.from(encryptedArray)));

    const encryptedPayload = { data: b64Encrypted };

    try {
      const response = await fetch('https://api.sagecombat.com/verifyPan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(encryptedPayload),
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        localStorage.setItem('panStatus', 'VERIFIED');
        toast({ title: 'Success', description: 'PAN verification successful!' });
        onSuccess();
      } else {
        localStorage.setItem('panStatus', 'REJECTED');
        setError(data.message || data.data?.respdesc || 'PAN verification failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = panNumber.length === 10 && fatherName.trim() !== '' && dob.match(/^\d{2}\/\d{2}\/\d{4}$/);

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      <div>
        <label htmlFor="panNumber" className="text-sm font-medium">PAN Number</label>
        <Input id="panNumber" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} placeholder="ABCDE1234F" maxLength={10} className="mt-1" />
      </div>
      <div>
        <label htmlFor="nameOnCard" className="text-sm font-medium">Name on Card</label>
        <Input id="nameOnCard" value={nameOnCard} readOnly disabled className="mt-1 bg-gray-100 dark:bg-gray-800" />
      </div>
      <div>
        <label htmlFor="fatherName" className="text-sm font-medium">Father's Name</label>
        <Input id="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} placeholder="Enter father's name" className="mt-1" />
      </div>
      <div>
        <label htmlFor="dob" className="text-sm font-medium">Date of Birth (DD/MM/YYYY)</label>
        <Input id="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="28/03/2000" className="mt-1" />
      </div>
      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">Back</Button>
        <Button onClick={handleVerifyPan} disabled={loading || !isFormValid} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />} Verify PAN
        </Button>
      </div>
    </div>
  );
};
