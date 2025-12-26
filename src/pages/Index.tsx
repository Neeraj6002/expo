import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberBackground } from '@/components/CyberBackground';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { HighlightsSection } from '@/components/HighlightsSection';
import { RegistrationSection } from '@/components/RegistrationSection';
import { CollaborationSection } from '@/components/CollaborationSection';
import { OrganizerSection } from '@/components/OrganizerSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Page load animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-display font-black text-primary neon-text-strong glitch" data-text="Click to Ctrl">
                Click to Ctrl
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-1 bg-primary mt-4 mx-auto max-w-[200px] rounded-full"
              />
              <p className="text-muted-foreground font-mono text-sm mt-4">
                <span className="text-primary">$</span> Initializing system...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen bg-background"
      >
        {/* Matrix Background */}
        <CyberBackground />

        {/* Scanlines overlay */}
        <div className="fixed inset-0 pointer-events-none z-40 scanlines" />

        {/* Content */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <HighlightsSection />
          <RegistrationSection />
          <CollaborationSection />
          <OrganizerSection />
          <Footer />
        </main>
      </motion.div>
    </>
  );
};

export default Index;
