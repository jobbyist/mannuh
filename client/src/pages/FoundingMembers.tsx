import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { 
  Users, Crown, TrendingUp, Award, FileText, 
  DollarSign, Calendar, Shield, ExternalLink 
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

const benefits = [
  {
    icon: Crown,
    title: "Founding Member Status",
    description: "Exclusive recognition as one of the first 100 founding members"
  },
  {
    icon: Award,
    title: "Ownership Certificate",
    description: "Signed ownership certificate sent by mail, valid for 12 months"
  },
  {
    icon: TrendingUp,
    title: "Dividend Payments",
    description: "Receive dividend payments at the end of your term"
  },
  {
    icon: FileText,
    title: "Quarterly Reports",
    description: "Access to detailed quarterly performance reports"
  },
  {
    icon: DollarSign,
    title: "Non-Preferred Equity",
    description: "Term-based, renewable, transferrable equity stake"
  },
  {
    icon: Shield,
    title: "Founder's Agreement",
    description: "Protected by strict non-disclosure stipulations"
  }
];

export default function FoundingMembers() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="container pt-20 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4">
              Limited Opportunity
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              Become a <span className="text-primary">Founding Member</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join an exclusive group of 100 founding members shaping the future of the mannuh platform. 
              Support our equity-based crowdfunding campaign for the official public beta launch.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-black text-primary mb-2">100</div>
                  <div className="text-sm text-muted-foreground">Founding Members</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-black text-primary mb-2">$250</div>
                  <div className="text-sm text-muted-foreground">Annual Contribution</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-black text-primary mb-2">April 1</div>
                  <div className="text-sm text-muted-foreground">Official Launch Date</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Campaign Details */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="text-3xl font-black text-center text-foreground mb-12">
                What You Get
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i + 1}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <benefit.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Campaign Information */}
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Campaign Details</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Launch Timeline
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The first "public beta" version of the mannuh platform is officially set to go live on 
                    <strong> April 1st, 2026</strong>. This equity-based crowdfunding campaign supports the 
                    ongoing development, launch, and growth of the platform.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Contribution Fee
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>$250 annual, non-refundable</strong> founder's contribution fee. This fee is 
                    subject to revision/increase without prior notice and at the sole discretion of the 
                    board of directors of Gravitas Industries Pty Ltd, as per the Founder's Agreement.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Equity Stake
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    In exchange for your contribution, you receive a <strong>term-based, renewable, 
                    transferrable, non-preferred equity stake</strong> in the mannuh platform. This comes 
                    with a signed ownership certificate valid for a period of 12 months (sent by mail).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Dividends & Reports
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dividends will be paid out at the end of the term. Quarterly performance reports 
                    will be available to all founding members upon request, providing transparency into 
                    the platform's growth and financial health.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Non-Disclosure Agreement
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Founding members are bound by strict non-disclosure stipulations as set forth in 
                    the Founders Agreement. This protects sensitive business information and strategic 
                    plans for the platform.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Intellectual Property
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All Intellectual Property and rights related to the mannuh platform are owned by 
                    <strong> Gravitas Industries Pty Ltd</strong>. Equity stakes do not confer IP ownership 
                    or operational control.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="bg-foreground text-white">
          <div className="container py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Become a Founding Member?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join an exclusive community of believers investing in the future of faith-based 
                social networking. Limited to 100 members only.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-white text-foreground hover:bg-white/90 px-8"
                >
                  <a 
                    href="https://www.gravitas.uno/mannuh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Visit Campaign Page
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white/10 px-8"
                >
                  <a 
                    href="mailto:mannuh@gravitas.uno"
                    className="flex items-center gap-2"
                  >
                    Email for Info
                  </a>
                </Button>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-white/70 mb-2">
                  <strong>Contact Information:</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                  <a 
                    href="https://www.gravitas.uno/mannuh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1 justify-center"
                  >
                    www.gravitas.uno/mannuh
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="hidden sm:block text-white/50">|</span>
                  <a 
                    href="mailto:mannuh@gravitas.uno"
                    className="text-white hover:underline"
                  >
                    mannuh@gravitas.uno
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="container py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Important Disclaimer</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This is an equity-based investment opportunity. All contributions are non-refundable. 
                  The contribution fee and terms are subject to change at the discretion of Gravitas 
                  Industries Pty Ltd. Equity stakes are term-based (12 months), renewable, transferrable, 
                  and non-preferred. Dividends and returns are not guaranteed and depend on platform 
                  performance. Founding members must comply with non-disclosure agreements as outlined 
                  in the Founder's Agreement. Please review all documentation carefully before 
                  participating. By contributing, you acknowledge and accept these terms.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
}
