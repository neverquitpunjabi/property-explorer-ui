
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

type UserRole = "user" | "agent" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  remainingListings: number | null;
  listings: number;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  addListing: () => void;
  deleteListing: (id: string) => void;
  upgradeAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [listings, setListings] = useState<number>(0);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  
  // Define listing limits based on role and premium status
  const getMaxListings = () => {
    if (userRole === "agent") {
      return isPremium ? 20 : 5;
    } else if (userRole === "user") {
      return isPremium ? 7 : 3;
    } 
    return 0;
  };
  
  const remainingListings = isAuthenticated ? getMaxListings() - listings : null;

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        // Get user role from session metadata
        const role = session?.user?.user_metadata?.role as UserRole || "user";
        setUserRole(role);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      
      // Get user role from session metadata
      const role = session?.user?.user_metadata?.role as UserRole || "user";
      setUserRole(role);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Signed in successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  const register = async (email: string, password: string, role: UserRole) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role || "user"
          }
        }
      });
      
      if (error) throw error;
      
      toast.success("Registered successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to register");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthenticated(false);
      setUserRole(null);
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  const addListing = () => {
    if (listings >= getMaxListings()) {
      toast.error("You've reached your listing limit. Please upgrade your account.");
      return;
    }
    
    setListings(listings + 1);
    toast.success("Property listed successfully");
  };

  const deleteListing = (id: string) => {
    // This is a mock implementation until Supabase is integrated
    setListings(prevListings => Math.max(0, prevListings - 1));
    toast.success("Property deleted successfully");
  };

  const upgradeAccount = () => {
    // This would connect to Stripe or another payment processor in a real implementation
    setIsPremium(true);
    toast.success("Account upgraded successfully");
    toast.info(`You can now list up to ${userRole === "agent" ? 20 : 7} properties.`);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        remainingListings,
        listings,
        user,
        login,
        register,
        logout,
        addListing,
        deleteListing,
        upgradeAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
