import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlayCircle, 
  FileText, 
  Download, 
  CheckCircle2,
  Clock,
  Calendar,
  Users,
  BookOpen,
  Award,
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AIWorkshop() {

  const navigate = useNavigate();

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.isEnrolled) {
    navigate('/pricing');
  }
}, [navigate]);
  const modules = [
    {
      week: 1,
      title: "Python Fundamentals for AI",
      duration: "5 hours",
      lessons: 8,
      completed: 8,
      topics: ["Python basics", "NumPy & Pandas", "Data preprocessing", "Visualization"]
    },
    {
      week: 2,
      title: "Machine Learning Basics",
      duration: "6 hours",
      lessons: 10,
      completed: 6,
      topics: ["Supervised learning", "Linear regression", "Classification", "Model evaluation"]
    },
    {
      week: 3,
      title: "Deep Learning & Neural Networks",
      duration: "7 hours",
      lessons: 12,
      completed: 0,
      topics: ["Neural networks", "Backpropagation", "Activation functions", "Loss functions"]
    },
    {
      week: 4,
      title: "TensorFlow & Keras",
      duration: "6 hours",
      lessons: 10,
      completed: 0,
      topics: ["TensorFlow basics", "Keras API", "Model building", "Training pipelines"]
    },
    {
      week: 5,
      title: "Computer Vision",
      duration: "7 hours",
      lessons: 11,
      completed: 0,
      topics: ["CNNs", "Image classification", "Object detection", "Transfer learning"]
    },
    {
      week: 6,
      title: "Natural Language Processing",
      duration: "6 hours",
      lessons: 10,
      completed: 0,
      topics: ["Text processing", "Word embeddings", "RNNs & LSTMs", "Sentiment analysis"]
    },
    {
      week: 7,
      title: "Advanced AI Topics",
      duration: "7 hours",
      lessons: 12,
      completed: 0,
      topics: ["GANs", "Reinforcement learning", "Transformers", "Attention mechanisms"]
    },
    {
      week: 8,
      title: "Capstone Project",
      duration: "8 hours",
      lessons: 6,
      completed: 0,
      topics: ["Project planning", "Implementation", "Deployment", "Presentation"]
    }
  ];

  const projects = [
    {
      title: "House Price Prediction",
      description: "Build a regression model to predict house prices using real estate data",
      status: "completed"
    },
    {
      title: "Image Classifier",
      description: "Create a CNN model to classify images into different categories",
      status: "in-progress"
    },
    {
      title: "Sentiment Analysis Bot",
      description: "Develop an NLP model to analyze sentiment in product reviews",
      status: "locked"
    },
    {
      title: "Chatbot with AI",
      description: "Build an intelligent chatbot using transformers and NLP",
      status: "locked"
    },
    {
      title: "Custom AI Application",
      description: "Your final capstone project - build your own AI solution",
      status: "locked"
    }
  ];

  const resources = [
    { title: "Python Cheat Sheet", type: "PDF", size: "2.4 MB" },
    { title: "ML Algorithms Guide", type: "PDF", size: "5.1 MB" },
    { title: "TensorFlow Documentation", type: "Link", size: "-" },
    { title: "Dataset Collection", type: "ZIP", size: "145 MB" },
    { title: "Code Examples", type: "GitHub", size: "-" }
  ];

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons, 0);
  const completedLessons = modules.reduce((acc, module) => acc + module.completed, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between mb-6 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  AI & Machine Learning Workshop
                </h1>
                <p className="text-muted-foreground">
                  Your journey to becoming an AI expert
                </p>
              </div>
              <Button variant="outline" asChild>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </Button>
            </div>

            {/* Progress Card */}
            <Card className="glass border-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Overall Progress</div>
                      <div className="text-3xl font-bold">{overallProgress}%</div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>{completedLessons}/{totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>Week 2 of 8</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="curriculum" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum" className="space-y-4">
                {modules.map((module, index) => (
                  <Card 
                    key={index} 
                    className="glass hover-lift border-2 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">Week {module.week}</Badge>
                            <Badge variant="outline">
                              {module.completed}/{module.lessons} lessons
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{module.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{module.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{module.lessons} lessons</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant={module.completed > 0 ? "gradient" : "outline"}
                          disabled={module.week > 3}
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          {module.completed === 0 ? "Start" : 
                           module.completed === module.lessons ? "Review" : "Continue"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Progress 
                          value={(module.completed / module.lessons) * 100} 
                          className="h-2" 
                        />
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, topicIndex) => (
                            <Badge key={topicIndex} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-4">
                {projects.map((project, index) => (
                  <Card 
                    key={index}
                    className={`glass border-2 animate-fade-in ${
                      project.status === "locked" ? "opacity-60" : "hover-lift"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            {project.status === "completed" && (
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                            {project.status === "in-progress" && (
                              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                                In Progress
                              </Badge>
                            )}
                            {project.status === "locked" && (
                              <Badge variant="outline">Locked</Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl">{project.title}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                        <Button 
                          variant={project.status === "completed" ? "outline" : "gradient"}
                          disabled={project.status === "locked"}
                        >
                          {project.status === "completed" ? "View" :
                           project.status === "in-progress" ? "Continue" : "Start"}
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-4">
                <Card className="glass border-2">
                  <CardHeader>
                    <CardTitle>Workshop Resources</CardTitle>
                    <CardDescription>
                      Download materials, code examples, and reference documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {resources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover-lift"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {resource.type} • {resource.size}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Community & Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Join Workshop Discord
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Mentor Session
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Certificate Progress
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
