"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BACKEND_HOST } from "@/constants/config";

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

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailId: "",
        phoneNo: "",
        password: "",
    });
    const [loginMethod, setLoginMethod] = useState("email");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [publicKey, setPublicKey] = useState<CryptoKey | null>(null);

    useEffect(() => {
        const importPublicKey = async () => {
            try {
                const publicKeyPem = import.meta.env.VITE_PUBLIC_KEY_ENCRYPTION;
                // console.log("VITE_PUBLIC_KEY_ENCRYPTION", publicKeyPem);
                if (!publicKeyPem) {
                    console.error("Public key not found in environment variables.");
                    setError("Configuration error: Cannot perform login.");
                    return;
                }

                const keyBuffer = pemToArrayBuffer(atob(publicKeyPem)); // Decode base64 then convert
                const cryptoKey = await window.crypto.subtle.importKey(
                    "spki",
                    keyBuffer,
                    {
                        name: "RSA-OAEP",
                        hash: "SHA-256",
                    },
                    true, // must be true for encryption
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
        const checkLoginStatus = () => {
            if (localStorage.getItem('isAuthenticated') === 'true') {
                navigate('/');
            }
        };
        checkLoginStatus();
        }, [navigate]);

    const FloatingHomeButton = () => (
        <div className="fixed bottom-4 left-4 z-50">
          <Link to="/">
            <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 animate-spin-slow">
              <div className="rounded-full bg-background p-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-14 w-14 rounded-full text-foreground hover:scale-105 transition-transform"
                >
                  <Home size={32} />
    
                </Button>
              </div>
            </div>
          </Link>
        </div>
      );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!publicKey) {
            setError("Security features are not initialized. Please wait a moment and try again.");
            setIsLoading(false);
            return;
        }

        try {
            const payload = loginMethod === "email" ? { username: formData.emailId, password: formData.password } : { phoneNo: formData.phoneNo, password: formData.password };
            const encodedPayload = new TextEncoder().encode(JSON.stringify(payload));

            const encryptedBuffer = await window.crypto.subtle.encrypt(
                { name: "RSA-OAEP" },
                publicKey,
                encodedPayload
            );

            const encryptedArray = new Uint8Array(encryptedBuffer);
            const b64Encrypted = btoa(String.fromCharCode.apply(null, Array.from(encryptedArray)));

            const encryptedPayload = { data: b64Encrypted };

            const apiPath = BACKEND_HOST + 'authenticateUser';
            const response = await fetch(apiPath, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(encryptedPayload),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem("userId", JSON.stringify(data.data.id));
                localStorage.setItem("userName", JSON.stringify(data.data.name));
                localStorage.setItem("userEmail", JSON.stringify(data.data.emailId));
                localStorage.setItem("userAge", JSON.stringify(data.data.age));
                localStorage.setItem("userPhone", JSON.stringify(data.data.phoneNo));
                localStorage.setItem("userUsername", JSON.stringify(data.data.username));
                localStorage.setItem("aadharStatus", JSON.stringify(data.data.aadharStatus));
                localStorage.setItem("panStatus", JSON.stringify(data.data.panStatus));

                toast({ title: "Login successful", description: `Welcome back, ${data.data.name}!` });
                navigate("/");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            setError("Failed to connect to server. Please ensure the backend is running.");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle forgot password request
    const handleForgotPassword = async () => {
        if (!resetEmail) return toast({ title: "Error", description: "Please enter your email", variant: "destructive" });

        try {
            const apiPath = BACKEND_HOST + 'resetPasswdMail';
            const response = await fetch(apiPath, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailId: resetEmail }),
            });

            const data = await response.json();
            if (response.ok) {
                toast({ title: "Email Sent", description: "Check your inbox for reset link." });
                setShowForgotPassword(false);
            } else {
                toast({ title: "Error", description: data.message, variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to send email. Try again later.", variant: "destructive" });
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-background px-2">
            <FloatingHomeButton />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && <div className="text-red-500 text-sm p-2 bg-red-100 rounded">{error}</div>}

                        <div className="flex space-x-4 mb-4">
                            <Button variant={loginMethod === "email" ? "default" : "outline"} onClick={() => setLoginMethod("email")} className="flex-1" disabled={isLoading}>
                                Email
                            </Button>
                            <Button variant={loginMethod === "phone" ? "default" : "outline"} onClick={() => setLoginMethod("phone")} className="flex-1" disabled={isLoading}>
                                Phone
                            </Button>
                        </div>

                        {loginMethod === "email" ? (
                            <div className="space-y-2">
                                <Label htmlFor="emailId">Email</Label>
                                <Input id="emailId" name="emailId" type="email" value={formData.emailId} onChange={handleChange} required disabled={isLoading} />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="phoneNo">Phone Number</Label>
                                <Input id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required disabled={isLoading} />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required disabled={isLoading} />
                        </div>

                        <p className="text-sm text-right text-blue-600 cursor-pointer hover:underline" onClick={() => setShowForgotPassword(true)}>Forgot Password?</p>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                        <div className="flex w-full justify-between">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
                            </p>

                        </div>
                    </CardFooter>
                </form>
            </Card>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Card className="w-full max-w-sm bg-white shadow-lg p-6 rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-lg">Reset Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label htmlFor="resetEmail">Enter your email</Label>
                            <Input id="resetEmail" type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setShowForgotPassword(false)}>Cancel</Button>
                            <Button onClick={handleForgotPassword}>Next</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Login;
