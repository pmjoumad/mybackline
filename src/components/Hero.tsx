import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Music2, Calendar, Sparkles } from "lucide-react";
import heroImage from "@/assets/musical-hero-bg.jpg";
import MusicIllustration from "./MusicIllustration";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background Image with Soft Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Musical Illustrations */}
      <MusicIllustration />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-soft">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Plateforme de collaboration musicale
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
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
              className="gradient-primary text-white border-0 hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-soft"
              onClick={() => window.location.href = '/auth'}
            >
              Commencer maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 bg-white/80 backdrop-blur-sm border-border hover:bg-white transition-smooth shadow-soft"
              onClick={() => window.location.href = '/dashboard'}
            >
              Découvrir la communauté
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-soft transition-all duration-300 hover:scale-105 hover:bg-white">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Connecter</h3>
              <p className="text-muted-foreground">
                Trouvez des musiciens compatibles par style, instrument et localisation
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-soft transition-all duration-300 hover:scale-105 hover:bg-white">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Music2 className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Créer</h3>
              <p className="text-muted-foreground">
                Formez votre groupe et gérez vos setlists collaborativement
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-soft transition-all duration-300 hover:scale-105 hover:bg-white">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Calendar className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Organiser</h3>
              <p className="text-muted-foreground">
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