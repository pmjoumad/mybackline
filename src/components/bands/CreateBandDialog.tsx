import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface CreateBandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBandCreated: () => void;
}

export function CreateBandDialog({
  open,
  onOpenChange,
  onBandCreated,
}: CreateBandDialogProps) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du groupe est requis",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: band, error: bandError } = await supabase
        .from("bands")
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          created_by: user?.id,
        })
        .select()
        .single();

      if (bandError) throw bandError;

      const { error: memberError } = await supabase
        .from("band_members")
        .insert({
          band_id: band.id,
          user_id: user?.id,
          role: "admin",
        });

      if (memberError) throw memberError;

      toast({
        title: "Groupe créé !",
        description: `${name} a été créé avec succès`,
      });

      setName("");
      setDescription("");
      onBandCreated();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le groupe",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un nouveau groupe</DialogTitle>
          <DialogDescription>
            Commencez votre aventure musicale en créant un groupe
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du groupe *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Les Rockers du Dimanche"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre projet..."
              rows={3}
            />
          </div>
          <Button onClick={handleCreate} disabled={loading} className="w-full">
            {loading ? "Création..." : "Créer le groupe"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
