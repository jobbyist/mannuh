import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "./ui/progress";

const bibleScriptures = [
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
  { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
  { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" },
  { text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.", ref: "Numbers 6:24-25" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6" },
  { text: "The joy of the Lord is your strength.", ref: "Nehemiah 8:10" },
  { text: "God is our refuge and strength, an ever-present help in trouble.", ref: "Psalm 46:1" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", ref: "Isaiah 40:31" },
  { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", ref: "Psalm 34:18" },
  { text: "In all your ways acknowledge him, and he will make your paths straight.", ref: "Proverbs 3:6" },
  { text: "Come to me, all you who are weary and burdened, and I will give you rest.", ref: "Matthew 11:28" },
  { text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.", ref: "Philippians 4:19" },
  { text: "The Lord is my light and my salvation—whom shall I fear?", ref: "Psalm 27:1" },
  { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
  { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", ref: "1 Corinthians 13:4" },
  { text: "If God is for us, who can be against us?", ref: "Romans 8:31" },
  { text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", ref: "Matthew 6:33" },
  { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", ref: "Proverbs 18:10" },
  { text: "This is the day the Lord has made; let us rejoice and be glad in it.", ref: "Psalm 118:24" },
  { text: "We live by faith, not by sight.", ref: "2 Corinthians 5:7" },
  { text: "Commit to the Lord whatever you do, and he will establish your plans.", ref: "Proverbs 16:3" },
  { text: "Do not let your hearts be troubled. You believe in God; believe also in me.", ref: "John 14:1" },
  { text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.", ref: "Psalm 91:1" },
  { text: "The Lord is gracious and compassionate, slow to anger and rich in love.", ref: "Psalm 145:8" },
  { text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", ref: "2 Corinthians 5:17" },
  { text: "Your word is a lamp for my feet, a light on my path.", ref: "Psalm 119:105" },
  { text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", ref: "Galatians 5:22-23" },
  { text: "The Lord himself goes before you and will be with you; he will never leave you nor forsake you.", ref: "Deuteronomy 31:8" },
  { text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives.", ref: "John 14:27" },
  { text: "For where two or three gather in my name, there am I with them.", ref: "Matthew 18:20" },
  { text: "The Lord will fight for you; you need only to be still.", ref: "Exodus 14:14" },
  { text: "Delight yourself in the Lord, and he will give you the desires of your heart.", ref: "Psalm 37:4" },
  { text: "And now these three remain: faith, hope and love. But the greatest of these is love.", ref: "1 Corinthians 13:13" },
  { text: "May the God of hope fill you with all joy and peace as you trust in him.", ref: "Romans 15:13" },
  { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", ref: "2 Timothy 1:7" },
  { text: "Therefore encourage one another and build each other up.", ref: "1 Thessalonians 5:11" },
  { text: "Let everything that has breath praise the Lord.", ref: "Psalm 150:6" },
  { text: "He heals the brokenhearted and binds up their wounds.", ref: "Psalm 147:3" },
  { text: "Taste and see that the Lord is good; blessed is the one who takes refuge in him.", ref: "Psalm 34:8" },
  { text: "So do not fear, for I am with you; do not be dismayed, for I am your God.", ref: "Isaiah 41:10" },
  { text: "The steadfast love of the Lord never ceases; his mercies never come to an end.", ref: "Lamentations 3:22" },
  { text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", ref: "Galatians 6:9" },
  { text: "Give thanks to the Lord, for he is good; his love endures forever.", ref: "Psalm 107:1" },
  { text: "Wait for the Lord; be strong and take heart and wait for the Lord.", ref: "Psalm 27:14" },
  { text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights.", ref: "James 1:17" },
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
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
        className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-black text-3xl">m</span>
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">
            mannuh
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Faith-based community
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
              Loading your experience...
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
