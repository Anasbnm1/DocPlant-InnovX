import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Leaf, Shield, Zap, Users, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Camera,
    title: "Diagnostic par photo",
    desc: "Prenez une photo de la feuille et obtenez un diagnostic en quelques secondes avec une précision redoutable.",
  },
  {
    icon: Zap,
    title: "IA Haute Performance",
    desc: "Propulsé par MobileNetV2, l'analyse de votre image s'effectue en temps réel sur notre serveur dédié.",
  },
  {
    icon: Shield,
    title: "Conseils sur mesure",
    desc: "Recevez des recommandations de traitement spécifiques (bio ou conventionnel) pour sauver vos cultures.",
  },
  {
    icon: BookOpen,
    title: "Encyclopédie interactive",
    desc: "Une base de connaissances riche avec recherche intégrée pour tout savoir sur les pathologies végétales.",
  },
];

const TESTIMONIALS = [
  { name: "Marie L.", role: "Viticultrice", text: "PlantDoc m'a permis de détecter le mildiou sur mes vignes avant qu'il ne se propage. Un outil indispensable !" },
  { name: "Jean-Pierre D.", role: "Maraîcher bio", text: "L'assistant IA est incroyable. Je lui demande des conseils d'arrosage en plein champ et il répond instantanément." },
  { name: "Amina K.", role: "Ingénieure agronome", text: "L'interface est d'une fluidité exemplaire. C'est le meilleur outil de pré-diagnostic gratuit sur le marché actuel." },
];

const Home: React.FC = () => (
  <div className="min-h-screen bg-background selection:bg-primary/30">

    {/* HERO SECTION (Glassmorphism & Background Image) */}
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
      {/* Background Image wrapper */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2500&auto=format&fit=crop"
          alt="Lush green botanical leaves"
          className="w-full h-full object-cover opacity-60 dark:opacity-40"
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto text-center w-full mt-16 pb-16">
        {/* Container */}
        <div className="bg-white/10 backdrop-blur-md p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-white/40 ring-1 ring-black/5 animate-in slide-in-from-bottom-8 duration-700 fade-in">

          <div className="inline-flex items-center gap-2 bg-primary/20 text-black px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-8 border border-primary/40 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            IA Connectée & Active
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black tracking-tight leading-[1.1] mb-6 drop-shadow-md">
            Guérissez vos plantes <br className="hidden sm:block" />
            <span className="text-black">
              en un clin d'œil.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-black mb-10 max-w-2xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Prenez une photo de votre feuille malade. Notre intelligence artificielle l'identifie instantanément et le <span className="text-green-700 font-bold">Dr. Plant AI</span> vous conseille.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/diagnostic" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                <Camera className="h-5 w-5 mr-2" />
                Lancer un diagnostic
              </Button>
            </Link>
            <Link to="/guide" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-2xl bg-black/5 border-grey/20 text-black hover:bg-white/10 hover:text-white backdrop-blur transition-all">
                <BookOpen className="h-5 w-5 mr-2" />
                Explorer le guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* STATS STRIP */}
    <section className="border-y border-border/50 bg-secondary/20 backdrop-blur-sm relative z-20 -mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/50">
        {[
          { number: "25+", label: "Maladies répertoriées" },
          { number: "98%", label: "Taux de précision IA" },
          { number: "24/7", label: "Assistant Virtuel actif" }
        ].map((stat, i) => (
          <div key={i} className="py-8 text-center group">
            <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-green-300 group-hover:scale-110 transition-transform duration-300">
              {stat.number}
            </h3>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* FEATURES GRID */}
    <section className="py-24 px-4 bg-background relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">La technologie au service de la nature</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Un cocktail technologique puissant pour vous offrir la meilleure expérience agronomique possible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 group">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-7 w-7 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="py-24 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Decorative leaf blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
          Approuvé par les passionnés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-background rounded-3xl p-8 border border-border/50 shadow-sm relative group hover:border-primary/30 transition-colors">
              <div className="text-5xl absolute top-4 right-6 opacity-5 font-serif text-primary">"</div>
              <p className="text-foreground/90 italic mb-8 relative z-10 leading-relaxed text-sm md:text-base">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-bold text-primary">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-primary font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA FINALE */}
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-primary to-emerald-700 p-10 md:p-16 text-center shadow-2xl relative overflow-hidden overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Prêt à sauver vos plantes ?</h2>
          <p className="text-green-50 text-lg mb-10 max-w-xl mx-auto opacity-90">
            L'analyse est 100% gratuite, ultra-rapide et ne nécessite aucune création de compte.
          </p>
          <Link to="/diagnostic">
            <Button size="lg" className="bg-white text-emerald-800 hover:bg-zinc-100 rounded-2xl h-14 px-10 text-lg font-bold shadow-xl transition-transform hover:scale-105">
              Faire un test gratuit <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
