import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NavLink } from "@/components/NavLink";
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Clock,
  Target
} from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

export default function Landing() {
  const features = [
    {
      icon: BookOpen,
      title: "Industry-Focused Curriculum",
      description: "Learn skills that employers actually need with our carefully curated courses."
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals with years of real-world experience."
    },
    {
      icon: Award,
      title: "Recognized Certificates",
      description: "Earn certificates that boost your resume and validate your expertise."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Access exclusive job opportunities and fast-track your career development."
    }
  ];

  const benefits = [
    "Hands-on project experience",
    "Flexible learning schedule",
    "Live Q&A sessions",
    "Community support",
    "Job placement assistance",
    "Lifetime course access"
  ];

  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "95%", label: "Success Rate" },
    { number: "500+", label: "Companies Hiring" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Limited spots available for 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Launch Your Career with{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Premium Internships
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Join thousands of ambitious learners transforming their careers through industry-recognized 
                internship programs. Real projects, real mentorship, real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" size="lg" asChild className="text-base">
                  <NavLink to="/courses">Explore Courses</NavLink>
                </Button>
                <Button variant="outline" size="lg" asChild className="text-base">
                  <NavLink to="/pricing">View Pricing</NavLink>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-2xl font-bold">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="Students learning together in modern environment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-primary rounded-3xl blur-3xl opacity-20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose LearnHub?
            </h2>
            <p className="text-lg text-muted-foreground">
              We combine cutting-edge curriculum with practical experience to prepare you for success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass hover-lift border-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-primary mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground">
                Our comprehensive platform provides all the tools, resources, and support 
                you need to excel in your internship journey.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button variant="gradient" size="lg" asChild className="mt-6">
                <NavLink to="/signup">Get Started Today</NavLink>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="glass p-6 space-y-2">
                <Clock className="h-8 w-8 text-primary" />
                <div className="text-2xl font-bold">Flexible</div>
                <p className="text-sm text-muted-foreground">Learn at your own pace</p>
              </Card>
              <Card className="glass p-6 space-y-2 mt-8">
                <Target className="h-8 w-8 text-accent" />
                <div className="text-2xl font-bold">Focused</div>
                <p className="text-sm text-muted-foreground">Industry-relevant skills</p>
              </Card>
              <Card className="glass p-6 space-y-2 -mt-4">
                <Award className="h-8 w-8 text-primary-coral" />
                <div className="text-2xl font-bold">Certified</div>
                <p className="text-sm text-muted-foreground">Recognized credentials</p>
              </Card>
              <Card className="glass p-6 space-y-2 mt-4">
                <Users className="h-8 w-8 text-primary-teal" />
                <div className="text-2xl font-bold">Supported</div>
                <p className="text-sm text-muted-foreground">Expert mentorship</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="glass border-2 overflow-hidden">
            <div className="relative p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-gradient-primary opacity-5" />
              <div className="relative space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join LearnHub today and take the first step towards your dream career. 
                  Limited spots available for our upcoming cohort.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button variant="gradient" size="lg" asChild>
                    <NavLink to="/signup">Create Account</NavLink>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <NavLink to="/courses">Browse Courses</NavLink>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
