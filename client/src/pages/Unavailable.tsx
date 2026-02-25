import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Unavailable() {
  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <Layout>
      <div className="container py-20 flex items-center justify-center min-h-[60vh]">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Card className="border-2">
            <CardContent className="pt-12 pb-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[oklch(0.82_0.06_240_/_0.15)] to-[oklch(0.88_0.05_330_/_0.15)] flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-[oklch(0.82_0.06_240)]" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                Sorry! This Feature Is Currently Unavailable. Please Check In Later Or Contact Our Support Team.
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                We're constantly working to improve and expand our platform. 
                This feature will be available soon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleBackToHome}
                  className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90"
                >
                  Back To Homepage
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "/help"}
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
