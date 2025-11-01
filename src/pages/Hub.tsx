import { MapPin, Music2, Mic2, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockLocations = [
  {
    id: 1,
    name: "Studio Ferber",
    category: "studio",
    address: "25 Rue de Clichy, 75009 Paris",
    city: "Paris",
  },
  {
    id: 2,
    name: "Le Sunset-Sunside",
    category: "scene_ouverte",
    address: "60 Rue des Lombards, 75001 Paris",
    city: "Paris",
  },
  {
    id: 3,
    name: "Music 2000",
    category: "magasin",
    address: "15 Boulevard Barbès, 75018 Paris",
    city: "Paris",
  },
];

const categoryIcons = {
  studio: Music2,
  scene_ouverte: Mic2,
  magasin: ShoppingBag,
};

const categoryLabels = {
  studio: "Studio de Répétition",
  scene_ouverte: "Scène Ouverte",
  magasin: "Magasin de Musique",
};

export default function Hub() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Le Hub</h1>
          <p className="text-muted-foreground">
            Découvrez les ressources musicales autour de vous
          </p>
        </div>

        <div className="mb-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Carte interactive (prochainement)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {mockLocations.map((location) => {
            const Icon = categoryIcons[location.category as keyof typeof categoryIcons];
            return (
              <Card key={location.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{location.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">
                            {categoryLabels[location.category as keyof typeof categoryLabels]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{location.address}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
