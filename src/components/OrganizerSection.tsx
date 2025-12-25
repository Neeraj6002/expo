import { ScrollReveal } from './ScrollReveal';
import { Building2 } from 'lucide-react';
import sbMcetLogo from '@/assets/sb-mcet-logo.png';

export const OrganizerSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4">
              <Building2 className="w-4 h-4" />
              <span>./organizers</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Organized <span className="text-primary neon-text">By</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative bg-card border border-border rounded-lg p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="w-48 h-24 flex items-center justify-center">
                  <img 
                    src={sbMcetLogo} 
                    alt="IEEE Student Branch MCET" 
                    className="w-full object-contain"
                  />
                </div>
              </div>

              {/* Description */}
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                IEEE Student Branch
              </h3>
              <p className="text-xl text-primary font-mono mb-6">
                Mohandas College of Engineering and Technology
              </p>
              <p className="text-muted-foreground font-mono leading-relaxed max-w-2xl">
                The IEEE Student Branch at MCET is committed to fostering technological 
                innovation and professional development among students. Through workshops, 
                seminars, and events like From Click to Control, we aim to bridge the gap between 
                academic learning and industry requirements, preparing students for 
                successful careers in technology.
              </p>
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

