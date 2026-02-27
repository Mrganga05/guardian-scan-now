import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User, Droplets, AlertOctagon, Heart, Phone, MapPin, Pill, Shield, Loader2 } from "lucide-react";

interface ProfileData {
  fullName: string;
  bloodGroup: string;
  dob?: string;
  insurance?: string;
  organDonor?: boolean;
  allergies?: string[];
  medications?: string[];
  conditions?: string[];
  contacts: { name: string; phone: string; relationship?: string }[];
}

const EmergencyView = () => {
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    const hash = window.location.hash.slice(1);

    if (token) {
      // Try online fetch first; if it fails and we have hash data, use that as fallback
      fetchFromToken(token, hash);
    } else if (hash) {
      decodeHashData(hash);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [searchParams]);

  const decodeHashData = (hash: string) => {
    try {
      const decoded = decodeURIComponent(atob(hash));
      const data = JSON.parse(decoded);
      if (data.fullName && data.bloodGroup && data.contacts) {
        setProfile(data);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  const fetchFromToken = async (token: string, hashFallback?: string) => {
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/get-emergency-profile?token=${token}`,
        {
          headers: {
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );

      if (!res.ok) {
        // If online fails but we have hash data, use offline fallback
        if (hashFallback) {
          decodeHashData(hashFallback);
          return;
        }
        setError(true);
        setLoading(false);
        return;
      }

      const profileData = await res.json();
      if (profileData.fullName) {
        setProfile(profileData);
      } else if (hashFallback) {
        decodeHashData(hashFallback);
        return;
      } else {
        setError(true);
      }
    } catch {
      // Network error — try offline fallback
      if (hashFallback) {
        decodeHashData(hashFallback);
        return;
      }
      setError(true);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-white text-xl font-bold">Invalid Emergency Profile</h1>
          <p className="text-gray-400 text-sm">This QR code may be expired or damaged.</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const age = profile.dob
    ? Math.floor((Date.now() - new Date(profile.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-red-500/8 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Red header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚨</span>
            <div>
              <h1 className="font-bold text-white text-lg tracking-wide uppercase">Emergency Profile</h1>
              <p className="text-white/80 text-sm">SafeScan Emergency Access • Verified Secure</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Person info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h2 className="font-bold text-white text-2xl uppercase tracking-wide">{profile.fullName}</h2>
              <p className="text-gray-400 text-sm font-mono">
                {profile.dob && `DOB: ${new Date(profile.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
                {age !== null && ` · ${age} yrs`}
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Medical badges */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-sm font-medium">
              <Droplets className="w-4 h-4" /> {profile.bloodGroup} Blood Group
            </span>
            {profile.allergies?.map((a, i) => (
              <span key={`a-${i}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-mono text-sm font-medium">
                <AlertOctagon className="w-4 h-4" /> {a}
              </span>
            ))}
            {profile.medications?.map((m, i) => (
              <span key={`m-${i}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-sm font-medium">
                <Pill className="w-4 h-4" /> {m}
              </span>
            ))}
            {profile.organDonor && (
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-mono text-sm font-medium">
                <Heart className="w-4 h-4" /> Organ Donor
              </span>
            )}
          </div>

          {profile.insurance && (
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">Insurance</p>
              <p className="text-white font-medium">{profile.insurance}</p>
            </div>
          )}

          {/* Emergency Contacts */}
          <div>
            <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-3">Emergency Contacts</p>
            <div className="space-y-3">
              {profile.contacts.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
                  <div>
                    <p className="font-medium text-white">{c.name}</p>
                    <p className="text-sm text-gray-400 font-mono">
                      {c.relationship && `${c.relationship} · `}{c.phone}
                    </p>
                  </div>
                  <a
                    href={`tel:${c.phone}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-black font-mono text-sm font-bold active:scale-95 transition-transform"
                  >
                    <Phone className="w-4 h-4" /> Call
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Emergency Services */}
          <div>
            <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-500" /> Emergency Services
            </p>
            <div className="space-y-3">
              {[
                { icon: "🏥", name: "Nearest Hospital", sub: "Search nearby", href: "https://www.google.com/maps/search/hospital+near+me" },
                { icon: "🚑", name: "Ambulance", sub: "Call 108", href: "tel:108" },
                { icon: "🚔", name: "Police", sub: "Call 100", href: "tel:100" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 active:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{s.icon}</span>
                    <div>
                      <p className="font-medium text-white text-sm">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.sub}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 font-mono text-xs font-bold">Tap</span>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center py-6 space-y-1">
            <p className="text-gray-500 text-xs font-mono">Generated by SafeScan</p>
            <p className="text-gray-600 text-xs">Emergency Medical Identity Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyView;
