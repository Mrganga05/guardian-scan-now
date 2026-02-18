import { Shield } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emergency/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emergency" />
            </div>
            <span className="font-display font-bold text-lg">SafeScan</span>
          </div>

          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 SafeScan. No tracking. <span className="text-emergency">Ever.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
