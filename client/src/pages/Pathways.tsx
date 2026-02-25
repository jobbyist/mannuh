import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle, Share2, Users, BookOpen, Brain, Target } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function Pathways() {
  const { isAuthenticated, user } = useAuth();
  const pathwaysQuery = trpc.pathways.list.useQuery();
  const pathways = pathwaysQuery.data || [];

  // Assume user.isPremium exists (we added it to schema)
  const userIsPremium = (user as any)?.isPremium || false;

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
            <Target className="w-4 h-4" />
            Premium Feature
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Guided <span className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] bg-clip-text text-transparent">Pathways</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Structured learning journeys designed to deepen your faith, overcome challenges, and discover God's purpose for your life
          </p>
        </motion.div>

        {/* Premium Notice for Non-Premium Users */}
        {isAuthenticated && !userIsPremium && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="max-w-2xl mx-auto mb-12"
          >
            <Card className="border-2 border-[oklch(0.82_0.06_240_/_0.3)] bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.05)] to-[oklch(0.88_0.05_330_/_0.05)]">
              <CardContent className="p-6 text-center">
                <Lock className="w-12 h-12 mx-auto mb-4 text-[oklch(0.82_0.06_240)]" />
                <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
                <p className="text-muted-foreground mb-4">
                  Guided Pathways are available exclusively to Premium members. Upgrade to unlock all pathways and grow in your faith journey.
                </p>
                <Link href="/pricing">
                  <Button size="lg" className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
                    Upgrade to Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Pathways Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={index + 2}
            >
              <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-[oklch(0.82_0.06_240_/_0.5)]">
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.1)] to-[oklch(0.88_0.05_330_/_0.1)]">
                  {pathway.thumbnailUrl ? (
                    <img
                      src={pathway.thumbnailUrl}
                      alt={pathway.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-[oklch(0.82_0.06_240)]" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Premium Badge */}
                  {pathway.isPremium && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white border-none">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      {pathway.duration}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[oklch(0.82_0.06_240)] transition-colors">
                    {pathway.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {pathway.description}
                  </p>

                  {/* Category */}
                  {pathway.category && (
                    <Badge variant="outline" className="mb-4">
                      {pathway.category}
                    </Badge>
                  )}

                  {/* Features */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>Readings</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Brain className="w-4 h-4" />
                      <span>Quizzes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Badge</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {!isAuthenticated ? (
                    <Link href="/pricing">
                      <Button className="w-full bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
                        Sign Up to Start
                      </Button>
                    </Link>
                  ) : !userIsPremium ? (
                    <Link href="/pricing">
                      <Button variant="outline" className="w-full border-[oklch(0.82_0.06_240)] hover:bg-[oklch(0.82_0.06_240_/_0.1)]">
                        <Lock className="w-4 h-4 mr-2" />
                        Upgrade to Access
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/pathways/${pathway.id}`}>
                      <Button className="w-full bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
                        Start Pathway
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={pathways.length + 2}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Experience</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 hover:border-[oklch(0.82_0.06_240_/_0.5)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.2)] to-[oklch(0.88_0.05_330_/_0.2)] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-[oklch(0.82_0.06_240)]" />
              </div>
              <h3 className="font-bold mb-2">Biblical Foundation</h3>
              <p className="text-sm text-muted-foreground">
                Every pathway is rooted in Scripture with daily Bible readings and reflections
              </p>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-[oklch(0.82_0.06_240_/_0.5)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.2)] to-[oklch(0.88_0.05_330_/_0.2)] flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-[oklch(0.82_0.06_240)]" />
              </div>
              <h3 className="font-bold mb-2">Interactive Learning</h3>
              <p className="text-sm text-muted-foreground">
                Quizzes and reflections help you engage deeply with the content
              </p>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-[oklch(0.82_0.06_240_/_0.5)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.2)] to-[oklch(0.88_0.05_330_/_0.2)] flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-[oklch(0.82_0.06_240)]" />
              </div>
              <h3 className="font-bold mb-2">Community Support</h3>
              <p className="text-sm text-muted-foreground">
                Join groups related to your pathway topic for discussion and accountability
              </p>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        {!isAuthenticated && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={pathways.length + 3}
            className="mt-20 text-center"
          >
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.05)] to-[oklch(0.88_0.05_330_/_0.05)] border-2 border-[oklch(0.82_0.06_240_/_0.2)]">
              <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of believers growing in their faith through Guided Pathways
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/pricing">
                  <Button size="lg" className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90">
                    Get Started with Premium
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
