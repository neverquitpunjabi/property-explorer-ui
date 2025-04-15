
import { useEffect, useRef, useState } from "react";
import { Property } from "@/data/properties";
import { MapPin } from "lucide-react";

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property;
  onPropertySelect?: (property: Property) => void;
  className?: string;
}

export default function PropertyMap({ 
  properties, 
  selectedProperty, 
  onPropertySelect,
  className = "h-[500px]" 
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Since we don't have actual map integration yet, we'll create a placeholder
  // This will show property pins on a grid layout
  
  useEffect(() => {
    // In a real implementation, this would initialize a map library like Google Maps or Mapbox
    setMapInitialized(true);
  }, []);

  const getBoundsForProperties = () => {
    // Just a placeholder for now
    return { center: { lat: 39.8283, lng: -98.5795 }, zoom: 4 };
  };

  if (mapError) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-center p-8">
          <p className="text-red-500 mb-2">Map could not be loaded</p>
          <p className="text-sm text-gray-600">{mapError}</p>
        </div>
      </div>
    );
  }

  if (!mapInitialized) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mb-2"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-center p-8">
          <p className="text-gray-800 font-medium mb-2">No properties to display on map</p>
          <p className="text-sm text-gray-600">Adjust your filters to see properties</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={mapRef} className={`bg-gray-100 rounded-lg ${className} p-6 relative overflow-hidden border`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg text-gray-500 bg-white/80 px-4 py-2 rounded-md">
          Interactive map will be implemented with Mapbox or Google Maps
        </p>
      </div>

      {/* Simple placeholder map with pins */}
      <div className="relative h-full">
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`relative cursor-pointer transition-transform hover:scale-110 ${
                selectedProperty?.id === property.id ? "scale-110" : ""
              }`}
              onClick={() => onPropertySelect?.(property)}
            >
              <div 
                className={`
                  bg-white p-3 rounded-lg shadow-sm border-2 flex flex-col items-center
                  ${selectedProperty?.id === property.id ? "border-primary" : "border-transparent"}
                `}
              >
                <MapPin 
                  className={`h-8 w-8 ${
                    selectedProperty?.id === property.id ? "text-primary" : "text-estate-600"
                  }`} 
                />
                <p className="text-xs font-medium mt-1 text-center line-clamp-1">{property.title}</p>
                <p className="text-xs text-gray-500">${property.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
