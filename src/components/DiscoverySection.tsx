import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Guitar, Drum, Mic, Piano, Star } from "lucide-react";

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
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Découvrez la{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              communauté
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorez les profils de musiciens et groupes près de chez vous, prêts à collaborer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockMusicians.map((profile) => (
            <Card key={profile.id} className="gradient-card border-border hover:border-primary/50 transition-smooth group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{profile.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-smooth">
                        {profile.type === 'musician' ? profile.stageName || profile.name : profile.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {profile.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="text-sm font-medium">{profile.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {profile.type === 'musician' ? (
                  <>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Instruments</div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as any).instruments.map((instrument: string) => (
                          <Badge key={instrument} variant="secondary" className="flex items-center gap-1">
                            {getInstrumentIcon(instrument)}
                            {instrument}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Styles</div>
                      <div className="flex flex-wrap gap-1">
                        {(profile as any).styles.map((style: string) => (
                          <Badge key={style} variant="outline" className="text-xs">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Recherche</div>
                      <div className="flex flex-wrap gap-2">
                        {(profile as any).neededRoles.map((role: string) => (
                          <Badge key={role} variant="secondary" className="text-primary border-primary/30">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Styles</div>
                      <div className="flex flex-wrap gap-1">
                        {(profile as any).styles.map((style: string) => (
                          <Badge key={style} variant="outline" className="text-xs">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Button 
                  className="w-full mt-4 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-smooth"
                  variant="outline"
                >
                  {profile.type === 'musician' ? 'Voir le profil' : 'Rejoindre le groupe'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8">
            Voir tous les profils
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverySection;