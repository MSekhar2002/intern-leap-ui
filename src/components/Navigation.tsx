import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, GraduationCap } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">LearnHub</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <NavLink to="/login">Log in</NavLink>
            </Button>
            <Button variant="gradient" size="sm" asChild>
              <NavLink to="/signup">Sign up</NavLink>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                      activeClassName="text-foreground"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <div className="pt-4 border-t border-border flex flex-col gap-2">
                    <Button variant="ghost" asChild className="justify-start">
                      <NavLink to="/login" onClick={() => setIsOpen(false)}>
                        Log in
                      </NavLink>
                    </Button>
                    <Button variant="gradient" asChild>
                      <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                        Sign up
                      </NavLink>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
