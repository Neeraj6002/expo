import { motion } from 'framer-motion';
import { CountdownTimer } from './CountdownTimer';
import { TypewriterText } from './TypewriterText';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

import ieeeLogo from '@/assets/ieee-logo.png';
import offensoLogo from '@/assets/offenso-logo.png';
import sbMcetLogo from '@/assets/sb-mcet-logo.png';

export const HeroSection = () => {
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Animated circuit lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(120 100% 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(120 100% 50%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(120 100% 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 L100,200 L150,250 L300,250 L350,200 L500,200"
          stroke="url(#circuit-gradient)"
          strokeWidth="2"
          fill="none"
          className="circuit-animate"
        />
        <path
          d="M600,100 L700,100 L750,150 L900,150 L950,100 L1100,100"
          stroke="url(#circuit-gradient)"
          strokeWidth="2"
          fill="none"
          className="circuit-animate"
          style={{ animationDelay: '1s' }}
        />
      </svg>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Logos */}
 <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12"
        >
          <img src={sbMcetLogo} alt="IEEE SB MCET" className="h-7 md:h-9 object-contain" />
          <img src={offensoLogo} alt="Offenso Hackers Academy" className="h-7 md:h-9 object-contain" />
          <img src={ieeeLogo} alt="IEEE" className="h-7 md:h-9 object-contain" />
        </motion.div>
        {/* Main Title with Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 
            className="text-4xl md:text-6xl lg:text-8xl font-display font-black text-primary neon-text-strong glitch flicker tracking-wider"
            data-text="FROM CLICK TO CONTROL"
          >
            FROM CLICK TO CONTROL
          </h1>
        </motion.div>

        {/* Tagline with Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <p className="text-xl md:text-3xl font-display text-foreground tracking-wide">
            <TypewriterText 
              text="Browser Hacking" 
              delay={800}
              speed={60}
            />
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-muted-foreground font-mono text-sm md:text-base mb-10"
        >
          <span className="text-primary">&lt;</span>
          Ethical Hacking & Cybersecurity Event
          <span className="text-primary">/&gt;</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="cyber" 
              size="xl"
              onClick={scrollToRegister}
              className="min-w-[200px]"
            >
              Register Now
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="cyber-outline" 
              size="xl"
              onClick={scrollToAbout}
              className="min-w-[200px]"
            >
              Know More
            </Button>
          </motion.div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <p className="text-muted-foreground font-mono text-sm mb-6">
            <span className="text-primary">$</span> Event starts in:
          </p>
          <CountdownTimer />
          <p className="text-primary font-display text-lg mt-6 tracking-wider">
            January 4, 2026
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={scrollToAbout}
        >
          <ChevronDown className="w-8 h-8 text-primary/50 hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};
