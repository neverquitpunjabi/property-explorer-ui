import MainLayout from "@/components/layout/MainLayout";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { Property, properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { SearchIcon, MapPin, Home, Building, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const featuredProperties = properties.filter(property => property.isFeatured);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        ></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Discover Your Ideal Home in Chandigarh
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Premier housing solutions across Punjab, India with 1313 Housing Group
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-1">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter a location or property type"
                    className="w-full pl-10 py-3 outline-none text-gray-700 text-base"
                  />
                </div>
                <Button size="lg" className="sm:rounded-l-none">Search Properties</Button>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/properties">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Home className="h-5 w-5" />
                  All Properties
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="lg" className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <MapPin className="h-5 w-5" />
                  Map View
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties that offer exceptional value and features
            </p>
          </div>
          
          <PropertyGrid properties={featuredProperties} />
          
          <div className="mt-12 text-center">
            <Link to="/properties">
              <Button size="lg">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Property Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Explore Property Types</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our diverse range of property types to find your perfect match
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => (
              <Link
                key={index}
                to={`/properties?type=${type.value}`}
                className="group overflow-hidden rounded-lg relative h-64 border shadow-sm"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${type.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <type.icon className="h-8 w-8 mb-2" />
                  <h3 className="text-xl font-bold mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-200">{type.count} Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let us help you find the perfect property that matches your lifestyle and preferences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/properties">
                <Button variant="secondary" size="lg">Browse Properties</Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white/30 hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

const propertyTypes = [
  {
    name: "Houses",
    value: "house",
    count: 124,
    icon: Home,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Apartments",
    value: "apartment",
    count: 87,
    icon: Building,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Condos",
    value: "condo",
    count: 56,
    icon: Building2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Townhouses",
    value: "townhouse",
    count: 43,
    icon: HomeIcon,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
