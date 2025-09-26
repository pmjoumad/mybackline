import { Button } from "@/components/ui/button";
import { Music, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const { user, signOut } = useAuth();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            BackLine
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {user && (
            <>
              <Link 
                to="/dashboard" 
                className="text-muted-foreground hover:text-primary transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Dashboard
              </Link>
              <Link 
                to="/discover" 
                className="text-muted-foreground hover:text-primary transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Découvrir
              </Link>
              <Link 
                to="/groups" 
                className="text-muted-foreground hover:text-primary transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Groupes
              </Link>
              <Link 
                to="/musicians" 
                className="text-muted-foreground hover:text-primary transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Musiciens
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-muted-foreground bg-muted/50 rounded-full px-3 py-1">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors">
                <User className="w-4 h-4 mr-2" />
                Profil
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut} className="hover:bg-destructive/10 hover:text-destructive transition-colors">
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors">
                  Connexion
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="gradient-primary text-white border-0 hover:scale-105 transition-all duration-300 shadow-soft">
                  S'inscrire
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;