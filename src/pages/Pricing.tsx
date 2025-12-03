import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NavLink } from "@/components/NavLink";
import { CheckCircle2, Sparkles, Zap, Crown } from "lucide-react";

export default function Pricing() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedIn = user?.id? false : true;

  const workshop = {
    name: "AI & Machine Learning Workshop",
    price: "₹2,999",
    originalPrice: "₹9,999",
    period: "one-time",
    description: "Complete AI workshop with hands-on projects and certification",
    icon: Zap,
    features: [
      "8 weeks intensive training",
      "40+ hours of live sessions",
      "5 real-world AI projects",
      "Python, TensorFlow & PyTorch",
      "Neural networks & deep learning",
      "Computer vision & NLP basics",
      "Expert mentor guidance",
      "Industry-recognized certificate",
      "Lifetime workshop access",
      "AI career resources",
      "Community support",
      "Job placement assistance"
    ]
  };

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee on all plans. No questions asked."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees. The price you see is what you pay. All features included in your plan."
    },
    {
      question: "Can I pause my subscription?",
      answer: "Yes, you can pause your subscription for up to 3 months without losing your progress."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Master AI for Just{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ₹2,999
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Limited time offer - 70% off! Enroll now and start your AI journey today.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="relative glass hover-lift border-2 border-primary shadow-glow animate-fade-in">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">
                  🎉 70% OFF - Limited Time
                </div>
              </div>

              <CardHeader className="text-center pb-8 pt-12">
                <div className="flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-primary mx-auto mb-6">
                  <workshop.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl mb-3">{workshop.name}</CardTitle>
                <CardDescription className="text-lg">{workshop.description}</CardDescription>
                <div className="pt-6 space-y-2">
                  <div className="text-lg text-muted-foreground line-through">
                    {workshop.originalPrice}
                  </div>
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-5xl font-bold">{workshop.price}</span>
                    <span className="text-muted-foreground mb-2">{workshop.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {workshop.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="w-full text-lg"
                  asChild
                >
                  <NavLink to={loggedIn?"/signup":"/courses"}>Enroll Now</NavLink>
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  30-day money-back guarantee • Secure payment via Razorpay
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="glass border-2 overflow-hidden max-w-4xl mx-auto">
            <div className="relative p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-gradient-primary opacity-5" />
              <div className="relative space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our team is here to help you choose the right plan for your needs.
                </p>
                <Button variant="gradient" size="lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
