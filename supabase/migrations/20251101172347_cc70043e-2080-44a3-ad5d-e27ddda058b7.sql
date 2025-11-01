-- Create enum types
CREATE TYPE public.musician_level AS ENUM ('1', '2', '3', '4', '5');
CREATE TYPE public.musician_objective AS ENUM ('jam', 'projet_serieux', 'session_remuneree', 'cover_band', 'groupe_original');
CREATE TYPE public.hub_category AS ENUM ('studio', 'scene_ouverte', 'magasin');

-- Table: profiles (Profils Musiciens)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  bio TEXT,
  instruments TEXT[] NOT NULL DEFAULT '{}',
  level musician_level NOT NULL DEFAULT '3',
  objective musician_objective NOT NULL,
  musical_styles TEXT[] DEFAULT '{}',
  influences TEXT,
  location_city TEXT,
  location_department TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  avatar_url TEXT,
  soundcloud_url TEXT,
  youtube_url TEXT,
  spotify_url TEXT,
  audio_samples TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: bands (Groupes)
CREATE TABLE public.bands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: band_members (Membres de Groupes)
CREATE TABLE public.band_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  band_id UUID NOT NULL REFERENCES public.bands(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(band_id, user_id)
);

-- Table: messages (Messages 1-to-1 et groupes)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  band_id UUID REFERENCES public.bands(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT check_recipient_or_band CHECK (
    (recipient_id IS NOT NULL AND band_id IS NULL) OR
    (recipient_id IS NULL AND band_id IS NOT NULL)
  )
);

-- Table: band_events (Calendrier de groupe)
CREATE TABLE public.band_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  band_id UUID NOT NULL REFERENCES public.bands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: band_files (Fichiers de groupe)
CREATE TABLE public.band_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  band_id UUID NOT NULL REFERENCES public.bands(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: band_setlists (Setlists de groupe)
CREATE TABLE public.band_setlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  band_id UUID NOT NULL REFERENCES public.bands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  songs JSONB NOT NULL DEFAULT '[]',
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: hub_locations (Hub Communauté)
CREATE TABLE public.hub_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category hub_category NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  website TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_setlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_locations ENABLE ROW LEVEL SECURITY;

-- RLS Policies: profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies: bands
CREATE POLICY "Bands are viewable by members"
  ON public.bands FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = bands.id
        AND band_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bands"
  ON public.bands FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Band creators can update their bands"
  ON public.bands FOR UPDATE
  USING (auth.uid() = created_by);

-- RLS Policies: band_members
CREATE POLICY "Band members are viewable by members"
  ON public.band_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.band_members bm
      WHERE bm.band_id = band_members.band_id
        AND bm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join bands"
  ON public.band_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies: messages
CREATE POLICY "Users can view their own messages"
  ON public.messages FOR SELECT
  USING (
    auth.uid() = sender_id OR
    auth.uid() = recipient_id OR
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = messages.band_id
        AND band_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- RLS Policies: band_events
CREATE POLICY "Band members can view events"
  ON public.band_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = band_events.band_id
        AND band_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Band members can create events"
  ON public.band_events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = band_events.band_id
        AND band_members.user_id = auth.uid()
    )
  );

-- RLS Policies: band_files
CREATE POLICY "Band members can view files"
  ON public.band_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = band_files.band_id
        AND band_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Band members can upload files"
  ON public.band_files FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = band_files.band_id
        AND band_members.user_id = auth.uid()
    )
  );

-- RLS Policies: band_setlists
CREATE POLICY "Band members can view setlists"
  ON public.band_setlists FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = band_setlists.band_id
        AND band_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Band members can create setlists"
  ON public.band_setlists FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = band_setlists.band_id
        AND band_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Band members can update setlists"
  ON public.band_setlists FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.band_members
      WHERE band_members.band_id = band_setlists.band_id
        AND band_members.user_id = auth.uid()
    )
  );

-- RLS Policies: hub_locations
CREATE POLICY "Hub locations are viewable by everyone"
  ON public.hub_locations FOR SELECT
  USING (true);

-- Trigger: update_updated_at for profiles
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bands_updated_at
  BEFORE UPDATE ON public.bands
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_band_events_updated_at
  BEFORE UPDATE ON public.band_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_band_setlists_updated_at
  BEFORE UPDATE ON public.band_setlists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, objective)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Nouveau Musicien'),
    'jam'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();