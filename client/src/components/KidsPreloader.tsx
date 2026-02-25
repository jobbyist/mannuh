import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "./ui/progress";

const bibleScriptures = [
  { text: "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.", ref: "Matthew 19:14" },
  { text: "Train up a child in the way he should go; even when he is old he will not depart from it.", ref: "Proverbs 22:6" },
  { text: "Children, obey your parents in the Lord, for this is right.", ref: "Ephesians 6:1" },
  { text: "Fathers, do not provoke your children to anger, but bring them up in the discipline and instruction of the Lord.", ref: "Ephesians 6:4" },
  { text: "From childhood you have known the Holy Scriptures, which are able to make you wise for salvation.", ref: "2 Timothy 3:15" },
  { text: "But Jesus said, 'Let the children come to me. Don't stop them! For the Kingdom of Heaven belongs to those who are like these children.'", ref: "Matthew 19:14 NLT" },
  { text: "Even children are known by the way they act, whether their conduct is pure and right.", ref: "Proverbs 20:11" },
  { text: "Don't let anyone look down on you because you are young, but set an example for the believers.", ref: "1 Timothy 4:12" },
];

interface KidsPreloaderProps {
  onComplete: () => void;
}

export default function KidsPreloader({ onComplete }: KidsPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [scripture] = useState(() => 
    bibleScriptures[Math.floor(Math.random() * bibleScriptures.length)]
  );

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          {/* Kids Logo */}
          <div className="mb-8 flex justify-center">
            <img src="/mannuhkids.png" alt="mannuh for kids logo" style={{ width: '250px', height: 'auto' }} />
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground mb-12 font-semibold">
            Faith-filled stories for little hearts
          </p>

          {/* Scripture */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <blockquote className="text-sm text-muted-foreground italic leading-relaxed mb-3">
              "{scripture.text}"
            </blockquote>
            <cite className="text-xs font-semibold text-primary not-italic">
              — {scripture.ref}
            </cite>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Progress value={progress} className="h-1 mb-3" />
            <p className="text-xs text-muted-foreground">
              Loading magical stories...
            </p>
          </motion.div>

          {/* Fun decorative elements */}
          <div className="mt-8 flex justify-center gap-4 text-2xl">
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            >
              🌟
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            >
              📖
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            >
              🎨
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
            >
              ✨
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
