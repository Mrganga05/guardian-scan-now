import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Essential emergency protection for individuals.",
    features: [
      "Emergency QR code",
      "Basic medical profile",
      "2 emergency contacts",
      "Manual SOS trigger",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    description: "Advanced safety features for you and your family.",
    features: [
      "Everything in Free",
      "Unlimited emergency contacts",
      "AI hospital finder with live ETA",
      "Family tracking dashboard",
      "Auto SMS/push alerts",
      "Health integrations",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "White-label solution for organizations.",
    features: [
      "Everything in Pro",
      "White-label branding",
      "Bulk deployment",
      "Admin dashboard",
      "API access",
      "Dedicated support",
      "HIPAA BAA included",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-emergency font-mono text-sm tracking-widest uppercase">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Protection for{" "}
            <span className="text-gradient-red">everyone</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Free to start. Upgrade when you need more.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`glass-card-hover flex flex-col ${
                plan.highlighted
                  ? "border-emergency/40 relative"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emergency rounded-full text-xs font-display font-bold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-display font-bold text-lg">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-safe mt-0.5 shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full font-display ${
                  plan.highlighted
                    ? "bg-emergency hover:bg-emergency-glow text-primary-foreground glow-red"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
