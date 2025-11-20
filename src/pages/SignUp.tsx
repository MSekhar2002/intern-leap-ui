import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { NavLink } from "@/components/NavLink";
import { GraduationCap, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Success toast
    toast({
      title: "Welcome aboard!",
      description: "Your account is ready. Check your email for next steps.",
    });

    console.log("Sign up data:", formData);
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
              Start Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join thousands of learners transforming their careers with premium internship programs.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0 mt-0.5">
                1
              </div>
              <div>
                <div className="font-semibold">Create your account</div>
                <div className="text-sm text-muted-foreground">Quick and easy signup process</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <div className="font-semibold">Choose your course</div>
                <div className="text-sm text-muted-foreground">Browse our industry-focused programs</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <div className="font-semibold">Start learning</div>
                <div className="text-sm text-muted-foreground">Access courses instantly</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="glass shadow-elevated border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, agreeToTerms: checked as boolean })
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-tight cursor-pointer"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <NavLink to="/login" className="text-primary hover:underline font-medium">
                  Log in
                </NavLink>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
