import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, X, User, Droplets, Calendar, FileText, Heart, Pill, AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Contact {
  name: string;
  phone: string;
  relationship: string;
}

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const ProfileForm = () => {
  const navigate = useNavigate();

  // Load saved data from localStorage
  const saved = JSON.parse(localStorage.getItem("safescan_profile") || "{}");

  const [fullName, setFullName] = useState(saved.fullName || "");
  const [bloodGroup, setBloodGroup] = useState(saved.bloodGroup || "");
  const [dob, setDob] = useState(saved.dob || "");
  const [insurance, setInsurance] = useState(saved.insurance || "");
  const [organDonor, setOrganDonor] = useState(saved.organDonor || false);

  const [allergies, setAllergies] = useState<string[]>(saved.allergies || []);
  const [allergyInput, setAllergyInput] = useState("");
  const [medications, setMedications] = useState<string[]>(saved.medications || []);
  const [medInput, setMedInput] = useState("");

  const [contacts, setContacts] = useState<Contact[]>(saved.contacts || []);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactRelation, setContactRelation] = useState("");

  const addAllergy = () => {
    if (allergyInput.trim()) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput("");
    }
  };

  const addMedication = () => {
    if (medInput.trim()) {
      setMedications([...medications, medInput.trim()]);
      setMedInput("");
    }
  };

  const addContact = () => {
    if (contactName.trim() && contactPhone.trim()) {
      setContacts([...contacts, { name: contactName, phone: contactPhone, relationship: contactRelation }]);
      setContactName("");
      setContactPhone("");
      setContactRelation("");
      setShowContactForm(false);
    }
  };

  const removeContact = (i: number) => setContacts(contacts.filter((_, idx) => idx !== i));

  const handleSave = () => {
    if (!fullName.trim() || !bloodGroup || contacts.length === 0) return;

    const profile = {
      fullName, bloodGroup, dob, insurance, organDonor,
      allergies, medications, contacts,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("safescan_profile", JSON.stringify(profile));
    navigate("/qr");
  };

  const isValid = fullName.trim() && bloodGroup && contacts.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emergency/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-xl font-bold">Emergency Profile</h1>
        </motion.div>

        <p className="text-muted-foreground text-sm mb-8">
          This information will be visible when your QR code is scanned.
        </p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
          {/* Basic Information */}
          <section className="glass-card space-y-5">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-emergency" /> Basic Information
            </h2>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Full Name *</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="bg-secondary/50 border-border" />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Blood Group *</label>
              <Select value={bloodGroup} onValueChange={setBloodGroup}>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((bg) => (
                    <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Date of Birth</label>
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="bg-secondary/50 border-border" />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Insurance Info</label>
              <Input value={insurance} onChange={(e) => setInsurance(e.target.value)} placeholder="Insurance provider / ID" className="bg-secondary/50 border-border" />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-emergency" /> Organ Donor
              </label>
              <Switch checked={organDonor} onCheckedChange={setOrganDonor} />
            </div>
          </section>

          {/* Medical Alerts */}
          <section className="glass-card space-y-5">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emergency" /> Medical Alerts
            </h2>

            {/* Allergies */}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Allergies</label>
              <div className="flex gap-2">
                <Input value={allergyInput} onChange={(e) => setAllergyInput(e.target.value)} placeholder="Add allergy" className="bg-secondary/50 border-border"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAllergy())} />
                <Button type="button" size="icon" variant="outline" onClick={addAllergy}><Plus className="w-4 h-4" /></Button>
              </div>
              {allergies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {allergies.map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/15 text-destructive text-xs font-medium">
                      {a} <button onClick={() => setAllergies(allergies.filter((_, idx) => idx !== i))}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Medications */}
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Medications</label>
              <div className="flex gap-2">
                <Input value={medInput} onChange={(e) => setMedInput(e.target.value)} placeholder="Add medication" className="bg-secondary/50 border-border"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addMedication())} />
                <Button type="button" size="icon" variant="outline" onClick={addMedication}><Plus className="w-4 h-4" /></Button>
              </div>
              {medications.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {medications.map((m, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium">
                      <Pill className="w-3 h-3" /> {m} <button onClick={() => setMedications(medications.filter((_, idx) => idx !== i))}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="glass-card space-y-5">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-emergency" /> Emergency Contacts *
            </h2>

            {contacts.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border">
                <div>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.phone} {c.relationship && `· ${c.relationship}`}</p>
                </div>
                <button onClick={() => removeContact(i)} className="p-1 hover:bg-destructive/20 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}

            {showContactForm ? (
              <div className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border">
                <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Contact name" className="bg-secondary/50 border-border" />
                <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Phone number" className="bg-secondary/50 border-border" />
                <Input value={contactRelation} onChange={(e) => setContactRelation(e.target.value)} placeholder="Relationship (optional)" className="bg-secondary/50 border-border" />
                <div className="flex gap-2">
                  <Button onClick={addContact} size="sm" className="bg-emergency hover:bg-emergency-glow text-primary-foreground">Add</Button>
                  <Button onClick={() => setShowContactForm(false)} size="sm" variant="outline">Cancel</Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setShowContactForm(true)} variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> Add Contact
              </Button>
            )}
          </section>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!isValid}
            className="w-full h-14 bg-emergency hover:bg-emergency-glow text-primary-foreground font-display text-base glow-red disabled:opacity-40 disabled:glow-none"
          >
            Save & Generate QR Code
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileForm;
