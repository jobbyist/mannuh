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
import { Search, MapPin, Phone, Mail, Globe, CheckCircle, Flag } from "lucide-react";
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

  const churches = churchesQuery.data || [];

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
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

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

                {selectedChurch.description && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-muted-foreground">{selectedChurch.description}</p>
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
                          className="text-sm text-[oklch(0.82_0.06_240)] hover:underline"
                        >
                          {selectedChurch.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

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
