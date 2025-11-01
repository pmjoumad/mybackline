import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  profiles?: {
    display_name: string;
  };
}

export function BandChat({ bandId }: { bandId: string }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [bandId]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("band_id", bandId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      // Fetch sender profiles separately
      const messagesWithProfiles = await Promise.all(
        data.map(async (msg) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("id", msg.sender_id)
            .single();
          
          return {
            ...msg,
            profiles: profile,
          };
        })
      );
      setMessages(messagesWithProfiles as Message[]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("messages")
        .insert({
          content: newMessage.trim(),
          sender_id: user?.id,
          band_id: bandId,
        });

      if (error) throw error;

      setNewMessage("");
      fetchMessages();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat du Groupe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender_id === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  msg.sender_id === user?.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm font-medium mb-1">
                  {msg.profiles?.display_name}
                </p>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez un message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
