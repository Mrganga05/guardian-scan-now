import { motion } from "framer-motion";
import { Shield, Scan, AlertTriangle, ArrowRight, Smartphone, Hospital, Siren, CheckCircle, User, Droplets, AlertOctagon, Heart, Phone, MapPin, Clock, MapPinned, PhoneCall, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emergency/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-emergency/3 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 min-h-screen">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-12 h-12 rounded-2xl bg-emergency/20 flex items-center justify-center glow-red">
            <Shield className="w-6 h-6 text-emergency" />
          </div>
          <span className="font-display text-2xl font-bold">SafeScan</span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
            Your <span className="text-gradient-red">Silent</span> Guardian
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            When you can't speak, your phone speaks for you. Create your emergency profile in seconds.
          </p>
        </motion.div>

        {/* Two main CTA cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
          {/* Create Emergency Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => navigate("/profile")}
              className="glass-card-hover w-full flex flex-col items-center gap-4 p-8 cursor-pointer text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emergency/15 flex items-center justify-center group-hover:bg-emergency/25 transition-colors">
                <Scan className="w-8 h-8 text-emergency" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1">Create Emergency Profile</h3>
                <p className="text-sm text-muted-foreground">Add your medical info & contacts</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emergency transition-colors" />
            </button>
          </motion.div>

          {/* SOS Mode */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <button
              onClick={() => navigate("/sos")}
              className="glass-card-hover w-full flex flex-col items-center gap-4 p-8 cursor-pointer text-center group border-emergency/20"
            >
              <div className="w-16 h-16 rounded-full bg-emergency/20 flex items-center justify-center glow-red group-hover:bg-emergency/30 transition-colors">
                <AlertTriangle className="w-8 h-8 text-emergency" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1 text-emergency">SOS Mode</h3>
                <p className="text-sm text-muted-foreground">Instant emergency activation</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emergency transition-colors" />
            </button>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-6 mt-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-safe" />
            <span>No Account Needed</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emergency" />
            <span>100% Private</span>
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-emergency font-mono text-sm tracking-widest uppercase">The Process</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-4">
              3 Seconds. <span className="text-gradient-red">Infinite Impact.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              When every second counts, SafeScan eliminates every barrier between a first responder and the information they need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector lines (desktop) */}
            <div className="hidden md:block absolute top-24 left-[33%] w-[34%] h-px bg-gradient-to-r from-emergency/40 to-emergency/40" />
            <div className="hidden md:block absolute top-24 left-[66%] w-[17%] h-px bg-gradient-to-r from-emergency/40 to-transparent" />

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card text-center flex flex-col items-center gap-4 relative"
            >
              <span className="font-mono text-emergency/50 text-sm font-bold">01</span>
              <div className="w-16 h-16 rounded-2xl bg-emergency/15 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-emergency" />
              </div>
              <h3 className="font-display font-bold text-lg">Scan the QR</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Any smartphone camera can scan the secure QR on the victim's locked screen. No app download needed. No login. Works offline.
              </p>
              <ArrowRight className="hidden md:block absolute -right-5 top-24 w-5 h-5 text-emergency/40" />
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="glass-card text-center flex flex-col items-center gap-4 relative"
            >
              <span className="font-mono text-emergency/50 text-sm font-bold">02</span>
              <div className="w-16 h-16 rounded-2xl bg-emergency/15 flex items-center justify-center">
                <Hospital className="w-8 h-8 text-emergency" />
              </div>
              <h3 className="font-display font-bold text-lg">View Profile</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                An instant emergency profile opens — name, blood type, allergies, medications, and contacts with one-tap call buttons.
              </p>
              <ArrowRight className="hidden md:block absolute -right-5 top-24 w-5 h-5 text-emergency/40" />
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card text-center flex flex-col items-center gap-4"
            >
              <span className="font-mono text-emergency/50 text-sm font-bold">03</span>
              <div className="w-16 h-16 rounded-2xl bg-emergency/15 flex items-center justify-center">
                <Siren className="w-8 h-8 text-emergency" />
              </div>
              <h3 className="font-display font-bold text-lg">Alert Dispatched</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Family gets an automatic SMS alert with live GPS. Nearest hospital, ambulance, and police are suggested with real-time ETAs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-emergency font-mono text-sm tracking-widest uppercase font-semibold">Live Demo</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mt-4 mb-6">
                This is what a{" "}
                <span className="text-gradient-red">First Responder</span>{" "}
                Sees.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Scan the QR on any locked phone and this page loads instantly in any browser. Zero friction. Maximum impact.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-safe flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">No app installation required on responder's phone</span>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-safe flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">QR token expires every 60 seconds automatically</span>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-safe flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Every scan is timestamped and audit-logged</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Mock Emergency Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl" style={{ boxShadow: "0 0 80px hsl(var(--emergency) / 0.1)" }}>
                {/* Red header */}
                <div className="bg-emergency px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚨</span>
                    <div>
                      <h3 className="font-display font-bold text-primary-foreground text-lg tracking-wide uppercase">Emergency Profile</h3>
                      <p className="text-primary-foreground/80 text-sm">SafeScan Emergency Access • Verified Secure</p>
                    </div>
                  </div>
                </div>

                {/* Profile body */}
                <div className="bg-card p-6 space-y-6">
                  {/* Person info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-emergency/20 flex items-center justify-center">
                      <User className="w-7 h-7 text-emergency" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl uppercase tracking-wide">Arjun Krishna</h4>
                      <p className="text-muted-foreground text-sm font-mono">DOB: 14 March 1990 · Male · 34 yrs</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Medical badges */}
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emergency/30 bg-emergency/10 text-emergency font-mono text-sm font-medium">
                      <Droplets className="w-4 h-4" /> O+ Blood Group
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/10 text-destructive font-mono text-sm font-medium">
                      <AlertOctagon className="w-4 h-4" /> Penicillin Allergy
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-sm font-medium">
                      <AlertTriangle className="w-4 h-4" /> Diabetic
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-safe/30 bg-safe/10 text-safe font-mono text-sm font-medium">
                      <Heart className="w-4 h-4" /> Organ Donor
                    </span>
                  </div>

                  {/* Emergency Contacts */}
                  <div>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">Emergency Contacts</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30">
                        <div>
                          <p className="font-medium">Priya Krishna</p>
                          <p className="text-sm text-muted-foreground font-mono">Wife · +91 98765 43210</p>
                        </div>
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safe text-accent-foreground font-mono text-sm font-bold">
                          <Phone className="w-4 h-4" /> Call
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30">
                        <div>
                          <p className="font-medium">Dr. Raman Rao</p>
                          <p className="text-sm text-muted-foreground font-mono">Physician · +91 98001 12345</p>
                        </div>
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safe text-accent-foreground font-mono text-sm font-bold">
                          <Phone className="w-4 h-4" /> Call
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Nearest Emergency Services */}
                  <div>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emergency" /> Nearest Emergency Services · Kakinada, AP
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏥</span>
                          <div>
                            <p className="font-medium text-sm">Government General Hospital</p>
                            <p className="text-xs text-muted-foreground">1.2 km away</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-safe/15 text-safe font-mono text-xs font-bold">4 min</span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🚑</span>
                          <div>
                            <p className="font-medium text-sm">Kakinada Ambulance</p>
                            <p className="text-xs text-muted-foreground">0.8 km away</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-safe/15 text-safe font-mono text-xs font-bold">2 min</span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🚔</span>
                          <div>
                            <p className="font-medium text-sm">Town Police Station</p>
                            <p className="text-xs text-muted-foreground">1.8 km away</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-safe/15 text-safe font-mono text-xs font-bold">6 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOS Activation Section */}
      <section className="relative z-10 px-6 py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-emergency font-mono text-sm tracking-widest uppercase font-semibold">SOS Activation</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mt-4 mb-6">
                3 Presses.
                <br />
                <span className="text-gradient-red">Instant Help.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                Triple-press your power button and SafeScan simultaneously blasts your live GPS to family, auto-dials emergency services, and activates an audio beacon — all before you can blink.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emergency/15 flex items-center justify-center flex-shrink-0">
                    <MapPinned className="w-5 h-5 text-emergency" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold mb-1">Live GPS Broadcast</h4>
                    <p className="text-sm text-muted-foreground">Family receives a real-time tracking link via SMS and push notification</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emergency/15 flex items-center justify-center flex-shrink-0">
                    <PhoneCall className="w-5 h-5 text-emergency" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold mb-1">Auto-Call Sequence</h4>
                    <p className="text-sm text-muted-foreground">Calls emergency contact 1 → 2 → local emergency services if unanswered</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emergency/15 flex items-center justify-center flex-shrink-0">
                    <Volume2 className="w-5 h-5 text-emergency" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold mb-1">Emergency Beacon</h4>
                    <p className="text-sm text-muted-foreground">110dB repeating alarm that overrides silent/vibrate mode until cancelled</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: SOS Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-72 h-72 flex items-center justify-center">
                {/* Outer rings */}
                <div className="absolute inset-0 rounded-full border border-emergency/10" />
                <div className="absolute inset-4 rounded-full border border-emergency/15" />
                <div className="absolute inset-10 rounded-full border border-emergency/25" />

                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-10 rounded-full border-2 border-emergency/40"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* SOS Button */}
                <button
                  onClick={() => navigate("/sos")}
                  className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  style={{
                    background: "radial-gradient(circle at 40% 35%, hsl(var(--emergency-glow)), hsl(var(--emergency)) 70%)",
                    boxShadow: "0 0 60px hsl(var(--emergency) / 0.5), 0 0 120px hsl(var(--emergency) / 0.2), inset 0 -4px 12px hsl(0 0% 0% / 0.3)",
                  }}
                >
                  <span className="font-display text-4xl font-bold text-primary-foreground tracking-widest">SOS</span>
                  <span className="font-mono text-[10px] text-primary-foreground/70 tracking-widest uppercase">Press 3× Power</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
