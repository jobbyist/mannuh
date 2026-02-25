import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { 
  ShoppingBag, 
  BookOpen, 
  Shirt, 
  Home as HomeIcon, 
  Package, 
  Gift, 
  Heart,
  X
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const shopCategories = [
  {
    id: 1,
    name: "Prayer & Bible Study Journals",
    icon: BookOpen,
    description: "Branded journals for your spiritual journey",
    items: ["Prayer Journal", "Bible Study Companion", "Daily Devotional Journal"],
  },
  {
    id: 2,
    name: "Branded Clothing",
    icon: Shirt,
    description: "Faith-inspired apparel for everyday wear",
    items: ["T-Shirts", "Hoodies", "Caps", "Faith Statement Apparel"],
  },
  {
    id: 3,
    name: "Christian Accessories",
    icon: Package,
    description: "Meaningful accessories for daily inspiration",
    items: ["Bracelets", "Necklaces", "Phone Cases", "Tote Bags", "Keychains"],
  },
  {
    id: 4,
    name: "Home Decor",
    icon: HomeIcon,
    description: "Transform your space with faith-filled decor",
    items: ["Wall Art", "Throw Pillows", "Coffee Mugs", "Desk Items", "Candles"],
  },
  {
    id: 5,
    name: "Original Publications",
    icon: BookOpen,
    description: "Exclusive digital content bundles",
    items: ["E-Book Bundles", "Study Guide Collections", "Devotional Series"],
  },
];

const giftCardDenominations = [
  { value: 50, label: "$50" },
  { value: 100, label: "$100" },
  { value: 250, label: "$250" },
  { value: 500, label: "$500" },
  { value: 1000, label: "$1,000" },
];

export default function Shop() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
  });

  const handleCategoryClick = () => {
    setShowWaitlistModal(true);
  };

  const handleGiftCardClick = (value: number) => {
    setSelectedGiftCard(value);
    setShowWaitlistModal(true);
  };

  const handleCustomAmountClick = () => {
    if (customAmount && parseFloat(customAmount) >= 50) {
      setSelectedGiftCard(parseFloat(customAmount));
      setShowWaitlistModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Waitlist signup:", formData);
    // Reset form and close modal
    setFormData({ fullName: "", email: "", phone: "", country: "" });
    setShowWaitlistModal(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="container pt-20 pb-16 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <Badge variant="secondary" className="mb-4">
              Coming Soon
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              The <span className="text-primary">Mannuh</span> Shop
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Exclusive faith-inspired merchandise and resources to support your spiritual journey.
            </p>
            
            {/* Charitable Info */}
            <div className="max-w-3xl mx-auto">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground mb-2">
                        Shop With Purpose
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        A portion of the proceeds from every purchase will be donated to a cause that 
                        you choose during checkout. Your support helps us make a real difference in 
                        communities around the world.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Shop Categories */}
        <section className="container pb-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                Explore Our Collections
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse through our curated selection of faith-inspired products
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopCategories.map((category, i) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={i + 2}
                  >
                    <Card 
                      className="h-full hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
                      onClick={handleCategoryClick}
                    >
                      <CardHeader>
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {category.description}
                        </p>
                        <div className="space-y-1">
                          {category.items.map((item, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-primary/50" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gift Cards Section */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-16">
            <motion.div
              className="max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                  Mannuh Gift Cards
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Give the gift of faith. Perfect for any occasion.
                </p>
              </div>

              {/* Preset Denominations */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {giftCardDenominations.map((denom, i) => (
                  <motion.div
                    key={denom.value}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i + 1}
                  >
                    <Card 
                      className="hover:shadow-lg transition-all cursor-pointer hover:border-primary border-2"
                      onClick={() => handleGiftCardClick(denom.value)}
                    >
                      <CardContent className="p-6 text-center">
                        <Gift className="w-8 h-8 text-primary mx-auto mb-3" />
                        <p className="text-2xl font-black text-foreground">
                          {denom.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Custom Amount */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={6}
              >
                <Card className="border-2 border-dashed">
                  <CardContent className="p-6">
                    <div className="max-w-md mx-auto">
                      <Label htmlFor="custom-amount" className="text-base font-semibold mb-3 block text-center">
                        Or Enter a Custom Amount (Minimum $50)
                      </Label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            id="custom-amount"
                            type="number"
                            min="50"
                            step="1"
                            placeholder="50"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="pl-7"
                          />
                        </div>
                        <Button 
                          onClick={handleCustomAmountClick}
                          disabled={!customAmount || parseFloat(customAmount) < 50}
                        >
                          Select
                        </Button>
                      </div>
                      {customAmount && parseFloat(customAmount) < 50 && (
                        <p className="text-xs text-destructive mt-2 text-center">
                          Minimum amount is $50
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
              Be Among the First
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our waiting list now and receive 25% off your first order when we launch!
            </p>
            
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => setShowWaitlistModal(true)}
            >
              Join the Waiting List
            </Button>
          </motion.div>
        </section>

        <Footer />
      </div>

      {/* Waitlist Modal */}
      <Dialog open={showWaitlistModal} onOpenChange={setShowWaitlistModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Join Our Waiting List
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              We are launching our official store soon. Get 25% off your first order when we open!
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="country">Country (Optional)</Label>
              <Input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="United States"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                We will never spam you or sell your information. Your privacy is important to us.
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Join Waiting List
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
