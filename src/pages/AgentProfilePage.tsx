
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";
import { User, ImagePlus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const agentProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  role: z.string().min(2, { message: "Role is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  phone: z.string().min(5, { message: "Valid phone number required" }),
  email: z.string().email({ message: "Valid email required" }),
  about: z.string().optional(),
  facebook: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
  instagram: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
  twitter: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
  whatsapp: z.string().min(5, { message: "Valid WhatsApp number required" }).optional().or(z.literal(""))
});

type AgentProfileValues = z.infer<typeof agentProfileSchema>;

export default function AgentProfilePage() {
  const { isAuthenticated, userRole, user } = useAuth();
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const form = useForm<AgentProfileValues>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      name: "",
      role: "",
      location: "",
      phone: "",
      email: user?.email || "",
      about: "",
      facebook: "",
      instagram: "",
      twitter: "",
      whatsapp: ""
    }
  });
  
  // Redirect if not authenticated or not an agent
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to access your profile");
      navigate("/auth");
      return;
    }
    
    if (userRole !== "agent") {
      toast.error("Only agents can access this page");
      navigate("/dashboard");
      return;
    }
    
    // Use user's actual information from auth if available
    // Create a default name from email if name is not available
    const emailName = user?.email ? user.email.split('@')[0] : '';
    const displayName = user?.user_metadata?.name || emailName;
    
    form.reset({
      name: displayName,
      role: user?.user_metadata?.role === "agent" ? "Real Estate Agent" : "Property Consultant",
      location: "Chandigarh",
      phone: user?.phone || "+91 98765 43210",
      email: user?.email || "",
      about: "I specialize in properties in Chandigarh and surrounding areas.",
      facebook: "",
      instagram: "",
      twitter: "",
      whatsapp: ""
    });
    
  }, [isAuthenticated, userRole, navigate, user, form]);
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };
  
  const onSubmit = (data: AgentProfileValues) => {
    console.log("Form data:", data);
    // In a real app, we would update the agent profile in the database here
    toast.success("Profile updated successfully");
  };
  
  if (!isAuthenticated || userRole !== "agent") {
    return null; // Will redirect via useEffect
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Agent Profile</h1>
        <p className="text-muted-foreground mb-8">
          Update your profile information to showcase your expertise and help clients connect with you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Preview</CardTitle>
              <CardDescription>This is how clients will see your profile</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-6 group">
                <Avatar className="h-32 w-32 border-2 border-primary/20">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile preview" className="object-cover" />
                  ) : (
                    <User className="h-16 w-16" />
                  )}
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <ImagePlus className="h-8 w-8" />
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="sr-only" 
                  onChange={handleAvatarChange} 
                />
              </div>
              
              <h3 className="text-xl font-medium">{form.watch("name")}</h3>
              <p className="text-muted-foreground mb-4">{form.watch("role")}</p>
              
              <div className="w-full space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium">Location:</span>
                  <span>{form.watch("location") || "Not specified"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">Phone:</span>
                  <span>{form.watch("phone") || "Not specified"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">Email:</span>
                  <span>{form.watch("email") || "Not specified"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">WhatsApp:</span>
                  <span>{form.watch("whatsapp") || "Not specified"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your agent information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Senior Real Estate Agent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Sector 17, Chandigarh" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Me</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell clients about your experience and expertise" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input placeholder="https://facebook.com/yourprofile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <Input placeholder="https://instagram.com/yourprofile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input placeholder="https://twitter.com/yourprofile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
