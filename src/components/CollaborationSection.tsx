import { ScrollReveal } from './ScrollReveal';
import { Handshake } from 'lucide-react';
import offensoLogo from '@/assets/offenso-logo.png';

export const CollaborationSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4">
              <Handshake className="w-4 h-4" />
              <span>./collaboration</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              In Collaboration <span className="text-primary neon-text">With</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative bg-card border border-border rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 flex items-center justify-center bg-background rounded-lg border border-primary/30 pulse-glow">
                  <img 
                    src={offensoLogo} 
                    alt="Offenso Hackers Academy" 
                    className="w-32 object-contain"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  Offenso Hackers Academy
                </h3>
                <p className="text-muted-foreground font-mono leading-relaxed mb-4">
                  Offenso Hackers Academy is a premier cybersecurity training institute 
                  dedicated to developing skilled ethical hackers and security professionals. 
                  With industry-recognized certifications and hands-on training programs, 
                  they bridge the gap between theoretical knowledge and practical expertise.
                </p>
                <p className="text-muted-foreground font-mono leading-relaxed">
                  Their team of certified security experts brings real-world experience 
                  to every session, ensuring participants gain actionable skills for 
                  their cybersecurity journey.
                </p>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/30" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
