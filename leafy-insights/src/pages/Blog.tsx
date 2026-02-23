import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Comment reconnaître le mildiou sur vos tomates",
    excerpt: "Le mildiou est l'une des maladies les plus courantes chez la tomate. Apprenez à identifier les premiers symptômes et à agir rapidement.",
    date: "15 Fév 2026",
    author: "Dr. Sophie Martin",
    category: "Maladies",
    emoji: "🍅",
  },
  {
    id: 2,
    title: "5 bonnes pratiques pour protéger vos vignes",
    excerpt: "De la taille à la prévention des maladies fongiques, découvrez les gestes essentiels pour une vigne en bonne santé.",
    date: "10 Fév 2026",
    author: "Jean-Pierre Dubois",
    category: "Conseils",
    emoji: "🍇",
  },
  {
    id: 3,
    title: "L'IA au service de l'agriculture durable",
    excerpt: "Comment les technologies d'intelligence artificielle révolutionnent la détection précoce des maladies des plantes.",
    date: "5 Fév 2026",
    author: "Amina Koné",
    category: "Technologie",
    emoji: "🤖",
  },
  {
    id: 4,
    title: "Carence en azote : symptômes et solutions",
    excerpt: "Les feuilles jaunissent ? Cela pourrait être une carence en azote. Voici comment diagnostiquer et corriger le problème.",
    date: "28 Jan 2026",
    author: "Dr. Sophie Martin",
    category: "Maladies",
    emoji: "🌾",
  },
  {
    id: 5,
    title: "Agriculture biologique : prévenir plutôt que guérir",
    excerpt: "En bio, la prévention est la clé. Découvrez les méthodes naturelles pour maintenir vos cultures en bonne santé.",
    date: "20 Jan 2026",
    author: "Marie Laurent",
    category: "Bio",
    emoji: "🌿",
  },
  {
    id: 6,
    title: "Guide complet : la rotation des cultures",
    excerpt: "La rotation est essentielle pour prévenir les maladies du sol. Voici un plan pratique saison par saison.",
    date: "12 Jan 2026",
    author: "Jean-Pierre Dubois",
    category: "Conseils",
    emoji: "🔄",
  },
];

const CATEGORIES = ["Tous", "Maladies", "Conseils", "Technologie", "Bio"];

const Blog: React.FC = () => {
  const [category, setCategory] = React.useState("Tous");

  const filtered = category === "Tous" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === category);

  return (
    <div className="min-h-screen">
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Blog & Actualités</h1>
          <p className="text-muted-foreground mb-8">
            Conseils agricoles, guides pratiques et dernières innovations en phytopathologie.
          </p>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((post) => (
              <Card key={post.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="pt-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{post.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <Badge variant="secondary" className="text-[10px] mb-1.5">
                        {post.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
