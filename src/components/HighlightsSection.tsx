import { ScrollReveal } from './ScrollReveal';
import { HighlightCard } from './HighlightCard';
import { Shield, Bug, Target, Lock, Code, Cpu } from 'lucide-react';

const highlights = [
  {
    icon: Shield,
    title: 'Ethical Hacking Basics',
    description: 'Learn the fundamentals of ethical hacking, including reconnaissance, scanning, and exploitation techniques used by security professionals.',
  },

  {
    icon: Target,
    title: 'Attack Simulations',
    description: 'Experience real-world attack scenarios in controlled environments. Learn how attackers think and operate.',
  },
  {
    icon: Lock,
    title: 'Defensive Techniques',
    description: 'Master defensive security measures, including firewall configuration, intrusion detection, and incident response.',
  },
  {
    icon: Code,
    title: 'Vulnerability Assessment',
    description: 'Learn to identify and assess vulnerabilities in systems, networks, and applications using industry-standard tools.',
  },
  {
    icon: Cpu,
    title: 'Hands-on Labs',
    description: 'Practice your skills in interactive lab sessions with real tools and techniques used by cybersecurity professionals.',
  },
    {
    icon: Bug,
    title: 'Cybersecurity Threats',
    description: 'Understand modern cyber threats including malware, phishing, social engineering, and how to identify and prevent them.',
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

