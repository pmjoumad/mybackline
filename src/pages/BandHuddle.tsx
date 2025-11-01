import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Calendar, FileMusic, ListMusic } from "lucide-react";
import { BandChat } from "@/components/bands/BandChat";
import { BandCalendar } from "@/components/bands/BandCalendar";
import { BandFiles } from "@/components/bands/BandFiles";
import { BandSetlists } from "@/components/bands/BandSetlists";

export default function BandHuddle() {
  const { bandId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Band Huddle</h1>
          <p className="text-muted-foreground">
            Gérez tout en un seul endroit
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Calendrier</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FileMusic className="h-4 w-4" />
              <span className="hidden sm:inline">Fichiers</span>
            </TabsTrigger>
            <TabsTrigger value="setlists" className="flex items-center gap-2">
              <ListMusic className="h-4 w-4" />
              <span className="hidden sm:inline">Setlists</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <BandChat bandId={bandId || ""} />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <BandCalendar bandId={bandId || ""} />
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <BandFiles bandId={bandId || ""} />
          </TabsContent>

          <TabsContent value="setlists" className="mt-6">
            <BandSetlists bandId={bandId || ""} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
