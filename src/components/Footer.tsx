import { motion } from 'framer-motion';
import { Globe, Linkedin, Instagram, Terminal } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Globe,
      href: 'https://ieee-sbmcet.netlify.app',
      label: 'Website',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/ieee-sb-mcet',
      label: 'LinkedIn',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/ieee_sb_mcet',
      label: 'Instagram',
    },
  ];

  return (
    <footer className="relative py-12 px-4 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            <span className="font-display text-2xl font-bold text-primary neon-text">
              From Click to Control
            </span>
          </div>

          {/* Website */}
          <a 
            href="https://ieee-sbmcet.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            ieee-sbmcet.netlify.app
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="group relative p-3 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
              </motion.a>
            ))}
          </div>

          {/* Social Handle */}
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">@</span>ieee_sb_mcet
          </p>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <div className="text-center">
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">&copy;</span> {currentYear} IEEE Student Branch MCET
            </p>
            <p className="font-mono text-xs text-muted-foreground/60 mt-2">
              <span className="text-primary/60">&lt;</span>
              Designed for the curious minds
              <span className="text-primary/60">/&gt;</span>
            </p>
          </div>

          {/* Terminal style message */}
          <div className="font-mono text-xs text-muted-foreground/40">
            <span className="text-primary/40">$</span> echo "Happy Hacking!" <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
