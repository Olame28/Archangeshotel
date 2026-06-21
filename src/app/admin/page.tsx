"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  LogOut,
  BedDouble,
  UtensilsCrossed,
  Megaphone,
  Camera,
  Sailboat,
  Search,
  Settings,
  Printer,
  Send,
  Plus,
  DollarSign,
  ChevronRight,
  Reply,
  ShieldCheck,
  Trash2,
  Download,
  BarChart3,
  CreditCard,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

type Reservation = {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  status: string;
  guests: number;
  message: string;
  createdAt: string;
  repliedAt?: string;
  room?: { name: string };
  hall?: { name: string };
};

type Room = { id: number; name: string; price: number; type: string };
type Hall = { id: number; name: string; price: number; capacity: number };

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("reservations");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  
  // Modal states
  const [replyModal, setReplyModal] = useState<{ open: boolean; res?: Reservation }>({ open: false });
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; res?: Reservation }>({ open: false });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        loadData();
      } else alert("Accès refusé");
    } catch (err) { alert("Erreur de connexion"); }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [resRes, settingsRes] = await Promise.all([
        fetch("/api/admin/reservations"),
        fetch("/api/admin/settings")
      ]);
      const resData = await resRes.json();
      const settingsData = await settingsRes.json();
      
      if (resData.success) setReservations(resData.reservations);
      if (settingsData.success) {
        setRooms(settingsData.rooms);
        setHalls(settingsData.halls);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) loadData();
    } catch (err) { alert("Erreur de mise à jour"); }
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.")) return;
    try {
      const res = await fetch(`/api/admin/reservations?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) loadData();
      else alert("Erreur de suppression");
    } catch (err) { alert("Erreur de suppression"); }
  };

  const updatePrice = async (type: "room" | "hall", id: number, newPrice: string) => {
    const price = parseFloat(newPrice);
    if (isNaN(price)) return;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify({ type, id, price }),
      });
      if (res.ok) loadData();
    } catch (err) { alert("Erreur prix"); }
  };

  const handleSendReply = async () => {
    if (!replyModal.res || !replyMessage) return;
    setSendingReply(true);
    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        body: JSON.stringify({
          reservationId: replyModal.res.id,
          to: replyModal.res.email,
          subject: `Votre réservation chez Archanges Hôtel`,
          message: replyMessage
        }),
      });
      if (res.ok) {
        setReplyModal({ open: false });
        setReplyMessage("");
        loadData();
        alert("Réponse envoyée !");
      }
    } catch (err) { alert("Erreur envoi"); }
    finally { setSendingReply(false); }
  };

  const handlePrint = () => {
    window.print();
  };

  const exportCSV = () => {
    const headers = ["ID", "Type", "Nom", "Prénom", "Email", "Téléphone", "Pays", "Nationalité", "Statut", "Date création", "Check-in", "Check-out", "Personnes", "Message"];
    const rows = filteredReservations.map(r => [
      r.id,
      r.type,
      r.lastName,
      r.firstName,
      r.email,
      r.phone,
      r.countryOfOrigin || "",
      r.nationality || "",
      r.status,
      new Date(r.createdAt).toLocaleDateString("fr-FR"),
      new Date(r.checkin).toLocaleDateString("fr-FR"),
      new Date(r.checkout).toLocaleDateString("fr-FR"),
      r.guests,
      (r.message || "").replace(/,/g, " ").replace(/\n/g, " "),
    ]);
    const csvContent = [headers.join(","), ...rows.map(row => row.map(cell => `"${cell}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `reservations-archanges-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const filteredReservations = reservations.filter(res => {
    const matchesFilter = filter === "all" || res.type === filter;
    const matchesStatus = statusFilter === "all" || res.status === statusFilter;
    const searchStr = `${res.firstName} ${res.lastName} ${res.email}`.toLowerCase();
    const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
    
    let matchesDateRange = true;
    if (dateFrom) {
      matchesDateRange = matchesDateRange && new Date(res.createdAt) >= new Date(dateFrom);
    }
    if (dateTo) {
      matchesDateRange = matchesDateRange && new Date(res.createdAt) <= new Date(dateTo + 'T23:59:59');
    }
    
    return matchesFilter && matchesStatus && matchesSearch && matchesDateRange;
  });

  // Statistiques
  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === "PENDING").length,
    confirmed: reservations.filter(r => r.status === "CONFIRMED").length,
    cancelled: reservations.filter(r => r.status === "CANCELLED").length,
    byType: {
      room: reservations.filter(r => r.type === "room").length,
      restaurant: reservations.filter(r => r.type === "restaurant").length,
      event: reservations.filter(r => r.type === "event").length,
      photoshoot: reservations.filter(r => r.type === "photoshoot").length,
      excursion: reservations.filter(r => r.type === "excursion").length,
    },
    thisMonth: reservations.filter(r => {
      const date = new Date(r.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060f1b] px-4 font-sans">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md rounded-[2rem] bg-white p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-gold-light to-gold" />
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy text-gold shadow-xl">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-navy">Direction</h1>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">Accès Privilégié</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-navy/40 ml-1">Clé d'accès</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 p-5 text-navy focus:border-gold focus:outline-none transition-all shadow-inner" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full rounded-2xl bg-navy py-5 font-bold text-gold shadow-lg transition-all hover:bg-navy-light hover:shadow-gold/20 active:scale-[0.98]">
              DÉVERROUILLER
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-navy font-sans selection:bg-gold/30">
      {/* Sidebar de navigation */}
      <aside className="fixed left-0 top-0 hidden h-full w-72 flex-col border-r border-navy/5 bg-white p-8 lg:flex print:hidden">
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold shadow-lg">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold leading-none">Archanges</h2>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gold">Dashboard v2.0</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: "reservations", label: "Réservations", icon: Calendar },
            { id: "pricing", label: "Tarifs & Offres", icon: DollarSign },
            { id: "analytics", label: "Rapports", icon: Printer },
            { id: "settings", label: "Paramètres", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all ${
                activeTab === item.id ? "bg-navy text-gold shadow-xl shadow-navy/10" : "text-navy/50 hover:bg-navy/5"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              {activeTab === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </nav>

        <button onClick={() => setIsAuthenticated(false)} className="mt-auto flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold text-red-600 transition hover:bg-red-50">
          <LogOut className="h-5 w-5" /> Quitter
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="lg:ml-72 min-h-screen p-4 sm:p-8 lg:p-12">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 print:hidden">
          <div>
            <h1 className="font-serif text-4xl font-bold text-navy">
              {activeTab === "reservations" ? "Gestion des Réservations" : activeTab === "pricing" ? "Gestion des Tarifs" : "Rapports & Statistiques"}
            </h1>
            <p className="mt-2 text-navy/40 font-medium uppercase tracking-widest text-[10px]">Archanges Hôtel — Minova, RDC</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 rounded-2xl border border-navy/10 bg-white px-6 py-3 text-sm font-bold shadow-sm transition hover:bg-navy hover:text-white">
              <Printer className="h-4 w-4" /> Imprimer
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 rounded-2xl border border-navy/10 bg-white px-6 py-3 text-sm font-bold shadow-sm transition hover:bg-navy hover:text-white">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button onClick={loadData} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy shadow-lg transition hover:bg-gold-light active:scale-95">
              <Clock className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {activeTab === "reservations" && (
          <div className="space-y-8">
            {/* Statistiques */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-6 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold/80">Total</p>
                <p className="mt-2 font-serif text-4xl font-bold">{stats.total}</p>
                <p className="mt-1 text-xs text-white/60">Réservations</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">En attente</p>
                <p className="mt-2 font-serif text-4xl font-bold">{stats.pending}</p>
                <p className="mt-1 text-xs text-white/60">À traiter</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Confirmées</p>
                <p className="mt-2 font-serif text-4xl font-bold">{stats.confirmed}</p>
                <p className="mt-1 text-xs text-white/60">Validées</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-6 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Annulées</p>
                <p className="mt-2 font-serif text-4xl font-bold">{stats.cancelled}</p>
                <p className="mt-1 text-xs text-white/60">Refusées</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Ce mois</p>
                <p className="mt-2 font-serif text-4xl font-bold">{stats.thisMonth}</p>
                <p className="mt-1 text-xs text-white/60">Nouvelles</p>
              </div>
            </div>

            {/* Répartition par type */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-navy mb-4">Répartition par type</h3>
              <div className="grid gap-3 sm:grid-cols-5">
                {[
                  { label: "Chambres", count: stats.byType.room, icon: BedDouble, color: "bg-blue-50 text-blue-600" },
                  { label: "Restaurant", count: stats.byType.restaurant, icon: UtensilsCrossed, color: "bg-orange-50 text-orange-600" },
                  { label: "Salles", count: stats.byType.event, icon: Megaphone, color: "bg-purple-50 text-purple-600" },
                  { label: "Shoot", count: stats.byType.photoshoot, icon: Camera, color: "bg-pink-50 text-pink-600" },
                  { label: "Excursion", count: stats.byType.excursion, icon: Sailboat, color: "bg-cyan-50 text-cyan-600" },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-3 rounded-xl p-3 ${item.color}`}>
                    <item.icon className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="text-lg font-bold">{item.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtres Pro */}
            <div className="flex flex-wrap items-center gap-4 print:hidden">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/20" />
                <input type="text" placeholder="Rechercher par nom, email ou ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-2xl border-2 border-navy/5 bg-white py-4 pl-14 pr-6 text-sm font-medium focus:border-gold focus:outline-none shadow-sm transition-all" />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm border border-navy/5">
                {["all", "room", "restaurant", "event", "photoshoot", "excursion"].map((t) => (
                  <button key={t} onClick={() => setFilter(t)} className={`rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${filter === t ? "bg-navy text-gold shadow-md" : "text-navy/40 hover:bg-navy/5"}`}>
                    {t === "all" ? "Tout" : t === "room" ? "Chambres" : t === "restaurant" ? "Tables" : t === "event" ? "Salles" : t === "photoshoot" ? "Shoot" : "Excursion"}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Filtres avancés */}
            <div className="flex flex-wrap items-center gap-4 print:hidden">
              <div className="flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm border border-navy/5">
                {["all", "PENDING", "CONFIRMED", "CANCELLED"].map((s) => (
                  <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${statusFilter === s ? "bg-navy text-gold shadow-md" : "text-navy/40 hover:bg-navy/5"}`}>
                    {s === "all" ? "Tous statuts" : s === "PENDING" ? "En attente" : s === "CONFIRMED" ? "Confirmés" : "Annulés"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-xl border-2 border-navy/5 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none" />
                <span className="text-navy/30">→</span>
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-xl border-2 border-navy/5 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none" />
                {(dateFrom || dateTo) && (
                  <button onClick={() => { setDateFrom(""); setDateTo(""); }} className="text-xs text-red-600 hover:text-red-700 font-bold">Effacer</button>
                )}
              </div>
            </div>

            {/* Liste des Réservations */}
            <div className="grid gap-6">
              <AnimatePresence mode="popLayout">
                {filteredReservations.map((res) => (
                  <motion.div key={res.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={() => setDetailsModal({ open: true, res })} className="group relative overflow-hidden rounded-[2rem] border border-navy/5 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-gold/20 cursor-pointer">
                    <div className="absolute top-0 right-0 p-6 print:hidden">
                      <div className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm ${
                        res.status === "CONFIRMED" ? "bg-emerald-500 text-white" : res.status === "CANCELLED" ? "bg-red-500 text-white" : "bg-gold text-navy"
                      }`}>
                        {res.status === "PENDING" ? "À traiter" : res.status === "CONFIRMED" ? "Confirmé" : "Annulé"}
                      </div>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
                      <div className="space-y-6">
                        <div className="flex items-start gap-5">
                          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-inner ${
                            res.type === 'room' ? 'bg-blue-50 text-blue-600' : res.type === 'event' ? 'bg-purple-50 text-purple-600' : res.type === 'excursion' ? 'bg-cyan-50 text-cyan-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {res.type === 'room' ? <BedDouble className="h-8 w-8" /> : res.type === 'event' ? <Megaphone className="h-8 w-8" /> : res.type === 'excursion' ? <Sailboat className="h-8 w-8" /> : <UtensilsCrossed className="h-8 w-8" />}
                          </div>
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-navy">{res.firstName} {res.lastName}</h3>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm font-medium text-navy/40">
                              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {res.email}</span>
                              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {res.phone}</span>
                              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Reçu le {new Date(res.createdAt).toLocaleDateString("fr-FR")}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-6 rounded-3xl bg-cream/30 p-6 sm:grid-cols-3">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-navy/30">Service</p>
                            <p className="text-sm font-bold text-navy">{res.type === "room" ? res.room?.name : res.type === "event" ? res.hall?.name : res.type === "restaurant" ? "Restaurant" : res.type === "excursion" ? "Excursion Lac Kivu" : "Shooting"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-navy/30">Dates</p>
                            <p className="text-sm font-bold text-navy">{new Date(res.checkin).toLocaleDateString()} → {new Date(res.checkout).toLocaleDateString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-navy/30">Convives</p>
                            <p className="text-sm font-bold text-navy">{res.guests} Personne{res.guests > 1 ? 's' : ''}</p>
                          </div>
                        </div>

                        {res.message && (
                          <div className="relative rounded-2xl border-l-4 border-gold bg-navy/[0.02] p-5">
                            <p className="text-sm leading-relaxed text-navy/70 italic">"{res.message}"</p>
                          </div>
                        )}
                        
                        {res.repliedAt && (
                          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full">
                            <CheckCircle2 className="h-3 w-3" /> Répondu le {new Date(res.repliedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col justify-center gap-3 print:hidden">
                        <button onClick={(e) => { e.stopPropagation(); setReplyModal({ open: true, res }); setReplyMessage(""); }} className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-navy px-8 text-sm font-bold text-gold shadow-lg transition hover:bg-navy-light active:scale-95">
                          <Reply className="h-4 w-4" /> Répondre
                        </button>
                        <div className="flex gap-2">
                          <button onClick={(e) => { e.stopPropagation(); updateReservationStatus(res.id, "CONFIRMED"); }} className="flex-1 flex h-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold transition hover:bg-emerald-500 hover:text-white border border-emerald-100">
                            CONFIRMER
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); updateReservationStatus(res.id, "CANCELLED"); }} className="flex-1 flex h-12 items-center justify-center rounded-2xl bg-red-50 text-red-700 text-xs font-bold transition hover:bg-red-500 hover:text-white border border-red-100">
                            ANNULER
                          </button>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); deleteReservation(res.id); }} className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-red-100 text-red-600 text-xs font-bold transition hover:bg-red-200 border border-red-200">
                          <Trash2 className="h-3 w-3" /> Supprimer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="grid gap-12 lg:grid-cols-2">
            <section className="space-y-6">
              <h3 className="font-serif text-2xl font-bold flex items-center gap-3">
                <BedDouble className="text-gold" /> Tarifs Chambres
              </h3>
              <div className="grid gap-4">
                {rooms.map(room => (
                  <div key={room.id} className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm border border-navy/5">
                    <div>
                      <p className="text-sm font-bold">{room.name}</p>
                      <p className="text-[10px] text-navy/40 font-medium uppercase tracking-widest">Prix par nuit</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-navy/30">$</span>
                      <input type="number" defaultValue={room.price} onBlur={(e) => updatePrice("room", room.id, e.target.value)} className="w-24 rounded-xl bg-cream/30 p-2 text-right font-serif text-lg font-bold text-navy focus:bg-gold/10 focus:outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="space-y-6">
              <h3 className="font-serif text-2xl font-bold flex items-center gap-3">
                <Megaphone className="text-gold" /> Tarifs Salles
              </h3>
              <div className="grid gap-4">
                {halls.map(hall => (
                  <div key={hall.id} className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm border border-navy/5">
                    <div>
                      <p className="text-sm font-bold">{hall.name}</p>
                      <p className="text-[10px] text-navy/40 font-medium uppercase tracking-widest">Location journalière</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-navy/30">$</span>
                      <input type="number" defaultValue={hall.price} onBlur={(e) => updatePrice("hall", hall.id, e.target.value)} className="w-24 rounded-xl bg-cream/30 p-2 text-right font-serif text-lg font-bold text-navy focus:bg-gold/10 focus:outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl bg-gradient-to-br from-navy to-navy-light p-6 text-white shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold/80">Revenus estimés</p>
                <p className="mt-3 font-serif text-3xl font-bold">
                  ${reservations.filter(r => r.status === "CONFIRMED").reduce((sum, r) => {
                    if (r.type === "room" && r.room) return sum + (r.room.price * Math.ceil((new Date(r.checkout).getTime() - new Date(r.checkin).getTime()) / (1000 * 60 * 60 * 24)));
                    if (r.type === "event" && r.hall) return sum + r.hall.price;
                    return sum;
                  }, 0).toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-white/60">Réservations confirmées</p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Taux de confirmation</p>
                <p className="mt-3 font-serif text-3xl font-bold">
                  {reservations.length > 0 ? Math.round((reservations.filter(r => r.status === "CONFIRMED").length / reservations.length) * 100) : 0}%
                </p>
                <p className="mt-2 text-xs text-white/60">Sur total réservations</p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-gold to-gold-muted p-6 text-navy shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-navy/60">Meilleur mois</p>
                <p className="mt-3 font-serif text-3xl font-bold">
                  {(() => {
                    const monthCounts: Record<string, number> = {};
                    reservations.forEach(r => {
                      const month = new Date(r.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
                      monthCounts[month] = (monthCounts[month] || 0) + 1;
                    });
                    const bestMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0];
                    return bestMonth ? bestMonth[0].charAt(0).toUpperCase() + bestMonth[0].slice(1) : "-";
                  })()}
                </p>
                <p className="mt-2 text-xs text-navy/60">Plus de réservations</p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Durée moyenne</p>
                <p className="mt-3 font-serif text-3xl font-bold">
                  {(() => {
                    const roomRes = reservations.filter(r => r.type === "room");
                    if (roomRes.length === 0) return "-";
                    const totalNights = roomRes.reduce((sum, r) => sum + Math.ceil((new Date(r.checkout).getTime() - new Date(r.checkin).getTime()) / (1000 * 60 * 60 * 24)), 0);
                    return (totalNights / roomRes.length).toFixed(1);
                  })()} nuits
                </p>
                <p className="mt-2 text-xs text-white/60">Pour les chambres</p>
              </div>
            </div>

            <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-navy mb-6">Performance par type</h3>
              <div className="space-y-4">
                {[
                  { label: "Chambres", count: stats.byType.room, confirmed: reservations.filter(r => r.type === "room" && r.status === "CONFIRMED").length, color: "bg-blue-500" },
                  { label: "Restaurant", count: stats.byType.restaurant, confirmed: reservations.filter(r => r.type === "restaurant" && r.status === "CONFIRMED").length, color: "bg-orange-500" },
                  { label: "Salles", count: stats.byType.event, confirmed: reservations.filter(r => r.type === "event" && r.status === "CONFIRMED").length, color: "bg-purple-500" },
                  { label: "Shoot", count: stats.byType.photoshoot, confirmed: reservations.filter(r => r.type === "photoshoot" && r.status === "CONFIRMED").length, color: "bg-pink-500" },
                  { label: "Excursion", count: stats.byType.excursion, confirmed: reservations.filter(r => r.type === "excursion" && r.status === "CONFIRMED").length, color: "bg-cyan-500" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-navy">{item.label}</span>
                      <span className="text-navy/60">{item.confirmed}/{item.count} confirmées</span>
                    </div>
                    <div className="h-3 rounded-full bg-navy/5 overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-500`}
                        style={{ width: item.count > 0 ? `${(item.confirmed / item.count) * 100}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-navy mb-6">Informations de l'hôtel</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Nom de l'hôtel</label>
                  <input type="text" defaultValue="Archanges Hôtel" className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 px-5 py-4 text-sm font-medium focus:border-gold focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Email de contact</label>
                  <input type="email" defaultValue="reservations@archangeshotel.com" className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 px-5 py-4 text-sm font-medium focus:border-gold focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Téléphone principal</label>
                  <input type="tel" defaultValue="+243 997 721 582" className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 px-5 py-4 text-sm font-medium focus:border-gold focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Téléphone secondaire</label>
                  <input type="tel" defaultValue="+243 991 570 543" className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 px-5 py-4 text-sm font-medium focus:border-gold focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-navy mb-6">Configuration SMTP</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/40">SMTP Host</label>
                  <input type="text" defaultValue="smtp.zoho.com" className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 px-5 py-4 text-sm font-medium focus:border-gold focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/40">SMTP Port</label>
                  <input type="number" defaultValue="465" className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 px-5 py-4 text-sm font-medium focus:border-gold focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/40">SMTP User</label>
                  <input type="email" className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 px-5 py-4 text-sm font-medium focus:border-gold focus:outline-none" placeholder="Configurez dans .env" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/40">Mot de passe admin</label>
                  <input type="password" className="w-full rounded-2xl border-2 border-navy/5 bg-cream/30 px-5 py-4 text-sm font-medium focus:border-gold focus:outline-none" placeholder="Configurez dans .env" />
                </div>
              </div>
              <p className="mt-4 text-xs text-navy/40">Ces paramètres doivent être configurés dans les variables d'environnement (.env.local)</p>
            </div>

            <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-navy mb-6">Actions système</h3>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-2xl bg-navy px-6 py-3 text-sm font-bold text-gold shadow-lg transition hover:bg-navy-light">
                  Vider le cache
                </button>
                <button className="rounded-2xl border-2 border-navy/10 bg-white px-6 py-3 text-sm font-bold text-navy shadow-sm transition hover:bg-navy hover:text-white">
                  Régénérer la base de données
                </button>
                <button className="rounded-2xl border-2 border-red-200 bg-red-50 px-6 py-3 text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-100">
                  Réinitialiser tout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Réponse Pro */}
      <AnimatePresence>
        {replyModal.open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setReplyModal({ open: false })} className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-2xl rounded-[2.5rem] bg-white p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-navy">Répondre à {replyModal.res?.firstName}</h2>
                  <p className="text-xs font-bold text-gold uppercase tracking-widest mt-1">Email : {replyModal.res?.email}</p>
                </div>
                <button onClick={() => setReplyModal({ open: false })} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-navy/5 transition"><XCircle className="h-6 w-6 text-navy/20" /></button>
              </div>

              <div className="space-y-6">
                <textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} className="min-h-[250px] w-full rounded-[1.5rem] border-2 border-navy/5 bg-cream/20 p-6 text-sm leading-relaxed text-navy focus:border-gold focus:outline-none transition-all shadow-inner" placeholder="Rédigez votre réponse ici..." />
                
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Templates de réponse</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setReplyMessage(`Cher(e) ${replyModal.res?.firstName},\n\nNous avons le plaisir de vous confirmer la disponibilité pour votre séjour aux dates demandées.\n\nDans l'attente de vous accueillir,\n\nLa Direction.`)} className="flex h-12 px-5 items-center justify-center rounded-2xl bg-gold/10 text-gold text-xs font-bold hover:bg-gold/20 transition uppercase tracking-widest">Modèle standard</button>
                    <button onClick={() => setReplyMessage(`Cher(e) ${replyModal.res?.firstName},\n\nNous avons le plaisir de vous confirmer votre réservation aux Archanges Hôtel.\n\n📋 DÉTAILS DE LA RÉSERVATION\n• Service : ${replyModal.res?.type === 'room' ? replyModal.res?.room?.name : replyModal.res?.type === 'event' ? replyModal.res?.hall?.name : replyModal.res?.type === 'excursion' ? 'Excursion Lac Kivu' : replyModal.res?.type}\n• Dates : du ${new Date(replyModal.res?.checkin || '').toLocaleDateString('fr-FR')} au ${new Date(replyModal.res?.checkout || '').toLocaleDateString('fr-FR')}\n• Personnes : ${replyModal.res?.guests}\n\n💳 OPTIONS DE PAIEMENT\nPour finaliser votre réservation, vous pouvez régler :\n\n✅ ESPÈCES : À l'accueil de l'hôtel\n✅ VISA / MASTERCARD : Sur place ou en ligne\n✅ MOBILE MONEY :\n   • Airtel Money : +243 997 721 582\n   • M-Pesa : +243 991 570 543\n   • Orange Money : +243 997 721 582\n\nPour tout paiement en ligne, veuillez nous contacter pour recevoir le lien sécurisé.\n\nDans l'attente de vous accueillir,\n\nLa Direction\nArchanges Hôtel\nMinova, Sud-Kivu, RDC\n📞 +243 997 721 582`)} className="flex h-12 px-5 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition uppercase tracking-widest border border-emerald-200">Confirmation + Paiement</button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={handleSendReply} disabled={sendingReply} className="flex-1 flex h-14 items-center justify-center gap-3 rounded-2xl bg-navy font-bold text-gold shadow-xl transition hover:bg-navy-light disabled:opacity-50">
                    {sendingReply ? <Clock className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    ENVOYER LA RÉPONSE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Détails Réservation */}
      <AnimatePresence>
        {detailsModal.open && detailsModal.res && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetailsModal({ open: false })} className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-white p-8 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-navy">Détails de la réservation</h2>
                  <p className="text-xs font-bold text-gold uppercase tracking-widest mt-1">ID : {detailsModal.res.id}</p>
                </div>
                <button onClick={() => setDetailsModal({ open: false })} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-navy/5 transition"><XCircle className="h-6 w-6 text-navy/20" /></button>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Informations client */}
                <div className="space-y-4 rounded-3xl bg-cream/30 p-6">
                  <h3 className="font-serif text-lg font-bold text-navy flex items-center gap-2"><User className="h-5 w-5 text-gold" /> Client</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-navy/40">Nom</span><span className="font-bold text-navy">{detailsModal.res.firstName} {detailsModal.res.lastName}</span></div>
                    <div className="flex justify-between"><span className="text-navy/40">Email</span><span className="font-bold text-navy">{detailsModal.res.email}</span></div>
                    <div className="flex justify-between"><span className="text-navy/40">Téléphone</span><span className="font-bold text-navy">{detailsModal.res.phone}</span></div>
                    {detailsModal.res.countryOfOrigin && <div className="flex justify-between"><span className="text-navy/40">Pays d'origine</span><span className="font-bold text-navy">{detailsModal.res.countryOfOrigin}</span></div>}
                    {detailsModal.res.nationality && <div className="flex justify-between"><span className="text-navy/40">Nationalité</span><span className="font-bold text-navy">{detailsModal.res.nationality}</span></div>}
                    {detailsModal.res.idDocument && <div className="flex justify-between"><span className="text-navy/40">Document ID</span><span className="font-bold text-navy">{detailsModal.res.idDocument}</span></div>}
                    {detailsModal.res.cityOfProvenance && <div className="flex justify-between"><span className="text-navy/40">Ville</span><span className="font-bold text-navy">{detailsModal.res.cityOfProvenance}</span></div>}
                  </div>
                </div>

                {/* Informations réservation */}
                <div className="space-y-4 rounded-3xl bg-cream/30 p-6">
                  <h3 className="font-serif text-lg font-bold text-navy flex items-center gap-2"><Calendar className="h-5 w-5 text-gold" /> Réservation</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-navy/40">Type</span><span className="font-bold text-navy uppercase">{detailsModal.res.type}</span></div>
                    <div className="flex justify-between"><span className="text-navy/40">Service</span><span className="font-bold text-navy">{detailsModal.res.type === "room" ? detailsModal.res.room?.name : detailsModal.res.type === "event" ? detailsModal.res.hall?.name : detailsModal.res.type === "excursion" ? "Excursion Lac Kivu" : detailsModal.res.type}</span></div>
                    <div className="flex justify-between"><span className="text-navy/40">Check-in</span><span className="font-bold text-navy">{new Date(detailsModal.res.checkin).toLocaleDateString("fr-FR")}</span></div>
                    <div className="flex justify-between"><span className="text-navy/40">Check-out</span><span className="font-bold text-navy">{new Date(detailsModal.res.checkout).toLocaleDateString("fr-FR")}</span></div>
                    <div className="flex justify-between"><span className="text-navy/40">Personnes</span><span className="font-bold text-navy">{detailsModal.res.guests}</span></div>
                    {detailsModal.res.stayPurpose && <div className="flex justify-between"><span className="text-navy/40">Motif</span><span className="font-bold text-navy">{detailsModal.res.stayPurpose}</span></div>}
                    <div className="flex justify-between"><span className="text-navy/40">Statut</span><span className={`font-bold ${detailsModal.res.status === "CONFIRMED" ? "text-emerald-600" : detailsModal.res.status === "CANCELLED" ? "text-red-600" : "text-gold"}`}>{detailsModal.res.status}</span></div>
                  </div>
                </div>

                {/* Paiement */}
                <div className="space-y-4 rounded-3xl bg-cream/30 p-6">
                  <h3 className="font-serif text-lg font-bold text-navy flex items-center gap-2"><CreditCard className="h-5 w-5 text-gold" /> Paiement</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-navy/40">Mode</span><span className="font-bold text-navy uppercase">{detailsModal.res.paymentMode}</span></div>
                    {detailsModal.res.companyName && <div className="flex justify-between"><span className="text-navy/40">Entreprise</span><span className="font-bold text-navy">{detailsModal.res.companyName}</span></div>}
                    {detailsModal.res.companyContact && <div className="flex justify-between"><span className="text-navy/40">Contact entreprise</span><span className="font-bold text-navy">{detailsModal.res.companyContact}</span></div>}
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 rounded-3xl bg-cream/30 p-6">
                  <h3 className="font-serif text-lg font-bold text-navy flex items-center gap-2"><MessageSquare className="h-5 w-5 text-gold" /> Communications</h3>
                  <div className="space-y-3 text-sm">
                    {detailsModal.res.message && (
                      <div>
                        <span className="text-navy/40 block mb-1">Message client</span>
                        <p className="text-navy italic">"{detailsModal.res.message}"</p>
                      </div>
                    )}
                    {detailsModal.res.adminNotes && (
                      <div>
                        <span className="text-navy/40 block mb-1">Notes admin</span>
                        <p className="text-navy">{detailsModal.res.adminNotes}</p>
                      </div>
                    )}
                    {detailsModal.res.repliedAt && (
                      <div className="flex justify-between"><span className="text-navy/40">Répondu le</span><span className="font-bold text-navy">{new Date(detailsModal.res.repliedAt).toLocaleDateString("fr-FR")}</span></div>
                    )}
                    <div className="flex justify-between"><span className="text-navy/40">Reçu le</span><span className="font-bold text-navy">{new Date(detailsModal.res.createdAt).toLocaleDateString("fr-FR")}</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button onClick={() => { setDetailsModal({ open: false }); setReplyModal({ open: true, res: detailsModal.res }); setReplyMessage(""); }} className="flex-1 flex h-12 items-center justify-center gap-3 rounded-2xl bg-navy font-bold text-gold shadow-xl transition hover:bg-navy-light">
                  <Reply className="h-4 w-4" /> Répondre
                </button>
                <button onClick={() => setDetailsModal({ open: false })} className="flex-1 h-12 items-center justify-center rounded-2xl border-2 border-navy/10 font-bold text-navy transition hover:bg-navy hover:text-white">
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          main { margin: 0 !important; padding: 20px !important; }
          aside { display: none !important; }
          header { display: none !important; }
          .print-hidden { display: none !important; }
          .rounded-[2rem] { border-radius: 0 !important; border: 1px solid #ddd !important; box-shadow: none !important; }
          .rounded-3xl { border-radius: 0 !important; border: 1px solid #ddd !important; box-shadow: none !important; }
          .rounded-2xl { border-radius: 0 !important; border: 1px solid #ddd !important; box-shadow: none !important; }
          .bg-cream/30 { background: #f9f9f9 !important; }
          .bg-gradient-to-br { background: #f9f9f9 !important; }
          .text-gold { color: #333 !important; }
          .text-navy { color: #000 !important; }
          .shadow-lg, .shadow-sm, .shadow-xl { box-shadow: none !important; }
          .group:hover { transform: none !important; }
          button { display: none !important; }
        }
        
        @page {
          size: A4;
          margin: 20mm;
        }
      `}</style>
    </div>
  );
}
