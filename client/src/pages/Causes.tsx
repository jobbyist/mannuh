import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ExternalLink, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { causesSeed, getAllCategories, getAllRegions } from "@/data/causes";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6 },
  }),
};

export default function Causes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["all", ...getAllCategories()];
  const regions = ["all", ...getAllRegions()];

  // Filter and sort causes
  const filteredAndSortedCauses = useMemo(() => {
    let filtered = causesSeed.filter(cause => {
      const matchesSearch = 
        searchQuery === "" ||
        cause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cause.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cause.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cause.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
        cause.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === "all" || 
        cause.categories.includes(selectedCategory);

      const matchesRegion = 
        selectedRegion === "all" || 
        cause.region === selectedRegion;

      return matchesSearch && matchesCategory && matchesRegion;
    });

    // Sort the filtered results
    if (sortBy === "featured") {
      filtered = filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    } else if (sortBy === "alphabetical") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "recent") {
      filtered = filtered.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedRegion, sortBy]);

  return (
    <Layout>
      {/* SEO metadata handled by Layout component */}
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
            Make a Difference
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Support A <span className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] bg-clip-text text-transparent">Cause</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover and get involved with trusted charitable initiatives making a real impact worldwide. 
            Every action counts in building a better world.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, organization, category, or region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Region Filter */}
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>
                      {region === "all" ? "All Regions" : region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="alphabetical">A–Z</SelectItem>
                  <SelectItem value="recent">Recently Added</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredAndSortedCauses.length} of {causesSeed.length} causes
            </div>
          </div>
        </motion.div>

        {/* Causes Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredAndSortedCauses.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              <p className="text-muted-foreground text-lg">
                No causes found matching your filters. Try adjusting your search criteria.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedCauses.map((cause, index) => (
                <motion.div
                  key={cause.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={index + 2}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[oklch(0.82_0.06_240_/_0.5)] h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-lg leading-tight">
                          {cause.title}
                        </CardTitle>
                        {cause.featured && (
                          <Badge variant="secondary" className="shrink-0">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm font-semibold text-foreground/80">
                        {cause.organization}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col gap-4">
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cause.description}
                      </p>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2">
                        {cause.categories.map(category => (
                          <Badge 
                            key={category} 
                            variant="outline"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>

                      {/* Region */}
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold">Region:</span> {cause.region}
                      </div>

                      {/* How to Get Involved */}
                      <div className="mt-auto">
                        <h4 className="text-sm font-semibold mb-2">How to Help:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {cause.howToHelp.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[oklch(0.82_0.06_240)] mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                          {cause.howToHelp.length > 3 && (
                            <li className="text-xs italic">
                              + {cause.howToHelp.length - 3} more ways to help
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Action Button */}
                      <Button
                        asChild
                        className="w-full mt-4 bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90"
                      >
                        <a 
                          href={cause.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Visit Organization
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
