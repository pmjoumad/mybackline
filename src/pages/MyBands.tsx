import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CreateBandDialog } from "@/components/bands/CreateBandDialog";

interface Band {
  id: string;
  name: string;
  description: string;
  created_at: string;
  member_count?: number;
}

export default function MyBands() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    fetchMyBands();
  }, []);

  const fetchMyBands = async () => {
    try {
      const { data, error } = await supabase
        .from("band_members")
        .select(`
          band_id,
          bands (
            id,
            name,
            description,
            created_at
          )
        `)
        .eq("user_id", user?.id || "");

      if (error) throw error;

      const bandsData = data
        ?.map((item: any) => item.bands)
        .filter((band: any) => band !== null) || [];
      
      setBands(bandsData);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger vos groupes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBandCreated = () => {
    fetchMyBands();
    setShowCreateDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mes Groupes</h1>
            <p className="text-muted-foreground">
              Gérez vos projets musicaux et collaborations
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Créer un Groupe
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : bands.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun groupe</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-sm">
                Créez votre premier groupe pour commencer à collaborer avec d'autres musiciens
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Créer mon premier groupe
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bands.map((band) => (
              <Card
                key={band.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/bands/${band.id}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {band.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {band.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {band.description}
                    </p>
                  )}
                  <Button variant="outline" className="w-full">
                    Ouvrir le Huddle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <CreateBandDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          onBandCreated={handleBandCreated}
        />
      </div>
    </div>
  );
}
