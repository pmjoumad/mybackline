import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LogOut, Music, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Profile {
  display_name: string;
  bio: string;
  instruments: string[];
  level: "1" | "2" | "3" | "4" | "5";
  objective: "jam" | "projet_serieux" | "session_remuneree" | "cover_band" | "groupe_original";
  musical_styles: string[];
  location_city: string;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    bio: "",
    instruments: [],
    level: "3",
    objective: "jam",
    musical_styles: [],
    location_city: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id || "")
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", user?.id || "");

      if (error) throw error;

      toast({
        title: "Profil enregistré !",
        description: "Vos modifications ont été sauvegardées",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le profil",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations publiques
            </p>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Informations Musicien
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="display_name">Nom d'artiste *</Label>
              <Input
                id="display_name"
                value={profile.display_name}
                onChange={(e) =>
                  setProfile({ ...profile, display_name: e.target.value })
                }
                placeholder="Ex: DJ Shadow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio || ""}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                placeholder="Parlez de votre parcours musical..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Niveau *</Label>
              <Select
                value={profile.level}
                onValueChange={(value) =>
                  setProfile({ ...profile, level: value as "1" | "2" | "3" | "4" | "5" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Débutant</SelectItem>
                  <SelectItem value="2">2 - Amateur</SelectItem>
                  <SelectItem value="3">3 - Intermédiaire</SelectItem>
                  <SelectItem value="4">4 - Avancé</SelectItem>
                  <SelectItem value="5">5 - Professionnel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective">Objectif *</Label>
              <Select
                value={profile.objective}
                onValueChange={(value) =>
                  setProfile({ ...profile, objective: value as typeof profile.objective })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jam">Jam / Loisir</SelectItem>
                  <SelectItem value="projet_serieux">Projet Sérieux</SelectItem>
                  <SelectItem value="session_remuneree">Session Rémunérée</SelectItem>
                  <SelectItem value="cover_band">Cover Band</SelectItem>
                  <SelectItem value="groupe_original">Groupe Original</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location_city">Ville</Label>
              <Input
                id="location_city"
                value={profile.location_city || ""}
                onChange={(e) =>
                  setProfile({ ...profile, location_city: e.target.value })
                }
                placeholder="Ex: Paris"
              />
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
