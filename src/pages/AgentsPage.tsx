
import MainLayout from "@/components/layout/MainLayout";
import AgentList from "@/components/agents/AgentList";

export default function AgentsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Real Estate Agents</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          At 1313 Housing Group, our team of dedicated real estate agents brings extensive experience and local knowledge of Chandigarh and Punjab. 
          Connect with one of our agents to find your ideal property.
        </p>
        
        <AgentList />
      </div>
    </MainLayout>
  );
}
