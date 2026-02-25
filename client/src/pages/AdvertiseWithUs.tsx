import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { 
  Megaphone, 
  FileText, 
  Video, 
  Mail, 
  Sparkles, 
  Calendar,
  Target,
  TrendingUp,
  Users,
  Check,
  Download,
  MessageCircle
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

const advertisingPackages = [
  {
    icon: Megaphone,
    title: "Sponsored Banners",
    description: "Display ads across the platform reaching thousands of engaged users",
    price: "$100",
    priceDetail: "per campaign",
    features: [
      "Homepage banner placement",
      "Category page visibility",
      "Mobile & desktop optimization",
      "Performance analytics included",
    ]
  },
  {
    icon: FileText,
    title: "Articles & Stories",
    description: "Sponsored content integrated naturally into user feeds",
    price: "$150",
    priceDetail: "per article",
    features: [
      "Native content placement",
      "Editorial review included",
      "Multi-platform distribution",
      "Engagement tracking",
    ]
  },
  {
    icon: Video,
    title: "Video Reels",
    description: "Short-form video ads in the reels section",
    price: "$200",
    priceDetail: "per reel",
    features: [
      "15-60 second video spots",
      "Auto-play in feed",
      "Skip-after-5 option",
      "View count analytics",
    ]
  },
  {
    icon: Mail,
    title: "Targeted Email Marketing",
    description: "Reach users directly through segmented email campaigns",
    price: "$250",
    priceDetail: "per campaign",
    features: [
      "Audience segmentation",
      "Custom email design",
      "A/B testing available",
      "Open & click rate tracking",
    ]
  },
  {
    icon: Sparkles,
    title: "Product/Service Activations",
    description: "Interactive brand experiences and product launches",
    price: "$500",
    priceDetail: "per activation",
    features: [
      "Custom landing page",
      "Interactive elements",
      "Social media integration",
      "Lead generation tools",
    ]
  },
  {
    icon: Calendar,
    title: "Event Marketing",
    description: "Promote events, webinars, and virtual gatherings",
    price: "$300",
    priceDetail: "per event",
    features: [
      "Event page creation",
      "RSVP management",
      "Email reminders",
      "Post-event analytics",
    ]
  },
];

const platformStats = [
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Avg. Session Time", value: "18 min", icon: TrendingUp },
  { label: "Engagement Rate", value: "42%", icon: Target },
  { label: "Daily Active Users", value: "15K+", icon: Users },
];

const additionalServices = [
  "Custom sponsorship packages",
  "Influencer partnerships",
  "Community group sponsorships",
  "Podcast advertising",
  "Newsletter sponsorships",
  "Premium content sponsorships",
];

export default function AdvertiseWithUs() {
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
              Advertising Opportunities
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              Advertise With <span className="text-primary">Mannuh</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with a growing community of faith-focused individuals. Reach engaged users who value authentic content and meaningful connections.
            </p>
          </motion.div>
        </section>

        {/* Platform Stats */}
        <section className="container pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {platformStats.map((stat, i) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-black text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Advertising Packages */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                Advertising Packages
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Flexible pricing options starting at just $100 per campaign
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {advertisingPackages.map((pkg, i) => (
                <motion.div
                  key={pkg.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        <pkg.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {pkg.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {pkg.description}
                      </p>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-black text-primary">
                          {pkg.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {pkg.priceDetail}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="container py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardHeader>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Additional Advertising Options
                  </h2>
                  <p className="text-muted-foreground">
                    Explore more ways to reach our community
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {additionalServices.map((service) => (
                    <div key={service} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Why Advertise Section */}
        <section className="bg-muted/30">
          <div className="container py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-black text-foreground mb-6">
                Why Advertise on Mannuh?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <Card>
                  <CardContent className="p-6">
                    <Target className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">
                      Targeted Audience
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Reach a faith-focused community actively seeking meaningful content and connections.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <TrendingUp className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">
                      High Engagement
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our users spend an average of 18 minutes per session with a 42% engagement rate.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Users className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-bold text-foreground mb-2">
                      Growing Community
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Join early as we scale to reach millions of believers worldwide.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-3xl mx-auto text-center"
          >
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                  Download Our 2026 Rate Sheet
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get detailed pricing, specifications, and media kit information for all advertising options.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="px-8"
                    onClick={() => {
                      // In production, this would trigger a PDF download
                      alert("Rate sheet download coming soon!");
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Rate Sheet
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    asChild
                    className="px-8"
                  >
                    <a href="mailto:ads@mannuh.space">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Sales
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Custom Packages Section */}
        <section className="bg-foreground text-white">
          <div className="container py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Need a Custom Package?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                We understand that every brand has unique needs. Contact our advertising team to create a custom package tailored to your goals and budget.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-white text-foreground hover:bg-white/90 px-8"
                >
                  <a href="mailto:ads@mannuh.space">
                    Email: ads@mannuh.space
                  </a>
                </Button>
              </div>

              <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-white/70 mb-2">
                  <strong>Our team typically responds within 24-48 hours</strong>
                </p>
                <p className="text-xs text-white/60">
                  Include your brand name, advertising goals, and budget range in your email for faster service.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
}
