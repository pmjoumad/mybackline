import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            BackLine
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/discover" className="text-muted-foreground hover:text-foreground transition-smooth">
            Découvrir
          </Link>
          <Link to="/groups" className="text-muted-foreground hover:text-foreground transition-smooth">
            Groupes
          </Link>
          <Link to="/musicians" className="text-muted-foreground hover:text-foreground transition-smooth">
            Musiciens
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Connexion
          </Button>
          <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90 transition-smooth">
            S'inscrire
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;