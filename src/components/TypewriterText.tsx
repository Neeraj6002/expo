import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export const TypewriterText = ({ text, delay = 0, speed = 50, className = '' }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayText}
      {!isComplete && <span className="text-primary animate-pulse">|</span>}
    </motion.span>
  );
};
