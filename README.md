# PlantDoc 🌿

PlantDoc est une application Web intelligente conçue pour aider les agriculteurs et les passionnés de plantes à diagnostiquer instantanément les maladies de leurs cultures grâce à l'Intelligence Artificielle.

## 🚀 Fonctionnalités Principales

- **Diagnostic instantané** : Uploadez une photo d'une feuille pour obtenir un diagnostic (Mildiou, Oïdium, Carence, etc.) grâce à un modèle d'IA (MobileNetV2 intégré avec PyTorch).
- **Explicabilité ("Heatmap")** : Visualisez en rouge quelles zones de la feuille ont permis à l'IA de prendre sa décision grâce à la technologie **Grad-CAM**.
- **Moteur de Recherche Médical (Encyclopédie)** : Consultez une grande base de données intégrée pour obtenir des conseils, traitements et moyens de prévention.
- **ChatBot Assistant** : Discutez avec le "Dr Plant", alimenté par Gemini AI, pour obtenir des conseils horticoles sur mesure.

---

## 🛠️ Architecture du Projet

Le projet est divisé en deux parties principales :
1. **Frontend (`/leafy-insights`)** : Interface utilisateur moderne réalisée avec React, TypeScript, Tailwind CSS, et shadcn/ui.
2. **Backend (`/backend`)** : Serveur d'intelligence artificielle en Python avec FastAPI et PyTorch.

---

## 💻 Installation Rapide (Pour les collaborateurs)

Pour faire tourner le projet en local sur votre machine, suivez ces deux étapes.

### Étape 1 : Lancer le Backend (Intelligence Artificielle)

Assurez-vous d'avoir [Python](https://www.python.org/downloads/) d'installé.

```bash
# 1. Aller dans le dossier du backend
cd backend

# 2. Créer un environnement virtuel
python -m venv venv

# 3. Activer l'environnement virtuel

# Sur Windows :
venv\Scripts\activate
# Sur Mac/Linux :
source venv/bin/activate

# 4. Installer les dépendances Python
pip install -r requirements.txt

# 5. Démarrer le serveur API
uvicorn api:app --reload
```
Le backend tourne maintenant sur `http://127.0.0.1:8000`.

*(Optionnel) Clé API : Pour utiliser le Chatbot, créez un fichier `.env` dans le dossier `/backend` avec : `GEMINI_API_KEY=votre_cle_api`*.

### Étape 2 : Lancer le Frontend (Interface Web)

Ouvrez un **nouveau terminal** (laissez le backend tourner) et assurez-vous d'avoir [Node.js](https://nodejs.org/) d'installé.

```bash
# 1. Aller dans le dossier du frontend
cd leafy-insights

# 2. Installer les dépendances JS (vite, react, etc.)
npm install

# 3. Démarrer le serveur de développement
npm run dev
```

L'application Web est maintenant disponible sur `http://localhost:8080` (le port peut varier selon la console).

---

## 🤝 Contribution

Si vous venez de cloner ce dépôt, vous êtes prêts à contribuer !
- Modifiez l'interface dans le dossier `leafy-insights/src`
- Améliorez l'IA dans le dossier `backend`

*PlantDoc - Conçu pour protéger la nature par la technologie.*

