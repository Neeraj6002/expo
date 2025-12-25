import { ScrollReveal } from './ScrollReveal';
import { HighlightCard } from './HighlightCard';
import { Shield, Bug, Target, Lock, Code, Cpu, AlertCircle, XCircle } from 'lucide-react';

const highlights = [
  {
    icon: Shield,
    title: 'Understand how browsers really work',
    description: 'Learn what happens behind the scenes when you click a link or open a website.',
  },

  {
    icon: Target,
    title: 'How attackers think – step by step',
    description: 'Explore the mindset of hackers in a safe and ethical way.',
  },
  {
    icon: Lock,
    title: 'Common browser-based attacks explained simply',
    description: 'See how small user actions can lead to big security risks.',
  },
  {
    icon: Code,
    title: 'Live demonstration of browser exploitation concepts',
    description: 'Watch real-time examples to understand attacks visually.',
  },
  {
    icon: Cpu,
    title: 'Why browsers are a major target for hackers',
    description: 'Learn why attackers focus on users instead of systems.',
  },
    {
    icon: XCircle,
    title: 'Introduction to ethical hacking tools (conceptual)',
    description: 'Understand how security professionals test browser security.',
  },

    {
    icon: Bug,
    title: 'How to protect yourself from browser attacks',
    description: 'Learn basic defense techniques every user should know.',
  },
    {
    icon: AlertCircle,
    title: 'Hands-on learning in a safe lab environment',
    description: 'Practice concepts without harming real systems.',
  },
];

export const HighlightsSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4">
              <span className="text-muted-foreground">//</span>
              <span>what_you_will_learn</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Event <span className="text-primary neon-text">Highlights</span>
            </h2>
            <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
              Explore cutting-edge cybersecurity topics and gain practical skills that will set you apart in the digital security landscape.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={highlight.title}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
