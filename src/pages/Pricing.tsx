import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NavLink } from "@/components/NavLink";
import { CheckCircle2, Sparkles, Zap, Crown } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "₹4,999",
      period: "/month",
      description: "Perfect for beginners starting their learning journey",
      icon: Sparkles,
      features: [
        "1 course access",
        "Basic mentorship",
        "Community support",
        "Certificate of completion",
        "Email support",
      ],
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Professional",
      price: "₹9,999",
      period: "/month",
      description: "Most popular choice for serious learners",
      icon: Zap,
      features: [
        "3 courses access",
        "Priority mentorship",
        "Live Q&A sessions",
        "Professional certificates",
        "Job placement assistance",
        "24/7 support",
      ],
      popular: true,
      variant: "gradient" as const
    },
    {
      name: "Enterprise",
      price: "₹19,999",
      period: "/month",
      description: "For teams and organizations",
      icon: Crown,
      features: [
        "Unlimited course access",
        "Dedicated mentor",
        "Custom learning paths",
        "Advanced certificates",
        "Priority job placement",
        "Team management tools",
        "API access",
      ],
      popular: false,
      variant: "outline" as const
    }
  ];

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
              Simple, Transparent{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that best fits your learning goals. All plans include access to our platform and community.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative glass hover-lift border-2 ${
                  plan.popular ? "border-primary shadow-glow scale-105" : ""
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-primary mx-auto mb-4">
                    <plan.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base pt-2">{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.variant} 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <NavLink to="/signup">Get Started</NavLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
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
