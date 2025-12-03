import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import oscowlLogo from "@/assets/oscowl-logo.png";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedIn = user?.id ? false : true;

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast({
      title: "Logged out",
      description: "See you soon!",
    });

    navigate("/login", { replace: true });
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 font-bold text-xl group">
            <div className="relative">
              <img 
                src={oscowlLogo} 
                alt="Oscowl Learn" 
                className="h-10 w-10 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="hidden sm:inline text-foreground">Oscowl Learn</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                activeClassName="text-foreground after:scale-x-100"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {loggedIn ? (
              <>
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                  <NavLink to="/login">Log in</NavLink>
                </Button>
                <Button variant="default" size="sm" asChild className="bg-foreground text-background hover:bg-foreground/90">
                  <NavLink to="/signup">Sign up</NavLink>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-card border-border">
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
                    {loggedIn ? (
                      <>
                        <Button variant="ghost" asChild className="justify-start text-muted-foreground">
                          <NavLink to="/login" onClick={() => setIsOpen(false)}>
                            Log in
                          </NavLink>
                        </Button>
                        <Button variant="default" asChild className="bg-foreground text-background">
                          <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                            Sign up
                          </NavLink>
                        </Button>
                      </>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start text-muted-foreground">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    )}
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
