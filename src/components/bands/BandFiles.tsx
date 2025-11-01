import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function BandFiles({ bandId }: { bandId: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Fichiers du Groupe</CardTitle>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Uploader
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Aucun fichier pour le moment
        </div>
      </CardContent>
    </Card>
  );
}
