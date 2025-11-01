import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  display_name: string;
  bio: string;
  instruments: string[];
  level: string;
  objective: string;
  musical_styles: string[];
  location_city: string;
  avatar_url: string;
}

export default function Discover() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user?.id || "");

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les profils",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.instruments.some((inst) =>
      inst.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const objectiveLabels: Record<string, string> = {
    jam: "Jam",
    projet_serieux: "Projet Sérieux",
    session_remuneree: "Session Rémunérée",
    cover_band: "Cover Band",
    groupe_original: "Groupe Original",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Découvrir</h1>
          <p className="text-muted-foreground">
            Trouvez les musiciens qui correspondent à votre projet
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Je cherche... (instrument, style, ville)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Music className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {profile.display_name}
                        </CardTitle>
                        {profile.location_city && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {profile.location_city}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {profile.instruments.slice(0, 3).map((inst, idx) => (
                        <Badge key={idx} variant="secondary">
                          {inst}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Niveau:</span>
                      <Badge variant="outline">{profile.level}/5</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Objectif:</span>
                      <Badge>{objectiveLabels[profile.objective] || profile.objective}</Badge>
                    </div>

                    {profile.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {profile.bio}
                      </p>
                    )}

                    <Button className="w-full mt-4">Contacter</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredProfiles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aucun musicien trouvé
          </div>
        )}
      </div>
    </div>
  );
}
