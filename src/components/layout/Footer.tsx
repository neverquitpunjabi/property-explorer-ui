
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold text-primary flex items-center gap-1 mb-4">
              <MapPin className="h-5 w-5" />
              <span>EstateHub</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Finding your perfect property match with professionalism and care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/properties" className="text-gray-600 hover:text-primary transition-colors">Properties</Link></li>
              <li><Link to="/map" className="text-gray-600 hover:text-primary transition-colors">Map View</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary transition-colors">Agents</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-primary transition-colors">Apartments</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary transition-colors">Houses</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary transition-colors">Villas</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary transition-colors">Commercial</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-primary transition-colors">Land</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 text-primary mr-2" />
                <span className="text-gray-600">123 Estate St, Real City</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-primary mr-2" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-primary mr-2" />
                <span className="text-gray-600">info@estatehub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} EstateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
