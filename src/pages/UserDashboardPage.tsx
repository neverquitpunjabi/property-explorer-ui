
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import UserListings from "@/components/properties/UserListings";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Shield, User } from "lucide-react";

export default function UserDashboardPage() {
  const { isAuthenticated, userRole, remainingListings } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to access your dashboard");
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-gray-500">
              Manage your property listings and account settings
            </p>
          </div>
          
          <div className="flex gap-3">
            {userRole === "agent" && (
              <Button variant="outline" onClick={() => navigate("/profile")}>
                <User className="w-4 h-4 mr-2" />
                Manage Profile
              </Button>
            )}
            
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-medium mb-1">Account Type: {userRole === "agent" ? "Agent" : "User"}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {userRole === "agent" 
                  ? "You can list up to 13 properties for free, or upgrade to list up to 63 properties." 
                  : "You can list up to 3 properties for free, or upgrade to list up to 13 properties."}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {remainingListings} free listings remaining
                </span>
                <Button size="sm" variant="outline" onClick={() => navigate("/upgrade")}>
                  <Shield className="w-4 h-4 mr-2" />
                  Upgrade Account
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <UserListings />
        </div>
      </div>
    </MainLayout>
  );
}
