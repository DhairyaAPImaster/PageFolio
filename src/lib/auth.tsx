import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  is_pro: boolean;
  credits: number;
  plan_type: string;
}

interface AuthContextType {
  user: { id: string; email?: string } | null;
  session: null;
  profile: Profile | null;
  loading: boolean;
  signUp: () => Promise<{ error: Error | null }>;
  signIn: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
    setUser({ id: guestId, email: 'guest@pagefolio.local' });
    setProfile({
      id: guestId,
      user_id: guestId,
      full_name: 'Guest User',
      email: 'guest@pagefolio.local',
      avatar_url: null,
      is_pro: true,
      credits: 999,
      plan_type: 'free',
    });
    setLoading(false);
  }, []);

  const signUp = async () => {
    return { error: null };
  };

  const signIn = async () => {
    return { error: null };
  };

  const signOut = async () => {
    // Guest logout - just reset
  };

  const refreshProfile = async () => {
    // No-op for guest users
  };

  return (
    <AuthContext.Provider value={{ user, session: null, profile, loading, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
