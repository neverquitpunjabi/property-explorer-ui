
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, EyeIcon, TrashIcon, CheckCircle, XCircle, Home } from "lucide-react";

// Mock property data - in a real implementation, fetch from your API/database
const mockProperties = [
  { id: 1, title: "Modern Apartment in Downtown", price: "$250,000", type: "Sale", status: "active", owner: "John Doe" },
  { id: 2, title: "Spacious Family Home", price: "$1,500/mo", type: "Rent", status: "active", owner: "Jane Smith" },
  { id: 3, title: "Luxury Penthouse with Ocean View", price: "$750,000", type: "Sale", status: "pending", owner: "Michael Brown" },
  { id: 4, title: "Cozy Studio Apartment", price: "$900/mo", type: "Rent", status: "active", owner: "Sarah Wilson" },
  { id: 5, title: "Beach House with Private Pool", price: "$450,000", type: "Sale", status: "active", owner: "Robert Johnson" },
];

export default function PropertyManagement() {
  const [properties, setProperties] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<typeof mockProperties[0] | null>(null);
  const [actionType, setActionType] = useState<"approve" | "remove">("approve");
  
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    property.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAction = (property: typeof mockProperties[0], action: "approve" | "remove") => {
    setSelectedProperty(property);
    setActionType(action);
    setConfirmDialogOpen(true);
  };
  
  const confirmAction = () => {
    if (!selectedProperty) return;
    
    if (actionType === "remove") {
      // Remove property from the list
      setProperties(properties.filter(property => property.id !== selectedProperty.id));
      toast.success(`Property "${selectedProperty.title}" has been removed`);
    } else {
      // Update property status
      setProperties(properties.map(property => 
        property.id === selectedProperty.id 
          ? { ...property, status: "active" } 
          : property
      ));
      toast.success(`Property "${selectedProperty.title}" has been approved`);
    }
    
    // Close dialog
    setConfirmDialogOpen(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Property Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProperties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No properties found
              </TableCell>
            </TableRow>
          ) : (
            filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>
                  <Badge variant={property.type === "Sale" ? "default" : "secondary"}>
                    {property.type}
                  </Badge>
                </TableCell>
                <TableCell>{property.owner}</TableCell>
                <TableCell>
                  <Badge variant={property.status === "active" ? "default" : "outline"} 
                         className={property.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                    {property.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    
                    {property.status === "pending" && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-green-600"
                        onClick={() => handleAction(property, "approve")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleAction(property, "remove")}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Property" : "Remove Property"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" 
                ? "Are you sure you want to approve this property? It will be visible to all users."
                : "Are you sure you want to remove this property? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="py-4">
              <p><strong>Title:</strong> {selectedProperty.title}</p>
              <p><strong>Price:</strong> {selectedProperty.price}</p>
              <p><strong>Owner:</strong> {selectedProperty.owner}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant={actionType === "remove" ? "destructive" : "default"}
              onClick={confirmAction}
            >
              {actionType === "approve" ? "Approve Property" : "Remove Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
