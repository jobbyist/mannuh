import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { Sparkles, BookOpen, Video, Headphones, Heart, Star } from "lucide-react";
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

const features = [
  {
    icon: BookOpen,
    title: "Illustrated Audiobooks",
    description: "Engaging Christian stories with beautiful illustrations and professional narration.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Video,
    title: "Animated Videos",
    description: "Fun and educational animated videos teaching Biblical principles and values.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Headphones,
    title: "Interactive Learning",
    description: "Age-appropriate content designed to teach and inspire young hearts.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Heart,
    title: "Safe & Wholesome",
    description: "Carefully curated content that parents can trust for their children.",
    color: "bg-pink-100 text-pink-600",
  },
];

const ageGroups = [
  { range: "3-5 years", focus: "Simple stories, songs, and colorful animations" },
  { range: "6-8 years", focus: "Bible stories, moral lessons, and interactive content" },
  { range: "9-10 years", focus: "Character building, deeper Biblical themes, and testimonies" },
];

export default function MannuhForKids() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container py-20 md:py-32">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <Badge className="mb-4 bg-yellow-500 hover:bg-yellow-600">
                <Sparkles className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                mannuh for <span className="text-primary">Kids</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Faith-filled stories and adventures for little hearts
              </p>
              <p className="text-lg text-muted-foreground mb-10">
                Mini illustrated Christian audiobooks and animated videos designed for children ages 3-10
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-xl px-8">
                  Join Waitlist
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl px-8">
                  Learn More
                </Button>
              </div>

              {/* Fun decorative elements */}
              <div className="mt-12 flex justify-center gap-4 text-4xl">
                <span className="animate-bounce" style={{ animationDelay: "0s" }}>🌟</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>📖</span>
                <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>🎨</span>
                <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>✨</span>
              </div>
            </motion.div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-yellow-200 opacity-50 blur-3xl" />
          <div className="absolute bottom-20 left-[10%] w-40 h-40 rounded-full bg-blue-200 opacity-50 blur-3xl" />
        </section>

        {/* Features Section */}
        <section className="container py-20">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Age-appropriate Christian content that engages, educates, and inspires
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Age Groups Section */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-20">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                Tailored for Every Age
              </h2>
              <p className="text-lg text-muted-foreground">
                Content specifically designed for different developmental stages
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {ageGroups.map((group, i) => (
                <motion.div
                  key={group.range}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{group.range}</h3>
                    <p className="text-sm text-muted-foreground">{group.focus}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Content Preview */}
        <section className="container py-20">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
              Sneak Peek
            </h2>
            <p className="text-lg text-muted-foreground">
              Here's what your little ones will enjoy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-primary opacity-30" />
              </div>
              <div className="p-6">
                <Badge className="mb-2">Audiobook</Badge>
                <h3 className="font-bold text-lg mb-2">David and Goliath</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  A beautifully illustrated audiobook about courage and faith
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Ages 6-8</span>
                  <span>•</span>
                  <span>12 minutes</span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-yellow-100 flex items-center justify-center">
                <Video className="w-16 h-16 text-primary opacity-30" />
              </div>
              <div className="p-6">
                <Badge className="mb-2">Animation</Badge>
                <h3 className="font-bold text-lg mb-2">The Good Samaritan</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  An animated story teaching kindness and compassion
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Ages 4-7</span>
                  <span>•</span>
                  <span>8 minutes</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20">
          <motion.div
            className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-12 text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Be the First to Know
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Join our waitlist and get notified when mannuh for Kids launches. Early supporters get special access!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-foreground w-full"
              />
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 whitespace-nowrap">
                Join Waitlist
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-4">
              We'll never spam you. Unsubscribe anytime.
            </p>
          </motion.div>
        </section>

        {/* Parent Resources */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">For Parents</h2>
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">🛡️ Safe & Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    All content is carefully reviewed and age-appropriate. No ads, no in-app purchases, no external links.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">📚 Educational Value</h3>
                  <p className="text-sm text-muted-foreground">
                    Content is designed to teach Biblical principles, character development, and moral values in an engaging way.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">👨‍👩‍👧‍👦 Parent Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Track what your children are watching, set time limits, and customize content preferences.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
}
