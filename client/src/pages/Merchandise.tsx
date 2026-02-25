import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { ShoppingBag, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const merchandiseItems = [
  {
    id: 1,
    name: "mannuh Faith T-Shirt",
    price: "$24.99",
    description: "Premium cotton t-shirt with inspirational design",
    category: "Apparel",
    inStock: true
  },
  {
    id: 2,
    name: "Community Coffee Mug",
    price: "$14.99",
    description: "Start your day with faith. Ceramic mug with mannuh branding",
    category: "Drinkware",
    inStock: true
  },
  {
    id: 3,
    name: "Scripture Journal",
    price: "$19.99",
    description: "Beautiful leather-bound journal for devotions and notes",
    category: "Stationery",
    inStock: true
  },
  {
    id: 4,
    name: "Faith Hoodie",
    price: "$39.99",
    description: "Comfortable hoodie perfect for cell group meetings",
    category: "Apparel",
    inStock: true
  },
  {
    id: 5,
    name: "Prayer Canvas Tote",
    price: "$16.99",
    description: "Eco-friendly canvas bag with inspirational message",
    category: "Accessories",
    inStock: true
  },
  {
    id: 6,
    name: "mannuh Sticker Pack",
    price: "$7.99",
    description: "Set of 10 faith-inspired stickers for laptops and notebooks",
    category: "Accessories",
    inStock: true
  },
  {
    id: 7,
    name: "Devotional Water Bottle",
    price: "$21.99",
    description: "Stainless steel water bottle with scripture verse",
    category: "Drinkware",
    inStock: false
  },
  {
    id: 8,
    name: "Community Cap",
    price: "$18.99",
    description: "Adjustable baseball cap with embroidered logo",
    category: "Apparel",
    inStock: true
  },
  {
    id: 9,
    name: "Faith Phone Case",
    price: "$22.99",
    description: "Protective case available for iPhone and Samsung models",
    category: "Accessories",
    inStock: true
  }
];

export default function Merchandise() {
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
              Official mannuh Merchandise
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              Shop <span className="text-primary">mannuh</span> Merch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Show your faith and support the community with official mannuh branded merchandise.
            </p>
            
            {/* Charitable Disclaimer */}
            <div className="max-w-3xl mx-auto">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        Supporting a Greater Cause
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        A portion of proceeds from every purchase are donated to a charitable cause. 
                        Your support helps us give back to communities in need.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Merchandise Grid */}
        <section className="container pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {merchandiseItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={i + 1}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {/* Placeholder Image */}
                    <div className="aspect-square rounded-xl bg-muted flex items-center justify-center mb-4">
                      <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                    </div>
                    
                    {/* Category Badge */}
                    <Badge variant="secondary" className="w-fit mb-2">
                      {item.category}
                    </Badge>
                    
                    {/* Item Details */}
                    <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-foreground">{item.price}</span>
                      {!item.inStock && (
                        <Badge variant="outline" className="text-xs">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={!item.inStock}
                    >
                      {item.inStock ? "Add to Cart" : "Notify Me"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-20">
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
                More Items Coming Soon!
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're constantly adding new merchandise to our store. Join our mailing list to be the first to know about new releases and exclusive offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="px-8">
                  Subscribe for Updates
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  View All Products
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
}
