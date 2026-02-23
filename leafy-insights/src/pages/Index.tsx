import React, { useState, useCallback } from "react";
import UploadZone from "@/components/UploadZone";
import DiseaseGuide from "@/components/DiseaseGuide";
import ScanAnimation from "@/components/ScanAnimation";
import ResultCard from "@/components/ResultCard";
import { getRandomResult } from "@/data/mockData";
import type { DiagnosticResult } from "@/data/mockData";
import diseasesData from "@/data/diseases_db.json";

type AppState = "upload" | "scanning" | "result";

const Index = () => {
  const [state, setState] = useState<AppState>("upload");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [heatmapUrl, setHeatmapUrl] = useState<string | null>(null);
  const [demoEmoji, setDemoEmoji] = useState<string | undefined>();
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const startScan = useCallback(async (imgUrl: string | null, file?: File | null, emoji?: string) => {
    setImageUrl(imgUrl);
    setDemoEmoji(emoji);
    setHeatmapUrl(null);
    setState("scanning");

    // Si c'est juste un emoji demo sans fichier, on garde le code d'origine avec de la donnée mock
    if (!file) {
      setTimeout(() => {
        setResult(getRandomResult());
        setState("result");
      }, 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Fetch prediction
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("HTTP erreur: " + response.status);
      }

      const data = await response.json();

      // Fetch explainability heatmap in background (non-blocking)
      fetch("http://127.0.0.1:8000/explain", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((explainData) => {
          if (explainData.status === "success") {
            setHeatmapUrl(explainData.heatmap_base64);
          }
        })
        .catch(console.error);

      if (data.status === "error" || data.status === "uncertain") {
        setResult({
          id: "error",
          status: "danger", // Mettre en danger pour attirer l'attention
          title: "Je ne sais pas 😕",
          description: data.message || "La confiance de l'IA est trop basse. Veuillez reprendre une photo plus claire de la feuille.",
          confidence: data.confidence || 0,
          predictions: data.top_predictions?.map((p: any) => ({
            name: p.class.replace(/_/g, ' '),
            probability: p.confidence,
          })) || [],
        });
      } else {
        const statusMap: Record<string, "healthy" | "warning" | "danger"> = {
          "Tomato_healthy": "healthy",
          "Potato_healthy": "healthy",
          "Tomato_Late_blight": "danger",
          "Potato_Late_blight": "danger",
          "Tomato_Early_blight": "warning",
          "Tomato_Leaf_Mold": "warning",
        };

        setResult({
          id: Date.now().toString(),
          status: statusMap[data.primary_diagnosis] || "warning",
          title: data.primary_diagnosis.replace(/_/g, ' '),
          description: data.advice ? data.advice : ["Aucun conseil spécifique disponible."],
          confidence: data.confidence,
          predictions: data.top_3_predictions?.map((p: any) => ({
            name: p.class.replace(/_/g, ' '),
            probability: p.confidence,
          })) || [],
        });
      }
      setState("result");
    } catch (err) {
      console.error(err);
      setResult({
        id: "error",
        status: "danger",
        title: "Erreur de connexion",
        description: "Impossible de joindre le serveur d'analyse locale (backend manquant).",
        confidence: 0,
        predictions: [],
      });
      setState("result");
    }
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    await startScan(url, file);
  }, [startScan]);

  const handleReset = useCallback(() => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setHeatmapUrl(null);
    setDemoEmoji(undefined);
    setResult(null);
    setState("upload");
  }, [imageUrl]);

  return (
    <div className="min-h-screen relative font-sans selection:bg-primary/30">
      {/* BACKGROUND SCENE */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-10" />
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2500&auto=format&fit=crop"
          alt="Botanical background"
          className="w-full h-full object-cover opacity-50 dark:opacity-30"
        />
      </div>

      <div className="relative z-20 pb-16">
        <div className="text-center pt-32 pb-12 px-4 animate-in slide-in-from-top-4 duration-700 fade-in flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold  bg-clip-text text-green bg-green-500 drop-shadow-lg mb-8">
            Diagnostic IA
          </h1>
          <p className="text-base md:text-lg text-black font-bold drop-shadow-md max-w-xl mx-auto bg-white/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/30">
            Uploadez ou prenez une photo pour analyser instantanément la santé de votre plante.
          </p>
        </div>

        <main className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* LEFT COLUMN: Upload & Guide */}
            <div className="w-full md:w-1/2 shrink-0 space-y-6 animate-in slide-in-from-left-8 duration-700 fade-in">
              <div className="backdrop-blur-xl bg-background/50 dark:bg-black/50 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-6 transition-all hover:bg-background/60">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Importer une image
                </h2>
                <div className="bg-background/80 dark:bg-background/40 rounded-2xl p-2 border border-border/50">
                  <UploadZone onImageSelected={handleUpload} />
                </div>
              </div>

              <div className="backdrop-blur-xl bg-background/50 dark:bg-black/50 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-6 transition-all hover:bg-background/60">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="bg-primary/20 text-primary p-2 rounded-full flex items-center justify-center text-sm">🌿</span>
                  Guide des maladies
                </h2>
                <div className="bg-background/80 dark:bg-background/40 rounded-2xl p-4 border border-border/50">
                  <DiseaseGuide />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Diagnostic Results */}
            <div className="w-full md:w-1/2 flex flex-col justify-center min-h-[500px] animate-in slide-in-from-right-8 duration-700 fade-in">
              {state === "upload" && (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 backdrop-blur-xl bg-background/30 dark:bg-black/30 rounded-3xl border border-dashed border-white/30 dark:border-white/10 shadow-2xl">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner animate-pulse">
                    🪴
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 drop-shadow-sm">En attente d'imagerie</h3>
                  <p className="text-muted-foreground max-w-[280px] leading-relaxed">
                    Sélectionnez une image à gauche pour que le Dr. Plant lance son analyse cellulaire.
                  </p>
                </div>
              )}

              {state === "scanning" && (
                <div className="backdrop-blur-xl bg-background/60 dark:bg-black/60 rounded-3xl border border-primary/30 shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] p-8 flex flex-col items-center justify-center h-full">
                  <ScanAnimation imageUrl={imageUrl} emoji={demoEmoji} />
                </div>
              )}

              {state === "result" && result && (
                <div className="backdrop-blur-xl bg-background/70 dark:bg-black/70 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl p-6 md:p-8 animate-in zoom-in duration-500 flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-8 text-center flex justify-center items-center gap-2">
                    <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                    Rapport d'Analyse IA
                  </h2>
                  <div className="bg-background/90 dark:bg-background/60 rounded-2xl p-2 border border-border/50 shadow-inner">
                    <ResultCard
                      result={result}
                      imageUrl={imageUrl}
                      heatmapUrl={heatmapUrl}
                      emoji={demoEmoji}
                      onReset={handleReset}
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
