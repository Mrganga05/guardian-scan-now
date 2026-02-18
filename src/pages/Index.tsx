import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Shield, Scan, AlertTriangle, ArrowRight, Smartphone, Hospital, Siren, CheckCircle, User, Droplets, AlertOctagon, Heart, Phone, MapPin, Clock, MapPinned, PhoneCall, Volume2, Zap, Lock, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/landing/NavBar";
import FooterSection from "@/components/landing/FooterSection";

/* ── Animated counter ── */
const AnimatedCounter = ({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ── Floating particles ── */
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: i % 3 === 0
            ? "hsl(var(--emergency) / 0.3)"
            : i % 3 === 1
            ? "hsl(var(--safe) / 0.2)"
            : "hsl(var(--foreground) / 0.08)",
        }}
        animate={{
          y: [0, -(Math.random() * 100 + 50), 0],
          x: [0, (Math.random() - 0.5) * 60, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: Math.random() * 6 + 6,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

/* ── Heartbeat SVG ── */
const HeartbeatLine = () => (
  <svg viewBox="0 0 200 40" className="w-full h-10 opacity-30" preserveAspectRatio="none">
    <motion.path
      d="M0,20 L60,20 L70,20 L75,5 L80,35 L85,10 L90,30 L95,18 L100,22 L105,20 L200,20"
      fill="none"
      stroke="hsl(var(--emergency))"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
    />
  </svg>
);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const Index = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <NavBar />
      <FloatingParticles />

      {/* ── Background effects ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-emergency/5 blur-[150px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-safe/3 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ══════════ HERO ══════════ */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 flex flex-col items-center justify-center px-6 pt-28 pb-20 min-h-screen">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
          className="flex items-center gap-3 mb-12"
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-emergency/20 flex items-center justify-center glow-red"
            animate={{ boxShadow: ["0 0 20px hsl(var(--emergency) / 0.2)", "0 0 40px hsl(var(--emergency) / 0.4)", "0 0 20px hsl(var(--emergency) / 0.2)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-7 h-7 text-emergency" />
          </motion.div>
          <span className="font-display text-2xl font-bold">SafeScan</span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-5">
            Your{" "}
            <motion.span
              className="text-gradient-red inline-block"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Silent
            </motion.span>{" "}
            Guardian
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            When you can't speak, your phone speaks for you.
          </p>
        </motion.div>

        {/* Heartbeat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-64 mb-10"
        >
          <HeartbeatLine />
        </motion.div>

        {/* CTA cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg"
        >
          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <button
              onClick={() => navigate("/profile")}
              className="glass-card-hover w-full flex flex-col items-center gap-4 p-8 cursor-pointer text-center group"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-emergency/15 flex items-center justify-center group-hover:bg-emergency/25 transition-colors"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Scan className="w-8 h-8 text-emergency" />
              </motion.div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1">Create Emergency Profile</h3>
                <p className="text-sm text-muted-foreground">Add your medical info & contacts</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emergency group-hover:translate-x-1 transition-all" />
            </button>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <button
              onClick={() => navigate("/sos")}
              className="glass-card-hover w-full flex flex-col items-center gap-4 p-8 cursor-pointer text-center group border-emergency/20"
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-emergency/20 flex items-center justify-center glow-red group-hover:bg-emergency/30 transition-colors"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertTriangle className="w-8 h-8 text-emergency" />
              </motion.div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1 text-emergency">SOS Mode</h3>
                <p className="text-sm text-muted-foreground">Instant emergency activation</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emergency group-hover:translate-x-1 transition-all" />
            </button>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground"
        >
          {[
            { icon: Shield, label: "No Account Needed", color: "text-safe" },
            { icon: Lock, label: "End-to-End Encrypted", color: "text-emergency" },
            { icon: Wifi, label: "Works Offline", color: "text-safe" },
          ].map(({ icon: Icon, label, color }) => (
            <motion.div key={label} className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <Icon className={`w-4 h-4 ${color}`} />
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-muted-foreground font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      </motion.div>

      {/* ══════════ STATS STRIP ══════════ */}
      <section className="relative z-10 border-y border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: 3, suffix: "s", label: "Profile Load Time" },
              { value: 100, suffix: "%", label: "Privacy Guaranteed" },
              { value: 10000, suffix: "+", label: "Profiles Created" },
              { value: 24, suffix: "/7", label: "Always Available" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-display font-bold text-emergency">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-mono">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ THE PROCESS ══════════ */}
      <section id="the-process" className="relative z-10 px-6 py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              className="text-emergency font-mono text-sm tracking-widest uppercase inline-block"
              initial={{ letterSpacing: "0.1em" }}
              whileInView={{ letterSpacing: "0.3em" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              The Process
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4">
              3 Seconds. <span className="text-gradient-red">Infinite Impact.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              When every second counts, SafeScan eliminates every barrier between a first responder and the information they need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Animated connector lines */}
            <motion.div
              className="hidden md:block absolute top-24 left-[33%] w-[34%] h-px"
              style={{ background: "linear-gradient(90deg, hsl(var(--emergency) / 0.5), hsl(var(--emergency) / 0.5))" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div
              className="hidden md:block absolute top-24 left-[66%] w-[17%] h-px"
              style={{ background: "linear-gradient(90deg, hsl(var(--emergency) / 0.5), transparent)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            />

            {[
              { step: "01", icon: Smartphone, title: "Scan the QR", desc: "Any smartphone camera can scan the secure QR on the victim's locked screen. No app download needed. No login. Works offline." },
              { step: "02", icon: Hospital, title: "View Profile", desc: "An instant emergency profile opens — name, blood type, allergies, medications, and contacts with one-tap call buttons." },
              { step: "03", icon: Siren, title: "Alert Dispatched", desc: "Family gets an automatic SMS alert with live GPS. Nearest hospital, ambulance, and police are suggested with real-time ETAs." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="glass-card text-center flex flex-col items-center gap-4 relative group"
              >
                <span className="font-mono text-emergency/50 text-sm font-bold">{item.step}</span>
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-emergency/15 flex items-center justify-center group-hover:bg-emergency/25 transition-colors"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <item.icon className="w-8 h-8 text-emergency" />
                </motion.div>
                <h3 className="font-display font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                {i < 2 && <ArrowRight className="hidden md:block absolute -right-5 top-24 w-5 h-5 text-emergency/40" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ LIVE DEMO ══════════ */}
      <section id="features" className="relative z-10 px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="text-emergency font-mono text-sm tracking-widest uppercase font-semibold inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Live Demo
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mt-4 mb-6">
                This is what a{" "}
                <span className="text-gradient-red">First Responder</span>{" "}
                Sees.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Scan the QR on any locked phone and this page loads instantly in any browser. Zero friction. Maximum impact.
              </p>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-5"
              >
                {[
                  "No app installation required on responder's phone",
                  "QR token expires every 60 seconds automatically",
                  "Every scan is timestamped and audit-logged",
                ].map((text) => (
                  <motion.div key={text} variants={fadeUp} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-safe flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Mock Emergency Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div
                className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                style={{ boxShadow: "0 0 80px hsl(var(--emergency) / 0.1)" }}
              >
                {/* Red header */}
                <motion.div
                  className="bg-emergency px-6 py-5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="text-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🚨
                    </motion.span>
                    <div>
                      <h3 className="font-display font-bold text-primary-foreground text-lg tracking-wide uppercase">Emergency Profile</h3>
                      <p className="text-primary-foreground/80 text-sm">SafeScan Emergency Access • Verified Secure</p>
                    </div>
                  </div>
                </motion.div>

                {/* Profile body */}
                <div className="bg-card p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-emergency/20 flex items-center justify-center"
                      animate={{ boxShadow: ["0 0 0px hsl(var(--emergency) / 0)", "0 0 20px hsl(var(--emergency) / 0.3)", "0 0 0px hsl(var(--emergency) / 0)"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <User className="w-7 h-7 text-emergency" />
                    </motion.div>
                    <div>
                      <h4 className="font-display font-bold text-xl uppercase tracking-wide">Arjun Krishna</h4>
                      <p className="text-muted-foreground text-sm font-mono">DOB: 14 March 1990 · Male · 34 yrs</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Medical badges */}
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3"
                  >
                    {[
                      { icon: Droplets, label: "O+ Blood Group", border: "border-emergency/30", bg: "bg-emergency/10", text: "text-emergency" },
                      { icon: AlertOctagon, label: "Penicillin Allergy", border: "border-destructive/30", bg: "bg-destructive/10", text: "text-destructive" },
                      { icon: AlertTriangle, label: "Diabetic", border: "border-accent/30", bg: "bg-accent/10", text: "text-accent" },
                      { icon: Heart, label: "Organ Donor", border: "border-safe/30", bg: "bg-safe/10", text: "text-safe" },
                    ].map(({ icon: Icon, label, border, bg, text }) => (
                      <motion.span
                        key={label}
                        variants={fadeUp}
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${border} ${bg} ${text} font-mono text-sm font-medium`}
                      >
                        <Icon className="w-4 h-4" /> {label}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Emergency Contacts */}
                  <div>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">Emergency Contacts</p>
                    <div className="space-y-3">
                      {[
                        { name: "Priya Krishna", role: "Wife · +91 98765 43210" },
                        { name: "Dr. Raman Rao", role: "Physician · +91 98001 12345" },
                      ].map((contact) => (
                        <motion.div
                          key={contact.name}
                          whileHover={{ x: 4 }}
                          className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30"
                        >
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground font-mono">{contact.role}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safe text-accent-foreground font-mono text-sm font-bold"
                          >
                            <Phone className="w-4 h-4" /> Call
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Nearest Emergency Services */}
                  <div>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emergency" /> Nearest Emergency Services · Kakinada, AP
                    </p>
                    <div className="space-y-3">
                      {[
                        { emoji: "🏥", name: "Government General Hospital", dist: "1.2 km away", time: "4 min" },
                        { emoji: "🚑", name: "Kakinada Ambulance", dist: "0.8 km away", time: "2 min" },
                        { emoji: "🚔", name: "Town Police Station", dist: "1.8 km away", time: "6 min" },
                      ].map((svc) => (
                        <motion.div
                          key={svc.name}
                          whileHover={{ x: 4 }}
                          className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{svc.emoji}</span>
                            <div>
                              <p className="font-medium text-sm">{svc.name}</p>
                              <p className="text-xs text-muted-foreground">{svc.dist}</p>
                            </div>
                          </div>
                          <motion.span
                            className="px-3 py-1 rounded-full bg-safe/15 text-safe font-mono text-xs font-bold"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {svc.time}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ SOS ACTIVATION ══════════ */}
      <section id="how-it-works" className="relative z-10 px-6 py-28 overflow-hidden">
        {/* Background accent */}
        <motion.div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-emergency/5 blur-[150px] -translate-y-1/2"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-emergency font-mono text-sm tracking-widest uppercase font-semibold">SOS Activation</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mt-4 mb-6">
                3 Presses.
                <br />
                <span className="text-gradient-red">Instant Help.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                Triple-press your power button and SafeScan simultaneously blasts your live GPS to family, auto-dials emergency services, and activates an audio beacon.
              </p>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {[
                  { icon: MapPinned, title: "Live GPS Broadcast", desc: "Family receives a real-time tracking link via SMS and push notification" },
                  { icon: PhoneCall, title: "Auto-Call Sequence", desc: "Calls emergency contact 1 → 2 → local emergency services if unanswered" },
                  { icon: Volume2, title: "Emergency Beacon", desc: "110dB repeating alarm that overrides silent/vibrate mode until cancelled" },
                ].map(({ icon: Icon, title, desc }) => (
                  <motion.div key={title} variants={fadeUp} className="flex items-start gap-4 group" whileHover={{ x: 6 }}>
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-emergency/15 flex items-center justify-center flex-shrink-0 group-hover:bg-emergency/25 transition-colors"
                      whileHover={{ rotate: 10 }}
                    >
                      <Icon className="w-5 h-5 text-emergency" />
                    </motion.div>
                    <div>
                      <h4 className="font-display font-bold mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* SOS Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="flex items-center justify-center"
            >
              <div className="relative w-72 h-72 flex items-center justify-center">
                {/* Animated rings */}
                {[0, 4, 10].map((inset, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-emergency/15"
                    style={{ inset }}
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  />
                ))}

                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-10 rounded-full border-2 border-emergency/40"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-10 rounded-full border-2 border-emergency/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                <motion.button
                  onClick={() => navigate("/sos")}
                  className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer"
                  style={{
                    background: "radial-gradient(circle at 40% 35%, hsl(var(--emergency-glow)), hsl(var(--emergency)) 70%)",
                    boxShadow: "0 0 60px hsl(var(--emergency) / 0.5), 0 0 120px hsl(var(--emergency) / 0.2), inset 0 -4px 12px hsl(0 0% 0% / 0.3)",
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  animate={{ boxShadow: [
                    "0 0 60px hsl(var(--emergency) / 0.5), 0 0 120px hsl(var(--emergency) / 0.2), inset 0 -4px 12px hsl(0 0% 0% / 0.3)",
                    "0 0 80px hsl(var(--emergency) / 0.7), 0 0 160px hsl(var(--emergency) / 0.3), inset 0 -4px 12px hsl(0 0% 0% / 0.3)",
                    "0 0 60px hsl(var(--emergency) / 0.5), 0 0 120px hsl(var(--emergency) / 0.2), inset 0 -4px 12px hsl(0 0% 0% / 0.3)",
                  ]}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-display text-4xl font-bold text-primary-foreground tracking-widest">SOS</span>
                  <span className="font-mono text-[10px] text-primary-foreground/70 tracking-widest uppercase">Press 3× Power</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Index;
