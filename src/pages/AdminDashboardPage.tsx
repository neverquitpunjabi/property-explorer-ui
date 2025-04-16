
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserManagement from "@/components/admin/UserManagement";
import PaymentOptions from "@/components/admin/PaymentOptions";
import PropertyManagement from "@/components/admin/PropertyManagement";
import { ShieldCheck, DollarSign, Home, BarChart3 } from "lucide-react";

export default function AdminDashboardPage() {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to access the admin dashboard");
      navigate("/auth");
      return;
    }
    
    if (userRole !== "admin") {
      toast.error("You don't have permission to access the admin dashboard");
      navigate("/dashboard");
    }
  }, [isAuthenticated, userRole, navigate]);
  
  if (!isAuthenticated || userRole !== "admin") {
    return null; // Will redirect via useEffect
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-500">
              Manage users, properties, and payment options
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-4xl">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Users</CardTitle>
                  <CardDescription>Active and blocked users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">237</div>
                  <p className="text-sm text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Properties Listed</CardTitle>
                  <CardDescription>Total properties on platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,024</div>
                  <p className="text-sm text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Monthly earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$12,543</div>
                  <p className="text-sm text-muted-foreground">
                    +23% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="properties">
            <PropertyManagement />
          </TabsContent>
          
          <TabsContent value="payments">
            <PaymentOptions />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
