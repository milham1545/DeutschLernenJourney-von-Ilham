import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { fullName?: string; avatarUrl?: string; targetLevel?: string; password?: string }) => Promise<{ error: any }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast({ title: "Gagal Login", description: error.message, variant: "destructive" });
    else toast({ title: "Berhasil!", description: "Selamat datang kembali." });
    setLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          avatar_url: `https://api.dicebear.com/7.x/notionists/svg?seed=${fullName}`,
          target_level: "A1" // Default level
        }
      }
    });
    if (error) toast({ title: "Gagal Daftar", description: error.message, variant: "destructive" });
    else toast({ title: "Pendaftaran Berhasil!", description: "Silakan login." });
    setLoading(false);
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Keluar", description: "Anda telah logout." });
  };

  // --- FUNGSI UPDATE PROFILE BARU ---
  const updateProfile = async (data: { fullName?: string; avatarUrl?: string; targetLevel?: string; password?: string }) => {
    setLoading(true);
    
    // 1. Update Metadata (Nama, Avatar, Level)
    const updates: any = { data: {} };
    if (data.fullName) updates.data.full_name = data.fullName;
    if (data.avatarUrl) updates.data.avatar_url = data.avatarUrl;
    if (data.targetLevel) updates.data.target_level = data.targetLevel;
    
    // 2. Update Password (jika ada)
    if (data.password) updates.password = data.password;

    const { data: { user }, error } = await supabase.auth.updateUser(updates);

    if (error) {
      toast({ title: "Gagal Update", description: error.message, variant: "destructive" });
    } else {
      setUser(user); // Update state lokal biar UI langsung berubah
      toast({ title: "Profil Diperbarui!", description: "Data berhasil disimpan." });
    }

    setLoading(false);
    return { error };
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signUp, signOut, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};