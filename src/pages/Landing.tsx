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
  Target,
  ArrowRight
} from "lucide-react";
import oscowlLogo from "@/assets/oscowl-logo.png";

export default function Landing() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedIn = user?.id ? false : true;

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive AI Curriculum",
      description: "Master machine learning, deep learning, neural networks, and AI applications."
    },
    {
      icon: Users,
      title: "Expert AI Mentors",
      description: "Learn from experienced AI practitioners working at top tech companies."
    },
    {
      icon: Award,
      title: "Industry Certificate",
      description: "Earn a recognized AI workshop certificate to showcase your expertise."
    },
    {
      icon: TrendingUp,
      title: "Career-Ready Skills",
      description: "Build real-world AI projects and prepare for AI/ML roles in the industry."
    }
  ];

  const benefits = [
    "Build 5+ AI projects",
    "Learn Python for AI/ML",
    "Master TensorFlow & PyTorch",
    "Live coding sessions",
    "AI career guidance",
    "Lifetime workshop access"
  ];

  const stats = [
    { number: "5K+", label: "Students Enrolled" },
    { number: "8 Weeks", label: "Duration" },
    { number: "Live Projects", label: "Hands-on Learning" },
    { number: "₹2,999", label: "Special Price" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Decorative elements inspired by logo */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-foreground/5 -translate-x-1/2" />
        <div className="absolute top-32 left-20 w-48 h-48 rounded-full border border-foreground/5 -translate-x-1/2" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-foreground/5 translate-x-1/2" />
        <div className="absolute top-32 right-20 w-48 h-48 rounded-full border border-foreground/5 translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Limited spots available for 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Master AI & Machine Learning with{" "}
              <span className="text-gradient">
                Expert-Led Workshop
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our intensive AI workshop and learn cutting-edge machine learning, neural networks, 
              and practical AI applications. Transform your career in just 8 weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="gradient" size="lg" asChild className="text-base">
                <NavLink to="/pricing">
                  Enroll Now - ₹2,999
                  <ArrowRight className="ml-2 h-5 w-5" />
                </NavLink>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base">
                <NavLink to="/courses">Learn More</NavLink>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1 text-center">
                  <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logo showcase section */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={oscowlLogo} 
                alt="Oscowl Learn" 
                className="w-32 h-32 md:w-40 md:h-40 animate-float"
              />
              <div className="absolute inset-0 blur-3xl bg-foreground/10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our AI Workshop?
            </h2>
            <p className="text-lg text-muted-foreground">
              Hands-on AI training with real-world projects and expert guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass hover-lift border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary border border-border mb-4">
                    <feature.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground">
                Our comprehensive platform provides all the tools, resources, and support 
                you need to excel in your AI learning journey.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button variant="gradient" size="lg" asChild className="mt-6">
                <NavLink to={loggedIn ? "/signup" : "/courses"}>Get Started Today</NavLink>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="glass p-6 space-y-2 border-border/50 card-glow">
                <Clock className="h-8 w-8 text-foreground" />
                <div className="text-2xl font-bold">Flexible</div>
                <p className="text-sm text-muted-foreground">Learn at your own pace</p>
              </Card>
              <Card className="glass p-6 space-y-2 mt-8 border-border/50 card-glow">
                <Target className="h-8 w-8 text-foreground" />
                <div className="text-2xl font-bold">Focused</div>
                <p className="text-sm text-muted-foreground">Industry-relevant skills</p>
              </Card>
              <Card className="glass p-6 space-y-2 -mt-4 border-border/50 card-glow">
                <Award className="h-8 w-8 text-foreground" />
                <div className="text-2xl font-bold">Certified</div>
                <p className="text-sm text-muted-foreground">Recognized credentials</p>
              </Card>
              <Card className="glass p-6 space-y-2 mt-4 border-border/50 card-glow">
                <Users className="h-8 w-8 text-foreground" />
                <div className="text-2xl font-bold">Supported</div>
                <p className="text-sm text-muted-foreground">Expert mentorship</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <Card className="glass border-border/50 overflow-hidden card-glow">
            <div className="relative p-8 md:p-12 text-center">
              <div className="relative space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join Oscowl Learn today and take the first step towards your dream career. 
                  Limited spots available for our upcoming cohort.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  {loggedIn && (
                    <Button variant="gradient" size="lg" asChild>
                      <NavLink to="/signup">Create Account</NavLink>
                    </Button>
                  )}
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
