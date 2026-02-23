import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const diseases = [
    {
        id: "early-blight",
        name: "Alternariose (Early Blight)",
        plants: ["Tomate", "Pomme de terre"],
        severity: "warning",
        description:
            "Maladie fongique causée par Alternaria solani. Se caractérise par des taches brunes à noires sur les feuilles les plus âgées (bas de la plante), souvent entourées d'un halo jaune. Les taches présentent des anneaux concentriques typiques en forme de cible.",
        treatment:
            "Retirer les feuilles atteintes. Améliorer la circulation de l'air. Appliquer un traitement fongicide (ex: bouillie bordelaise) et éviter de mouiller le feuillage.",
    },
    {
        id: "late-blight",
        name: "Mildiou (Late Blight)",
        plants: ["Tomate", "Pomme de terre"],
        severity: "danger",
        description:
            "Maladie dévastatrice causée par Phytophthora infestans (historiquement responsable de la famine irlandaise). Provoque de grandes taches brunes/noires d'aspect huileux sur les feuilles, qui s'étendent très rapidement par temps humide.",
        treatment:
            "Isoler ou détruire les plants infectés immédiatement. Le traitement préventif (cuivre) est plus efficace que curatif. Ne pas composter les parties malades.",
    },
    {
        id: "leaf-mold",
        name: "Moisissure des feuilles (Leaf Mold)",
        plants: ["Tomate"],
        severity: "warning",
        description:
            "Causée par le champignon Passalora fulva. Se manifeste par des taches vert pâle à jaunâtres sur la face supérieure des feuilles, tandis que la face inférieure se recouvre d'un feutrage (moisissure) gris-violet à brun olive.",
        treatment:
            "Améliorer la ventilation (très fréquent en serre humide). Éviter de mouiller le feuillage. Retirer les feuilles basses atteintes.",
    },
    {
        id: "healthy",
        name: "Plantes Saines",
        plants: ["Toutes"],
        severity: "success",
        description:
            "Feuilles d'une couleur verte uniforme, sans taches, sans décoloration jaune, et sans flétrissement. La plante présente une croissance normale et vigoureuse.",
        treatment:
            "Continuer les bonnes pratiques : arrosage au pied (pas sur les feuilles), bonne exposition au soleil, et observation régulière.",
    },
];

const DiseaseGuide = () => {
    return (
        <div className="w-full text-left">
            <Accordion type="single" collapsible className="w-full">
                {diseases.map((disease) => (
                    <AccordionItem key={disease.id} value={disease.id} className="border-border/50">
                        <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-3">
                            <div className="flex flex-wrap items-center gap-2 text-left">
                                <span className="font-medium">{disease.name}</span>
                                <Badge
                                    variant="outline"
                                    className={`text-[10px] px-2 py-0 h-5 border-transparent ${disease.severity === "danger"
                                            ? "bg-red-500/10 text-red-600"
                                            : disease.severity === "warning"
                                                ? "bg-amber-500/10 text-amber-600"
                                                : "bg-green-500/10 text-green-600"
                                        }`}
                                >
                                    {disease.plants.join(", ")}
                                </Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 space-y-3">
                            <p className="text-sm leading-relaxed">{disease.description}</p>
                            <div className="bg-secondary/50 p-3 rounded-lg border border-border/50">
                                <p className="text-xs font-semibold text-foreground mb-1">� Que faire ?</p>
                                <p className="text-xs">{disease.treatment}</p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default DiseaseGuide;
