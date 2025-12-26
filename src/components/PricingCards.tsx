import { motion } from 'framer-motion';
import { Check, Crown, Heart, Users } from 'lucide-react';

export const PricingCards = () => {
  const pricingData = [
    {
      title: 'IEEE CS Members',
      price: 449,
      icon: Heart,
      features: ['Full Event Access', 'Workshop Materials', 'Certificates ', 'Refreshments', 'IEEE CS Member Discount'],
      highlighted: true,
    },
    {
      title: 'IEEE Members',
      price: 499,
      icon: Crown,
      features: ['Full Event Access', 'Workshop Materials', 'Certificates', 'Refreshments', 'IEEE Member Discount'],
      highlighted: true,
    },
    {
      title: 'Non-IEEE',
      price: 549,
      icon: Users,
      features: ['Full Event Access', 'Workshop Materials', 'Certificates', 'Refreshments'],
      highlighted: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {pricingData.map((plan, index) => (
        <motion.div
          key={plan.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`relative p-6 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
            plan.highlighted
              ? 'border-primary bg-primary/10 shadow-[0_0_30px_hsl(var(--primary)/0.2)]'
              : 'border-border bg-card/50'
          }`}
        >
          {plan.highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-mono font-bold">
              BEST VALUE
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <plan.icon className={`w-6 h-6 ${plan.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
            <h3 className="text-xl font-display font-bold text-foreground">{plan.title}</h3>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-display font-bold text-primary">₹{plan.price}</span>
            <span className="text-muted-foreground font-mono text-sm ml-2">/ person</span>
          </div>

          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};
