
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-1">
          <MapPin className="h-6 w-6" />
          <span>EstateHub</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/properties" className="font-medium hover:text-primary transition-colors">Properties</Link>
          <Link to="/map" className="font-medium hover:text-primary transition-colors">Map View</Link>
          <Link to="#" className="font-medium hover:text-primary transition-colors">Agents</Link>
          <Link to="#" className="font-medium hover:text-primary transition-colors">About</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button>Sign In</Button>
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
            <Link to="#" className="py-2 hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>Agents</Link>
            <Link to="#" className="py-2 hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button className="w-full">Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
