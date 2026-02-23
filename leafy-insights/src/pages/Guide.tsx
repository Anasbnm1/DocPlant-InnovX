import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, CheckCircle, Info, Leaf, Bug, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import diseasesData from "../data/diseases_db.json";

const CATEGORIES = [
  { id: "all", label: "Toutes", icon: null },
  { id: "fongique", label: "Maladies Fongiques", icon: <Leaf className="w-3 h-3 mr-1" /> },
  { id: "ravageur", label: "Ravageurs & Insectes", icon: <Bug className="w-3 h-3 mr-1" /> },
  { id: "virus", label: "Virus & Carences", icon: <AlertTriangle className="w-3 h-3 mr-1" /> },
  { id: "sain", label: "Plantes Saines", icon: <CheckCircle className="w-3 h-3 mr-1" /> },
];

const Guide: React.FC = () => {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = useMemo(() => {
    return diseasesData.filter((d) => {
      // 1. Filter by Search Query
      const searchLower = search.toLowerCase();
      const matchesSearch =
        d.name.toLowerCase().includes(searchLower) ||
        d.scientificName.toLowerCase().includes(searchLower) ||
        d.plants.some((p) => p.toLowerCase().includes(searchLower));

      // 2. Filter by Category
      let matchesCategory = true;
      if (selectedCategory !== "all") {
        const descLower = d.description.toLowerCase();
        if (selectedCategory === "fongique") {
          matchesCategory = descLower.includes("fongique") || descLower.includes("champignon") || d.scientificName.includes("Phytophthora") || d.scientificName.includes("Erysiphales");
        } else if (selectedCategory === "ravageur") {
          matchesCategory = descLower.includes("insecte") || descLower.includes("acarien") || descLower.includes("ravageur") || descLower.includes("puceron");
        } else if (selectedCategory === "virus") {
          matchesCategory = descLower.includes("virus") || descLower.includes("carence") || d.id.includes("virus") || d.id.includes("chlorosis");
        } else if (selectedCategory === "sain") {
          matchesCategory = d.severity === "success";
        }
      }

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen relative font-sans selection:bg-primary/30">
      {/* BACKGROUND SCENE */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/95 z-10" />
        <img
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2500&auto=format&fit=crop"
          alt="Botanical background"
          className="w-full h-full object-cover opacity-60 dark:opacity-20"
        />
      </div>

      <div className="relative z-20 pb-20">

        {/* SEARCH ENGINE HERO SECTION */}
        <section className="pt-32 pb-8 px-4 flex flex-col items-center justify-center min-h-[45vh] animate-in slide-in-from-top-8 duration-1000">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/20 shadow-2xl">
              <Stethoscope className="w-12 h-12 text-green-400 drop-shadow-md" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-green-100 to-green-400 drop-shadow-xl mb-4 tracking-tight">
              PlantSearch
            </h1>
            <p className="text-base md:text-lg text-green-50 font-medium drop-shadow-md max-w-xl mx-auto opacity-90">
              La plus grande base de données de pathologies végétales. <br />
              <span className="font-bold text-white">{diseasesData.length} fiches</span> disponibles pour vos plantes.
            </p>
          </div>

          {/* Huge Search Bar */}
          <div className="w-full max-w-3xl relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-600/30 rounded-full blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white/90 dark:bg-black/80 backdrop-blur-2xl px-6 py-2 rounded-full border-2 border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all group-focus-within:border-green-400/50 group-focus-within:shadow-[0_8px_40px_rgba(74,222,128,0.2)]">
              <Search className="w-7 h-7 text-green-600 dark:text-green-400 shrink-0" />
              <Input
                placeholder="Rechercher une maladie (ex: Mildiou), une plante (ex: Tomate)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none focus-visible:ring-0 text-lg md:text-xl py-6 h-16 shadow-none placeholder:text-zinc-500 font-medium text-foreground px-4"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-4xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 border ${selectedCategory === cat.id
                    ? "bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/20 scale-105"
                    : "bg-white/20 dark:bg-black/40 border-white/20 text-foreground/80 hover:bg-white/40 dark:hover:bg-black/60 backdrop-blur-md"
                  }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* RESULTS SECTION */}
        <section className="px-4 max-w-4xl mx-auto pb-20">

          <div className="flex items-center gap-2 mb-6 ml-2">
            <h2 className="text-xl font-bold text-foreground/90 flex items-center gap-2">
              Résultats de recherche
            </h2>
            <Badge variant="secondary" className="bg-white/30 dark:bg-black/30 backdrop-blur-md">
              {filtered.length}
            </Badge>
          </div>

          {/* Disease list (Accordion style as requested) */}
          <div className="space-y-4 text-left">
            {filtered.map((d) => (
              <Card
                key={d.id}
                className={`backdrop-blur-xl bg-background/70 dark:bg-black/60 border border-white/10 dark:border-white/5 shadow-xl hover:bg-background/90 transition-colors cursor-pointer rounded-2xl overflow-hidden ${openId === d.id ? 'ring-2 ring-primary/30 shadow-2xl bg-background/95 dark:bg-black/90' : ''}`}
                onClick={() => setOpenId(openId === d.id ? null : d.id)}
              >
                <CardContent className="p-4 md:p-6">
                  {/* Card Header (Always visible) */}
                  <div className="flex items-start gap-4 mb-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0 ${d.severity === "danger" ? "bg-red-500/20" : d.severity === "warning" ? "bg-amber-500/20" : "bg-green-500/20"
                      }`}>
                      {d.severity === "danger" ? "🚨" : d.severity === "warning" ? "⚠️" : "🌿"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start flex-wrap gap-x-4 gap-y-2">
                        <div>
                          <h3 className="font-extrabold text-foreground text-lg md:text-xl drop-shadow-sm group-hover:text-primary transition-colors">{d.name}</h3>
                          <p className="text-sm text-primary/80 font-medium italic mt-0.5">{d.scientificName}</p>
                        </div>
                        <Badge
                          className={`text-xs px-3 py-1 font-bold shadow-sm ${d.severity === "danger"
                            ? "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30"
                            : d.severity === "warning"
                              ? "bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30"
                              : "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30"
                            }`}
                          variant="outline"
                        >
                          {d.severity === "danger" && <AlertTriangle className="h-3 w-3 mr-1.5" />}
                          {d.severity.charAt(0).toUpperCase() + d.severity.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                        {d.plants.map((p) => (
                          <Badge key={p} variant="secondary" className="text-xs px-2.5 py-0.5 bg-white/50 dark:bg-black/40 border-border/40 text-foreground/80">{p}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {openId === d.id && (
                    <div className="mt-6 space-y-5 animate-in zoom-in-95 duration-200 border-t border-border/30 pt-5">
                      {/* Description */}
                      <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/10">
                        <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-medium">
                          {d.description}
                        </p>
                      </div>

                      {/* Symptoms */}
                      {d.symptoms && (
                        <div className="bg-red-500/5 dark:bg-red-500/10 rounded-xl p-5 border border-red-500/10 shadow-inner">
                          <h4 className="text-base font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" /> Symptômes d'identification
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {d.symptoms.map((s, idx) => (
                              <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2.5 font-medium">
                                <span className="text-red-500 mt-1">•</span> <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-5">
                        {/* Prevention */}
                        {d.prevention && (
                          <div className="bg-green-500/5 dark:bg-green-500/10 rounded-xl p-5 border border-green-500/10 shadow-inner">
                            <h4 className="text-base font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                              <CheckCircle className="h-5 w-5" /> Prévention
                            </h4>
                            <ul className="space-y-2">
                              {d.prevention.map((p, idx) => (
                                <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2.5 font-medium">
                                  <span className="text-green-600 mt-0.5">✓</span> <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Treatment */}
                        {d.treatment && (
                          <div className="bg-amber-500/5 dark:bg-amber-500/10 rounded-xl p-5 border border-amber-500/10 shadow-inner">
                            <h4 className="text-base font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                              <Info className="h-5 w-5" /> Traitement curatif
                            </h4>
                            <ul className="space-y-2">
                              {d.treatment.map((t, idx) => (
                                <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2.5 font-medium">
                                  <span className="text-amber-500 mt-0.5">→</span> <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-white/20 dark:border-white/10 rounded-3xl bg-black/10 backdrop-blur-md">
                <div className="text-6xl mb-4 opacity-40 mix-blend-luminosity">🪴</div>
                <h3 className="text-2xl text-foreground font-bold drop-shadow mb-2">Aucun résultat trouvé</h3>
                <p className="text-lg text-foreground/60 font-medium">Essayez d'autres mots-clés ou modifiez vos filtres de recherche.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guide;
