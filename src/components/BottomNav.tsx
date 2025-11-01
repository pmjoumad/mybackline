import { Link, useLocation } from "react-router-dom";
import { Search, Users, MapPin, User } from "lucide-react";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/discover", icon: Search, label: "Découvrir" },
    { path: "/my-bands", icon: Users, label: "Mes Groupes" },
    { path: "/hub", icon: MapPin, label: "Le Hub" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
