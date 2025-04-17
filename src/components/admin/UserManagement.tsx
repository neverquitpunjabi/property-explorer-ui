
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShieldAlert, ShieldCheck, Search, User, UserCheck } from "lucide-react";

// Mock user data - in a real implementation, fetch from your API/database
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "agent", status: "active" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", role: "user", status: "blocked" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "agent", status: "active" },
  { id: 5, name: "Robert Johnson", email: "robert@example.com", role: "user", status: "active" },
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [actionType, setActionType] = useState<"block" | "unblock">("block");
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAction = (user: typeof mockUsers[0], action: "block" | "unblock") => {
    setSelectedUser(user);
    setActionType(action);
    setConfirmDialogOpen(true);
  };
  
  const confirmAction = () => {
    if (!selectedUser) return;
    
    // Update user status in the state
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, status: actionType === "block" ? "blocked" : "active" } 
        : user
    ));
    
    // Show success message
    toast.success(`User ${selectedUser.name} has been ${actionType === "block" ? "blocked" : "unblocked"}`);
    
    // Close dialog
    setConfirmDialogOpen(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "agent" ? "default" : "outline"}>
                    {user.role === "agent" ? (
                      <span className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3" />
                        Agent
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        User
                      </span>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.status === "active" ? "default" : "destructive"}
                    className={user.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.status === "active" ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleAction(user, "block")}
                    >
                      <ShieldAlert className="h-4 w-4 mr-1" />
                      Block
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-green-600"
                      onClick={() => handleAction(user, "unblock")}
                    >
                      <ShieldCheck className="h-4 w-4 mr-1" />
                      Unblock
                    </Button>
                  )}
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
              {actionType === "block" ? "Block User" : "Unblock User"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "block" 
                ? "Are you sure you want to block this user? They will not be able to access the platform."
                : "Are you sure you want to unblock this user? They will regain access to the platform."}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant={actionType === "block" ? "destructive" : "default"}
              onClick={confirmAction}
            >
              {actionType === "block" ? "Block User" : "Unblock User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
