import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Phone, Mail, Globe, CheckCircle, Flag, Star, Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6 },
  }),
};

// Featured church/ministry for March 2026
const featuredMinistry = {
  id: "featured-tgc",
  name: "The Gospel Coalition",
  description: "The Gospel Coalition exists to equip the next generation of believers, pastors, and church leaders to shape life and ministry around the gospel.",
  logoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  denomination: "Interdenominational",
  website: "https://thegospelcoalition.org",
  donationUrl: "https://thegospelcoalition.org/donate-today",
  donationName: "The TGC Collective",
  rating: 4.9,
  isFeatured: true,
  country: "United States",
  featuredMonth: "March 2026"
};

// Locations for LDS Church
const ldsLocations = [
  { country: "United States", city: "Salt Lake City, UT", website: "https://www.churchofjesuschrist.org" },
  { country: "United States", city: "Provo, UT", website: "https://www.churchofjesuschrist.org" },
  { country: "United Kingdom", city: "London", website: "https://www.churchofjesuschrist.org" },
  { country: "Australia", city: "Sydney", website: "https://www.churchofjesuschrist.org" },
  { country: "Canada", city: "Toronto", website: "https://www.churchofjesuschrist.org" },
  { country: "Mexico", city: "Mexico City", website: "https://www.churchofjesuschrist.org" },
  { country: "Brazil", city: "São Paulo", website: "https://www.churchofjesuschrist.org" },
  { country: "Philippines", city: "Manila", website: "https://www.churchofjesuschrist.org" },
  { country: "Japan", city: "Tokyo", website: "https://www.churchofjesuschrist.org" },
  { country: "South Africa", city: "Johannesburg", website: "https://www.churchofjesuschrist.org" }
];

const ldsChurch = {
  id: "lds-church",
  name: "The Church of Jesus Christ of Latter-day Saints",
  description: "A worldwide faith of over 16 million members centered on the belief that everyone on earth is a son or daughter of a loving God and that His Son, Jesus Christ, saved the world from sin and death.",
  logoUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=400&fit=crop",
  denomination: "Mormon",
  website: "https://www.churchofjesuschrist.org",
  isVerified: true,
  locations: ldsLocations
};

export default function Churches() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [denomination, setDenomination] = useState("");
  const [selectedChurch, setSelectedChurch] = useState<any>(null);

  const churchesQuery = trpc.churches.list.useQuery({
    search: search || undefined,
    country: country || undefined,
    denomination: denomination || undefined,
    limit: 100,
  });

  // Combine LDS church with database churches
  const churches = [ldsChurch, ...(churchesQuery.data || [])];

  return (
    <Layout>
      <div className="container py-20">
        {/* Hero Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.15)] to-[oklch(0.88_0.05_330_/_0.15)] text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            Church Directory
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Find a <span className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] bg-clip-text text-transparent">Church</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover churches and ministries around the world. Connect with a local community of believers.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or pastor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  <SelectItem value="South Korea">South Korea</SelectItem>
                </SelectContent>
              </Select>
              <Select value={denomination} onValueChange={setDenomination}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by denomination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Denominations</SelectItem>
                  <SelectItem value="Non-Denominational">Non-Denominational</SelectItem>
                  <SelectItem value="Pentecostal">Pentecostal</SelectItem>
                  <SelectItem value="Baptist">Baptist</SelectItem>
                  <SelectItem value="Anglican">Anglican</SelectItem>
                  <SelectItem value="Presbyterian">Presbyterian</SelectItem>
                  <SelectItem value="Mormon">Mormon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Featured Ministry - March 2026 Spotlight */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold">Featured Ministry - March 2026</h2>
          </div>
          
          <Card 
            className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-4 border-gradient bg-gradient-to-br from-yellow-50 to-amber-50"
            onClick={() => setSelectedChurch(featuredMinistry)}
          >
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Logo */}
                <div className="relative">
                  <div className="aspect-square rounded-xl overflow-hidden border-4 border-yellow-400/50 shadow-lg">
                    <img
                      src={featuredMinistry.logoUrl}
                      alt={featuredMinistry.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-3 -right-3">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-none text-sm px-4 py-2 shadow-lg">
                      <Star className="w-4 h-4 mr-1 fill-white" />
                      Spotlight
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-3xl font-black text-foreground mb-2 group-hover:text-[oklch(0.82_0.06_240)] transition-colors">
                      {featuredMinistry.name}
                    </h3>
                    <Badge variant="outline" className="mb-3">{featuredMinistry.denomination}</Badge>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(featuredMinistry.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : star - 0.5 <= featuredMinistry.rating
                              ? "fill-yellow-400 text-yellow-400 opacity-50"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-lg font-semibold ml-2">{featuredMinistry.rating}/5</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {featuredMinistry.description}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button 
                      asChild
                      onClick={(e) => e.stopPropagation()}
                      className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)]"
                    >
                      <a 
                        href={featuredMinistry.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      onClick={(e) => e.stopPropagation()}
                      className="border-2 border-[oklch(0.82_0.06_240)] text-[oklch(0.82_0.06_240)] hover:bg-[oklch(0.82_0.06_240)] hover:text-white"
                    >
                      <a 
                        href={featuredMinistry.donationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Heart className="w-4 h-4" />
                        {featuredMinistry.donationName}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* All Churches Grid */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-4">All Churches & Ministries</h2>
        </div>

        {/* Churches Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {churches.map((church, index) => (
            <motion.div
              key={church.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={index + 2}
            >
              <Card
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-[oklch(0.82_0.06_240_/_0.5)]"
                onClick={() => setSelectedChurch(church)}
              >
                {/* Church Logo */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[oklch(0.82_0.06_240_/_0.1)] to-[oklch(0.88_0.05_330_/_0.1)]">
                  {church.logoUrl ? (
                    <img
                      src={church.logoUrl}
                      alt={church.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-[oklch(0.82_0.06_240)]" />
                    </div>
                  )}
                  
                  {church.isVerified ? (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white border-none">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90">
                        <Flag className="w-3 h-3 mr-1" />
                        Claim Page
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-[oklch(0.82_0.06_240)] transition-colors line-clamp-1">
                    {church.name}
                  </h3>
                  {church.pastor && (
                    <p className="text-sm text-muted-foreground mb-3">Pastor {church.pastor}</p>
                  )}

                  {church.denomination && (
                    <Badge variant="outline" className="mb-3">{church.denomination}</Badge>
                  )}

                  {church.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {church.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {church.city}{church.state && `, ${church.state}`}, {church.country}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {churches.length === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-center py-12"
          >
            <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Churches Found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters</p>
          </motion.div>
        )}

        {/* Church Detail Modal */}
        <Dialog open={!!selectedChurch} onOpenChange={() => setSelectedChurch(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedChurch && (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <DialogTitle className="text-2xl">{selectedChurch.name}</DialogTitle>
                      {selectedChurch.pastor && (
                        <DialogDescription className="text-base mt-1">
                          Pastor {selectedChurch.pastor}
                        </DialogDescription>
                      )}
                    </div>
                    {selectedChurch.isVerified && (
                      <Badge className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] text-white">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </DialogHeader>

                {selectedChurch.logoUrl && (
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
                    <img
                      src={selectedChurch.logoUrl}
                      alt={selectedChurch.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                 {selectedChurch.denomination && (
                  <div className="mb-4">
                    <Badge variant="outline" className="text-sm">
                      {selectedChurch.denomination}
                    </Badge>
                  </div>
                )}

                {/* Rating for Featured Ministry */}
                {selectedChurch.isFeatured && selectedChurch.rating && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Rating</h4>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= Math.floor(selectedChurch.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : star - 0.5 <= selectedChurch.rating
                              ? "fill-yellow-400 text-yellow-400 opacity-50"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xl font-semibold ml-2">{selectedChurch.rating}/5</span>
                    </div>
                  </div>
                )}

                {selectedChurch.description && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-muted-foreground">{selectedChurch.description}</p>
                  </div>
                )}

                {/* Locations Dropdown for LDS Church */}
                {selectedChurch.locations && selectedChurch.locations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Locations Worldwide</h4>
                    <div className="max-h-60 overflow-y-auto border rounded-lg">
                      {selectedChurch.locations.map((location: any, index: number) => (
                        <div 
                          key={index}
                          className="p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{location.city}</p>
                                <p className="text-sm text-muted-foreground">{location.country}</p>
                              </div>
                            </div>
                            <a
                              href={location.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              Visit
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-semibold">Contact Information</h4>
                  
                  {selectedChurch.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 flex-shrink-0 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedChurch.address}<br />
                          {selectedChurch.city}{selectedChurch.state && `, ${selectedChurch.state}`} {selectedChurch.zipCode}<br />
                          {selectedChurch.country}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedChurch.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{selectedChurch.phone}</p>
                      </div>
                    </div>
                  )}

                  {selectedChurch.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{selectedChurch.email}</p>
                      </div>
                    </div>
                  )}

                  {selectedChurch.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Website</p>
                        <a
                          href={selectedChurch.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[oklch(0.82_0.06_240)] hover:underline flex items-center gap-1"
                        >
                          {selectedChurch.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Donation Button for Featured Ministry */}
                {selectedChurch.isFeatured && selectedChurch.donationUrl && (
                  <div className="mt-6">
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)]"
                    >
                      <a 
                        href={selectedChurch.donationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4" />
                        Support {selectedChurch.donationName}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                )}

                {!selectedChurch.isVerified && (
                  <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.1)] to-[oklch(0.88_0.05_330_/_0.1)] border border-[oklch(0.82_0.06_240_/_0.2)]">
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="w-5 h-5 text-[oklch(0.82_0.06_240)]" />
                      <p className="font-semibold">Is this your church?</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Claim this page to update information and gain access to church management features.
                    </p>
                    <Button variant="outline" className="w-full">
                      Claim This Page
                    </Button>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
