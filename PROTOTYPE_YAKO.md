# Prototype YAKO Africa Assurances Vie
## Parcours de Souscription Digitalisé - Hackathon InsurTech

### 📋 Vue d'ensemble
Prototype cliquable complet pour le parcours de souscription digitalisé de YAKO Africa Assurances Vie, optimisé pour smartphone et conforme à la charte graphique AssuRStable × YAKO Africa.

### 🎨 Charte graphique
- **Vert Forêt**: `#076834` - Identité principale YAKO
- **Or Akan**: `#F7A400` - Paiements uniquement
- **Beige Wax**: `#FDF8F2` - Fond d'écran
- **Polices**: 
  - Sora (titres, chiffres)
  - Plus Jakarta Sans (interface, boutons, formulaires)

### 🚀 Fonctionnalités implémentées

#### ✅ 5 Phases de souscription
1. **DEMANDE**
   - Choix du produit (Éternité, Soutra, Doihô, Cadence Éducation)
   - Scanner CNI avec OCR simulé
   - Saisie manuelle alternative
   - Mode offline avec stockage local

2. **QUALIFICATION**
   - Validation identité via API ONECI (simulée)
   - Contrôle conformité LCB/FT
   - Enregistrement bénéficiaires et ayants droit

3. **PROPOSITION**
   - Simulation prime en temps réel
   - Personnalisation (capital, durée, fréquence)
   - Comparaison des 4 produits
   - Projection sur la durée

4. **VALIDATION**
   - Récapitulatif complet
   - Conditions Générales et Particulières (PDF simulés)
   - OTP SMS à 6 chiffres (avec input-otp)
   - Signature électronique

5. **SOUSCRIPTION**
   - Paiement Mobile Money (Wave, Orange, MTN, Moov)
   - Confirmation paiement + reçu
   - Génération identifiant client unique
   - Accès espace client

#### 📱 Tableau de bord Agent
- QR code unique généré dynamiquement
- Suivi en temps réel des souscriptions
- Statistiques de performance
- Notifications de parcours
- Vue portefeuille clients

#### 👤 Espace Client
- Dashboard contrat actif
- Historique paiements avec Mobile Money
- Téléchargement documents contractuels
- Notifications (paiement réussi, rappel échéance)
- **Chatbot simulé** avec FAQ assurance
- **Section actualités YAKO**
- Bouton "Payer ma prime" (Or Akan)

#### 🔌 Mode Offline
- Stockage local des données de souscription
- Message indicateur "Mode hors ligne"
- Synchronisation automatique au retour du réseau
- Gestion via localStorage avec timestamps

### 🛠️ Technologies utilisées
- **React** avec TypeScript
- **React Router** pour la navigation multi-pages
- **Tailwind CSS v4** pour le style
- **Lucide React** pour les icônes
- **Input-OTP** pour la saisie OTP à 6 chiffres
- **QRCode** pour la génération de QR codes agents
- **LocalStorage** pour le mode offline

### 📂 Structure du projet
```
/src/app
├── App.tsx                      # Point d'entrée
├── routes.ts                    # Configuration React Router
├── pages/
│   ├── HomePage.tsx             # Page d'accueil
│   ├── AgentDashboard.tsx       # Dashboard agent avec QR code
│   ├── ClientDashboard.tsx      # Espace client avec chatbot
│   └── souscription/
│       ├── DemandePhase.tsx     # Phase 1: Choix produit + identité
│       ├── QualificationPhase.tsx # Phase 2: Validation + LCB/FT
│       ├── PropositionPhase.tsx # Phase 3: Simulation
│       ├── ValidationPhase.tsx  # Phase 4: OTP + Signature
│       ├── PaiementPhase.tsx    # Phase 5: Mobile Money
│       └── ConfirmationPhase.tsx # Confirmation finale
├── utils/
│   └── offlineStorage.ts        # Gestionnaire stockage offline
└── components/ui/               # Composants UI réutilisables
```

### 🎯 Points forts du prototype
- ✅ **100% conforme** à la charte graphique YAKO
- ✅ **Responsive** et optimisé smartphone (360px)
- ✅ **Mode offline** avec synchronisation
- ✅ **QR code dynamique** pour les agents
- ✅ **Chatbot interactif** dans l'espace client
- ✅ **Simulation complète** des API externes
- ✅ **UX fluide** avec animations et transitions

### 🎥 Vidéo démo suggérée (3-5 minutes)
1. **Introduction** (30s)
   - Contexte YAKO Africa
   - Objectif: digitaliser la souscription

2. **Parcours client** (2min)
   - Choix produit
   - Scanner CNI (OCR)
   - Validation identité
   - Simulation prime
   - OTP + Signature
   - Paiement Mobile Money

3. **Dashboard Agent** (1min)
   - QR code unique
   - Suivi souscriptions
   - Statistiques

4. **Espace Client** (1min)
   - Contrats actifs
   - Historique paiements
   - Chatbot
   - Actualités

5. **Mode Offline** (30s)
   - Démonstration sans connexion
   - Synchronisation automatique

### 📊 Schéma d'architecture

```
┌─────────────┐
│   Client    │ (React SPA)
│  (Mobile)   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Frontend  │ (React + Tailwind)
│  React App  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  API Layer  │ (Simulées)
│   (REST)    │
└──────┬──────┘
       │
       ├──→ ONECI API (Validation identité)
       ├──→ Mobile Money APIs (Orange, MTN, Wave, Moov)
       └──→ Backend YAKO
            │
            ↓
       ┌──────────┐
       │ Database │ (Contrats, Clients, Paiements)
       └──────────┘
```

### 🎤 Pitch Hackathon
**"YAKO Africa révolutionne l'accès à l'assurance vie en Côte d'Ivoire avec une souscription 100% digitale en 5 minutes depuis un smartphone. Notre prototype inclut le scan CNI, la validation ONECI, le paiement Mobile Money, le mode offline pour les zones à faible connexion, et un chatbot intelligent. Accessible dès 3 000 FCFA/mois."**

---

**Développé pour le Hackathon InsurTech Challenge 2026**  
**AssuRStable × YAKO Africa Assurances Vie**
