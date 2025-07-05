import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Info } from "lucide-react";
import { BACKEND_HOST } from "@/constants/config";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    age: "",
    phoneNo: "",
    username: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

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
      const response = await fetch(
        `https://api.sagecombat.com/sendVerificationMail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailId: formData.emailId }),
        }
      );
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
    // if (!isOtpVerified) {
    //   setError("Please verify your email before registering.");
    //   return;
    // }
    setIsLoading(true);
    setError(null);

    try {
      const apiPath = BACKEND_HOST + "registerUser";
      const response = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
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
    <div className="min-h-screen relative flex items-center justify-center bg-background px-2">
      <FloatingHomeButton />
      <Card className="w-full max-w-sm shadow-md border rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-center">
            Create Account
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-y-2">
            {error && (
              <p className="text-xs text-red-500 bg-red-100 p-2 rounded">
                {error}
              </p>
            )}
            {success && (
              <p className="text-xs text-green-600 bg-green-100 p-2 rounded">
                {success}
              </p>
            )}

            <div className="grid gap-1">
              <Label htmlFor="name" className="text-sm">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm"
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="emailId" className="text-sm">
                Email
              </Label>
              <div className="flex gap-2">
                <Input
                  id="emailId"
                  name="emailId"
                  type="email"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
                  disabled={isLoading || isOtpVerified || otpLoading}
                  className="text-sm flex-1"
                />
                {/* <Button
                  type="button"
                  size="sm"
                  onClick={handleSendOtp}
                  disabled={otpLoading || isOtpVerified}
                  variant="secondary"
                >
                  {otpLoading ? "Sending..." : "OTP"}
                </Button> */}
              </div>
            </div>

            {isOtpSent && !isOtpVerified && (
              <div className="grid gap-1 p-2 border rounded-md bg-muted/20">
                <Label htmlFor="otp" className="text-sm">
                  Enter OTP
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    disabled={verifyLoading}
                    className="text-sm flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleVerifyOtp}
                    disabled={verifyLoading}
                  >
                    {verifyLoading ? "..." : "Verify"}
                  </Button>
                </div>
              </div>
            )}

            <div className="grid gap-1">
              <Label htmlFor="age" className="text-sm">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm"
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="phoneNo" className="text-sm">
                Phone
              </Label>
              <Input
                id="phoneNo"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm"
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="username" className="text-sm">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm"
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-2">
            {/* <Button
              type="submit"
              className="w-full text-sm"
              disabled={isLoading || !isOtpVerified}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button> */}
            <Button
              type="submit"
              className="w-full text-sm"
              // disabled={isLoading || !isOtpVerified}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
            <div className="flex items-start gap-2 text-xs text-muted-foreground px-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                Please submit correct details. It will be verified during KYC if you choose to deposit/withdraw real money.
              </p>
            </div>

            <div className="w-full flex justify-between items-center text-xs text-muted-foreground mt-4">
              <p>
                Already registered?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
              {/* <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                  className="flex items-center gap-1 px-2 py-1"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link> */}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
