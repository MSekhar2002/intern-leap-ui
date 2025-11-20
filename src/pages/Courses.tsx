import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NavLink } from "@/components/NavLink";
import { Search, Clock, Users, Star, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Master modern web development with React, Node.js, and databases",
      category: "Development",
      duration: "12 weeks",
      students: 2500,
      rating: 4.8,
      price: "₹9,999",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      description: "Learn Python, machine learning, and data visualization techniques",
      category: "Data Science",
      duration: "16 weeks",
      students: 1800,
      rating: 4.9,
      price: "₹14,999",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      description: "Complete guide to SEO, social media, and content marketing",
      category: "Marketing",
      duration: "8 weeks",
      students: 3200,
      rating: 4.7,
      price: "₹7,999",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      description: "Create beautiful and user-friendly digital experiences",
      category: "Design",
      duration: "10 weeks",
      students: 2100,
      rating: 4.8,
      price: "₹9,999",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Cloud Computing with AWS",
      description: "Build and deploy scalable applications on Amazon Web Services",
      category: "Development",
      duration: "14 weeks",
      students: 1500,
      rating: 4.9,
      price: "₹12,999",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Create cross-platform apps with React Native and Flutter",
      category: "Development",
      duration: "12 weeks",
      students: 1900,
      rating: 4.7,
      price: "₹11,999",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    }
  ];

  const categories = ["all", "Development", "Data Science", "Marketing", "Design"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Explore Our{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Premium Courses
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Industry-focused internship programs designed to launch your career
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Card 
                key={course.id}
                className="glass hover-lift overflow-hidden border-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="text-2xl font-bold">{course.price}</div>
                    <Button variant="gradient" asChild>
                      <NavLink to={`/checkout?course=${course.id}`}>
                        Enroll Now
                      </NavLink>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No courses found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
