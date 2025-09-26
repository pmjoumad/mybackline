import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Guitar, Drum, Mic, Piano, Star, TrendingUp } from "lucide-react";

const mockMusicians = [
  {
    id: 1,
    name: "Sarah Martin",
    stageName: "Sarah M.",
    type: "musician",
    location: "Paris, France",
    instruments: ["Guitare", "Chant"],
    styles: ["Rock", "Blues", "Folk"],
    rating: 4.8,
    experience: "5 ans",
    avatar: "👩‍🎤"
  },
  {
    id: 2,
    name: "Les Échos du Temps",
    type: "group",
    location: "Lyon, France", 
    currentMembers: 3,
    neededRoles: ["Bassiste", "Clavier"],
    styles: ["Jazz", "Fusion"],
    rating: 4.9,
    avatar: "🎵"
  },
  {
    id: 3,
    name: "Alex Drummond",
    stageName: "AlexD",
    type: "musician",
    location: "Marseille, France",
    instruments: ["Batterie", "Percussion"],
    styles: ["Rock", "Metal", "Punk"],
    rating: 4.7,
    experience: "8 ans",
    avatar: "🥁"
  }
];

const getInstrumentIcon = (instrument: string) => {
  switch (instrument.toLowerCase()) {
    case 'guitare': return <Guitar className="w-4 h-4" />;
    case 'batterie': return <Drum className="w-4 h-4" />;
    case 'chant': return <Mic className="w-4 h-4" />;
    case 'clavier': case 'piano': return <Piano className="w-4 h-4" />;
    default: return <Guitar className="w-4 h-4" />;
  }
};

const DiscoverySection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-light/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Nouveaux talents
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Découvrez la{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              communauté
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorez les profils de musiciens et groupes près de chez vous, prêts à collaborer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockMusicians.map((profile) => (
            <Card key={profile.id} className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl bg-gradient-to-br from-primary-light to-primary/20 rounded-2xl p-3">
                      {profile.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {profile.type === 'musician' ? profile.stageName || profile.name : profile.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {profile.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-secondary/20 rounded-full px-3 py-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="text-sm font-semibold text-secondary-foreground">{profile.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {profile.type === 'musician' ? (
                  <>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Instruments</div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as any).instruments.map((instrument: string) => (
                          <Badge key={instrument} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                            {getInstrumentIcon(instrument)}
                            {instrument}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Styles</div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as any).styles.map((style: string) => (
                          <Badge key={style} variant="outline" className="text-xs border-muted">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Recherche</div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as any).neededRoles.map((role: string) => (
                          <Badge key={role} className="bg-accent/20 text-accent-foreground border-accent/30">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Styles</div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as any).styles.map((style: string) => (
                          <Badge key={style} variant="outline" className="text-xs border-muted">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 hover:from-primary hover:to-primary-dark hover:text-white transition-all duration-300"
                  variant="outline"
                >
                  {profile.type === 'musician' ? 'Voir le profil' : 'Rejoindre le groupe'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-12 py-3 bg-white border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
          >
            Voir tous les profils
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverySection;