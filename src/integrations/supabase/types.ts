export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      band_events: {
        Row: {
          band_id: string
          created_at: string
          created_by: string
          description: string | null
          event_date: string
          id: string
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          band_id: string
          created_at?: string
          created_by: string
          description?: string | null
          event_date: string
          id?: string
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          band_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          event_date?: string
          id?: string
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "band_events_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          },
        ]
      }
      band_files: {
        Row: {
          band_id: string
          created_at: string
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          uploaded_by: string
        }
        Insert: {
          band_id: string
          created_at?: string
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          uploaded_by: string
        }
        Update: {
          band_id?: string
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "band_files_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          },
        ]
      }
      band_members: {
        Row: {
          band_id: string
          id: string
          joined_at: string
          role: string | null
          user_id: string
        }
        Insert: {
          band_id: string
          id?: string
          joined_at?: string
          role?: string | null
          user_id: string
        }
        Update: {
          band_id?: string
          id?: string
          joined_at?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "band_members_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          },
        ]
      }
      band_setlists: {
        Row: {
          band_id: string
          created_at: string
          created_by: string
          id: string
          name: string
          songs: Json
          updated_at: string
        }
        Insert: {
          band_id: string
          created_at?: string
          created_by: string
          id?: string
          name: string
          songs?: Json
          updated_at?: string
        }
        Update: {
          band_id?: string
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          songs?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "band_setlists_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          },
        ]
      }
      bands: {
        Row: {
          avatar_url: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      hub_locations: {
        Row: {
          address: string
          category: Database["public"]["Enums"]["hub_category"]
          city: string
          created_at: string
          description: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          phone: string | null
          website: string | null
        }
        Insert: {
          address: string
          category: Database["public"]["Enums"]["hub_category"]
          city: string
          created_at?: string
          description?: string | null
          id?: string
          latitude: number
          longitude: number
          name: string
          phone?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          category?: Database["public"]["Enums"]["hub_category"]
          city?: string
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          phone?: string | null
          website?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          band_id: string | null
          content: string
          created_at: string
          id: string
          recipient_id: string | null
          sender_id: string
        }
        Insert: {
          band_id?: string | null
          content: string
          created_at?: string
          id?: string
          recipient_id?: string | null
          sender_id: string
        }
        Update: {
          band_id?: string | null
          content?: string
          created_at?: string
          id?: string
          recipient_id?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          audio_samples: string[] | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          id: string
          influences: string | null
          instruments: string[]
          latitude: number | null
          level: Database["public"]["Enums"]["musician_level"]
          location_city: string | null
          location_department: string | null
          longitude: number | null
          musical_styles: string[] | null
          objective: Database["public"]["Enums"]["musician_objective"]
          soundcloud_url: string | null
          spotify_url: string | null
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          audio_samples?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name: string
          id: string
          influences?: string | null
          instruments?: string[]
          latitude?: number | null
          level?: Database["public"]["Enums"]["musician_level"]
          location_city?: string | null
          location_department?: string | null
          longitude?: number | null
          musical_styles?: string[] | null
          objective: Database["public"]["Enums"]["musician_objective"]
          soundcloud_url?: string | null
          spotify_url?: string | null
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          audio_samples?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          influences?: string | null
          instruments?: string[]
          latitude?: number | null
          level?: Database["public"]["Enums"]["musician_level"]
          location_city?: string | null
          location_department?: string | null
          longitude?: number | null
          musical_styles?: string[] | null
          objective?: Database["public"]["Enums"]["musician_objective"]
          soundcloud_url?: string | null
          spotify_url?: string | null
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      hub_category: "studio" | "scene_ouverte" | "magasin"
      musician_level: "1" | "2" | "3" | "4" | "5"
      musician_objective:
        | "jam"
        | "projet_serieux"
        | "session_remuneree"
        | "cover_band"
        | "groupe_original"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      hub_category: ["studio", "scene_ouverte", "magasin"],
      musician_level: ["1", "2", "3", "4", "5"],
      musician_objective: [
        "jam",
        "projet_serieux",
        "session_remuneree",
        "cover_band",
        "groupe_original",
      ],
    },
  },
} as const
