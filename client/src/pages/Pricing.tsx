import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { Check, Heart, Sparkles, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const plans = [
  {
    name: "Freemium",
    price: "$0",
    period: "month",
    description: "Get started with basic features",
    icon: Users,
    color: "bg-muted",
    textColor: "text-muted-foreground",
    features: [
      "Limited access to content",
      "Join cell groups",
      "Watch reels (limited)",
      "Basic profile",
      "Community forums",
    ],
    limitations: [
      "No creator privileges",
      "Limited content access",
      "Ads supported",
    ],
    cta: "Get Started Free",
    href: "/",
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "month",
    description: "Full access + Creator privileges",
    icon: Sparkles,
    color: "bg-primary",
    textColor: "text-primary-foreground",
    popular: true,
    features: [
      "Full access to all content",
      "Unlimited reels & articles",
      "Ad-Free Browsing",
      "Create and monetize content",
      "Creator Partner Program",
      "Ad revenue sharing",
      "Premium profile customization",
      "Priority support",
      "Credits for premium features",
      "10% donated to charitable causes",
    ],
    cta: "Upgrade to Premium",
    href: "/",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Contact Us",
    description: "Tailored solutions for churches",
    icon: Building2,
    color: "bg-foreground",
    textColor: "text-background",
    features: [
      "AI-powered congregation management",
      "HR & workflow automation",
      "Billing & invoicing tools",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced analytics & reporting",
      "White-label options",
      "Priority support 24/7",
      "Training & onboarding",
    ],
    cta: "Book Free Demo",
    href: "/contact",
  },
];

export default function Pricing() {
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
              Support the Mission
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              Choose Your <span className="text-primary">Pledge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Support mannuh and get full access to all features. 10% of all proceeds are donated to charitable causes.
            </p>
            <p className="text-sm text-muted-foreground">
              See our <Link href="/terms" className="underline">Whitepaper</Link> and{" "}
              <Link href="/terms" className="underline">Terms of Service</Link> for details on our charitable giving.
            </p>
          </motion.div>
        </section>

        {/* Pricing Plans */}
        <section className="container pb-20">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={i + 1}
                className={plan.popular ? "md:scale-105" : ""}
              >
                <Card className={`h-full relative ${plan.popular ? "border-2 border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${plan.color} ${plan.textColor} flex items-center justify-center mb-4`}>
                      <plan.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-4xl font-black text-foreground">{plan.price}</span>
                      {plan.period !== "Contact Us" && (
                        <span className="text-muted-foreground">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations && (
                      <div className="mb-6 p-3 bg-muted rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="text-xs text-muted-foreground">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      asChild
                      className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* One-Time Donation Section */}
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
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                Make a One-Time Donation
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Support our mission with a one-time contribution. Every donation helps us keep the platform running and 10% goes directly to charitable causes.
              </p>
              
              <Card className="p-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground mb-2">Minimum Donation</p>
                    <p className="text-4xl font-black text-foreground">$5</p>
                  </div>
                  <div className="hidden sm:block w-px h-16 bg-border" />
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground mb-2">Your Impact</p>
                    <p className="text-lg font-semibold text-foreground">Keeps the lights on ✨</p>
                  </div>
                </div>
                
                <Button size="lg" className="w-full sm:w-auto px-12">
                  Donate Now
                </Button>
                
                <p className="text-xs text-muted-foreground mt-4">
                  All donations are non-refundable unless made in error. See our{" "}
                  <Link href="/refunds" className="underline">Refund Policy</Link>.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Creator Partner Program CTA */}
        <section className="container py-20">
          <motion.div
            className="bg-foreground rounded-3xl p-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to become a Creator?
            </h2>
            <p className="text-white/70 text-lg mb-6 max-w-xl mx-auto">
              Premium members can enable Creator Mode and start earning revenue from their content.
            </p>
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90">
              <Link href="/partner">Learn About Creator Program</Link>
            </Button>
          </motion.div>
        </section>

        {/* FAQ Placeholder */}
        <section className="container pb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! You can cancel your Premium subscription at any time. Your access will continue until the end of your billing period.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">How does the Creator Partner Program work?</h3>
                <p className="text-sm text-muted-foreground">
                  Premium members can enable Creator Mode to post reels, articles, and stories. Earn ad revenue sharing based on views and engagement. Visit our Partner Program page for details.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Where do the charitable donations go?</h3>
                <p className="text-sm text-muted-foreground">
                  10% of all proceeds are donated to various Christian charitable causes as outlined in our Whitepaper and Terms of Service.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
}
