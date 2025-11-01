import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function BandCalendar({ bandId }: { bandId: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Calendrier du Groupe</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un événement
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Aucun événement prévu pour le moment
        </div>
      </CardContent>
    </Card>
  );
}
