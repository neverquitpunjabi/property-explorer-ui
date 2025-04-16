
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  CreditCard, Banknote, Qr, QrCode, Wallet, CreditCardIcon, 
  IndianRupee, Save, Upload, ExternalLink 
} from "lucide-react";

export default function PaymentOptions() {
  const [activeTab, setActiveTab] = useState("gateways");
  const [qrEnabled, setQrEnabled] = useState(true);
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [razorpayEnabled, setRazorpayEnabled] = useState(false);
  const [paytmEnabled, setPaytmEnabled] = useState(false);
  const [gpayEnabled, setGpayEnabled] = useState(false);
  
  const [qrConfigOpen, setQrConfigOpen] = useState(false);
  const [stripeConfigOpen, setStripeConfigOpen] = useState(false);
  const [razorpayConfigOpen, setRazorpayConfigOpen] = useState(false);
  const [paytmConfigOpen, setPaytmConfigOpen] = useState(false);
  const [gpayConfigOpen, setGpayConfigOpen] = useState(false);
  
  const handleSaveConfig = (gateway: string) => {
    toast.success(`${gateway} configuration saved successfully`);
    
    // Close the corresponding config sheet
    switch (gateway) {
      case "QR Code":
        setQrConfigOpen(false);
        break;
      case "Stripe":
        setStripeConfigOpen(false);
        break;
      case "Razorpay":
        setRazorpayConfigOpen(false);
        break;
      case "Paytm":
        setPaytmConfigOpen(false);
        break;
      case "Google Pay":
        setGpayConfigOpen(false);
        break;
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Options</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="gateways" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Gateways
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Global Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="gateways" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* QR Code Payment */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="h-5 w-5" />
                      QR Code Payment
                    </CardTitle>
                    <CardDescription>Accept payments via custom QR codes</CardDescription>
                  </div>
                  <Switch 
                    checked={qrEnabled} 
                    onCheckedChange={setQrEnabled} 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Customers can scan a QR code to make payments to your bank accounts or UPI.
                </p>
              </CardContent>
              <CardFooter>
                <Sheet open={qrConfigOpen} onOpenChange={setQrConfigOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full" disabled={!qrEnabled}>
                      Configure
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>QR Code Payment Settings</SheetTitle>
                      <SheetDescription>
                        Configure your QR code payment options
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="qr-name">Payment Name</Label>
                        <Input id="qr-name" placeholder="e.g. Property Deposit" />
                      </div>
                      <div className="space-y-2">
                        <Label>Upload QR Code</Label>
                        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-center text-muted-foreground">
                            Drag and drop your QR code image here, or click to browse
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Select File
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID (Optional)</Label>
                        <Input id="upi-id" placeholder="yourname@bank" />
                        <p className="text-xs text-muted-foreground">
                          If provided, a QR code will be generated automatically
                        </p>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button onClick={() => handleSaveConfig("QR Code")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
            
            {/* Stripe */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCardIcon className="h-5 w-5" />
                      Stripe
                    </CardTitle>
                    <CardDescription>International payment gateway</CardDescription>
                  </div>
                  <Switch 
                    checked={stripeEnabled} 
                    onCheckedChange={setStripeEnabled} 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accept credit cards, debit cards, and other payment methods worldwide.
                </p>
              </CardContent>
              <CardFooter>
                <Sheet open={stripeConfigOpen} onOpenChange={setStripeConfigOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full" disabled={!stripeEnabled}>
                      Configure
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Stripe Configuration</SheetTitle>
                      <SheetDescription>
                        Configure your Stripe payment gateway
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="stripe-public-key">Publishable Key</Label>
                        <Input id="stripe-public-key" placeholder="pk_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-secret-key">Secret Key</Label>
                        <Input id="stripe-secret-key" type="password" placeholder="sk_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-webhook-secret">Webhook Secret (Optional)</Label>
                        <Input id="stripe-webhook-secret" placeholder="whsec_..." />
                      </div>
                      <Button variant="outline" className="w-full" size="sm" asChild>
                        <a href="https://dashboard.stripe.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Go to Stripe Dashboard
                        </a>
                      </Button>
                    </div>
                    <SheetFooter>
                      <Button onClick={() => handleSaveConfig("Stripe")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
            
            {/* Razorpay */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5" />
                      Razorpay
                    </CardTitle>
                    <CardDescription>Indian payment gateway</CardDescription>
                  </div>
                  <Switch 
                    checked={razorpayEnabled} 
                    onCheckedChange={setRazorpayEnabled} 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accept payments via UPI, cards, netbanking and other Indian payment methods.
                </p>
              </CardContent>
              <CardFooter>
                <Sheet open={razorpayConfigOpen} onOpenChange={setRazorpayConfigOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full" disabled={!razorpayEnabled}>
                      Configure
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Razorpay Configuration</SheetTitle>
                      <SheetDescription>
                        Configure your Razorpay payment gateway
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="razorpay-key-id">Key ID</Label>
                        <Input id="razorpay-key-id" placeholder="rzp_test_..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="razorpay-key-secret">Key Secret</Label>
                        <Input id="razorpay-key-secret" type="password" placeholder="Your Razorpay key secret" />
                      </div>
                      <Button variant="outline" className="w-full" size="sm" asChild>
                        <a href="https://dashboard.razorpay.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Go to Razorpay Dashboard
                        </a>
                      </Button>
                    </div>
                    <SheetFooter>
                      <Button onClick={() => handleSaveConfig("Razorpay")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
            
            {/* Paytm */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Paytm
                    </CardTitle>
                    <CardDescription>Indian payment solution</CardDescription>
                  </div>
                  <Switch 
                    checked={paytmEnabled} 
                    onCheckedChange={setPaytmEnabled} 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accept payments via Paytm Wallet, UPI, cards and more.
                </p>
              </CardContent>
              <CardFooter>
                <Sheet open={paytmConfigOpen} onOpenChange={setPaytmConfigOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full" disabled={!paytmEnabled}>
                      Configure
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Paytm Configuration</SheetTitle>
                      <SheetDescription>
                        Configure your Paytm payment gateway
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="paytm-merchant-id">Merchant ID</Label>
                        <Input id="paytm-merchant-id" placeholder="Your Paytm Merchant ID" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paytm-merchant-key">Merchant Key</Label>
                        <Input id="paytm-merchant-key" type="password" placeholder="Your Paytm Merchant Key" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paytm-website">Website</Label>
                        <Input id="paytm-website" placeholder="WEBSTAGING" />
                      </div>
                      <Button variant="outline" className="w-full" size="sm" asChild>
                        <a href="https://business.paytm.com/dashboard" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Go to Paytm Business Dashboard
                        </a>
                      </Button>
                    </div>
                    <SheetFooter>
                      <Button onClick={() => handleSaveConfig("Paytm")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
            
            {/* Google Pay */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Banknote className="h-5 w-5" />
                      Google Pay
                    </CardTitle>
                    <CardDescription>Google Pay for Business</CardDescription>
                  </div>
                  <Switch 
                    checked={gpayEnabled} 
                    onCheckedChange={setGpayEnabled} 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accept payments via Google Pay for Business.
                </p>
              </CardContent>
              <CardFooter>
                <Sheet open={gpayConfigOpen} onOpenChange={setGpayConfigOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full" disabled={!gpayEnabled}>
                      Configure
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Google Pay Configuration</SheetTitle>
                      <SheetDescription>
                        Configure your Google Pay for Business integration
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="gpay-merchant-id">Merchant ID</Label>
                        <Input id="gpay-merchant-id" placeholder="Your Google Pay Merchant ID" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gpay-merchant-name">Merchant Name</Label>
                        <Input id="gpay-merchant-name" placeholder="Your Business Name" />
                      </div>
                      <Button variant="outline" className="w-full" size="sm" asChild>
                        <a href="https://pay.google.com/business/console" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Go to Google Pay for Business
                        </a>
                      </Button>
                    </div>
                    <SheetFooter>
                      <Button onClick={() => handleSaveConfig("Google Pay")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Payment Settings</CardTitle>
              <CardDescription>Configure global settings for all payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="test-mode">Test Mode</Label>
                  <Switch id="test-mode" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, all payments will be processed in test mode and no real transactions will occur.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <select
                  id="currency"
                  className="w-full p-2 border rounded-md"
                  defaultValue="INR"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="success-url">Payment Success URL</Label>
                <Input id="success-url" placeholder="https://yourdomain.com/payment/success" defaultValue="/payment/success" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cancel-url">Payment Cancel URL</Label>
                <Input id="cancel-url" placeholder="https://yourdomain.com/payment/cancel" defaultValue="/payment/cancel" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success("Global payment settings saved")}>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
