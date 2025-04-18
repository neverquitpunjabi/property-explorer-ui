
import React from 'react';  // Make sure React is explicitly imported
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import MapViewPage from "./pages/MapViewPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import UserDashboardPage from "./pages/UserDashboardPage";
import AuthPage from "./pages/AuthPage";
import UpgradePage from "./pages/UpgradePage";
import AgentsPage from "./pages/AgentsPage";
import AgentProfilePage from "./pages/AgentProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/property/:propertyId" element={<PropertyDetailPage />} />
                <Route path="/map" element={<MapViewPage />} />
                <Route path="/dashboard" element={<UserDashboardPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/upgrade" element={<UpgradePage />} />
                <Route path="/agents" element={<AgentsPage />} />
                <Route path="/profile" element={<AgentProfilePage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
