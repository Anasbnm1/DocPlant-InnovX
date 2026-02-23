export interface Prediction {
  name: string;
  probability: number;
  color?: string;
}

export interface DiagnosticResult {
  id: string;
  status: "healthy" | "warning" | "danger";
  title: string;
  description: string | string[];
  confidence: number;
  predictions: Prediction[];
}

export const MOCK_RESULTS: DiagnosticResult[] = [
  {
    id: "healthy",
    title: "Sain",
    status: "healthy",
    confidence: 95,
    description: "Continuez à observer régulièrement vos plants, maintenez un arrosage adapté. Vos plants semblent en bonne santé, bravo !",
    predictions: [
      { name: "Feuille saine", probability: 95, color: "hsl(145, 60%, 40%)" },
      { name: "Légère déshydratation", probability: 3, color: "hsl(35, 60%, 50%)" },
      { name: "Autre", probability: 2, color: "hsl(140, 15%, 65%)" },
    ],
  },
  {
    id: "mildiou",
    title: "Mildiou",
    status: "danger",
    confidence: 88,
    description: "Isolez immédiatement la plante des autres cultures. Retirez les feuilles infectées et détruisez-les. Consultez un expert pour un traitement fongicide adapté.",
    predictions: [
      { name: "Mildiou", probability: 88, color: "hsl(0, 72%, 51%)" },
      { name: "Carence en azote", probability: 10, color: "hsl(35, 60%, 50%)" },
      { name: "Autre", probability: 2, color: "hsl(140, 15%, 65%)" },
    ],
  },
  {
    id: "carence",
    title: "Carence en azote",
    status: "warning",
    confidence: 72,
    description: "Faites une analyse du sol pour confirmer la carence. Apportez un engrais riche en azote. Surveillez l'évolution dans les jours suivants.",
    predictions: [
      { name: "Carence en azote", probability: 72, color: "hsl(35, 60%, 50%)" },
      { name: "Vieillissement naturel", probability: 18, color: "hsl(140, 15%, 65%)" },
      { name: "Autre", probability: 10, color: "hsl(140, 15%, 65%)" },
    ],
  },
  {
    id: "tache",
    title: "Tache foliaire",
    status: "warning",
    confidence: 55,
    description: "Observez attentivement : le diagnostic est incertain. Isolez la plante par précaution et consultez un expert.",
    predictions: [
      { name: "Tache foliaire", probability: 55, color: "hsl(25, 90%, 55%)" },
      { name: "Brûlure solaire", probability: 30, color: "hsl(35, 60%, 50%)" },
      { name: "Mildiou", probability: 15, color: "hsl(0, 72%, 51%)" },
    ],
  },
];

export const DEMO_IMAGES = [
  { id: "healthy", label: "Feuille saine", emoji: "🍃" },
  { id: "mildiou", label: "Mildiou", emoji: "🍂" },
  { id: "carence", label: "Carence", emoji: "🌾" },
  { id: "tache", label: "Tache foliaire", emoji: "🍁" },
];

export function getRandomResult(): DiagnosticResult {
  return MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
}

export function getResultById(id: string): DiagnosticResult {
  return MOCK_RESULTS.find((r) => r.id === id) || MOCK_RESULTS[0];
}
