import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NavLink } from "@/components/NavLink";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  PlayCircle,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isEnrolled = user.isEnrolled;
  const enrolledCourses = [
    {
      id: "ai-workshop",
      title: "AI & Machine Learning Workshop",
      progress: 22,
      nextLesson: "Machine Learning Basics - Classification",
      totalLessons: 69,
      completedLessons: 14,
      lastAccessed: "2 hours ago",
    },
  ];

  const stats = [
    {
      label: "Workshops Enrolled",
      value: "1",
      icon: BookOpen,
    },
    { label: "Hours Learned", value: "18", icon: Clock },
    {
      label: "Projects Completed",
      value: "1",
      icon: Award,
    },
    {
      label: "Overall Progress",
      value: "22%",
      icon: TrendingUp,
    },
  ];

  const upcomingEvents = [
    {
      title: "Live Session: Deep Learning Basics",
      date: "Today, 6:00 PM",
      type: "Workshop",
    },
    {
      title: "Project Due: Image Classifier",
      date: "Sunday, 11:59 PM",
      type: "Deadline",
    },
    {
      title: "AI Career Mentor Session",
      date: "Wednesday, 4:00 PM",
      type: "Meeting",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back,{" "}
              <span className="text-gradient">
                {user.fullName || "John"}
              </span>
              !
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="glass border-border/50 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-secondary border border-border">
                      <stat.icon className="h-6 w-6 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content - Courses */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                <div className="space-y-4">
                  {isEnrolled ? (
                    enrolledCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="glass border-border/50 hover-lift"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">
                                {course.title}
                              </CardTitle>
                              <CardDescription>
                                Next: {course.nextLesson}
                              </CardDescription>
                            </div>
                            <Button variant="gradient" size="sm" asChild>
                              <NavLink to="/workshop">
                                <PlayCircle className="h-4 w-4 mr-2" />
                                Continue
                              </NavLink>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Progress
                              </span>
                              <span className="font-medium">
                                {course.progress}%
                              </span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>
                                {course.completedLessons}/{course.totalLessons}{" "}
                                lessons
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.lastAccessed}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="glass border-border/50">
                      <CardContent className="pt-6 text-center">
                        <p className="text-lg mb-4">
                          You are not enrolled in any courses yet.
                        </p>
                        <Button variant="gradient" asChild>
                          <NavLink to="/courses">Enroll Now</NavLink>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Recommend to Friends</CardTitle>
                  <CardDescription>
                    Share the AI workshop and help others transform their career
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="lg" className="w-full">
                    Share Workshop
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-secondary/50 space-y-1 hover-lift border border-border/50"
                    >
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.date}
                      </div>
                      <div className="inline-block">
                        <span className="text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass border-border/50 overflow-hidden card-glow">
                <div className="relative p-6 text-center">
                  <div className="relative space-y-3">
                    <Award className="h-12 w-12 mx-auto text-foreground" />
                    <h3 className="font-bold">Complete Your First Course</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn your certificate and boost your career
                    </p>
                    <div className="pt-2">
                      <div className="text-2xl font-bold">42%</div>
                      <div className="text-xs text-muted-foreground">
                        to completion
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
