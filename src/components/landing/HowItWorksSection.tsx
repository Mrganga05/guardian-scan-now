import { motion } from "framer-motion";
import { Scan, UserCheck, Siren } from "lucide-react";

const steps = [
  {
    icon: Scan,
    step: "01",
    title: "Scan",
    description: "First responder scans your emergency QR code — no app download, no login required.",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Profile",
    description: "Your full medical identity loads instantly — blood type, allergies, medications, emergency contacts.",
  },
  {
    icon: Siren,
    step: "03",
    title: "Help",
    description: "One-tap call buttons connect to your family. Nearest hospitals appear with live ETAs.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-emergency font-mono text-sm tracking-widest uppercase">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Three steps to{" "}
            <span className="text-gradient-red">save a life</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-card-hover text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emergency/10 mb-6 group-hover:bg-emergency/20 transition-colors">
                <step.icon className="w-7 h-7 text-emergency" />
              </div>
              <span className="font-mono text-emergency/50 text-xs tracking-widest">{step.step}</span>
              <h3 className="text-2xl font-display font-bold mt-2 mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
