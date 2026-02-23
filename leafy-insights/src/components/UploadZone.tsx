import React, { useRef, useState } from "react";
import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onImageSelected: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    onImageSelected(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="px-4 w-full max-w-md mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 ${isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-primary/40 bg-card hover:border-primary hover:bg-primary/5"
          }`}
      >
        <Upload className="mx-auto h-10 w-10 text-primary/60 mb-3" />
        <p className="text-sm font-medium text-foreground mb-1">
          Glissez-déposez une photo ici
        </p>
        <p className="text-xs text-muted-foreground">
          ou cliquez pour parcourir vos fichiers
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      <Button
        variant="outline"
        className="w-full mt-3 gap-2 border-primary/30 text-primary hover:bg-primary/10"
        onClick={() => cameraInputRef.current?.click()}
      >
        <Camera className="h-4 w-4" />
        Prendre une photo
      </Button>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadZone;
