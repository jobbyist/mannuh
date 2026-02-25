import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const placeholderLogos = [
  { id: 1, name: "Partner 1", bg: "bg-blue-100", text: "text-blue-600" },
  { id: 2, name: "Partner 2", bg: "bg-purple-100", text: "text-purple-600" },
  { id: 3, name: "Partner 3", bg: "bg-green-100", text: "text-green-600" },
  { id: 4, name: "Partner 4", bg: "bg-yellow-100", text: "text-yellow-600" },
  { id: 5, name: "Partner 5", bg: "bg-red-100", text: "text-red-600" },
  { id: 6, name: "Partner 6", bg: "bg-indigo-100", text: "text-indigo-600" },
  { id: 7, name: "Partner 7", bg: "bg-pink-100", text: "text-pink-600" },
  { id: 8, name: "Partner 8", bg: "bg-teal-100", text: "text-teal-600" },
  { id: 9, name: "Partner 9", bg: "bg-orange-100", text: "text-orange-600" },
  { id: 10, name: "Partner 10", bg: "bg-cyan-100", text: "text-cyan-600" },
];

export default function LogoReel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % placeholderLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get 5 logos to display (current + next 4)
  const visibleLogos = Array.from({ length: 5 }, (_, i) => 
    placeholderLogos[(currentIndex + i) % placeholderLogos.length]
  );

  return (
    <section className="border-y border-border/50 bg-white py-12">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Brought to you by...
          </p>
        </div>
        <div className="flex justify-center items-center gap-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {visibleLogos.map((logo, index) => (
              <motion.div
                key={`${logo.id}-${currentIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: index === 0 ? 1 : 0.4, 
                  scale: index === 0 ? 1 : 0.85 
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className={`w-24 h-24 rounded-xl ${logo.bg} flex items-center justify-center flex-shrink-0`}
              >
                <span className={`font-bold text-sm ${logo.text}`}>
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {placeholderLogos.map((logo, index) => (
            <button
              key={logo.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex 
                  ? "w-8 bg-primary" 
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`View ${logo.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
