
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

interface ListPropertyButtonProps {
  className?: string;
}

export default function ListPropertyButton({ className }: ListPropertyButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const { userRole, remainingListings, addListing, upgradeAccount } = useAuth();
  
  const handleOpenDialog = () => {
    if (remainingListings && remainingListings > 0) {
      setDialogOpen(true);
    } else {
      setUpgradeDialogOpen(true);
    }
  };

  const handleListProperty = (e: React.FormEvent) => {
    e.preventDefault();
    addListing();
    setDialogOpen(false);
    toast.success("Property listed successfully");
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
                ? "As an agent, you can list up to 5 properties for free." 
                : "As a user, you can list up to 3 properties for free."}
              {remainingListings !== null && 
                ` You have ${remainingListings} free listings remaining.`}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleListProperty} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Property Title</Label>
                <Input id="title" placeholder="Luxurious 3-Bedroom Apartment" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="250000" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" type="number" min="0" placeholder="3" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" type="number" min="0" step="0.5" placeholder="2" required />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main Street, City, State, Zip" required />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter property description..." required />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="images">Upload Images</Label>
              <Input id="images" type="file" multiple accept="image/*" required />
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
                ? "Upgrade to list up to 10 properties for just $10." 
                : "Upgrade to list up to 7 properties for just $5."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="bg-primary/5 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">
                {userRole === "agent" ? "Agent Premium" : "User Premium"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {userRole === "agent" 
                  ? "List up to 10 properties with premium visibility." 
                  : "List up to 7 properties with improved search rankings."}
              </p>
              <div className="text-2xl font-bold">
                {userRole === "agent" ? "$10" : "$5"}
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
