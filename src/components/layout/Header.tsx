
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, MapPin, Menu, X, UserPlus, LogIn, 
  User, LogOut, Settings, Home 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ListPropertyButton from "../properties/ListPropertyButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, userRole, remainingListings, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-1">
          <MapPin className="h-6 w-6" />
          <span>1313 Housing Group</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/properties" className="font-medium hover:text-primary transition-colors">Properties</Link>
          <Link to="/map" className="font-medium hover:text-primary transition-colors">Map View</Link>
          <Link to="/agents" className="font-medium hover:text-primary transition-colors">Agents</Link>
          <Link to="#" className="font-medium hover:text-primary transition-colors">About</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          
          {isAuthenticated ? (
            <>
              <ListPropertyButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Account
                    {remainingListings !== null && (
                      <span className="ml-2 px-2 py-0.5 bg-primary/10 rounded-full text-xs">
                        {remainingListings} listings
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.email}
                    <span className="block text-xs text-muted-foreground">
                      {userRole === "agent" ? "Agent Account" : "User Account"}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Button>
              <Button size="sm" onClick={() => navigate("/auth?tab=signup")}>
                <UserPlus className="h-4 w-4 mr-1" />
                Sign Up
              </Button>
            </>
          )}
        </div>
        
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/properties" className="py-2 hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>Properties</Link>
            <Link to="/map" className="py-2 hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>Map View</Link>
            <Link to="/agents" className="py-2 hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>Agents</Link>
            <Link to="#" className="py-2 hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              
              {isAuthenticated ? (
                <>
                  <ListPropertyButton className="w-full" />
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/dashboard");
                    }}
                  >
                    Dashboard
                    {remainingListings !== null && (
                      <span className="px-2 py-0.5 bg-primary/10 rounded-full text-xs">
                        {remainingListings} listings left
                      </span>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-500 hover:text-red-700"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/auth");
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button 
                    className="w-full justify-start"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/auth?tab=signup");
                    }}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
