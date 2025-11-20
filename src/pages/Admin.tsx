import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Download, 
  Search, 
  Users, 
  TrendingUp, 
  DollarSign, 
  BookOpen,
  FileSpreadsheet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // Mock user data
  const users = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      enrolledCourses: 2,
      totalSpent: 19998,
      joinedDate: "2025-01-15",
      status: "active"
    },
    {
      id: 2,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+91 98765 43211",
      enrolledCourses: 1,
      totalSpent: 9999,
      joinedDate: "2025-01-18",
      status: "active"
    },
    {
      id: 3,
      fullName: "Michael Chen",
      email: "m.chen@example.com",
      phone: "+91 98765 43212",
      enrolledCourses: 3,
      totalSpent: 29997,
      joinedDate: "2025-01-10",
      status: "active"
    },
    {
      id: 4,
      fullName: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+91 98765 43213",
      enrolledCourses: 1,
      totalSpent: 7999,
      joinedDate: "2025-01-20",
      status: "inactive"
    },
    {
      id: 5,
      fullName: "Raj Patel",
      email: "raj.patel@example.com",
      phone: "+91 98765 43214",
      enrolledCourses: 2,
      totalSpent: 17998,
      joinedDate: "2025-01-12",
      status: "active"
    }
  ];

  const stats = [
    { label: "Total Users", value: users.length.toString(), icon: Users, color: "text-primary" },
    { label: "Active Enrollments", value: "12", icon: BookOpen, color: "text-accent" },
    { label: "Revenue", value: `₹${users.reduce((sum, u) => sum + u.totalSpent, 0).toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
    { label: "Growth Rate", value: "+24%", icon: TrendingUp, color: "text-primary-teal" },
  ];

  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(query)
    );
  });

  const handleExportCSV = () => {
    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      // Create CSV content
      const headers = ["Full Name", "Email", "Phone", "Enrolled Courses", "Total Spent", "Joined Date", "Status"];
      const csvContent = [
        headers.join(","),
        ...users.map(user => 
          [
            `"${user.fullName}"`,
            user.email,
            user.phone,
            user.enrolledCourses,
            user.totalSpent,
            user.joinedDate,
            user.status
          ].join(",")
        )
      ].join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      toast({
        title: "Export Successful",
        description: "User data has been exported to CSV.",
      });
    }, 1500);
  };

  const handleExportExcel = () => {
    toast({
      title: "Excel Export",
      description: "Excel export feature will be implemented with a library like xlsx or exceljs.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Admin <span className="bg-gradient-primary bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Manage users and monitor platform performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="glass hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-2xl bg-secondary ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Users Table */}
          <Card className="glass border-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">User Management</CardTitle>
                  <CardDescription>View and export user data</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handleExportExcel}
                    className="gap-2"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="hidden sm:inline">Excel</span>
                  </Button>
                  <Button
                    variant="gradient"
                    onClick={handleExportCSV}
                    disabled={isExporting}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export CSV"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Table */}
              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-center">Courses</TableHead>
                      <TableHead className="text-right">Total Spent</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-secondary/30">
                        <TableCell className="font-medium">{user.fullName}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                        <TableCell className="text-center">{user.enrolledCourses}</TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{user.totalSpent.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(user.joinedDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No users found matching your search.
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
