import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Eye, AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { DiagnosticResult } from "@/data/mockData";

interface ResultCardProps {
  result: DiagnosticResult;
  imageUrl: string | null;
  heatmapUrl?: string | null;
  emoji?: string;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, imageUrl, heatmapUrl, emoji, onReset }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-4 w-full max-w-md mx-auto animate-fade-in">
      {/* Image + heatmap */}
      <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden bg-muted border border-border shadow-md">
        {imageUrl ? (
          <img src={imageUrl} alt="Plante analysée" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-secondary">
            {emoji || "🌿"}
          </div>
        )}
        {showHeatmap && heatmapUrl && (
          <img
            src={heatmapUrl}
            alt="Heatmap d'explicabilité Grad-CAM"
            className="absolute inset-0 w-full h-full object-cover mix-blend-normal opacity-90 transition-opacity duration-300"
          />
        )}
        {showHeatmap && !heatmapUrl && imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white text-xs font-bold p-2 text-center pointer-events-none">
            Heatmap non disponible
          </div>
        )}
      </div>
      <button
        onClick={() => setShowHeatmap(!showHeatmap)}
        className="flex items-center justify-center gap-1.5 text-xs text-primary hover:underline mx-auto"
      >
        <Eye className="h-3.5 w-3.5" />
        {showHeatmap ? "Masquer le heatmap" : "Voir où l'IA regarde"}
      </button>

      {/* Diagnostic badge */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Badge
          className={`text-sm px-3 py-1 ${result.status === "healthy"
            ? "bg-[hsl(var(--plant-success))] text-white border-transparent"
            : result.status === "warning"
              ? "bg-[hsl(var(--plant-warning))] text-white border-transparent"
              : "bg-red-500 text-white border-transparent"
            }`}
        >
          {result.status === "healthy" ? "🟢 Sain" : result.status === "warning" ? "🟠 Avertissement" : "🔴 Maladie détectée"} — {result.title}
        </Badge>
        {result.confidence < 60 && (
          <Badge variant="outline" className="text-xs text-muted-foreground">
            ⚠️ Confiance faible
          </Badge>
        )}
      </div>

      {/* Predictions */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-4 pb-3 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Niveau de confiance de l'IA
          </p>
          {result.predictions.slice(0, 1).map((p) => (
            <div key={p.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">{p.name}</span>
                <span className="text-muted-foreground">{p.probability}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 bg-primary"
                  style={{ width: `${p.probability}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detailed Advice Section */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-4 pb-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center justify-between">
            <span>Conseils & actions</span>
            <Info className="h-4 w-4 text-primary" />
          </p>

          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            {Array.isArray(result.description) ? (
              <ul className="space-y-3">
                {result.description.map((advice, idx) => (
                  <li key={idx} className="text-sm font-medium text-foreground/90 flex items-start gap-2.5">
                    <span className="text-primary mt-0.5 shrink-0 opacity-70">➔</span>
                    <span className="leading-relaxed">{advice}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                {result.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reset */}
      <Button
        onClick={onReset}
        className="w-full gap-2 mt-2"
      >
        <RefreshCw className="h-4 w-4" />
        Nouveau diagnostic
      </Button>
    </div>
  );
};

export default ResultCard;
