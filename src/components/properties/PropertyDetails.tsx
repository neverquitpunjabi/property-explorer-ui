
import { Property, formatPrice } from "@/data/properties";
import { 
  Bed, 
  Bath, 
  SquareIcon, 
  CalendarDays, 
  Tag, 
  Heart, 
  Share2, 
  Printer, 
  MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropertyGallery from "./PropertyGallery";
import PropertyMap from "../map/PropertyMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const {
    title,
    address,
    city,
    state,
    zipCode,
    price,
    description,
    bedrooms,
    bathrooms,
    squareFeet,
    features,
    yearBuilt,
    listingType,
    propertyType,
    images
  } = property;
  
  return (
    <div className="bg-white">
      <div className="relative">
        {/* Property Gallery */}
        <PropertyGallery images={images} title={title} />
        
        {/* Property Quick Actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Button variant="secondary" size="icon" className="rounded-full bg-white/90 hover:bg-white">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/90 hover:bg-white">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/90 hover:bg-white">
            <Printer className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={listingType === 'rent' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'}>
                For {listingType === 'rent' ? 'Rent' : 'Sale'}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {propertyType}
              </Badge>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>
            
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{address}, {city}, {state} {zipCode}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 py-4 border-y">
              <div className="flex items-center">
                <Bed className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{bedrooms}</p>
                  <p className="text-sm text-muted-foreground">{bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Bath className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{bathrooms}</p>
                  <p className="text-sm text-muted-foreground">{bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <SquareIcon className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{squareFeet.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Square Feet</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{yearBuilt}</p>
                  <p className="text-sm text-muted-foreground">Year Built</p>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-0">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">About this property</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Property Type</span>
                      <span className="font-medium capitalize">{propertyType}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Year Built</span>
                      <span className="font-medium">{yearBuilt}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Square Footage</span>
                      <span className="font-medium">{squareFeet.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Bedrooms</span>
                      <span className="font-medium">{bedrooms}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Bathrooms</span>
                      <span className="font-medium">{bathrooms}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Listing Type</span>
                      <span className="font-medium capitalize">For {listingType}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="mt-0">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Property Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="map" className="mt-0">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <div className="mb-4">
                    <p className="text-muted-foreground">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {address}, {city}, {state} {zipCode}
                    </p>
                  </div>
                  <PropertyMap properties={[property]} selectedProperty={property} className="h-[400px]" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  {formatPrice(price, listingType === 'rent')}
                </h2>
                
                {listingType === 'rent' && (
                  <p className="text-muted-foreground mb-6">Monthly Rent</p>
                )}
                
                <div className="space-y-4">
                  <Button className="w-full text-base py-6">Contact Agent</Button>
                  <Button variant="outline" className="w-full text-base py-6">Schedule Tour</Button>
                  <Button variant="secondary" className="w-full text-base py-6">
                    <Heart className="mr-2 h-5 w-5" />
                    Save Property
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Agent Information</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-muted-foreground">Licensed Real Estate Agent</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    (555) 123-4567
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Agent
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
