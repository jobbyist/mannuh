import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Users, Play, Compass, ArrowRight, Heart, BookOpen, ChevronRight, ExternalLink, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import Footer from "@/components/Footer";
import LogoReel from "@/components/LogoReel";
import Preloader from "@/components/Preloader";
import HighlightReel from "@/components/HighlightReel";
import SponsoredBanner from "@/components/SponsoredBanner";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [showPreloader, setShowPreloader] = useState(() => {
    // Show preloader only on first visit
    const hasVisited = sessionStorage.getItem('mannuh_visited');
    return !hasVisited;
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('mannuh_visited', 'true');
    setShowPreloader(false);
  };

  // Fetch featured discover content (5 items)
  const featuredContentQuery = trpc.discover.content.useQuery({
    limit: 5,
  });

  const featuredContent = featuredContentQuery.data || [];

  // Fetch featured pathways (3 items)
  const pathwaysQuery = trpc.pathways.list.useQuery({ limit: 3 });
  const featuredPathways = pathwaysQuery.data || [];

  // Fetch recent articles (3 items)
  const articlesQuery = trpc.articles.list.useQuery({ limit: 3 });
  const recentArticles = articlesQuery.data || [];

  // Placeholder podcast episodes for homepage (2 most recent)
  const recentPodcasts = [
    {
      id: 1,
      title: "Finding Faith in Everyday Moments",
      description: "Exploring how we can discover God's presence in our daily routines.",
      thumbnailUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
      duration: "32:15",
      publishedAt: "2026-02-23",
    },
    {
      id: 2,
      title: "The Power of Community in Faith",
      description: "Discussion on how Christian community strengthens our walk with God.",
      thumbnailUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop",
      duration: "28:42",
      publishedAt: "2026-02-16",
    },
  ];

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute top-20 right-[10%] w-64 h-64 geo-circle opacity-40 pointer-events-none" />
        <div className="absolute top-40 left-[5%] w-32 h-32 geo-circle-pink opacity-30 pointer-events-none" />
        <div className="absolute bottom-20 right-[20%] w-20 h-20 geo-square opacity-20 pointer-events-none" />
        <div className="absolute top-[60%] left-[15%] w-16 h-16 rounded-full bg-[oklch(0.82_0.06_240_/_0.1)] pointer-events-none" />

        {/* Highlight Reel - Instagram Stories Style */}
        <HighlightReel />

        {/* Hero Section */}
        <section className="container pt-20 pb-28 md:pt-32 md:pb-40">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.82_0.06_240_/_0.15)] text-primary text-xs font-semibold tracking-wide uppercase mb-6">
                <Heart className="w-3 h-3" />
                Premier Faith-Based Community Platform
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-foreground mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              A safe space
              <br />
              for <span className="text-primary">faith</span> &{" "}
              <span className="text-[oklch(0.65_0.08_10)]">fellowship</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10 font-light"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              Create and discover interactive virtual cell groups, expertly curated Christian content to inspire you, special events and workshops, and connect
              with a growing community of believers who share your faith journey.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
            >
              {isAuthenticated ? (
                <>
                  <Button size="lg" asChild className="rounded-xl px-8 h-12 text-base font-semibold">
                    <Link href="/groups">
                      Explore Groups
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-xl px-8 h-12 text-base font-semibold bg-white">
                    <Link href="/reels">Watch Reels</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" asChild className="rounded-xl px-8 h-12 text-base font-semibold">
                    <a href={getLoginUrl()}>
                      Create An Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-xl px-8 h-12 text-base font-semibold bg-white">
                    <Link href="/browse">Browse</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Logo Reel - Partners Section */}
        <LogoReel />

        {/* Sponsored Banner */}
        <section className="container py-12">
          <SponsoredBanner variant="horizontal" />
        </section>

        {/* Features Section */}
        <section className="container pb-28">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Cell Groups",
                desc: "Create or join intimate virtual groups for Bible study, prayer, and fellowship with video conferencing.",
                color: "bg-primary/10 text-primary",
                href: "/groups",
              },
              {
                icon: Play,
                title: "Creator Reels",
                desc: "Watch and share short-form Christian video content from creators you love. Follow, like, and engage.",
                color: "bg-[oklch(0.85_0.06_10_/_0.3)] text-[oklch(0.45_0.08_10)]",
                href: "/reels",
              },
              {
                icon: Compass,
                title: "Discover",
                desc: "Explore curated Christian stories, articles, and resources aggregated from trusted sources worldwide.",
                color: "bg-[oklch(0.82_0.06_240_/_0.15)] text-[oklch(0.45_0.1_240)]",
                href: "/discover",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <Link href={feature.href}>
                  <div className="group bg-white rounded-2xl p-8 border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
                    <div className="mt-5 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Guided Pathways Section */}
        {featuredPathways.length > 0 && (
          <section className="container pb-28">
            <motion.div
              className="mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-2">
                    Guided <span className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] bg-clip-text text-transparent">Pathways</span>
                  </h2>
                  <p className="text-muted-foreground font-light">
                    Structured spiritual journeys to deepen your faith
                  </p>
                </div>
                <Button variant="outline" asChild className="rounded-xl bg-white hidden sm:flex">
                  <Link href="/pathways">
                    Browse More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPathways.map((pathway, i) => (
                <motion.div
                  key={pathway.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <Link href={`/pathways/${pathway.id}`}>
                    <Card className="hover:shadow-xl transition-all cursor-pointer group h-full border-2 hover:border-[oklch(0.82_0.06_240_/_0.5)]">
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
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-foreground">
                            {pathway.duration}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-[oklch(0.82_0.06_240)] transition-colors line-clamp-1">
                          {pathway.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {pathway.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6 sm:hidden">
              <Button variant="outline" asChild className="rounded-xl bg-white">
                <Link href="/pathways">
                  Browse More <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* In Case You Missed It (Articles) Section */}
        {recentArticles.length > 0 && (
          <section className="container pb-28">
            <motion.div
              className="mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-2">
                    In Case You Missed It
                  </h2>
                  <p className="text-muted-foreground font-light">
                    Recent articles and stories from the mannuh team
                  </p>
                </div>
                <Button variant="outline" asChild className="rounded-xl bg-white hidden sm:flex">
                  <Link href="/discover">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article, i) => {
                let articleTags: string[] = [];
                try {
                  articleTags = article.tags ? JSON.parse(article.tags) : [];
                } catch (e) {
                  console.warn('Failed to parse article tags:', article.id, e);
                }

                return (
                  <motion.div
                    key={article.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <Link href={`/articles/${article.slug}`}>
                      <Card className="hover:shadow-xl transition-all cursor-pointer group h-full border-2 hover:border-[oklch(0.82_0.06_240_/_0.3)]">
                        {article.imageUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {article.isPremium && (
                              <div className="absolute top-3 right-3">
                                <Badge className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white">
                                  Premium
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                        <CardContent className="p-5">
                          {article.category && (
                            <Badge variant="secondary" className="text-xs capitalize mb-3">
                              {article.category}
                            </Badge>
                          )}
                          <h3 className="font-bold text-lg mb-2 group-hover:text-[oklch(0.82_0.06_240)] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {article.excerpt}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{article.readingTimeMinutes} min read</span>
                            <span>{article.author}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-6 sm:hidden">
              <Button variant="outline" asChild className="rounded-xl bg-white">
                <Link href="/discover">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* Featured Discover Content Section */}
        {featuredContent.length > 0 && (
          <section className="container pb-28">
            <motion.div
              className="mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-2">
                    Featured Content
                  </h2>
                  <p className="text-muted-foreground font-light">
                    Curated Christian stories and resources from trusted sources
                  </p>
                </div>
                <Button variant="outline" asChild className="rounded-xl bg-white hidden sm:flex">
                  <Link href="/discover">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {featuredContent.map((item, i) => {
                let itemTags: string[] = [];
                try {
                  itemTags = item.tags ? JSON.parse(item.tags) : [];
                } catch (e) {
                  console.warn('Failed to parse tags for item:', item.id, e);
                }

                return (
                  <motion.div
                    key={item.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                        <CardContent className="p-4">
                          {item.imageUrl && (
                            <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-muted">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {item.category && (
                            <Badge variant="secondary" className="text-xs capitalize mb-2">
                              {item.category.replace("-", " ")}
                            </Badge>
                          )}
                          <h3 className="font-bold text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {item.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            {item.sourceName && (
                              <span className="text-[10px] text-muted-foreground">
                                {item.sourceName}
                              </span>
                            )}
                            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-6 sm:hidden">
              <Button variant="outline" asChild className="rounded-xl bg-white">
                <Link href="/discover">
                  View All Content <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* Sponsored Banner 2 */}
        <section className="container pb-12">
          <SponsoredBanner variant="horizontal" />
        </section>

        {/* The Wordly Series Podcast Section */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-24">
            <motion.div
              className="mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-3">
                    <Headphones className="w-3 h-3" />
                    Weekly Podcast
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-2">
                    The Wordly Series
                  </h2>
                  <p className="text-muted-foreground font-light">
                    Weekly conversations about faith, life, and walking with God
                  </p>
                </div>
                <Button variant="outline" asChild className="rounded-xl bg-white hidden sm:flex">
                  <Link href="/wordly-series">
                    More Episodes <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {recentPodcasts.map((episode, i) => (
                <motion.div
                  key={episode.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link href="/wordly-series">
                    <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                      <CardContent className="p-0">
                        <div className="flex gap-4 p-5">
                          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted relative">
                            <img
                              src={episode.thumbnailUrl}
                              alt={episode.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                              {episode.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {episode.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{episode.duration}</span>
                              <span>•</span>
                              <span>
                                {new Date(episode.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild className="rounded-xl px-8 h-12 font-semibold">
                <Link href="/wordly-series">
                  More Episodes <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white border-y border-border/50">
          <div className="container py-24">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                Built for the body of Christ
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto font-light">
                A safe, moderated space where believers connect, grow, and inspire one another.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Heart, title: "Community", desc: "Authentic fellowship in small groups" },
                { icon: BookOpen, title: "Scripture", desc: "Content rooted in God's Word" },
                { icon: Play, title: "Creativity", desc: "Express faith through video reels" },
                { icon: Compass, title: "Discovery", desc: "Curated resources from trusted sources" },
              ].map((val, i) => (
                <motion.div
                  key={val.title}
                  className="text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <val.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{val.title}</h3>
                  <p className="text-sm text-muted-foreground">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24">
          <motion.div
            className="relative bg-foreground rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[oklch(0.85_0.06_10_/_0.2)] translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Ready to join the community?
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-md mx-auto font-light">
                Start your journey with thousands of believers growing together in faith.
              </p>
              {isAuthenticated ? (
                <Button size="lg" asChild className="rounded-xl px-8 h-12 bg-white text-foreground hover:bg-white/90 font-semibold">
                  <Link href="/groups">Find Your Group</Link>
                </Button>
              ) : (
                <Button size="lg" asChild className="rounded-xl px-8 h-12 bg-white text-foreground hover:bg-white/90 font-semibold">
                  <a href={getLoginUrl()}>Sign Up Free</a>
                </Button>
              )}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
}
