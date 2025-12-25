import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CountdownUnit {
  value: number;
  label: string;
}

export const CountdownTimer = () => {
  const targetDate = new Date('2026-01-04T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState<CountdownUnit[]>([
    { value: 0, label: 'DAYS' },
    { value: 0, label: 'HOURS' },
    { value: 0, label: 'MINUTES' },
    { value: 0, label: 'SECONDS' },
  ]);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft([
          { value: days, label: 'DAYS' },
          { value: hours, label: 'HOURS' },
          { value: minutes, label: 'MINUTES' },
          { value: seconds, label: 'SECONDS' },
        ]);
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeLeft.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="relative bg-card border-2 border-primary/50 rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px] neon-border">
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-lg" />
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary" />

            <motion.span
              key={unit.value}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="block text-3xl md:text-5xl font-display font-bold text-primary neon-text text-center"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
            <span className="block text-xs md:text-sm text-muted-foreground font-mono mt-2 text-center tracking-wider">
              {unit.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
