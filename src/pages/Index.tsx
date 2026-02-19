import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Shield, Scan, AlertTriangle, ArrowRight, Smartphone, Hospital, Siren, CheckCircle, User, Droplets, AlertOctagon, Heart, Phone, MapPin, Clock, MapPinned, PhoneCall, Volume2, Zap, Lock, Wifi, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/landing/NavBar";
import FooterSection from "@/components/landing/FooterSection";
import { QRCodeSVG } from "qrcode.react";

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
    {Array.from({ length: 8 }).map((_, i) => (
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
          willChange: "transform, opacity",
        }}
        animate={{
          y: [0, -(Math.random() * 80 + 40), 0],
          x: [0, (Math.random() - 0.5) * 40, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: Math.random() * 8 + 8,
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

const smoothEase = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
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
          style={{ willChange: "transform, opacity" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-safe/3 blur-[120px]"
          style={{ willChange: "transform" }}
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emergency/30 bg-emergency/10 mb-8"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-emergency"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-emergency font-mono text-xs tracking-widest uppercase font-semibold">Emergency Ready</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6">
              Your{" "}
              <motion.span
                className="text-gradient-red inline-block"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Silent
              </motion.span>{" "}
              <br className="hidden lg:block" />
              Guardian
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
              When you can't speak, your phone speaks for you. One QR scan gives first responders everything they need.
            </p>

            {/* Heartbeat line */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-64 mb-8 mx-auto lg:mx-0">
              <HeartbeatLine />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.div variants={fadeUp}>
                <Button
                  size="lg"
                  onClick={() => navigate("/profile")}
                  className="bg-emergency hover:bg-emergency-glow text-primary-foreground font-display text-base px-8 h-12 glow-red"
                >
                  <Scan className="w-5 h-5 mr-2" />
                  Create Emergency Profile
                </Button>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/sos")}
                  className="border-emergency/30 text-emergency hover:bg-emergency/10 font-display text-base px-8 h-12"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  SOS Mode
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-muted-foreground"
            >
              {[
                { icon: Shield, label: "No Account Needed", color: "text-safe" },
                { icon: Lock, label: "Encrypted", color: "text-emergency" },
                { icon: Wifi, label: "Works Offline", color: "text-safe" },
              ].map(({ icon: Icon, label, color }) => (
                <motion.div key={label} className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span>{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Animated Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            className="flex items-center justify-center perspective-[1200px]"
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Phone frame */}
              <div
                className="relative w-[280px] md:w-[320px] rounded-[40px] border-[3px] border-white/10 overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, hsl(240 15% 8%), hsl(240 20% 4%))",
                  boxShadow: "0 0 80px hsl(var(--emergency) / 0.15), 0 40px 80px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
                }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-background rounded-b-2xl z-20" />

                {/* Screen content */}
                <div className="pt-12 pb-8 px-6">
                  {/* Time display */}
                  <motion.div
                    className="text-center mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-4xl font-display font-bold text-foreground tracking-tight">9:41</p>
                    <p className="text-xs text-muted-foreground font-mono">Wednesday, 18 February</p>
                  </motion.div>

                  {/* QR Card with animated red borders */}
                  <motion.div
                    className="mt-6 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.6, type: "spring" }}
                  >
                    {/* Outer glow ring */}
                    <motion.div
                      className="absolute -inset-3 rounded-3xl border border-emergency/30"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -inset-1.5 rounded-2xl border border-emergency/50"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />

                    {/* QR container */}
                    <div
                      className="rounded-2xl p-6 flex flex-col items-center gap-4 relative overflow-hidden"
                      style={{
                        background: "linear-gradient(145deg, hsl(var(--emergency) / 0.12), hsl(var(--emergency) / 0.05))",
                        border: "1px solid hsl(var(--emergency) / 0.4)",
                        boxShadow: "inset 0 0 60px hsl(var(--emergency) / 0.08), 0 0 40px hsl(var(--emergency) / 0.1)",
                      }}
                    >
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emergency/60 rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emergency/60 rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emergency/60 rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emergency/60 rounded-br-xl" />

                      {/* QR Code */}
                      <motion.div
                        className="bg-foreground p-3 rounded-xl"
                        animate={{ boxShadow: ["0 0 0px hsl(var(--emergency) / 0)", "0 0 30px hsl(var(--emergency) / 0.3)", "0 0 0px hsl(var(--emergency) / 0)"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <QRCodeSVG
                          value={"🚨 EMERGENCY PROFILE\n👤 Kiran\n🩸 B+ Blood\n📞 Ram: +91 98765 43210\n📞 Dr. Rao: +91 98001 12345\n\nNo internet needed"}
                          size={120}
                          bgColor="hsl(0, 0%, 95%)"
                          fgColor="hsl(240, 20%, 4%)"
                          level="L"
                        />
                      </motion.div>

                      {/* Text */}
                      <div className="text-center">
                        <motion.p
                          className="font-display font-bold text-emergency text-sm tracking-[0.2em] uppercase"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Scan for Emergency
                        </motion.p>
                        <p className="text-muted-foreground text-xs font-mono mt-1">
                          Protected • Expires in <motion.span
                            className="text-emergency"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >60s</motion.span>
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom bar */}
                  <div className="mt-8 flex justify-center">
                    <div className="w-32 h-1 rounded-full bg-foreground/20" />
                  </div>
                </div>
              </div>

              {/* Ambient glow behind phone */}
              <motion.div
                className="absolute -inset-10 -z-10 rounded-full blur-[80px]"
                style={{ background: "radial-gradient(circle, hsl(var(--emergency) / 0.15), transparent 70%)" }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>

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
            className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { value: 3, suffix: "s", label: "Profile Load Time" },
              { value: 100, suffix: "%", label: "Privacy Guaranteed" },
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: smoothEase } }}
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
              initial={{ opacity: 0, y: 40, rotateY: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: smoothEase }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: smoothEase } }}
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
                      <h4 className="font-display font-bold text-xl uppercase tracking-wide">Kiran</h4>
                      <p className="text-muted-foreground text-sm font-mono">DOB: 04 January 2004 · Male · 22 yrs</p>
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
                      { icon: Droplets, label: "B+ Blood Group", border: "border-emergency/30", bg: "bg-emergency/10", text: "text-emergency" },
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
                        { name: "Ram", role: "Father · +91 98765 43210" },
                        { name: "Dr. Raman Rao", role: "Physician · +91 98001 12345" },
                      ].map((contact) => (
                        <motion.div
                          key={contact.name}
                          whileHover={{ x: 4, transition: { duration: 0.2, ease: smoothEase } }}
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
                          whileHover={{ x: 4, transition: { duration: 0.2, ease: smoothEase } }}
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
                  <motion.div key={title} variants={fadeUp} className="flex items-start gap-4 group" whileHover={{ x: 6, transition: { duration: 0.2, ease: smoothEase } }}>
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
