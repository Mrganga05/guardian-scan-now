import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Share2, Edit } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

  // QR encodes a self-contained emergency data string
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
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emergency/30 bg-emergency/10">
            <div className="w-2 h-2 rounded-full bg-emergency animate-pulse" />
            <span className="text-emergency font-mono text-xs tracking-widest uppercase font-semibold">Scan for Emergency</span>
          </div>

          {/* Name + Blood */}
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold">{profile.fullName}</h2>
            <p className="text-muted-foreground mt-1">
              Blood Group: <span className="text-emergency font-bold">{profile.bloodGroup}</span>
            </p>
          </div>

          {/* QR Code */}
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

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Emergency Profile Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Name</span>
              <span className="font-medium">{profile.fullName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Blood Group</span>
              <span className="font-bold text-emergency">{profile.bloodGroup}</span>
            </div>
            {profile.organDonor && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Organ Donor</span>
                <span className="text-safe font-medium">Yes</span>
              </div>
            )}
            {profile.allergies && profile.allergies.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm block mb-2">Allergies</span>
                <div className="flex flex-wrap gap-2">
                  {profile.allergies.map((a, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-destructive/15 text-destructive text-xs">{a}</span>
                  ))}
                </div>
              </div>
            )}
            {profile.medications && profile.medications.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm block mb-2">Medications</span>
                <div className="flex flex-wrap gap-2">
                  {profile.medications.map((m, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-accent/15 text-accent text-xs">{m}</span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="text-muted-foreground text-sm block mb-2">Emergency Contacts</span>
              {profile.contacts.map((c, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="font-medium text-sm">{c.name}</span>
                  <a href={`tel:${c.phone}`} className="text-emergency text-sm font-mono">{c.phone}</a>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRCodePage;
