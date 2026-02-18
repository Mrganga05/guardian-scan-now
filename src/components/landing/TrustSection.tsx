import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 10000000, label: "Lives Protected", suffix: "+" },
  { value: 40, label: "Countries", suffix: "+" },
  { value: 99.9, label: "Uptime", suffix: "%" },
  { value: 1, label: "Avg Load Time", suffix: "s" },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  const formatNumber = (n: number) => {
    if (target >= 1000000) return `${(n / 1000000).toFixed(n >= target ? 0 : 1)}M`;
    if (target >= 1000) return `${(n / 1000).toFixed(0)}K`;
    if (Number.isInteger(target)) return Math.floor(n).toString();
    return n.toFixed(1);
  };

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gradient-red">
      {formatNumber(count)}{suffix}
    </span>
  );
};

const partners = ["Red Cross", "WHO", "FEMA", "NHS", "Mayo Clinic"];

const TrustSection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emergency font-mono text-sm tracking-widest uppercase">Trusted Worldwide</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Numbers that{" "}
            <span className="text-gradient-red">speak</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-muted-foreground/30 font-display font-bold text-xl tracking-wider uppercase hover:text-muted-foreground/50 transition-colors"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
