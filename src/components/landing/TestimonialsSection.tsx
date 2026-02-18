import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I was in a motorcycle accident and couldn't speak. The paramedic scanned my SafeScan QR and knew my blood type and allergies within seconds. It saved my life.",
    name: "Marcus Chen",
    role: "Motorcycle accident survivor",
    initials: "MC",
  },
  {
    quote: "As an ER nurse, I've seen SafeScan change outcomes. When every second counts, having instant access to a patient's medical history is invaluable.",
    name: "Dr. Sarah Mitchell",
    role: "Emergency Room Physician",
    initials: "SM",
  },
  {
    quote: "My son has severe peanut allergies. SafeScan gives me peace of mind knowing that if something happens at school, anyone can scan his bracelet and know exactly what to do.",
    name: "Jessica Torres",
    role: "Parent & advocate",
    initials: "JT",
  },
];

const TestimonialsSection = () => {
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
          <span className="text-emergency font-mono text-sm tracking-widest uppercase">Stories</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Real lives,{" "}
            <span className="text-gradient-red">real impact</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card-hover flex flex-col"
            >
              <Quote className="w-8 h-8 text-emergency/30 mb-4" />
              <p className="text-foreground/90 leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emergency/10 flex items-center justify-center text-emergency font-display font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-display font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
