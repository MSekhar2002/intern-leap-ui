import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { NavLink } from "@/components/NavLink";
import { 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Checkout() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "failed">("idle");

  // Mock course data
  const course = {
    id: courseId || "1",
    title: "Full Stack Web Development",
    price: 9999,
    originalPrice: 14999,
    duration: "12 weeks",
    features: [
      "48 video lessons",
      "Lifetime access",
      "Certificate of completion",
      "Priority support",
      "Job placement assistance"
    ]
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Razorpay integration placeholder
      console.log("=== RAZORPAY INTEGRATION PLACEHOLDER ===");
      console.log("Course:", course.title);
      console.log("Amount:", course.price);
      console.log("Payment Method:", paymentMethod);
      console.log("Add Razorpay SDK and API integration here");
      console.log("=====================================");

      // Simulate success (90% success rate for demo)
      const success = Math.random() > 0.1;
      
      setProcessing(false);
      if (success) {
        setPaymentStatus("success");
        toast({
          title: "Payment Successful!",
          description: "Welcome to the course. Check your email for access details.",
        });
      } else {
        setPaymentStatus("failed");
        toast({
          title: "Payment Failed",
          description: "Please try again or use a different payment method.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4 pt-24">
          <Card className="glass max-w-lg w-full text-center animate-scale-in">
            <CardContent className="pt-12 pb-8 space-y-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mx-auto">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Payment Successful!</h2>
                <p className="text-muted-foreground">
                  Your enrollment is confirmed. A receipt has been sent to your email.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/50 space-y-2">
                <div className="text-sm text-muted-foreground">Course</div>
                <div className="font-semibold">{course.title}</div>
                <div className="text-2xl font-bold text-primary">₹{course.price.toLocaleString()}</div>
              </div>
              <div className="flex flex-col gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <NavLink to="/dashboard">Go to Dashboard</NavLink>
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  Download Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4 pt-24">
          <Card className="glass max-w-lg w-full text-center animate-scale-in">
            <CardContent className="pt-12 pb-8 space-y-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mx-auto">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Payment Failed</h2>
                <p className="text-muted-foreground">
                  We couldn't process your payment. Please try again.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  variant="gradient" 
                  size="lg"
                  onClick={() => setPaymentStatus("idle")}
                >
                  Try Again
                </Button>
                <Button variant="outline" asChild>
                  <NavLink to="/courses">Back to Courses</NavLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <NavLink to="/courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </NavLink>
          </Button>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass border-2 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Payment Details</CardTitle>
                  <CardDescription>Choose your payment method and complete checkout</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="space-y-3">
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 p-4 rounded-xl border-2 border-border hover:border-primary transition-colors cursor-pointer">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                            <CreditCard className="h-5 w-5" />
                            <span>Credit / Debit Card</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 rounded-xl border-2 border-border hover:border-primary transition-colors cursor-pointer">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Smartphone className="h-5 w-5" />
                            <span>UPI</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              type="password"
                              placeholder="123"
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="username@upi"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Razorpay Integration Note */}
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <div className="font-medium text-sm">Razorpay Integration Placeholder</div>
                          <div className="text-xs text-muted-foreground">
                            This is a UI demonstration. In production, integrate Razorpay SDK here for secure payment processing.
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="gradient" 
                      size="lg" 
                      className="w-full"
                      disabled={processing}
                    >
                      {processing ? "Processing..." : `Pay ₹${course.price.toLocaleString()}`}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By completing this purchase, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="glass border-2 sticky top-24 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="font-semibold">{course.title}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary">{course.duration}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <ul className="space-y-2 text-sm">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Original Price</span>
                      <span className="line-through text-muted-foreground">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-green-600 font-medium">
                        -₹{(course.originalPrice - course.price).toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-2xl">₹{course.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-secondary/50 text-sm text-center">
                    <div className="font-medium text-green-600 mb-1">
                      🎉 Limited Time Offer
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Save ₹{(course.originalPrice - course.price).toLocaleString()} with this special price
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
