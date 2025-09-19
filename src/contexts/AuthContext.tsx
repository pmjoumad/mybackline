import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Utilisateur de démonstration pour le développement
const demoUser: User = {
  id: 'demo-user-123',
  email: 'demo@backline.app',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  aud: 'authenticated',
  role: 'authenticated',
  app_metadata: {},
  user_metadata: {},
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d'une vérification de session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        // En cas d'erreur avec Supabase, on simule un état non connecté
        console.log('Mode démonstration - Supabase non configuré');
        setUser(null);
      }
      setLoading(false);
    };

    checkSession();

    // Écouter les changements d'authentification
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      // En cas d'erreur, on continue sans listener
      console.log('Mode démonstration - Auth listener non disponible');
      return () => {};
    }
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      // En mode démo, on déconnecte localement
      setUser(null);
    }
  };

  const signInDemo = () => {
    // Fonction pour se connecter en mode démo
    setUser(demoUser);
  };

  const value = {
    user,
    loading,
    signOut,
    signInDemo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}