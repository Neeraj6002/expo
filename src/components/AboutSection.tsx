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
              About <span className="text-primary neon-text">FROM CLICK TO CTRL</span>
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
              <span className="ml-4 text-muted-foreground font-mono text-sm">IEEE SB MCET@terminal:~</span>
            </div>

            {/* Content */}
            <div className="space-y-6 font-mono text-base leading-relaxed">
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> cat event-info.txt
              </p>
              
              <div className="space-y-3 text-foreground">
                <p>
                  <span className="text-primary font-bold">Hosted By:</span> IEEE Student Branch of Mohandas Engineering College and Technology
                </p>
                <p>
                  <span className="text-primary font-bold">Date:</span> January 4, 2025
                </p>
                <p>
                  <span className="text-primary font-bold">Location:</span> Mohandas Engineering College Rd, Anad, Thiruvananthapuram 
                </p>
                <p>
                  <span className="text-primary font-bold">Contact:</span> <a href="https://wa.me/918075327095" target="_blank">
  <button>
Anantha Padmanabhan P: +91 8075327095</button>
</a>
                </p>
                <p>
                  <span className="text-transparent font-bold">Contact:</span> <a href="https://wa.me/918075327095" target="_blank">
  <button>
Vivekanand V S: +91 8891047315</button>
</a>
                </p>
              </div>

              <div className="border-t border-border pt-4 mt-6">
  
              </div>

              <p className="text-foreground">
             <span className="text-primary">  FROM CLICK TO CTRL:</span> Browser Hacking is an immersive cybersecurity workshop that reveals what happens behind the scenes when users interact with web browsers. Designed for students and aspiring ethical hackers, it explores common browser-based attacks, the attacker’s mindset, and real-world exploitation through live demos. Built on the philosophy “Break to Build Better Security,” the session combines ethical, hands-on learning with practical defense techniques to help participants understand threats and protect themselves online.
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
