import { siGoogle, siInstagram, siMeta, siWhatsapp } from "simple-icons";
import { Linkedin, Mail } from "lucide-react";

const icons = {
  WhatsApp: siWhatsapp,
  Meta: siMeta,
  Google: siGoogle,
  Instagram: siInstagram,
} as const;

export function BrandIcon({ name, className = "size-5" }: { name: string; className?: string }) {
  if (name === "Email") return <Mail className={className} strokeWidth={1.7} aria-hidden />;
  if (name === "LinkedIn") return <Linkedin className={className} strokeWidth={1.7} aria-hidden />;
  const icon = icons[name as keyof typeof icons];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}
