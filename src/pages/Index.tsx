import { motion } from "framer-motion";
import { Shield, Scan, AlertTriangle, ArrowRight, Smartphone, Hospital, Siren } from "lucide-react";
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
    </div>
  );
};

export default Index;
