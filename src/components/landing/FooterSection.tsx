import { Shield } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emergency/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emergency" />
              </div>
              <span className="font-display font-bold text-lg">SafeScan</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              When you can't speak, your phone speaks for you.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-safe animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">All systems operational</span>
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Security", "Enterprise"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "HIPAA", "GDPR"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 SafeScan. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            No ads. No tracking. No data selling. <span className="text-emergency">Ever.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
