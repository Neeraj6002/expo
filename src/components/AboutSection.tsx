import { ScrollReveal } from './ScrollReveal';
import { Terminal } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4">
              <Terminal className="w-4 h-4" />
              <span>./about</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              About <span className="text-primary neon-text">From Click to Control</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative bg-card border border-border rounded-lg p-8 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="ml-4 text-muted-foreground font-mono text-sm">From Click to Control@terminal:~</span>
            </div>

            {/* Content */}
            <div className="space-y-6 font-mono text-base leading-relaxed">
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> cat about.txt
              </p>
              <p className="text-foreground">
                <span className="text-primary font-bold">From Click to Control</span> is an immersive cybersecurity 
                experience designed for aspiring ethical hackers and security enthusiasts. This 
                event brings together students, professionals, and experts to explore the fascinating 
                world of cybersecurity.
              </p>
              <p className="text-foreground">
                In today's digital age, understanding security isn't just an advantage—it's a 
                necessity. At From Click to Control, you'll learn to think like a hacker while defending like 
                a pro. Our motto, <span className="text-primary">"Break to Build Better Security"</span>, 
                embodies the ethical hacking mindset: understanding vulnerabilities to create 
                stronger defenses.
              </p>
              <p className="text-foreground">
                Whether you're a beginner curious about cybersecurity or an experienced 
                practitioner looking to sharpen your skills, From Click to Control offers hands-on learning, 
                real-world scenarios, and networking opportunities with industry experts.
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> <span className="animate-pulse">_</span>
              </p>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20 rounded-bl-lg" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

