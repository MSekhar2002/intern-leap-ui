import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavLink } from "@/components/NavLink";
import { GraduationCap, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [phoneData, setPhoneData] = useState({
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    navigate("/dashboard");
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Check your phone for the verification code.",
      });
    } else {
      toast({
        title: "Verified!",
        description: "Phone number verified successfully.",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-subtle">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center animate-fade-in">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-primary">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <span>LearnHub</span>
          </NavLink>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              Welcome{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Back
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Continue your learning journey and unlock your potential.
            </p>
          </div>

          <Card className="glass">
            <CardContent className="pt-6">
              <blockquote className="space-y-2">
                <p className="text-base italic">
                  "LearnHub transformed my career. The mentorship and hands-on projects gave me 
                  the confidence to land my dream job."
                </p>
                <footer className="text-sm text-muted-foreground">
                  — Sarah Johnson, Software Engineer
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Login Form */}
        <Card className="glass shadow-elevated border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Log In</CardTitle>
            <CardDescription>Access your account to continue learning</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone OTP</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={emailData.email}
                        onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={emailData.password}
                        onChange={(e) => setEmailData({ ...emailData, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={emailData.remember}
                      onCheckedChange={(checked) =>
                        setEmailData({ ...emailData, remember: checked as boolean })
                      }
                    />
                    <label htmlFor="remember" className="text-sm cursor-pointer">
                      Remember me
                    </label>
                  </div>

                  <Button type="submit" variant="gradient" size="lg" className="w-full">
                    Log In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={handlePhoneLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phoneData.phone}
                        onChange={(e) => setPhoneData({ ...phoneData, phone: e.target.value })}
                        className="pl-10"
                        required
                        disabled={otpSent}
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={phoneData.otp}
                        onChange={(e) => setPhoneData({ ...phoneData, otp: e.target.value })}
                        required
                        maxLength={6}
                      />
                      <p className="text-sm text-muted-foreground">
                        Didn't receive code?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            toast({
                              title: "OTP Resent",
                              description: "A new code has been sent to your phone.",
                            });
                          }}
                          className="text-primary hover:underline"
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                  )}

                  <Button type="submit" variant="gradient" size="lg" className="w-full">
                    {otpSent ? "Verify OTP" : "Send OTP"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
