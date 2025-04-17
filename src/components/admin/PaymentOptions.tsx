
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, QrCode, Smartphone, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function PaymentOptions() {
  const [activePaymentMethods, setActivePaymentMethods] = useState({
    stripe: true,
    razorpay: false,
    paytm: false,
    googlePay: false,
    qr: false,
  });

  const togglePaymentMethod = (method: keyof typeof activePaymentMethods) => {
    setActivePaymentMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
    
    toast.success(`${method.charAt(0).toUpperCase() + method.slice(1)} payment option ${activePaymentMethods[method] ? 'disabled' : 'enabled'}`);
  };

  const saveSettings = () => {
    // In a real app, this would save to a backend
    toast.success("Payment settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Options</h2>
      </div>

      <Tabs defaultValue="gateways" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gateways" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stripe */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Stripe
                </CardTitle>
                <CardDescription>
                  Accept credit card payments globally
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="stripe" 
                    checked={activePaymentMethods.stripe}
                    onCheckedChange={() => togglePaymentMethod('stripe')}
                  />
                  <Label htmlFor="stripe">
                    {activePaymentMethods.stripe ? 'Enabled' : 'Disabled'}
                  </Label>
                </div>
                {activePaymentMethods.stripe && (
                  <div className="mt-4 text-xs text-muted-foreground bg-muted p-2 rounded">
                    <p className="font-semibold mb-1">Connected Account:</p>
                    <p>Real Estate Platform Ltd</p>
                    <p>stripe_account_id_12345</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  Configure
                </Button>
              </CardFooter>
            </Card>

            {/* Razorpay */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Razorpay
                </CardTitle>
                <CardDescription>
                  Popular payment solution for India
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="razorpay" 
                    checked={activePaymentMethods.razorpay}
                    onCheckedChange={() => togglePaymentMethod('razorpay')}
                  />
                  <Label htmlFor="razorpay">
                    {activePaymentMethods.razorpay ? 'Enabled' : 'Disabled'}
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  Configure
                </Button>
              </CardFooter>
            </Card>

            {/* Paytm */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Paytm
                </CardTitle>
                <CardDescription>
                  Mobile payments and wallet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="paytm" 
                    checked={activePaymentMethods.paytm}
                    onCheckedChange={() => togglePaymentMethod('paytm')}
                  />
                  <Label htmlFor="paytm">
                    {activePaymentMethods.paytm ? 'Enabled' : 'Disabled'}
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  Configure
                </Button>
              </CardFooter>
            </Card>

            {/* Google Pay */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Google Pay
                </CardTitle>
                <CardDescription>
                  Fast, simple, and secure payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="googlePay" 
                    checked={activePaymentMethods.googlePay}
                    onCheckedChange={() => togglePaymentMethod('googlePay')}
                  />
                  <Label htmlFor="googlePay">
                    {activePaymentMethods.googlePay ? 'Enabled' : 'Disabled'}
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  Configure
                </Button>
              </CardFooter>
            </Card>

            {/* QR Code Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Payments
                </CardTitle>
                <CardDescription>
                  Generate QR codes for direct transfers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="qr" 
                    checked={activePaymentMethods.qr}
                    onCheckedChange={() => togglePaymentMethod('qr')}
                  />
                  <Label htmlFor="qr">
                    {activePaymentMethods.qr ? 'Enabled' : 'Disabled'}
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  Configure
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={saveSettings}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
              <CardDescription>
                Configure general payment settings and transaction rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="transaction-fee">Transaction Fee (%)</Label>
                <input 
                  id="transaction-fee" 
                  type="number" 
                  min="0" 
                  max="100" 
                  step="0.1" 
                  defaultValue="2.5"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="automatic-payouts" defaultChecked />
                <Label htmlFor="automatic-payouts">Enable automatic payouts</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="escrow-payments" defaultChecked />
                <Label htmlFor="escrow-payments">Use escrow for property transactions</Label>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="payout-threshold">Minimum payout amount ($)</Label>
                <input 
                  id="payout-threshold" 
                  type="number" 
                  min="0" 
                  step="10" 
                  defaultValue="100"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="payout-schedule">Payout Schedule</Label>
                <select id="payout-schedule" className="w-full p-2 border rounded">
                  <option value="daily">Daily</option>
                  <option value="weekly" selected>Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
