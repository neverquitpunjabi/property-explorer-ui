
import AgentCard from "./AgentCard";
import { useAuth } from "@/contexts/AuthContext";

export default function AgentList() {
  const { user } = useAuth();
  
  // Generate an agent name from the current user's email if available
  const generateNameFromEmail = (email: string) => {
    const namePart = email.split('@')[0];
    // Convert john.doe or john_doe to John Doe
    return namePart
      .replace(/[._]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  // Create a more dynamic agent list using the current user's information if available
  const agentList = [
    {
      id: "agent1",
      name: user?.user_metadata?.name || 
            (user?.email ? generateNameFromEmail(user.email) : "Rahul Sharma"),
      role: "Senior Real Estate Agent",
      location: "Sector 17, Chandigarh",
      phone: "+91 98765 43210",
      email: user?.email || "rahul.sharma@1313housinggroup.com",
      listingCount: 8,
      isPremium: true
    },
    {
      id: "agent2",
      name: "Priya Patel",
      role: "Property Consultant",
      location: "Sector 22, Chandigarh",
      phone: "+91 87654 32109",
      email: "priya.patel@1313housinggroup.com",
      listingCount: 5,
      isPremium: false
    },
    {
      id: "agent3",
      name: "Amit Singh",
      role: "Commercial Property Specialist",
      location: "Sector 8, Chandigarh",
      phone: "+91 76543 21098",
      email: "amit.singh@1313housinggroup.com",
      listingCount: 12,
      isPremium: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Our Expert Agents</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Our team of experienced real estate professionals is here to help you find your perfect property in Chandigarh and Punjab.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agentList.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
