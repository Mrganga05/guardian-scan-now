import { motion } from "framer-motion";
import { QrCode, MapPin, Bell, ShieldCheck, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "Emergency QR Code",
    description: "Time-expiring, cryptographically secured QR code that reveals your medical identity to anyone who scans it.",
  },
  {
    icon: MapPin,
    title: "Hospital Finder",
    description: "AI-powered location engine surfaces the 3 nearest hospitals, ambulances, and police stations with live ETA.",
  },
  {
    icon: Bell,
    title: "SOS Mode",
    description: "Trigger an emergency broadcast that shares your live location with contacts and activates a loud beacon.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description: "AES-256 encrypted data. HIPAA compliant. No ads, no tracking, no data selling. Ever.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Progressive web app works on any phone, any browser. No app store download required.",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Emergency profile loads in under 1 second. No login needed for responders. Every second counts.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emergency/[0.02] to-transparent" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-emergency font-mono text-sm tracking-widest uppercase">Features</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Built for the moments that{" "}
            <span className="text-gradient-red">matter most</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-emergency/10 flex items-center justify-center mb-5 group-hover:bg-emergency/20 transition-colors">
                <feature.icon className="w-6 h-6 text-emergency" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
