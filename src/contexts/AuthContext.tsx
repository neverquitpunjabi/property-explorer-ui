
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

type UserRole = "user" | "agent" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  remainingListings: number | null;
  listings: number;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  addListing: () => void;
  deleteListing: (id: string) => void;
  upgradeAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [listings, setListings] = useState<number>(0);
  
  // Define listing limits based on role
  const maxListings = userRole === "agent" ? 5 : userRole === "user" ? 3 : 0;
  const remainingListings = isAuthenticated ? maxListings - listings : null;

  const login = async (email: string, password: string) => {
    try {
      // This is a mock implementation until Supabase is integrated
      setIsAuthenticated(true);
      // For mock purposes, determine role by email
      const role = email.includes("agent") ? "agent" : "user";
      setUserRole(role);
      toast.success("Signed in successfully");
    } catch (error) {
      toast.error("Failed to sign in");
      throw error;
    }
  };

  const register = async (email: string, password: string, role: UserRole) => {
    try {
      // This is a mock implementation until Supabase is integrated
      setIsAuthenticated(true);
      setUserRole(role);
      toast.success("Registered successfully");
    } catch (error) {
      toast.error("Failed to register");
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    toast.success("Signed out successfully");
  };

  const addListing = () => {
    if (listings >= maxListings) {
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
    // This is a mock implementation until Supabase and Stripe are integrated
    toast.success("Account upgraded successfully");
    // Update the maximum listings depending on the role
    // This would involve a payment process in the real implementation
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        remainingListings,
        listings,
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
