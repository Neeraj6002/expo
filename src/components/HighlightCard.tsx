import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export const HighlightCard = ({ icon: Icon, title, description, index }: HighlightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative"
    >
      <div className="relative bg-card border border-border rounded-lg p-6 h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50">
        {/* Background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/30 group-hover:border-primary transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/30 group-hover:border-primary transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/30 group-hover:border-primary transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/30 group-hover:border-primary transition-colors duration-300" />

        {/* Icon */}
        <motion.div 
          className="relative mb-4"
          whileHover={{ rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
            <Icon className="w-7 h-7 text-primary" />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite]" 
            style={{ 
              animation: 'scan 2s linear infinite',
              top: '50%'
            }} 
          />
        </div>
      </div>
    </motion.div>
  );
};
