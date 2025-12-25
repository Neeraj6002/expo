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
                <span className="text-primary font-bold">From Click to Control: </span>Browser Hacking is an immersive cybersecurity workshop focused on revealing what truly happens behind the scenes when users interact with web browsers. Designed for students, aspiring ethical hackers, and technology enthusiasts, this event explores how simple actions like clicking a link or visiting a website can expose users to serious security threats.
              </p>
              <p className="text-foreground">
               In today’s digital landscape, browsers have become one of the most targeted attack surfaces. This workshop dives into the attacker’s mindset, explaining common browser-based attacks in a simple and ethical manner. Through live demonstrations and real-world scenarios, participants will visually understand how attackers exploit browser behavior and why users are often the primary target rather than systems.
              </p>
              <p className="text-foreground">
                Built on the philosophy “Break to Build Better Security,” From Click to Control combines conceptual knowledge with hands-on learning in a safe lab environment. Participants will gain insights into ethical hacking tools, learn essential browser defense techniques, and leave with practical skills to better protect themselves in the online world.
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
