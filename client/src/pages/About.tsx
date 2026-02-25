import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { 
  Heart, Users, Globe, Sparkles, Target, Shield, 
  Zap, ExternalLink, Mail, Building2 
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

const values = [
  {
    icon: Heart,
    title: "Social Benefit",
    description: "Creating positive social impact through faith-based community building and charitable giving"
  },
  {
    icon: Users,
    title: "Community First",
    description: "Fostering authentic connections and meaningful relationships among believers worldwide"
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Maintaining a safe, respectful environment with robust content moderation and privacy protection"
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Leveraging cutting-edge AI and technology to enhance the faith-based social experience"
  }
];

const features = [
  {
    icon: Users,
    title: "Cell Groups & Communities",
    description: "Connect with believers through cell groups for Bible study, prayer, missions, and fellowship"
  },
  {
    icon: Globe,
    title: "Church & Ministry Directory",
    description: "Discover and connect with churches, ministries, and faith-based organizations worldwide"
  },
  {
    icon: Sparkles,
    title: "Content Discovery",
    description: "Browse curated articles, videos, podcasts, and resources to grow your faith"
  },
  {
    icon: Zap,
    title: "Events & Gatherings",
    description: "Find and participate in worship services, conferences, retreats, and community events"
  }
];

export default function About() {
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
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              About mannuh
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              A Social Benefit Platform for the <span className="text-primary">Global Church</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Connecting believers worldwide through technology, community, and shared faith
            </p>
          </motion.div>
        </section>

        {/* Overview Section */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  The mannuh Project is a <strong>social benefit platform and initiative</strong> launched by 
                  Gravitas Industries Pty Ltd, designed to serve the global Christian community through 
                  innovative technology and meaningful connections.
                </p>
                <p className="text-lg leading-relaxed">
                  Our platform provides a safe, engaging space for believers to connect, grow in their faith, 
                  discover churches and ministries, participate in cell groups, and access faith-based content. 
                  We're building more than just a social network—we're creating a digital ecosystem that 
                  strengthens the body of Christ worldwide.
                </p>
                <p className="text-lg leading-relaxed">
                  Through strategic partnerships, charitable giving programs, and cutting-edge features, mannuh 
                  aims to be the premier destination for Christian community, discipleship, and ministry in the 
                  digital age.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gravitas Industries Section */}
        <section className="container py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">About Gravitas Industries</h2>
            </div>
            
            <Card>
              <CardContent className="p-8 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Gravitas Industries Pty Ltd</strong> is a multidisciplinary 
                  technology company that leverages artificial intelligence and expertise across various fields of 
                  information technology to create innovative solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Specializing in <strong>turnkey solutions and bespoke tech products and services</strong>, Gravitas 
                  Industries serves clients across diverse industries and sectors, from healthcare and education to 
                  finance and social impact initiatives.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The mannuh Project represents Gravitas Industries' commitment to using technology for social good, 
                  combining their technical expertise with a vision to serve and strengthen faith-based communities 
                  around the world.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button asChild>
                    <a 
                      href="https://www.gravitas.uno" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Visit Gravitas Industries
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a 
                      href="mailto:info@gravitas.uno"
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Gravitas
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Core Values */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                Our Core Values
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {values.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i + 1}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <value.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="container py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Platform Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to connect, grow, and thrive in your faith journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.15)] to-[oklch(0.88_0.05_330_/_0.15)] flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-6 h-6 text-[oklch(0.82_0.06_240)]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Launch Information */}
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
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Join Us on This Journey
              </h2>
              <p className="text-lg text-white/80 mb-4">
                The mannuh platform is set to launch on <strong>April 1st, 2026</strong> with the public beta 
                version of our web-based platform.
              </p>
              <p className="text-lg text-white/80 mb-8">
                Native mobile applications for Android and iOS will follow in Q3-Q4 2026, bringing the mannuh 
                experience to your smartphone and tablet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-white text-foreground hover:bg-white/90 px-8"
                >
                  <a href="/founding-members">
                    Become a Founding Member
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white/10 px-8"
                >
                  <a href="/support">
                    Visit Support Center
                  </a>
                </Button>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-white/70 mb-2">
                  <strong>Questions or Feedback?</strong>
                </p>
                <p className="text-sm text-white/80 mb-4">
                  We'd love to hear from you. Get in touch with our team.
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

        <Footer />
      </div>
    </Layout>
  );
}
