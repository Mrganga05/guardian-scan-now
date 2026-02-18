import { motion } from "framer-motion";
import { Shield, Scan, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emergency/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-emergency/3 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-emergency" />
              <span className="text-emergency font-mono text-sm tracking-widest uppercase">Emergency Identity Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Your{" "}
              <span className="text-gradient-red">Silent</span>
              <br />
              Guardian
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
              When you can't speak, your phone speaks for you. SafeScan delivers your critical medical identity to first responders instantly — no app download needed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-emergency hover:bg-emergency-glow text-primary-foreground font-display text-base px-8 h-14 glow-red" onClick={() => navigate("/auth")}>
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary font-display text-base px-8 h-14" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
                See How It Works
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-safe" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-emergency" />
                <span>Saves Lives Daily</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Phone mockup with QR */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Pulse rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border border-emergency/20 animate-pulse-glow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 rounded-full border border-emergency/10 animate-pulse-glow" style={{ animationDelay: "1s" }} />
              </div>

              {/* Phone frame */}
              <div className="relative w-72 h-[540px] rounded-[3rem] border-2 border-white/10 bg-card p-4 shadow-2xl animate-float">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-background rounded-full" />
                <div className="w-full h-full rounded-[2.2rem] bg-background flex flex-col items-center justify-center gap-6 p-6">
                  <div className="w-6 h-6 rounded-full bg-emergency/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emergency animate-pulse" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Scan for Emergency</span>

                  {/* QR placeholder */}
                  <div className="relative">
                    <div className="pulse-ring w-40 h-40 flex items-center justify-center">
                      <div className="w-36 h-36 rounded-2xl bg-white p-3 glow-red">
                        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-1">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div
                              key={i}
                              className={`rounded-sm ${
                                [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i)
                                  ? "bg-background"
                                  : "bg-transparent"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-display font-bold text-sm">SafeScan</p>
                    <p className="text-xs text-muted-foreground">Protected Emergency ID</p>
                  </div>

                  {/* Heartbeat line */}
                  <svg viewBox="0 0 200 30" className="w-48 h-6 mt-2">
                    <path
                      d="M0,15 L60,15 L70,5 L80,25 L90,2 L100,28 L110,12 L115,18 L120,15 L200,15"
                      fill="none"
                      stroke="hsl(var(--emergency))"
                      strokeWidth="2"
                      className="animate-pulse-glow"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
