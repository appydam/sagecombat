
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { BACKEND_HOST } from "@/constants/config";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        emailId: "",
        age: "",
        phoneNo: "",
        username: "",
        password: ""
    });
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        if (!formData.emailId) {
            setError("Please enter your email address first.");
            return;
        }
        setOtpLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch(`https://api.sagecombat.com/sendVerificationMail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailId: formData.emailId }),
            });
            const data = await response.json();
            if (response.ok && data.code === 200) {
                setIsOtpSent(true);
                setSuccess("OTP has been sent to your email.");
            } else {
                setError(data.message || "Failed to send OTP.");
            }
        } catch (err) {
            setError("An error occurred while sending OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        setVerifyLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch(`https://api.sagecombat.com/verifyOtp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailId: formData.emailId, otp }),
            });
            const data = await response.json();
            if (response.ok && data.data.is_verified) {
                setIsOtpVerified(true);
                setSuccess("Email verified successfully!");
                setError(null);
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            setError("An error occurred during OTP verification.");
        } finally {
            setVerifyLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isOtpVerified) {
            setError("Please verify your email before registering.");
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const apiPath = BACKEND_HOST + 'registerUser';
            const response = await fetch(apiPath, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    age: parseInt(formData.age)
                }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("virtualBalance", "100000");
                navigate("/login");
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("Failed to connect to server.");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && <div className="text-red-500 text-sm p-2 bg-red-100 rounded">{error}</div>}
                        {success && <div className="text-green-500 text-sm p-2 bg-green-100 rounded">{success}</div>}
                        
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required disabled={isLoading} />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="emailId">Email</Label>
                            <div className="flex items-center space-x-2">
                                <Input id="emailId" name="emailId" type="email" value={formData.emailId} onChange={handleChange} required disabled={isLoading || isOtpVerified || otpLoading} />
                                <Button type="button" onClick={handleSendOtp} disabled={otpLoading || isOtpVerified}>
                                    {otpLoading ? "Sending..." : "Get OTP"}
                                </Button>
                            </div>
                        </div>

                        {isOtpSent && !isOtpVerified && (
                            <div className="space-y-2 p-4 border rounded-lg bg-secondary/20">
                                <Label htmlFor="otp">Enter OTP</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="otp" name="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required disabled={verifyLoading} />
                                    <Button type="button" onClick={handleVerifyOtp} disabled={verifyLoading}>
                                        {verifyLoading ? "Verifying..." : "Verify OTP"}
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phoneNo">Phone Number</Label>
                            <Input id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" value={formData.username} onChange={handleChange} required disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required disabled={isLoading} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading || !isOtpVerified}>
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                        <div className="flex w-full justify-between">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary hover:underline">Login</Link>
                            </p>
                            <Link to="/">
                                <Button variant="outline" className="rounded-full" disabled={isLoading}>
                                    <Home className="w-4 h-4 mr-2" />
                                    Return to Home
                                </Button>
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Register;
