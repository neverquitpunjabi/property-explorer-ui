
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Mock data for user listings
const mockListings = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: 320000,
    bedrooms: 2,
    bathrooms: 2,
    address: "123 Main St, Downtown",
    description: "A beautiful modern apartment in the heart of downtown.",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Suburban Family Home",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    address: "456 Oak Ave, Suburbia",
    description: "Perfect family home with a large backyard.",
    imageUrl: "/placeholder.svg"
  }
];

export default function UserListings() {
  const { userRole, deleteListing } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<typeof mockListings[0] | null>(null);
  const [listings, setListings] = useState(mockListings);
  const [editFormData, setEditFormData] = useState({
    title: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    address: "",
    description: ""
  });
  
  const handleEdit = (listing: typeof mockListings[0]) => {
    setSelectedListing(listing);
    setEditFormData({
      title: listing.title,
      price: listing.price,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      address: listing.address,
      description: listing.description
    });
    setEditDialogOpen(true);
  };
  
  const handleDelete = (listing: typeof mockListings[0]) => {
    setSelectedListing(listing);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedListing) {
      // Update the local state
      setListings(listings.filter(listing => listing.id !== selectedListing.id));
      
      // Call the deleteListing function from auth context
      deleteListing(selectedListing.id);
      setDeleteDialogOpen(false);
      toast.success("Listing deleted successfully");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const formId = id.replace('edit-', '');
    
    setEditFormData(prev => ({
      ...prev,
      [formId]: id.includes('price') || id.includes('bedrooms') || id.includes('bathrooms')
        ? Number(value)
        : value
    }));
  };
  
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedListing) {
      const updatedListing = {
        ...selectedListing,
        title: editFormData.title,
        price: editFormData.price,
        bedrooms: editFormData.bedrooms,
        bathrooms: editFormData.bathrooms,
        address: editFormData.address,
        description: editFormData.description
      };
      
      // Update the local state
      setListings(listings.map(listing => 
        listing.id === selectedListing.id ? updatedListing : listing
      ));
      
      setEditDialogOpen(false);
      toast.success("Listing updated successfully");
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Listings</h2>
        <div className="text-sm text-muted-foreground">
          {userRole === "agent" 
            ? "Free tier: 5 listings | Premium: 20 listings" 
            : "Free tier: 3 listings | Premium: 7 listings"}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-200">
              <img 
                src={listing.imageUrl} 
                alt={listing.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
              <p className="text-primary font-bold mb-2">${listing.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mb-4">{listing.address}</p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {listing.bedrooms} bed • {listing.bathrooms} bath
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEdit(listing)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDelete(listing)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogDescription>
              Update your property listing details.
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && (
            <form className="grid gap-4 py-4" onSubmit={handleSubmitEdit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="edit-title">Property Title</Label>
                  <Input 
                    id="edit-title" 
                    value={editFormData.title}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="edit-price">Price</Label>
                  <Input 
                    id="edit-price" 
                    type="number" 
                    value={editFormData.price}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="edit-bedrooms">Bedrooms</Label>
                  <Input 
                    id="edit-bedrooms" 
                    type="number" 
                    min="0" 
                    value={editFormData.bedrooms}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="edit-bathrooms">Bathrooms</Label>
                  <Input 
                    id="edit-bathrooms" 
                    type="number" 
                    min="0" 
                    step="0.5" 
                    value={editFormData.bathrooms}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="edit-address">Address</Label>
                <Input 
                  id="edit-address" 
                  value={editFormData.address}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={editFormData.description}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="edit-images">Upload New Images</Label>
                <Input id="edit-images" type="file" multiple accept="image/*" />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && (
            <div className="py-4">
              <p className="font-medium">{selectedListing.title}</p>
              <p className="text-sm text-gray-500">{selectedListing.address}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
