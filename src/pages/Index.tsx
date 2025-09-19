import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DiscoverySection from "@/components/DiscoverySection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <DiscoverySection />
      
      {/* Footer */}
      <footer className="bg-surface py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <span className="text-white text-sm">🎵</span>
            </div>
            <span className="text-lg font-bold gradient-primary bg-clip-text text-transparent">
              BackLine
            </span>
          </div>
          <p className="text-muted-foreground">
            Connecter les musiciens, créer la musique de demain.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
