
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Property } from "@/data/properties";

interface ListPropertyButtonProps {
  className?: string;
}

export default function ListPropertyButton({ className }: ListPropertyButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const { userRole, remainingListings, addListing, upgradeAccount } = useAuth();
  const [listingType, setListingType] = useState<"sale" | "rent">("sale");
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    description: "",
    city: "Chandigarh",
    state: "Punjab",
    zipCode: "160001",
    squareFeet: "1000",
    propertyType: "house" as Property["propertyType"],
    yearBuilt: new Date().getFullYear() - 5
  });
  
  const handleOpenDialog = () => {
    if (remainingListings && remainingListings > 0) {
      setDialogOpen(true);
    } else {
      setUpgradeDialogOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleListProperty = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProperty: Omit<Property, "id"> = {
      title: formData.title,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      squareFeet: Number(formData.squareFeet),
      description: formData.description,
      features: [],
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
      ],
      coordinates: {
        lat: 30.7333,
        lng: 76.7794
      },
      propertyType: formData.propertyType,
      listingType: listingType,
      yearBuilt: formData.yearBuilt,
      isFeatured: false
    };
    
    addListing(newProperty);
    setDialogOpen(false);
    
    // Reset form
    setFormData({
      title: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      address: "",
      description: "",
      city: "Chandigarh",
      state: "Punjab",
      zipCode: "160001",
      squareFeet: "1000",
      propertyType: "house" as Property["propertyType"],
      yearBuilt: new Date().getFullYear() - 5
    });
  };

  const handleUpgrade = () => {
    upgradeAccount();
    setUpgradeDialogOpen(false);
  };

  return (
    <>
      <Button 
        onClick={handleOpenDialog} 
        className={className}
        variant="default"
        size="sm"
      >
        <HomeIcon className="h-4 w-4 mr-2" />
        List Property
      </Button>

      {/* Property Listing Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>List Your Property</DialogTitle>
            <DialogDescription>
              {userRole === "agent" 
                ? "As an agent, you can list up to 13 properties for free, or up to 63 with a premium account." 
                : "As a user, you can list up to 3 properties for free, or up to 13 with a premium account."}
              {remainingListings !== null && 
                ` You have ${remainingListings} free listings remaining.`}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleListProperty} className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Listing Type</Label>
              <RadioGroup 
                defaultValue="sale" 
                className="flex space-x-4"
                value={listingType}
                onValueChange={(value) => setListingType(value as "sale" | "rent")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sale" id="listing-sale" />
                  <Label htmlFor="listing-sale">For Sale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rent" id="listing-rent" />
                  <Label htmlFor="listing-rent">For Rent</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Property Title</Label>
                <Input 
                  id="title" 
                  placeholder="Luxurious 3-Bedroom Apartment" 
                  value={formData.title}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price {listingType === "rent" ? "(monthly)" : ""}</Label>
                <Input 
                  id="price" 
                  type="number" 
                  placeholder={listingType === "rent" ? "2500" : "250000"} 
                  value={formData.price}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input 
                  id="bedrooms" 
                  type="number" 
                  min="0" 
                  placeholder="3" 
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input 
                  id="bathrooms" 
                  type="number" 
                  min="0" 
                  step="0.5" 
                  placeholder="2" 
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                placeholder="123 Main Street, City, State, Zip" 
                value={formData.address}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter property description..." 
                value={formData.description}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="images">Upload Images</Label>
              <Input id="images" type="file" multiple accept="image/*" />
              <p className="text-xs text-muted-foreground mt-1">
                (Default image will be used if none uploaded)
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Listing</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upgrade Account Dialog */}
      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upgrade Your Account</DialogTitle>
            <DialogDescription>
              {userRole === "agent" 
                ? "Upgrade to list up to 63 properties for just $63/month." 
                : "Upgrade to list up to 13 properties for just $13/month."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="bg-primary/5 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">
                {userRole === "agent" ? "Agent Premium" : "User Premium"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {userRole === "agent" 
                  ? "List up to 63 properties with premium visibility and featured placement." 
                  : "List up to 13 properties with improved search rankings and better visibility."}
              </p>
              <div className="text-2xl font-bold">
                {userRole === "agent" ? "$63" : "$13"}<span className="text-sm text-muted-foreground">/month</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setUpgradeDialogOpen(false)}>
              Maybe Later
            </Button>
            <Button onClick={handleUpgrade}>Upgrade Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
