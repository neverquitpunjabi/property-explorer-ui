
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PropertyGrid from "@/components/properties/PropertyGrid";
import PropertyFilters, { PropertyFilterOptions } from "@/components/properties/PropertyFilters";
import { Property, getFilteredProperties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Grid2X2, ListFilter, LayoutList, MapPin } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [activeFilters, setActiveFilters] = useState<PropertyFilterOptions>({
    minPrice: undefined,
    maxPrice: undefined,
    minBeds: undefined,
    minBaths: undefined,
    propertyTypes: [],
    listingType: undefined,
  });
  const [sortOption, setSortOption] = useState("newest");

  // Initialize filters from URL params
  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setActiveFilters(prev => ({
        ...prev,
        propertyTypes: [type as Property["propertyType"]],
      }));
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    const filtered = getFilteredProperties({
      minPrice: activeFilters.minPrice,
      maxPrice: activeFilters.maxPrice,
      minBeds: activeFilters.minBeds,
      minBaths: activeFilters.minBaths,
      propertyType: activeFilters.propertyTypes.length > 0 ? activeFilters.propertyTypes : undefined,
      listingType: activeFilters.listingType,
    });
    
    setFilteredProperties(filtered);
  }, [activeFilters]);

  const handleFilterChange = (filters: PropertyFilterOptions) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    // Logic for sorting properties would go here
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Browse Properties</h1>
          <p className="text-muted-foreground mb-6">
            Find your dream property from our extensive collection
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              <span className="text-muted-foreground mr-2">
                {filteredProperties.length} Properties Found
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex border rounded-lg overflow-hidden">
                <Button variant="ghost" size="sm" className="rounded-none border-r">
                  <Grid2X2 className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button variant="ghost" size="sm" className="rounded-none border-r">
                  <LayoutList className="h-4 w-4 mr-2" />
                  List
                </Button>
                <Link to="/map">
                  <Button variant="ghost" size="sm" className="rounded-none">
                    <MapPin className="h-4 w-4 mr-2" />
                    Map
                  </Button>
                </Link>
              </div>
              
              <Select
                defaultValue="newest"
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <PropertyFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="w-full lg:w-3/4">
            <PropertyGrid properties={filteredProperties} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
