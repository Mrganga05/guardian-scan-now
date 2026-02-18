import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, QrCode, Activity, Users, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setProfile(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emergency border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const completeness = profile
    ? [profile.full_name, profile.blood_type, profile.date_of_birth].filter(Boolean).length
    : 0;
  const completenessPercent = Math.round((completeness / 3) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emergency/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emergency" />
            </div>
            <span className="font-display font-bold text-lg">SafeScan</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-5xl">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-display font-bold">
            Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
          </h1>
          <p className="text-muted-foreground mt-1">Manage your emergency identity.</p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile completeness */}
          <div className="glass-card col-span-full md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-emergency" />
              <h3 className="font-display font-bold">Profile Status</h3>
            </div>
            <div className="relative w-24 h-24 mx-auto my-4">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="hsl(var(--emergency))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${completenessPercent * 2.51} 251`}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-lg">
                {completenessPercent}%
              </span>
            </div>
            <p className="text-center text-sm text-muted-foreground">Profile completeness</p>
            <Button
              onClick={() => navigate("/onboarding")}
              className="w-full mt-4 bg-emergency hover:bg-emergency-glow text-primary-foreground font-display"
              size="sm"
            >
              Complete Profile
            </Button>
          </div>

          {/* QR Code */}
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-4">
              <QrCode className="w-5 h-5 text-emergency" />
              <h3 className="font-display font-bold">Emergency QR</h3>
            </div>
            <div className="flex items-center justify-center py-6">
              <div className="pulse-ring w-32 h-32 flex items-center justify-center">
                <div className="w-28 h-28 rounded-2xl bg-white p-2 glow-red flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-background" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground font-mono">Complete your profile to generate QR</p>
          </div>

          {/* Emergency contacts */}
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-emergency" />
              <h3 className="font-display font-bold">Contacts</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">No emergency contacts added yet.</p>
            <Button
              onClick={() => navigate("/onboarding")}
              variant="outline"
              className="w-full border-border font-display"
              size="sm"
            >
              Add Contacts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
