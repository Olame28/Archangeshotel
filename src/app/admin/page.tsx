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
  Search,
  Settings,
  Printer,
  Send,
  Plus,
  DollarSign,
  ChevronRight,
  Reply,
  ShieldCheck
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
  
  // Modal states
  const [replyModal, setReplyModal] = useState<{ open: boolean; res?: Reservation }>({ open: false });
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

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

  const filteredReservations = reservations.filter(res => {
    const matchesFilter = filter === "all" || res.type === filter;
    const searchStr = `${res.firstName} ${res.lastName} ${res.email}`.toLowerCase();
    return matchesFilter && searchStr.includes(searchTerm.toLowerCase());
  });

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
            <button onClick={loadData} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy shadow-lg transition hover:bg-gold-light active:scale-95">
              <Clock className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {activeTab === "reservations" && (
          <div className="space-y-8">
            {/* Filtres Pro */}
            <div className="flex flex-wrap items-center gap-4 print:hidden">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/20" />
                <input type="text" placeholder="Rechercher par nom, email ou ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-2xl border-2 border-navy/5 bg-white py-4 pl-14 pr-6 text-sm font-medium focus:border-gold focus:outline-none shadow-sm transition-all" />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm border border-navy/5">
                {["all", "room", "restaurant", "event", "photoshoot"].map((t) => (
                  <button key={t} onClick={() => setFilter(t)} className={`rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${filter === t ? "bg-navy text-gold shadow-md" : "text-navy/40 hover:bg-navy/5"}`}>
                    {t === "all" ? "Tout" : t === "room" ? "Chambres" : t === "restaurant" ? "Tables" : t === "event" ? "Salles" : "Shoot"}
                  </button>
                ))}
              </div>
            </div>

            {/* Liste des Réservations */}
            <div className="grid gap-6">
              <AnimatePresence mode="popLayout">
                {filteredReservations.map((res) => (
                  <motion.div key={res.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group relative overflow-hidden rounded-[2rem] border border-navy/5 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-gold/20">
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
                            res.type === 'room' ? 'bg-blue-50 text-blue-600' : res.type === 'event' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {res.type === 'room' ? <BedDouble className="h-8 w-8" /> : res.type === 'event' ? <Megaphone className="h-8 w-8" /> : <UtensilsCrossed className="h-8 w-8" />}
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
                            <p className="text-sm font-bold text-navy">{res.type === "room" ? res.room?.name : res.type === "event" ? res.hall?.name : res.type === "restaurant" ? "Restaurant" : "Shooting"}</p>
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
                        <button onClick={() => { setReplyModal({ open: true, res }); setReplyMessage(""); }} className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-navy px-8 text-sm font-bold text-gold shadow-lg transition hover:bg-navy-light active:scale-95">
                          <Reply className="h-4 w-4" /> Répondre
                        </button>
                        <div className="flex gap-2">
                          <button onClick={() => updateReservationStatus(res.id, "CONFIRMED")} className="flex-1 flex h-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold transition hover:bg-emerald-500 hover:text-white border border-emerald-100">
                            CONFIRMER
                          </button>
                          <button onClick={() => updateReservationStatus(res.id, "CANCELLED")} className="flex-1 flex h-12 items-center justify-center rounded-2xl bg-red-50 text-red-700 text-xs font-bold transition hover:bg-red-500 hover:text-white border border-red-100">
                            ANNULER
                          </button>
                        </div>
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
                <div className="flex items-center gap-4">
                  <button onClick={handleSendReply} disabled={sendingReply} className="flex-1 flex h-14 items-center justify-center gap-3 rounded-2xl bg-navy font-bold text-gold shadow-xl transition hover:bg-navy-light disabled:opacity-50">
                    {sendingReply ? <Clock className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    ENVOYER LA RÉPONSE
                  </button>
                  <button onClick={() => setReplyMessage(`Cher(e) ${replyModal.res?.firstName},\n\nNous avons le plaisir de vous confirmer la disponibilité pour votre séjour aux dates demandées.\n\nDans l'attente de vous accueillir,\n\nLa Direction.`)} className="flex h-14 px-6 items-center justify-center rounded-2xl bg-gold/10 text-gold text-xs font-bold hover:bg-gold/20 transition uppercase tracking-widest">Modèle type</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media print {
          body { background: white; }
          main { margin: 0; padding: 0; }
          .rounded-[2rem] { border-radius: 0; border: none; border-bottom: 1px solid #eee; }
          .bg-cream/30 { background: #f9f9f9; }
        }
      `}</style>
    </div>
  );
}
