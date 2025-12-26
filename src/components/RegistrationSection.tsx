import { ScrollReveal } from './ScrollReveal';
import { RegistrationForm } from './RegistrationForm';
import { PricingCards } from './PricingCards';
import { UserPlus } from 'lucide-react';

export const RegistrationSection = () => {
  return (
    <section id="register" className="relative py-24 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4">
              <UserPlus className="w-4 h-4" />
              <span>./register</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Join <span className="text-primary neon-text">FROM CLICK TO CTRL</span>
            </h2>
            <p className="text-muted-foreground font-mono max-w-xl mx-auto">
              Secure your spot at the most anticipated cybersecurity event. Limited seats available.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <ScrollReveal>
          <PricingCards />
        </ScrollReveal>

        <div className="relative bg-card/50 border border-border rounded-lg p-8 md:p-12 backdrop-blur-sm">
          {/* Terminal style header */}
          <div className="absolute -top-4 left-8 bg-background px-4 py-1 border border-border rounded">
            <span className="text-primary font-mono text-sm">registration_form.exe</span>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary" />

          <RegistrationForm />
        </div>
      </div>
    </section>
  );
};
