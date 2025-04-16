import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  HomeIcon, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Share2, 
  Facebook, 
  Instagram, 
  Twitter, 
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    location: string;
    phone: string;
    email: string;
    listingCount: number;
    isPremium: boolean;
  };
}

export default function AgentCard({ agent }: AgentCardProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleContactAgent = () => {
    toast.success("Contact request sent to agent");
  };
  
  const handleShareProfile = (platform: string) => {
    const agentProfileUrl = `${window.location.origin}/agent/${agent.id}`;
    let shareUrl = "";
    
    switch(platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(agentProfileUrl)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(agentProfileUrl)}&text=${encodeURIComponent(`Check out ${agent.name}'s property listings at 1313 Housing Group`)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out ${agent.name}'s property listings at 1313 Housing Group: ${agentProfileUrl}`)}`;
        break;
      default:
        toast.error("Sharing platform not supported");
        return;
    }
    
    window.open(shareUrl, "_blank");
    setShareDialogOpen(false);
    toast.success(`Shared agent profile on ${platform}`);
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="relative pb-0">
        {agent.isPremium && (
          <Badge className="absolute right-4 top-4 bg-primary">Premium Agent</Badge>
        )}
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-2">
            {agent.avatar ? (
              <img src={agent.avatar} alt={agent.name} />
            ) : (
              <User className="h-12 w-12" />
            )}
          </Avatar>
          <CardTitle className="text-center">{agent.name}</CardTitle>
          <p className="text-muted-foreground text-sm">{agent.role}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{agent.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{agent.phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{agent.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <HomeIcon className="h-4 w-4 text-muted-foreground" />
            <span>{agent.listingCount} active listings</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate(`/agent/${agent.id}`)}>
          View Listings
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleContactAgent()}>
            Contact
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => setShareDialogOpen(true)}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
      
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Agent Profile</DialogTitle>
            <DialogDescription>
              Share {agent.name}'s profile and property listings on your social media.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-4 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => handleShareProfile("facebook")}
            >
              <Facebook className="h-8 w-8 text-blue-600" />
              <span className="text-xs">Facebook</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => handleShareProfile("twitter")}
            >
              <Twitter className="h-8 w-8 text-blue-400" />
              <span className="text-xs">Twitter</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => handleShareProfile("whatsapp")}
            >
              <MessageSquare className="h-8 w-8 text-green-500" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/agent/${agent.id}`);
                toast.success("Profile link copied to clipboard");
              }}
            >
              <Share2 className="h-8 w-8 text-gray-500" />
              <span className="text-xs">Copy Link</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
