import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NavLink } from "@/components/NavLink";
import { Search, Clock, Users, Star, Filter, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Courses() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isEnrolled = user.isEnrolled;
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const aiWorkshop = {
    id: "ai-workshop",
    title: "AI & Machine Learning Workshop",
    description: "Master artificial intelligence and machine learning with hands-on projects and expert guidance",
    category: "AI & ML",
    duration: "8 weeks",
    students: 5240,
    rating: 4.9,
    price: "₹2,999",
    originalPrice: "₹9,999",
    level: "Beginner to Advanced",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    featured: true,
    highlights: [
      "Python, TensorFlow & PyTorch",
      "Neural Networks & Deep Learning",
      "5 Real-world AI Projects",
      "Computer Vision & NLP",
      "Expert Mentorship",
      "Industry Certificate"
    ]
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Transform Your Career with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI & Machine Learning
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join 5000+ students in our comprehensive AI workshop
            </p>
          </div>
        </div>
      </section>

      {/* Featured Workshop */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="glass hover-lift overflow-hidden border-2 border-primary shadow-glow animate-fade-in">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <img 
                    src={aiWorkshop.image} 
                    alt={aiWorkshop.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-primary text-primary-foreground border-0">
                        🎉 70% OFF
                      </Badge>
                      <Badge variant="secondary">{aiWorkshop.category}</Badge>
                      <Badge variant="outline">{aiWorkshop.level}</Badge>
                    </div>
                    
                    <CardTitle className="text-2xl">{aiWorkshop.title}</CardTitle>
                    <CardDescription className="text-base">{aiWorkshop.description}</CardDescription>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>{aiWorkshop.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-accent" />
                      <span>{aiWorkshop.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>{aiWorkshop.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">What You'll Learn:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {aiWorkshop.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-end gap-3">
                      <div className="text-3xl font-bold">{aiWorkshop.price}</div>
                      <div className="text-lg text-muted-foreground line-through mb-1">
                        {aiWorkshop.originalPrice}
                      </div>
                    </div>
                    <Button variant="gradient" size="lg" className="w-full" asChild>
                      <NavLink to={isEnrolled ? '/workshop' : `/checkout?course=${aiWorkshop.id}`}>
                        {isEnrolled ? 'Go to Workshop' : 'Enroll Now'}
                      </NavLink>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
