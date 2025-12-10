import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { BACKEND_HOST } from "@/constants/config";

const passwordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("code") || "";
    
    const [isValid, setIsValid] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [expirationTime, setExpirationTime] = useState<number | null>(null);
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [isLoading, setIsLoading] = useState(false);

    const SECRET_KEY = import.meta.env.VITE_RESET_PASSWORD_KEY;

    const getCryptoKey = async () => {
        const secretKeyBase64 = SECRET_KEY;
        const keyBuffer = Uint8Array.from(atob(secretKeyBase64), c => c.charCodeAt(0));
        return crypto.subtle.importKey(
            "raw",
            keyBuffer,
            { name: "AES-GCM" },
            false,
            ["decrypt", "encrypt"]
        );
    };

    const parseEncodedToken = (encodedToken: string) => {
        try {
            const decodedToken = decodeURIComponent(encodedToken); // Decode URL encoding
            const base64Token = decodedToken.replace(/-/g, '+').replace(/_/g, '/'); // Convert URL-safe Base64
            const rawData = Uint8Array.from(atob(base64Token), c => c.charCodeAt(0)); // Decode Base64
            return { iv: rawData.slice(0, 12), encryptedData: rawData.slice(12) };
        } catch (error) {
            console.error("Token parsing error:", error);
            throw new Error("Invalid token format.");
        }
    };

    const decryptToken = async (encodedToken: string) => {
        try {
            const key = await getCryptoKey();
            const { iv, encryptedData } = parseEncodedToken(encodedToken);
            console.log("Frontend: IV -", iv);
            console.log("Frontend: Encrypted Data -", encryptedData);
            const decryptedData = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedData);
            const { userId, expirationTime } = JSON.parse(new TextDecoder().decode(decryptedData));
            
            if (Date.now() > expirationTime) {
                toast.error("Reset link has expired.");
                navigate("/login");
                return;
            }
            
            setUserId(userId);
            setExpirationTime(expirationTime);
            setIsValid(true);
        } catch(err) {
            console.error("Decryption error:", err);
            toast.error("Invalid reset link.");
            navigate("/login");
        }
    };

    useEffect(() => { if (token) decryptToken(token); }, [token]);

    const encryptToken = async (data: object) => {
        const key = await getCryptoKey();
        const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM nonce
        const encodedData = new TextEncoder().encode(JSON.stringify(data));
        const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encodedData);
        
        // Log encrypted token
        console.log("Frontend: IV (nonce) -", iv);
        console.log("Frontend: Encrypted Data -", new Uint8Array(encryptedData));

        const combined = new Uint8Array(iv.length + encryptedData.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(encryptedData), iv.length);

        const token = btoa(String.fromCharCode(...combined)); // Base64 encode
        console.log("Frontend: Token (Base64) -", token);
        return token;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordSchema.safeParse(formData).success) return;

        setIsLoading(true);
        try {
            const newToken = await encryptToken({ userId, expirationTime, password: formData.password });
            const response = await fetch(`${BACKEND_HOST}updatePasswd`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: newToken }),
            });

            if (response.ok) {
                toast.success("Password reset successfully");
                navigate("/login");
            } else {
                toast.error("Password reset failed");
            }
        } catch {
            toast.error("Error resetting password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader><CardTitle className="text-2xl">Reset Password</CardTitle></CardHeader>
                {isValid ? (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <Label>Password</Label>
                            <Input name="password" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                            <Label>Confirm Password</Label>
                            <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} required />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Resetting..." : "Reset Password"}</Button>
                        </CardFooter>
                    </form>
                ) : (
                    <CardContent><p className="text-center text-destructive">Invalid or expired link.</p></CardContent>
                )}
            </Card>
        </div>
    );
};

export default ResetPassword;