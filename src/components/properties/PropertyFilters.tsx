
import { useState } from "react";
import { Property } from "@/data/properties";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

export interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilterOptions) => void;
}

export interface PropertyFilterOptions {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minBeds: number | undefined;
  minBaths: number | undefined;
  propertyTypes: Property["propertyType"][];
  listingType: Property["listingType"] | undefined;
}

const defaultFilters: PropertyFilterOptions = {
  minPrice: undefined,
  maxPrice: undefined,
  minBeds: undefined,
  minBaths: undefined,
  propertyTypes: [],
  listingType: undefined,
};

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilterOptions>(defaultFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Compute active filter count
  const activeFilterCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === "propertyTypes" && (value as string[]).length > 0) {
      return count + 1;
    }
    if (key !== "propertyTypes" && value !== undefined) {
      return count + 1;
    }
    return count;
  }, 0);

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setFilters({
      ...filters,
      minPrice: values[0] > 0 ? values[0] : undefined,
      maxPrice: values[1] < 10000000 ? values[1] : undefined,
    });
  };

  const handlePropertyTypeChange = (type: Property["propertyType"], checked: boolean) => {
    const updatedTypes = checked
      ? [...filters.propertyTypes, type]
      : filters.propertyTypes.filter((t) => t !== type);
    
    setFilters({
      ...filters,
      propertyTypes: updatedTypes,
    });
  };

  const handleListingTypeChange = (type: Property["listingType"] | "any") => {
    setFilters({
      ...filters,
      listingType: type === "any" ? undefined : type,
    });
  };

  const handleBedroomsChange = (value: string) => {
    setFilters({
      ...filters,
      minBeds: value ? parseInt(value) : undefined,
    });
  };

  const handleBathroomsChange = (value: string) => {
    setFilters({
      ...filters,
      minBaths: value ? parseInt(value) : undefined,
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsMobileFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setPriceRange([0, 10000000]);
    onFilterChange(defaultFilters);
  };

  const formatPriceLabel = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="mb-4 lg:hidden">
        <Button 
          onClick={() => setIsMobileFilterOpen(true)}
          variant="outline" 
          className="w-full flex items-center justify-center"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-primary h-5 w-5 p-0 flex items-center justify-center">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Mobile filter drawer */}
      <div 
        className={`fixed inset-0 bg-black/30 z-50 lg:hidden transition-opacity ${
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
            {renderFilterContent()}
            
            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block sticky top-20 border rounded-lg p-4 bg-white">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="h-8 text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
        
        {renderFilterContent()}
        
        <Button onClick={applyFilters} className="w-full mt-4">
          Apply Filters
        </Button>
      </div>
    </>
  );

  function renderFilterContent() {
    return (
      <>
        <Accordion type="single" collapsible defaultValue="price" className="w-full">
          <AccordionItem value="price" className="border-b">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="mt-2">
                <Slider 
                  min={0}
                  max={10000000}
                  step={50000}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="my-6"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>{formatPriceLabel(priceRange[0])}</span>
                  <span>{formatPriceLabel(priceRange[1])}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="beds-baths" className="border-b">
            <AccordionTrigger>Beds & Baths</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="min-beds">Bedrooms (min)</Label>
                  <Select 
                    value={filters.minBeds?.toString() || "any"}
                    onValueChange={handleBedroomsChange}
                  >
                    <SelectTrigger id="min-beds">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="min-baths">Bathrooms (min)</Label>
                  <Select 
                    value={filters.minBaths?.toString() || "any"}
                    onValueChange={handleBathroomsChange}
                  >
                    <SelectTrigger id="min-baths">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="property-type" className="border-b">
            <AccordionTrigger>Property Type</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="house"
                    checked={filters.propertyTypes.includes("house")}
                    onCheckedChange={(checked) => handlePropertyTypeChange("house", checked === true)}
                  />
                  <Label htmlFor="house" className="text-sm cursor-pointer">Houses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="apartment"
                    checked={filters.propertyTypes.includes("apartment")}
                    onCheckedChange={(checked) => handlePropertyTypeChange("apartment", checked === true)}
                  />
                  <Label htmlFor="apartment" className="text-sm cursor-pointer">Apartments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="condo"
                    checked={filters.propertyTypes.includes("condo")}
                    onCheckedChange={(checked) => handlePropertyTypeChange("condo", checked === true)}
                  />
                  <Label htmlFor="condo" className="text-sm cursor-pointer">Condos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="townhouse"
                    checked={filters.propertyTypes.includes("townhouse")}
                    onCheckedChange={(checked) => handlePropertyTypeChange("townhouse", checked === true)}
                  />
                  <Label htmlFor="townhouse" className="text-sm cursor-pointer">Townhouses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="land"
                    checked={filters.propertyTypes.includes("land")}
                    onCheckedChange={(checked) => handlePropertyTypeChange("land", checked === true)}
                  />
                  <Label htmlFor="land" className="text-sm cursor-pointer">Land</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="listing-type" className="border-b">
            <AccordionTrigger>Listing Type</AccordionTrigger>
            <AccordionContent>
              <div className="mt-2">
                <Select 
                  value={filters.listingType || "any"}
                  onValueChange={(value: "sale" | "rent" | "any") => handleListingTypeChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
  }
}
