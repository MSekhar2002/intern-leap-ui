import { NavLink } from "@/components/NavLink";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span>LearnHub</span>
            </NavLink>
            <p className="text-sm text-muted-foreground">
              Empowering the next generation of professionals through premium internship programs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>support@learnhub.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Learning St, Education City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
