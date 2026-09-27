import {
  Building2,
  Code2,
  CreditCard,
  Globe2,
  Layers,
  MapPin,
  Radio,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  layers: Layers,
  smartphone: Smartphone,
  "map-pin": MapPin,
  "credit-card": CreditCard,
  radio: Radio,
  "shield-check": ShieldCheck,
  code: Code2,
  building: Building2,
  globe: Globe2,
};

type Props = {
  name: string;
  className?: string;
};

export function ServiceIcon({ name, className = "h-6 w-6" }: Props) {
  const Icon = ICON_MAP[name] ?? Layers;
  return <Icon className={className} aria-hidden />;
}
