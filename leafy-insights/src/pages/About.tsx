import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Target, Users, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const TEAM = [
  { name: "Dr. Sophie Martin", role: "Phytopathologiste", emoji: "👩‍🔬", desc: "Experte en maladies fongiques avec 15 ans d'expérience en recherche agricole." },
  { name: "Karim Benali", role: "Ingénieur IA", emoji: "👨‍💻", desc: "Spécialiste en vision par ordinateur appliquée à l'agriculture de précision." },
  { name: "Marie Laurent", role: "Agronome terrain", emoji: "👩‍🌾", desc: "10 ans d'accompagnement des agriculteurs bio en France et en Afrique." },
];

const About: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Mission */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Leaf className="h-4 w-4" />
            Notre mission
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Rendre la protection des cultures accessible à tous
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            PlantDoc Vision est né de la conviction que chaque agriculteur, qu'il soit petit producteur ou professionnel,
            mérite un accès rapide et gratuit à un diagnostic fiable de la santé de ses plantes. Grâce à l'intelligence
            artificielle, nous rendons la phytopathologie accessible sur le terrain, directement depuis un smartphone.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Target, title: "Précision", desc: "Des modèles IA entraînés sur des milliers d'images pour des diagnostics fiables." },
            { icon: Users, title: "Accessibilité", desc: "Gratuit, sans inscription, utilisable sur n'importe quel smartphone." },
            { icon: Leaf, title: "Durabilité", desc: "Favoriser la détection précoce pour réduire l'usage de produits chimiques." },
          ].map((v) => (
            <Card key={v.title} className="border-border/50 shadow-sm text-center">
              <CardContent className="pt-6">
                <v.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Notre équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TEAM.map((t) => (
              <Card key={t.name} className="border-border/50 shadow-sm text-center">
                <CardContent className="pt-6">
                  <span className="text-4xl block mb-3">{t.emoji}</span>
                  <h3 className="font-semibold text-foreground">{t.name}</h3>
                  <p className="text-xs text-primary font-medium mb-2">{t.role}</p>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Contactez-nous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="space-y-5">
              <p className="text-muted-foreground">
                Une question, une suggestion, un partenariat ? N'hésitez pas à nous écrire.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-foreground">contact@plantdoc.vision</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-foreground">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-foreground">Paris, France</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <Card className="border-border/50 shadow-sm">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Votre nom" required />
                  <Input type="email" placeholder="Votre email" required />
                  <Textarea placeholder="Votre message..." rows={4} required />
                  <Button type="submit" className="w-full gap-2" disabled={sent}>
                    {sent ? (
                      <><CheckCircle className="h-4 w-4" /> Message envoyé !</>
                    ) : (
                      <><Send className="h-4 w-4" /> Envoyer</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
