import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ExternalLink, Shield, CheckCircle, ShoppingBag, CreditCard, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { causesSeed } from "@/data/causes";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const donationAmounts = [5, 10, 25, 50];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCharity, setSelectedCharity] = useState<string>("");

  // Get featured causes for charity selector
  const featuredCauses = causesSeed.filter(cause => cause.featured);
  const allCharityOptions = [
    { id: "mannuh-choice", name: "Let Mannuh Choose (Rotates Monthly)" },
    ...featuredCauses.map(cause => ({ id: cause.id, name: cause.organization }))
  ];

  // Load saved charity from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedCharity");
    if (saved) {
      setSelectedCharity(saved);
    } else {
      setSelectedCharity("mannuh-choice");
    }
  }, []);

  // Save charity selection to localStorage
  const handleCharityChange = (value: string) => {
    setSelectedCharity(value);
    localStorage.setItem("selectedCharity", value);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    
    // Only parse if value is not empty
    const numValue = value ? parseFloat(value) : 0;
    if (numValue >= 5) {
      setSelectedAmount(numValue);
    }
  };

  const donationAmount = selectedAmount || 0;
  const canDonate = donationAmount >= 5;

  const handlePayPalDonate = () => {
    // Use environment variable or fallback to PayPal homepage
    const paypalUrl = import.meta.env.VITE_PAYPAL_DONATE_URL || "https://www.paypal.com/donate";
    window.open(paypalUrl, "_blank", "noopener,noreferrer");
  };

  const handleUpgradePremium = () => {
    // Use environment variable or fallback to pricing page
    const payfastUrl = import.meta.env.VITE_PAYFAST_SUBSCRIPTION_URL || "/pricing";
    if (payfastUrl.startsWith("http")) {
      window.open(payfastUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = payfastUrl;
    }
  };

  const handleVisitShop = () => {
    // Use environment variable or fallback to shop page
    const shopUrl = import.meta.env.VITE_MANNUH_SHOP_URL || "/shop";
    if (shopUrl.startsWith("http")) {
      window.open(shopUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = shopUrl;
    }
  };

  const selectedCharityName = allCharityOptions.find(c => c.id === selectedCharity)?.name || "Not selected";

  return (
    <Layout>
      <div className="container py-20">
        {/* Hero Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.15)] to-[oklch(0.88_0.05_330_/_0.15)] text-sm font-semibold mb-6">
            <Heart className="w-4 h-4" />
            Make an Impact
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Support Mannuh's <span className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] bg-clip-text text-transparent">Mission</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Help us build a thriving faith-based community platform. Your support powers our mission 
            to connect believers, share inspiration, and make a difference worldwide.
          </p>
        </motion.div>

        {/* Charity Selector */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <Card className="border-2 border-[oklch(0.82_0.06_240_/_0.3)]">
            <CardHeader>
              <CardTitle className="text-lg">Choose a Charity</CardTitle>
              <CardDescription>
                Select which charitable cause receives a portion of subscription and shop proceeds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedCharity} onValueChange={handleCharityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a charity" />
                </SelectTrigger>
                <SelectContent>
                  {allCharityOptions.map(charity => (
                    <SelectItem key={charity.id} value={charity.id}>
                      {charity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-3 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
                Your selected charity: <strong>{selectedCharityName}</strong>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Options */}
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 mb-16">
          {/* PayPal Donation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.15)] to-[oklch(0.88_0.05_330_/_0.15)] flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-[oklch(0.82_0.06_240)]" />
                </div>
                <CardTitle>One-Time Donation</CardTitle>
                <CardDescription>Support us with a secure PayPal donation</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 gap-2">
                  {donationAmounts.map(amount => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? "default" : "outline"}
                      onClick={() => handleAmountSelect(amount)}
                      className={selectedAmount === amount ? "bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)]" : ""}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Custom Amount (min $5)</label>
                  <Input
                    type="number"
                    min="5"
                    step="1"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                  />
                  {customAmount && parseFloat(customAmount) < 5 && (
                    <p className="text-xs text-destructive mt-1">Minimum donation is $5</p>
                  )}
                </div>

                {/* Donate Button */}
                <Button
                  className="w-full mt-auto bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90"
                  disabled={!canDonate}
                  onClick={handlePayPalDonate}
                >
                  Donate{donationAmount > 0 ? ` $${donationAmount}` : ""} with PayPal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Secure payment via PayPal</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Subscription */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
          >
            <Card className="h-full flex flex-col border-2 border-[oklch(0.82_0.06_240_/_0.5)]">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.15)] to-[oklch(0.88_0.05_330_/_0.15)] flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-[oklch(0.82_0.06_240)]" />
                </div>
                <Badge variant="secondary" className="w-fit mb-2">Most Popular</Badge>
                <CardTitle>Premium Subscription</CardTitle>
                <CardDescription>Unlock all features and support our mission</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold">$9.99<span className="text-base font-normal text-muted-foreground">/month</span></div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Full access to all features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Creator mode enabled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Ad-free experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>10% donated to your selected charity</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                </div>

                <Button
                  className="w-full mt-auto bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90"
                  onClick={handleUpgradePremium}
                >
                  Upgrade to Premium
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Powered by PayFast • All payment methods</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shop */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.15)] to-[oklch(0.88_0.05_330_/_0.15)] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-[oklch(0.82_0.06_240)]" />
                </div>
                <CardTitle>Mannuh Shop</CardTitle>
                <CardDescription>Shop merchandise and support charity</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="space-y-3 text-sm">
                  <p>Browse our official merchandise collection and make a difference with every purchase.</p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Quality faith-inspired apparel & accessories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Portion of proceeds donated to charity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Choose your charity at checkout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Worldwide shipping available</span>
                    </li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-auto"
                  onClick={handleVisitShop}
                >
                  Visit Mannuh Shop
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transparency Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={5}
        >
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-center">Where Your Support Goes</CardTitle>
              <CardDescription className="text-center">
                We're committed to transparency about how funds are used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[oklch(0.82_0.06_240)] mb-2">60%</div>
                  <div className="font-semibold mb-1">Platform Development</div>
                  <div className="text-muted-foreground">Server costs, feature development, and maintenance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[oklch(0.82_0.06_240)] mb-2">30%</div>
                  <div className="font-semibold mb-1">Community Programs</div>
                  <div className="text-muted-foreground">Events, content creation, and community support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[oklch(0.82_0.06_240)] mb-2">10%</div>
                  <div className="font-semibold mb-1">Charitable Giving</div>
                  <div className="text-muted-foreground">Direct donations to partner charities</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>All payments are processed securely through trusted payment providers (PayPal/PayFast)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Premium subscriptions can be cancelled anytime with no penalties</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>All external links open safely in new tabs with proper security attributes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
