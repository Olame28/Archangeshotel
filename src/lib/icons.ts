import type { LucideIcon } from "lucide-react";
import {
  Users, Wifi, Shield, Car, Waves, Zap, Coffee, MapPin, ConciergeBell, Clock, Home, Phone, Mail, Globe, Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Users, Wifi, Shield, Car, Waves, Zap, Coffee, MapPin, ConciergeBell, Clock, Home, Phone, Mail, Globe, Sparkles,
};

export function getServiceIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}
