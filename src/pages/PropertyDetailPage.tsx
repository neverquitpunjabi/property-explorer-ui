
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Property, properties } from "@/data/properties";
import MainLayout from "@/components/layout/MainLayout";
import PropertyDetails from "@/components/properties/PropertyDetails";

export default function PropertyDetailPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    // For now, we'll simulate a fetch with a timeout
    const timer = setTimeout(() => {
      const foundProperty = properties.find(p => p.id === propertyId);
      
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        // If property not found, redirect to properties page
        navigate("/properties", { replace: true });
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [propertyId, navigate]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-80 rounded-lg mb-6"></div>
            <div className="bg-gray-200 h-10 max-w-md mb-2 rounded"></div>
            <div className="bg-gray-200 h-6 max-w-sm mb-8 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-gray-200 h-6 mb-4 rounded"></div>
                <div className="bg-gray-200 h-6 mb-4 rounded"></div>
                <div className="bg-gray-200 h-6 mb-4 rounded"></div>
                <div className="bg-gray-200 h-6 mb-4 rounded"></div>
              </div>
              <div className="md:col-span-1">
                <div className="bg-gray-200 h-40 rounded mb-6"></div>
                <div className="bg-gray-200 h-40 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!property) {
    return null; // Should never get here because of the redirect
  }
  
  return (
    <MainLayout>
      <PropertyDetails property={property} />
    </MainLayout>
  );
}
