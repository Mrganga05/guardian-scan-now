import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOSMode = () => {
  const navigate = useNavigate();
  const [activated, setActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!activated) return;
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [activated, countdown]);

  const profile = JSON.parse(localStorage.getItem("safescan_profile") || "{}");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        {activated && <div className="absolute inset-0 bg-emergency/5 animate-pulse" />}
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-8 flex-1 flex flex-col">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-xl font-bold text-emergency">SOS Mode</h1>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {!activated ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <p className="text-muted-foreground mb-8">Tap the button to activate emergency mode. Your emergency contacts will be notified.</p>
              <button
                onClick={() => setActivated(true)}
                className="w-40 h-40 rounded-full bg-emergency/20 border-4 border-emergency flex items-center justify-center glow-red hover:bg-emergency/30 transition-all"
              >
                <AlertTriangle className="w-16 h-16 text-emergency" />
              </button>
              <p className="text-sm text-muted-foreground mt-6">Press to activate SOS</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6 w-full">
              {countdown > 0 ? (
                <>
                  <div className="text-6xl font-display font-bold text-emergency">{countdown}</div>
                  <p className="text-muted-foreground">Activating SOS in {countdown}s...</p>
                  <Button onClick={() => { setActivated(false); setCountdown(5); }} variant="outline">Cancel</Button>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto rounded-full bg-emergency/20 flex items-center justify-center glow-red animate-pulse">
                    <AlertTriangle className="w-10 h-10 text-emergency" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-emergency">SOS Active</h2>
                  {profile.contacts?.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Emergency Contacts:</p>
                      {profile.contacts.map((c: any, i: number) => (
                        <a key={i} href={`tel:${c.phone}`}
                          className="flex items-center justify-between p-4 rounded-xl bg-emergency/10 border border-emergency/20"
                        >
                          <span className="font-medium">{c.name}</span>
                          <Phone className="w-5 h-5 text-emergency" />
                        </a>
                      ))}
                    </div>
                  )}
                  <Button onClick={() => { setActivated(false); setCountdown(5); }} variant="outline" className="mt-4">
                    Deactivate SOS
                  </Button>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSMode;
