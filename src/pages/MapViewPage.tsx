
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PropertyMap from "@/components/map/PropertyMap";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters, { PropertyFilterOptions } from "@/components/properties/PropertyFilters";
import { Property, getFilteredProperties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function MapViewPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(undefined);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(getFilteredProperties({}));
  
  const handleFilterChange = (filters: PropertyFilterOptions) => {
    const filtered = getFilteredProperties({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minBeds: filters.minBeds,
      minBaths: filters.minBaths,
      propertyType: filters.propertyTypes.length > 0 ? filters.propertyTypes : undefined,
      listingType: filters.listingType,
    });
    
    setFilteredProperties(filtered);
    setIsMobileFilterOpen(false);
  };
  
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setIsSidebarOpen(true);
  };
  
  return (
    <MainLayout>
      <div className="relative h-[calc(100vh-64px)] bg-white md:bg-gray-50 overflow-hidden pt-12 md:pt-0">
        {/* Mobile Filter Button */}
        <div className="fixed top-[72px] left-4 z-20 md:hidden">
          <Button 
            onClick={() => setIsMobileFilterOpen(true)}
            variant="secondary" 
            size="sm"
            className="shadow-md"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        {/* Mobile Close Button - Only on mobile when selected property */}
        {selectedProperty && (
          <div className="fixed top-[72px] right-4 z-20 md:hidden">
            <Button 
              onClick={() => setSelectedProperty(undefined)}
              variant="secondary" 
              size="icon"
              className="h-8 w-8 shadow-md"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* Mobile Filters Drawer */}
        <div 
          className={`fixed inset-0 bg-black/30 z-50 md:hidden transition-opacity ${
            isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div 
            className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl transition-transform overflow-auto ${
              isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <PropertyFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
        
        <div className="flex h-full">
          {/* Sidebar Toggle for Medium+ screens */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex absolute top-6 left-0 z-10 bg-white shadow-md rounded-r-lg p-2"
          >
            {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {/* Sidebar */}
          <aside 
            className={`
              absolute md:relative z-30 md:z-auto h-full bg-white transition-all duration-300 overflow-hidden
              ${isSidebarOpen ? 'w-full md:w-1/3 lg:w-1/4' : 'w-0'}
              ${selectedProperty ? 'block md:block' : 'hidden md:block'}
            `}
          >
            <div className="flex flex-col h-full">
              {/* Desktop Filters */}
              <div className={`hidden md:block p-4 border-b ${selectedProperty ? 'hidden md:block' : 'block'}`}>
                <h2 className="text-lg font-semibold mb-4">Map Filters</h2>
                <PropertyFilters onFilterChange={handleFilterChange} />
              </div>
              
              {/* Selected Property Details */}
              {selectedProperty && (
                <div className="p-4 overflow-auto flex-grow">
                  <div className="md:hidden mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedProperty(undefined)}
                      className="w-full"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Map
                    </Button>
                  </div>
                  <PropertyCard property={selectedProperty} />
                </div>
              )}
              
              {/* Property List */}
              {!selectedProperty && (
                <div className="flex-grow overflow-auto">
                  <div className="p-4 border-b">
                    <h2 className="font-semibold">
                      {filteredProperties.length} Properties Found
                    </h2>
                  </div>
                  
                  <div className="divide-y">
                    {filteredProperties.map((property) => (
                      <div 
                        key={property.id} 
                        className="p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedProperty(property)}
                      >
                        <PropertyCard property={property} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
          
          {/* Map */}
          <div 
            className={`
              relative flex-grow transition-all
              ${selectedProperty ? 'hidden md:block' : 'block'}
            `}
          >
            <PropertyMap 
              properties={filteredProperties} 
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
              className="h-full" 
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
