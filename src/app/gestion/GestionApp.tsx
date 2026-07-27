"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BedDouble, Users, UtensilsCrossed, Calendar, Image as ImageIcon,
  Palette, FileText, LogOut, Lock, CheckCircle2, Plus, Edit2, Trash2, Video,
  Sparkles, RefreshCw, Eye, Save, X, Upload, CreditCard, Type, Globe, ChevronRight,
  XCircle, Zap, GripVertical,
} from "lucide-react";

/* ─── Types ─── */
type ContentItem = { id: string; key: string; value: string; category: string; label?: string };
type Room = { id: number; name: string; type: string; price: number; description?: string; image?: string; amenities?: string; order?: number };
type Hall = { id: number; name: string; capacity: number; price: number; description?: string; image?: string; images?: string; video?: string; features?: string; order?: number };
type MenuItem = { id: string; name: string; description?: string; price: number; category: string; image?: string; icon?: string; featured: boolean; order: number };
type Event = { id: string; title: string; description?: string; date?: string; image?: string; link?: string; isVideo?: boolean; type?: string; featured: boolean; order: number };
type ImageItem = { id: string; filename: string; url: string; category: string; alt?: string; order: number };
type Theme = { id: string; name: string; primaryColor: string; secondaryColor: string; accentColor: string; backgroundColor: string; textColor: string; layoutVariant: string; heroStyle: string; headerStyle: string; cardStyle: string; fontHeading: string; fontBody: string; active: boolean };
type VideoItem = { id: string; title: string; url: string; category: string; thumbnail?: string; order: number };
type Service = { id: number; icon: string; title: string; description: string; order: number };
type PaymentMethod = { id: string; name: string; provider?: string; icon: string; colorFrom: string; colorTo: string; available: boolean; description: string; order: number };

type Tab = "overview" | "textes" | "medias" | "chambres" | "salles" | "restaurant" | "evenements" | "videos" | "services" | "paiements" | "themes";

const TABS: { id: Tab; icon: typeof LayoutDashboard; label: string; desc: string }[] = [
  { id: "overview", icon: LayoutDashboard, label: "Vue d'ensemble", desc: "Statistiques du site" },
  { id: "textes", icon: Type, label: "Textes du site", desc: "Header, hero, footer…" },
  { id: "medias", icon: ImageIcon, label: "Médias", desc: "Images & uploads" },
  { id: "chambres", icon: BedDouble, label: "Chambres", desc: "Hébergement" },
  { id: "salles", icon: Users, label: "Salles", desc: "Événements" },
  { id: "restaurant", icon: UtensilsCrossed, label: "Restaurant", desc: "Menu & plats" },
  { id: "evenements", icon: Calendar, label: "Événements", desc: "Agenda" },
  { id: "videos", icon: Video, label: "Vidéos", desc: "YouTube, Vimeo…" },
  { id: "services", icon: Sparkles, label: "Services", desc: "Prestations" },
  { id: "paiements", icon: CreditCard, label: "Paiements", desc: "Moyens de paiement" },
  { id: "themes", icon: Palette, label: "Thèmes", desc: "Design du site" },
];

const CONTENT_SECTIONS = [
  { id: "site", label: "Site & Contact" },
  { id: "hero", label: "Accueil / Hero" },
  { id: "rooms", label: "Chambres" },
  { id: "gallery", label: "Galerie" },
  { id: "restaurant", label: "Restaurant" },
  { id: "menu", label: "Menu" },
  { id: "photoshoot", label: "Prises de vues" },
  { id: "lake", label: "Lac Kivu" },
  { id: "excursion", label: "Excursion" },
  { id: "services", label: "Services" },
  { id: "footer", label: "Footer" },
  { id: "booking", label: "Réservation" },
];

const IMAGE_CATEGORIES = [
  { id: "all", label: "Toutes" },
  { id: "hero", label: "Carrousel accueil" },
  { id: "gallery", label: "Galerie" },
  { id: "restaurant", label: "Restaurant" },
  { id: "rooms", label: "Chambres" },
  { id: "halls", label: "Salles" },
  { id: "events", label: "Événements" },
  { id: "lake", label: "Lac Kivu" },
  { id: "excursion", label: "Excursion" },
  { id: "activities", label: "Activités" },
];

export default function GestionApp() {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [content, setContent] = useState<ContentItem[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [payments, setPayments] = useState<PaymentMethod[]>([]);

  const [contentFilter, setContentFilter] = useState("all");
  const [imageFilter, setImageFilter] = useState("all");
  const [modal, setModal] = useState<{ type: string; item?: Record<string, unknown> | null } | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});

  const notify = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const api = useCallback(async (path: string, opts?: RequestInit) => {
    const res = await fetch(`/api/gestion/${path}`, opts);
    if (res.status === 401) { setAuth(false); throw new Error("Session expirée"); }
    return res;
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [c, r, h, m, e, i, t, v, s] = await Promise.all([
        api("content"), api("rooms"), api("halls"), api("menu"),
        api("events"), api("images"), api("themes"), api("videos"), api("services"),
      ]);
      if (c.ok) setContent((await c.json()).content || []);
      if (r.ok) setRooms((await r.json()).rooms || []);
      if (h.ok) setHalls((await h.json()).halls || []);
      if (m.ok) setMenuItems((await m.json()).menuItems || []);
      if (e.ok) setEvents((await e.json()).events || []);
      if (i.ok) setImages((await i.json()).images || []);
      if (t.ok) setThemes((await t.json()).themes || []);
      if (v.ok) setVideos((await v.json()).videos || []);
      if (s.ok) setServices((await s.json()).services || []);
      // Payments via public API
      const pub = await fetch("/api/site");
      if (pub.ok) {
        const d = await pub.json();
        setPayments(d.paymentMethods || []);
      }
    } catch (err) {
      notify("error", "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetch("/api/gestion/login").then((r) => r.json()).then((d) => {
      setAuth(d.authenticated);
      if (d.authenticated) loadAll();
    });
  }, [loadAll]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/gestion/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { setAuth(true); loadAll(); notify("success", "Connexion réussie"); }
    else notify("error", "Mot de passe incorrect");
    setLoading(false);
  };

  const logout = async () => {
    await fetch("/api/gestion/logout", { method: "POST" });
    setAuth(false);
  };

  const saveItem = async () => {
    if (!modal) return;
    setSaving(true);
    const endpointMap: Record<string, string> = {
      chambres: "rooms", salles: "halls", restaurant: "menu", evenements: "events",
      videos: "videos", services: "services", textes: "content", paiements: "content",
    };
    const ep = endpointMap[modal.type] || modal.type;
    const method = modal.item?.id || modal.item?.key ? "PATCH" : "POST";
    try {
      const res = await api(ep, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setModal(null); setForm({}); loadAll();
        notify("success", "Enregistré avec succès");
      } else notify("error", "Erreur lors de l'enregistrement");
    } catch { notify("error", "Erreur réseau"); }
    setSaving(false);
  };

  const deleteItem = async (endpoint: string, id: string | number, param = "id") => {
    if (!confirm("Supprimer cet élément ?")) return;
    const res = await api(`${endpoint}?${param}=${id}`, { method: "DELETE" });
    if (res.ok) { loadAll(); notify("success", "Supprimé"); }
    else notify("error", "Erreur suppression");
  };

  const activateTheme = async (id: string) => {
    const res = await api("themes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, activate: true, active: true }),
    });
    if (res.ok) { loadAll(); notify("success", "Thème activé — le site est mis à jour !"); }
  };

  const uploadImage = async (file: File, category: string) => {
    setSaving(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("category", category);
    fd.append("alt", file.name);
    fd.append("order", "0");
    const res = await api("images", { method: "POST", body: fd });
    if (res.ok) { loadAll(); notify("success", "Image uploadée"); }
    else notify("error", "Erreur upload");
    setSaving(false);
  };

  const saveContentInline = async (item: ContentItem, value: string) => {
    await api("content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, key: item.key, value, category: item.category }),
    });
    notify("success", "Texte mis à jour");
    loadAll();
  };

  /* ─── Login ─── */
  if (auth === null) return <div className="min-h-screen flex items-center justify-center bg-slate-900"><RefreshCw className="h-8 w-8 text-amber-400 animate-spin" /></div>;

  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white mb-4"><Lock className="h-8 w-8" /></div>
            <h1 className="text-2xl font-bold text-slate-900">Gestion Archanges</h1>
            <p className="text-sm text-slate-500 mt-1">CMS — Gérez l'intégralité du site</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="w-full h-12 rounded-xl border-2 border-slate-200 px-4 focus:border-amber-500 focus:outline-none" />
            <button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-amber-500 font-bold text-white hover:bg-amber-600 disabled:opacity-50">
              {loading ? "Connexion…" : "Accéder au CMS"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const filteredContent = contentFilter === "all" ? content : content.filter((c) => c.category === contentFilter || c.key.startsWith(contentFilter));
  const filteredImages = imageFilter === "all" ? images : images.filter((i) => i.category === imageFilter);

  /* ─── Dashboard ─── */
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-40">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-white"><LayoutDashboard className="h-5 w-5" /></div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Archanges CMS</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Gestion du site</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${tab === t.id ? "bg-amber-500 text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"}`}>
              <t.icon className="h-4 w-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{t.label}</p>
                <p className={`text-[10px] truncate ${tab === t.id ? "text-white/70" : "text-slate-400"}`}>{t.desc}</p>
              </div>
              {tab === t.id && <ChevronRight className="h-4 w-4" />}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-100 space-y-2">
          <button onClick={() => window.open("/", "_blank")} className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Eye className="h-4 w-4" /> Voir le site
          </button>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-72 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{TABS.find((t) => t.id === tab)?.label}</h1>
            <p className="text-sm text-slate-500">{TABS.find((t) => t.id === tab)?.desc}</p>
          </div>
          <button onClick={loadAll} disabled={loading} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Actualiser
          </button>
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Textes", count: content.length, icon: FileText, color: "bg-blue-500" },
              { label: "Images", count: images.length, icon: ImageIcon, color: "bg-purple-500" },
              { label: "Chambres", count: rooms.length, icon: BedDouble, color: "bg-amber-500" },
              { label: "Thème actif", count: themes.find((t) => t.active)?.name || "—", icon: Palette, color: "bg-emerald-500" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white mb-4`}><s.icon className="h-5 w-5" /></div>
                <p className="text-2xl font-bold text-slate-900">{s.count}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
            <div className="sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">CMS connecté au site public</h3>
              <p className="text-white/80 text-sm">Toutes vos modifications (textes, images, chambres, thèmes) sont visibles immédiatement sur archangeshotel.com après enregistrement.</p>
            </div>
          </div>
        )}

        {/* Textes */}
        {tab === "textes" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setContentFilter("all")} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${contentFilter === "all" ? "bg-amber-500 text-white" : "bg-white text-slate-600 border"}`}>Tout</button>
              {CONTENT_SECTIONS.map((s) => (
                <button key={s.id} onClick={() => setContentFilter(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${contentFilter === s.id ? "bg-amber-500 text-white" : "bg-white text-slate-600 border"}`}>{s.label}</button>
              ))}
            </div>
            <button onClick={() => { setModal({ type: "textes" }); setForm({ key: "", value: "", category: contentFilter === "all" ? "site" : contentFilter, label: "" }); }} className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white">
              <Plus className="h-4 w-4" /> Ajouter un texte
            </button>
            <div className="space-y-3">
              {filteredContent.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{item.category}</span>
                      <p className="font-mono text-xs text-slate-400 mt-1">{item.key}</p>
                    </div>
                    <button onClick={() => deleteItem("content", item.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <textarea
                    defaultValue={item.value}
                    rows={item.value.length > 100 ? 3 : 1}
                    onBlur={(e) => { if (e.target.value !== item.value) saveContentInline(item, e.target.value); }}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Médias */}
        {tab === "medias" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {IMAGE_CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setImageFilter(c.id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${imageFilter === c.id ? "bg-amber-500 text-white" : "bg-white border text-slate-600"}`}>{c.label}</button>
              ))}
            </div>
            <label className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 cursor-pointer hover:border-amber-400 transition">
              <Upload className="h-6 w-6 text-slate-400" />
              <div>
                <p className="font-semibold text-slate-700">Uploader une image</p>
                <p className="text-xs text-slate-400">PNG, JPG, WebP — max 10 Mo</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, imageFilter === "all" ? "gallery" : imageFilter); }} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredImages.map((img) => (
                <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow-sm border group">
                  <div className="aspect-video relative bg-slate-100">
                    <img src={img.url} alt={img.alt || ""} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                      <button onClick={() => deleteItem("images", img.id)} className="h-8 w-8 rounded-lg bg-red-500 text-white flex items-center justify-center"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold uppercase text-amber-600">{img.category}</span>
                    <p className="text-xs text-slate-500 truncate">{img.url}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Themes */}
        {tab === "themes" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <div key={theme.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm border-2 transition ${theme.active ? "border-amber-500 ring-2 ring-amber-200" : "border-slate-100"}`}>
                <div className="h-24 flex">
                  {[theme.primaryColor, theme.secondaryColor, theme.accentColor, theme.backgroundColor].map((c, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900">{theme.name}</h3>
                    {theme.active && <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Actif</span>}
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Layout: <strong>{theme.layoutVariant}</strong> · Hero: <strong>{theme.heroStyle}</strong></p>
                  <p className="text-xs text-slate-400 mb-4">{theme.fontHeading} / {theme.fontBody}</p>
                  {!theme.active && (
                    <button onClick={() => activateTheme(theme.id)} className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-sm font-bold text-white hover:bg-amber-600">
                      <Zap className="h-4 w-4" /> Activer ce thème
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Generic CRUD panels */}
        {(["chambres", "salles", "restaurant", "evenements", "videos", "services"] as Tab[]).includes(tab) && (
          <CrudPanel
            tab={tab}
            data={tab === "chambres" ? rooms : tab === "salles" ? halls : tab === "restaurant" ? menuItems : tab === "evenements" ? events : tab === "videos" ? videos : services}
            onAdd={() => { setModal({ type: tab }); setForm({}); }}
            onEdit={(item) => { setModal({ type: tab, item: item as Record<string, unknown> }); setForm(item as Record<string, unknown>); }}
            onDelete={(id) => deleteItem(
              tab === "chambres" ? "rooms" : tab === "salles" ? "halls" : tab === "restaurant" ? "menu" : tab === "evenements" ? "events" : tab === "videos" ? "videos" : "services",
              id
            )}
          />
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">{modal.item ? "Modifier" : "Ajouter"}</h2>
                <button onClick={() => setModal(null)}><X className="h-5 w-5 text-slate-400" /></button>
              </div>
              <ItemForm type={modal.type} form={form} setForm={setForm} />
              <div className="flex gap-3 mt-6">
                <button onClick={saveItem} disabled={saving} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 font-bold text-white disabled:opacity-50">
                  {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Enregistrer
                </button>
                <button onClick={() => setModal(null)} className="flex-1 rounded-xl border py-3 font-semibold text-slate-600">Annuler</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`fixed bottom-6 right-6 flex items-center gap-3 rounded-xl px-5 py-3 shadow-2xl text-white font-semibold text-sm ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
            {toast.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── CRUD Panel ─── */
function CrudPanel({ tab, data, onAdd, onEdit, onDelete }: {
  tab: Tab; data: unknown[]; onAdd: () => void; onEdit: (item: unknown) => void; onDelete: (id: string | number) => void;
}) {
  const getLabel = (item: Record<string, unknown>) =>
    String(item.name || item.title || item.key || `#${item.id}`);

  return (
    <div className="space-y-4">
      <button onClick={onAdd} className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white">
        <Plus className="h-4 w-4" /> Ajouter
      </button>
      {data.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-dashed">Aucun élément — cliquez sur Ajouter</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(data as Record<string, unknown>[]).map((item) => (
            <div key={String(item.id)} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm group">
              {typeof item.image === "string" && item.image && (
                <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-slate-100">
                  <img src={item.image as string} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              {typeof item.url === "string" && item.url && tab === "videos" && (
                <p className="text-xs text-blue-500 truncate mb-2">{item.url as string}</p>
              )}
              <h3 className="font-bold text-slate-900">{getLabel(item)}</h3>
              {item.price !== undefined && <p className="text-amber-600 font-bold">${String(item.price)}</p>}
              {item.description != null && item.description !== "" && (
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{String(item.description)}</p>
              )}
              <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => onEdit(item)} className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-slate-100 py-2 text-xs font-semibold hover:bg-amber-100"><Edit2 className="h-3 w-3" /> Modifier</button>
                <button onClick={() => onDelete(item.id as string | number)} className="flex items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-red-500 hover:bg-red-100"><Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Dynamic Form ─── */
function ItemForm({ type, form, setForm }: { type: string; form: Record<string, unknown>; setForm: (f: Record<string, unknown>) => void }) {
  const set = (k: string, v: unknown) => setForm({ ...form, [k]: v });
  const inp = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none";
  const lbl = "block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide";

  if (type === "textes") return (
    <div className="space-y-3">
      <div><label className={lbl}>Clé (unique)</label><input className={inp} value={String(form.key || "")} onChange={(e) => set("key", e.target.value)} placeholder="hero.title" /></div>
      <div><label className={lbl}>Catégorie</label><input className={inp} value={String(form.category || "")} onChange={(e) => set("category", e.target.value)} /></div>
      <div><label className={lbl}>Label (description)</label><input className={inp} value={String(form.label || "")} onChange={(e) => set("label", e.target.value)} /></div>
      <div><label className={lbl}>Contenu</label><textarea className={inp} rows={4} value={String(form.value || "")} onChange={(e) => set("value", e.target.value)} /></div>
    </div>
  );

  if (type === "chambres") return (
    <div className="space-y-3">
      <div><label className={lbl}>Nom</label><input className={inp} value={String(form.name || "")} onChange={(e) => set("name", e.target.value)} /></div>
      <div><label className={lbl}>Type</label><select className={inp} value={String(form.type || "")} onChange={(e) => set("type", e.target.value)}>
        <option value="standard">Standard</option><option value="deluxe">Deluxe</option><option value="vip">VIP</option>
      </select></div>
      <div><label className={lbl}>Prix ($/nuit)</label><input type="number" className={inp} value={String(form.price || "")} onChange={(e) => set("price", parseFloat(e.target.value))} /></div>
      <div><label className={lbl}>Description</label><textarea className={inp} rows={3} value={String(form.description || "")} onChange={(e) => set("description", e.target.value)} /></div>
      <div><label className={lbl}>URL Image</label><input className={inp} value={String(form.image || "")} onChange={(e) => set("image", e.target.value)} placeholder="/uploads/... ou https://..." /></div>
      <div><label className={lbl}>Équipements (virgules)</label><input className={inp} value={String(form.amenities || "")} onChange={(e) => set("amenities", e.target.value)} /></div>
    </div>
  );

  if (type === "salles") return (
    <div className="space-y-3">
      <div><label className={lbl}>Nom</label><input className={inp} value={String(form.name || "")} onChange={(e) => set("name", e.target.value)} /></div>
      <div><label className={lbl}>Capacité</label><input type="number" className={inp} value={String(form.capacity || "")} onChange={(e) => set("capacity", parseInt(e.target.value))} /></div>
      <div><label className={lbl}>Prix ($)</label><input type="number" className={inp} value={String(form.price || "")} onChange={(e) => set("price", parseFloat(e.target.value))} /></div>
      <div><label className={lbl}>Description</label><textarea className={inp} rows={2} value={String(form.description || "")} onChange={(e) => set("description", e.target.value)} /></div>
      <div><label className={lbl}>Image principale</label><input className={inp} value={String(form.image || "")} onChange={(e) => set("image", e.target.value)} /></div>
      <div><label className={lbl}>Images (URLs séparées par virgule)</label><input className={inp} value={String(form.images || "")} onChange={(e) => set("images", e.target.value)} /></div>
      <div><label className={lbl}>Vidéo (URL)</label><input className={inp} value={String(form.video || "")} onChange={(e) => set("video", e.target.value)} /></div>
      <div><label className={lbl}>Équipements (virgules)</label><input className={inp} value={String(form.features || "")} onChange={(e) => set("features", e.target.value)} /></div>
    </div>
  );

  if (type === "restaurant") return (
    <div className="space-y-3">
      <div><label className={lbl}>Nom du plat</label><input className={inp} value={String(form.name || "")} onChange={(e) => set("name", e.target.value)} /></div>
      <div><label className={lbl}>Catégorie</label><select className={inp} value={String(form.category || "")} onChange={(e) => set("category", e.target.value)}>
        <option value="starter">Entrée</option><option value="main">Plat</option><option value="dessert">Dessert</option><option value="drink">Boisson</option>
      </select></div>
      <div><label className={lbl}>Prix ($)</label><input type="number" className={inp} value={String(form.price || "")} onChange={(e) => set("price", parseFloat(e.target.value))} /></div>
      <div><label className={lbl}>Description</label><textarea className={inp} rows={2} value={String(form.description || "")} onChange={(e) => set("description", e.target.value)} /></div>
      <div><label className={lbl}>Image URL</label><input className={inp} value={String(form.image || "")} onChange={(e) => set("image", e.target.value)} /></div>
    </div>
  );

  if (type === "evenements") return (
    <div className="space-y-3">
      <div><label className={lbl}>Titre</label><input className={inp} value={String(form.title || "")} onChange={(e) => set("title", e.target.value)} /></div>
      <div><label className={lbl}>Type</label><select className={inp} value={String(form.type || "past")} onChange={(e) => set("type", e.target.value)}>
        <option value="past">Passé</option><option value="upcoming">À venir</option>
      </select></div>
      <div><label className={lbl}>Date</label><input type="date" className={inp} value={form.date ? String(form.date).split("T")[0] : ""} onChange={(e) => set("date", e.target.value)} /></div>
      <div><label className={lbl}>Description</label><textarea className={inp} rows={2} value={String(form.description || "")} onChange={(e) => set("description", e.target.value)} /></div>
      <div><label className={lbl}>Image URL</label><input className={inp} value={String(form.image || "")} onChange={(e) => set("image", e.target.value)} /></div>
      <div><label className={lbl}>Lien (YouTube…)</label><input className={inp} value={String(form.link || "")} onChange={(e) => set("link", e.target.value)} /></div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.isVideo)} onChange={(e) => set("isVideo", e.target.checked)} /> Vidéo YouTube</label>
    </div>
  );

  if (type === "videos") return (
    <div className="space-y-3">
      <div><label className={lbl}>Titre</label><input className={inp} value={String(form.title || "")} onChange={(e) => set("title", e.target.value)} /></div>
      <div><label className={lbl}>URL</label><input className={inp} value={String(form.url || "")} onChange={(e) => set("url", e.target.value)} /></div>
      <div><label className={lbl}>Catégorie</label><select className={inp} value={String(form.category || "")} onChange={(e) => set("category", e.target.value)}>
        <option value="hotel">Hôtel</option><option value="restaurant">Restaurant</option><option value="events">Événements</option><option value="rooms">Chambres</option>
      </select></div>
      <div><label className={lbl}>Miniature URL</label><input className={inp} value={String(form.thumbnail || "")} onChange={(e) => set("thumbnail", e.target.value)} /></div>
    </div>
  );

  if (type === "services") return (
    <div className="space-y-3">
      <div><label className={lbl}>Icône (Lucide)</label><input className={inp} value={String(form.icon || "")} onChange={(e) => set("icon", e.target.value)} placeholder="Wifi, Car, Shield…" /></div>
      <div><label className={lbl}>Titre</label><input className={inp} value={String(form.title || "")} onChange={(e) => set("title", e.target.value)} /></div>
      <div><label className={lbl}>Description</label><textarea className={inp} rows={3} value={String(form.description || "")} onChange={(e) => set("description", e.target.value)} /></div>
    </div>
  );

  return <p className="text-slate-400 text-sm">Formulaire non disponible</p>;
}
