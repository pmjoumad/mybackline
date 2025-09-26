import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DiscoverySection from "@/components/DiscoverySection";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <DiscoverySection />
      
      {/* Footer */}
      <footer className="bg-surface/50 py-16 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
              <span className="text-white text-xl">🎵</span>
            </div>
            <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              BackLine
            </span>
          </div>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Connecter les musiciens, créer la musique de demain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Conditions</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
