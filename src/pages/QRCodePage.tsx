import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Share2, Edit, User, Droplets, AlertOctagon, Heart, Phone, MapPin, AlertTriangle, Pill } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

interface ProfileData {
  fullName: string;
  bloodGroup: string;
  dob?: string;
  insurance?: string;
  organDonor?: boolean;
  allergies?: string[];
  medications?: string[];
  contacts: { name: string; phone: string; relationship?: string }[];
}

const QRCodePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("safescan_profile");
    if (!data) {
      navigate("/profile");
      return;
    }
    setProfile(JSON.parse(data));
  }, [navigate]);

  if (!profile) return null;

  const qrData = JSON.stringify({
    n: profile.fullName,
    b: profile.bloodGroup,
    a: profile.allergies,
    m: profile.medications,
    c: profile.contacts.map((c) => ({ n: c.name, p: c.phone })),
    od: profile.organDonor,
  });

  const handleShare = async () => {
    const text = `🚨 Emergency Profile - ${profile.fullName}\nBlood: ${profile.bloodGroup}\n${profile.allergies?.length ? `Allergies: ${profile.allergies.join(", ")}\n` : ""}${profile.contacts.map((c) => `📞 ${c.name}: ${c.phone}`).join("\n")}`;
    if (navigator.share) {
      await navigator.share({ title: "SafeScan Emergency Profile", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const age = profile.dob
    ? Math.floor((Date.now() - new Date(profile.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emergency/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("/profile")} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-xl font-bold">Edit Profile</h1>
        </motion.div>

        {/* QR Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card flex flex-col items-center gap-6 py-10"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emergency/30 bg-emergency/10">
            <div className="w-2 h-2 rounded-full bg-emergency animate-pulse" />
            <span className="text-emergency font-mono text-xs tracking-widest uppercase font-semibold">Scan for Emergency</span>
          </div>

          <div className="text-center">
            <h2 className="font-display text-2xl font-bold">{profile.fullName}</h2>
            <p className="text-muted-foreground mt-1">
              Blood Group: <span className="text-emergency font-bold">{profile.bloodGroup}</span>
            </p>
          </div>

          <div className="relative">
            <div className="pulse-ring p-1">
              <div className="bg-white rounded-2xl p-4 glow-red">
                <QRCodeSVG value={qrData} size={200} level="M" bgColor="#ffffff" fgColor="#000000" />
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            Set this as your lock screen wallpaper for instant access
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 mt-6"
        >
          <Button onClick={() => setShowPreview(true)} className="h-14 bg-emergency hover:bg-emergency-glow text-primary-foreground font-display glow-red">
            <Eye className="w-5 h-5 mr-2" /> Preview
          </Button>
          <Button onClick={handleShare} variant="outline" className="h-14 font-display">
            <Share2 className="w-5 h-5 mr-2" /> Share
          </Button>
        </motion.div>

        <Button onClick={() => navigate("/profile")} variant="ghost" className="w-full mt-4">
          <Edit className="w-4 h-4 mr-2" /> Edit Profile
        </Button>
      </div>

      {/* Full-screen Emergency Profile Preview */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
        >
          <div className="max-w-lg mx-auto px-6 py-8">
            {/* Back button */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-6">
              <button onClick={() => setShowPreview(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="font-display text-xl font-bold">Emergency Profile Preview</h1>
            </motion.div>

            {/* Emergency Profile Card — matching home demo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              style={{ boxShadow: "0 0 80px hsl(var(--emergency) / 0.1)" }}
            >
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
                    <h4 className="font-display font-bold text-xl uppercase tracking-wide">{profile.fullName}</h4>
                    <p className="text-muted-foreground text-sm font-mono">
                      {profile.dob && `DOB: ${new Date(profile.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
                      {age !== null && ` · ${age} yrs`}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Medical badges */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emergency/30 bg-emergency/10 text-emergency font-mono text-sm font-medium">
                    <Droplets className="w-4 h-4" /> {profile.bloodGroup} Blood Group
                  </span>
                  {profile.allergies?.map((a, i) => (
                    <span key={`a-${i}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/10 text-destructive font-mono text-sm font-medium">
                      <AlertOctagon className="w-4 h-4" /> {a}
                    </span>
                  ))}
                  {profile.medications?.map((m, i) => (
                    <span key={`m-${i}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-sm font-medium">
                      <Pill className="w-4 h-4" /> {m}
                    </span>
                  ))}
                  {profile.organDonor && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-safe/30 bg-safe/10 text-safe font-mono text-sm font-medium">
                      <Heart className="w-4 h-4" /> Organ Donor
                    </span>
                  )}
                </div>

                {/* Emergency Contacts */}
                <div>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">Emergency Contacts</p>
                  <div className="space-y-3">
                    {profile.contacts.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30">
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            {c.relationship && `${c.relationship} · `}{c.phone}
                          </p>
                        </div>
                        <a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safe text-accent-foreground font-mono text-sm font-bold">
                          <Phone className="w-4 h-4" /> Call
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Nearest Emergency Services */}
                <div>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emergency" /> Nearest Emergency Services
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
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QRCodePage;
