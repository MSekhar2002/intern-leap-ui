import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { NavLink } from "@/components/NavLink";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import oscowlLogo from "@/assets/oscowl-logo.png";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailData.email, password: emailData.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast({ title: "Welcome back!", description: "You have successfully logged in." });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ variant: 'destructive', title: "Error", description: err.message });
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-foreground/5 -translate-x-1/2" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full border border-foreground/5 translate-x-1/2" />
        
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center animate-fade-in relative">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <NavLink to="/" className="flex items-center gap-3 font-bold text-2xl">
              <img src={oscowlLogo} alt="Oscowl Learn" className="h-12 w-12 rounded-xl object-contain" />
              <span>Oscowl Learn</span>
            </NavLink>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                Welcome{" "}
                <span className="text-gradient">
                  Back
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Continue your learning journey and unlock your potential.
              </p>
            </div>

            <Card className="glass border-border/50">
              <CardContent className="pt-6">
                <blockquote className="space-y-2">
                  <p className="text-base italic text-muted-foreground">
                    "Oscowl Learn transformed my career. The mentorship and hands-on projects gave me 
                    the confidence to land my dream job."
                  </p>
                  <footer className="text-sm text-foreground">
                    — Sarah Johnson, Software Engineer
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Login Form */}
          <Card className="glass border-border/50 shadow-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Log In</CardTitle>
              <CardDescription>Access your account to continue learning</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
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
                      className="pl-10 bg-secondary border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
                      className="pl-10 bg-secondary border-border"
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
                  <label htmlFor="remember" className="text-sm cursor-pointer text-muted-foreground">
                    Remember me
                  </label>
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  Log In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <NavLink to="/signup" className="text-foreground hover:underline font-medium">
                  Sign up
                </NavLink>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
