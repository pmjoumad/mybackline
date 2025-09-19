import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Music2, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Trouvez votre{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              BackLine
            </span>{" "}
            parfaite
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Connectez-vous avec des musiciens passionnés, formez des groupes et organisez vos projets musicaux en toute simplicité.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="gradient-primary text-white border-0 hover:opacity-90 transition-smooth text-lg px-8 py-4 glow-primary"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 bg-surface/50 backdrop-blur-sm border-border hover:bg-surface/70 transition-smooth"
            >
              Découvrir la communauté
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="gradient-card p-6 rounded-lg card-shadow transition-smooth hover:scale-105">
              <Users className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Connecter</h3>
              <p className="text-muted-foreground text-sm">
                Trouvez des musiciens compatibles par style, instrument et localisation
              </p>
            </div>
            
            <div className="gradient-card p-6 rounded-lg card-shadow transition-smooth hover:scale-105">
              <Music2 className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Créer</h3>
              <p className="text-muted-foreground text-sm">
                Formez votre groupe et gérez vos setlists collaborativement
              </p>
            </div>
            
            <div className="gradient-card p-6 rounded-lg card-shadow transition-smooth hover:scale-105">
              <Calendar className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Organiser</h3>
              <p className="text-muted-foreground text-sm">
                Planifiez vos répétitions et synchronisez votre équipe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;