import React from "react";
import { Loader2 } from "lucide-react";

interface ScanAnimationProps {
  imageUrl: string | null;
  emoji?: string;
}

const ScanAnimation: React.FC<ScanAnimationProps> = ({ imageUrl, emoji }) => (
  <div className="flex flex-col items-center gap-4 px-4 w-full max-w-md mx-auto animate-fade-in">
    <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-muted border border-border shadow-lg">
      {imageUrl ? (
        <img src={imageUrl} alt="Plante" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-6xl bg-secondary">
          {emoji || "🌿"}
        </div>
      )}
      {/* Scan overlay */}
      <div className="absolute inset-0 bg-primary/10" />
      <div className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_12px_hsl(145,45%,28%)] animate-scan-line" />
    </div>
    <div className="flex items-center gap-2 text-primary">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm font-medium">Analyse en cours...</span>
    </div>
  </div>
);

export default ScanAnimation;
