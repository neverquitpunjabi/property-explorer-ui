
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/components/ui/sonner";

export default function UpgradePage() {
  const { isAuthenticated, userRole, upgradeAccount } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to access upgrade options");
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }
  
  const handleUpgrade = () => {
    upgradeAccount();
    navigate("/dashboard");
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Upgrade Your Account</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Upgrade your account to list more properties and get premium features that help you stand out in the market.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Free Plan</span>
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">Current Plan</span>
              </CardTitle>
              <CardDescription>
                Basic listing capabilities for {userRole === "agent" ? "agents" : "users"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">$0 <span className="text-sm text-muted-foreground font-normal">/month</span></div>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    {userRole === "agent" ? "List up to 5 properties" : "List up to 3 properties"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Basic property listing features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Standard support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-primary shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">RECOMMENDED</div>
            <CardHeader>
              <CardTitle>Premium Plan</CardTitle>
              <CardDescription>
                Enhanced features for {userRole === "agent" ? "professional agents" : "property owners"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">
                {userRole === "agent" ? "$19.99" : "$9.99"} <span className="text-sm text-muted-foreground font-normal">/month</span>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    {userRole === "agent" ? "List up to 20 properties" : "List up to 7 properties"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Featured placement in search results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Priority customer support</span>
                </li>
                {userRole === "agent" && (
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Agent profile badge and verification</span>
                  </li>
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleUpgrade}>
                <Shield className="mr-2 h-4 w-4" />
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
