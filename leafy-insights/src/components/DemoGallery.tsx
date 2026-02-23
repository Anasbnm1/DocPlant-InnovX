import React from "react";
import { DEMO_IMAGES } from "@/data/mockData";

interface DemoGalleryProps {
  onSelect: (id: string) => void;
}

const DemoGallery: React.FC<DemoGalleryProps> = ({ onSelect }) => (
  <div className="px-4 w-full max-w-md mx-auto mt-8">
    <p className="text-sm text-muted-foreground text-center mb-4">
      Ou essayez avec nos images d'exemple
    </p>
    <div className="grid grid-cols-4 gap-3">
      {DEMO_IMAGES.map((img) => (
        <button
          key={img.id}
          onClick={() => onSelect(img.id)}
          className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
        >
          <span className="text-3xl">{img.emoji}</span>
          <span className="text-[10px] font-medium text-muted-foreground leading-tight text-center">
            {img.label}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default DemoGallery;
