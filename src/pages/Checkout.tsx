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

  // AI Workshop data
  const course = {
    id: courseId || "ai-workshop",
    title: "AI & Machine Learning Workshop",
    price: 2999,
    originalPrice: 9999,
    duration: "8 weeks",
    features: [
      "40+ hours live sessions",
      "5 real-world AI projects",
      "Python, TensorFlow & PyTorch",
      "Expert mentor guidance",
      "Industry certificate",
      "Lifetime workshop access",
      "AI career resources"
    ]
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const token = localStorage.getItem('token');
    if (!token) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please log in first' });
      navigate('/login');
      setProcessing(false);
      return;
    }

    try {
      // Create order
      const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error('Failed to create order');

      // Load Razorpay SDK
      const loadRazorpay = () => new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      const res = await loadRazorpay();
      if (!res) throw new Error('Razorpay SDK failed to load');

      const options = {
        key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'LearnHub',
        description: course.title,
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            // Update local user
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            storedUser.isEnrolled = true;
            localStorage.setItem('user', JSON.stringify(storedUser));
            setPaymentStatus('success');
            toast({ title: 'Payment Successful!', description: 'Welcome to the course.' });
          } else {
            throw new Error('Payment verification failed');
          }
        },
        theme: { color: '#3399cc' },
      };

      // const paymentObject = new window.Razorpay(options);
      // paymentObject.open();
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
      setPaymentStatus('failed');
    } finally {
      setProcessing(false);
    }
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
                  <NavLink to="/workshop">View Workshop Details</NavLink>
                </Button>
                <Button variant="outline" asChild>
                  <NavLink to="/dashboard">Go to Dashboard</NavLink>
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
                      {/* <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
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
                      </RadioGroup> */}
                    </div>

                    {/* {paymentMethod === "card" && (
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
                    )} */}

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
