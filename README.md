# YAKO Africa Assurances Vie - Prototype Hackathon InsurTech

## 🎯 Vue d'ensemble

Prototype cliquable complet pour la souscription digitalisée d'assurance vie développé dans le cadre du Hackathon InsurTech 2026.

**Développé par** : Équipe AssuRStable × YAKO Africa
**Date** : 8 avril 2026
**Technologies** : React, TypeScript, Tailwind CSS v4, Vite

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- pnpm (recommandé) ou npm

### Installation
```bash
# Cloner le projet
git clone https://github.com/yako-africa/prototype-hackathon.git
cd prototype-hackathon

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

L'application sera accessible sur le port configuré par Vite.

---

## 📱 Structure de l'application

### Trois interfaces distinctes

#### 1. **Interface Client** (`/client`)
- Tableau de bord personnel
- Suivi des souscriptions
- Historique des paiements
- Documents contractuels
- Chatbot simulé
- Actualités YAKO

#### 2. **Interface Agent** (`/agent`)
- Génération QR code unique
- Création de liens tokenisés
- Suivi du portefeuille clients
- Notifications en temps réel
- Statistiques de performance

#### 3. **Interface Admin** (`/admin`) ⭐ **NOUVEAU**
- **Gestion des erreurs réseau**
- Résolution des conflits
- Finalisation manuelle
- Logs d'audit exportables
- Timeline détaillée des transactions
- Actions de correction

---

## 🎨 Charte graphique

### Couleurs officielles AssuRStable × YAKO

| Couleur | Hex | Usage |
|---------|-----|-------|
| **Vert Forêt** | `#076834` | Identité principale, boutons, headers |
| **Or Akan** | `#F7A400` | Montants, paiements uniquement |
| **Beige Wax** | `#FDF8F2` | Fond de page |
| **Vert Savane** | `#0D8E46` | Succès, confirmations |
| **Beige Terre** | `#F5EDE4` | Backgrounds alternés |

### Typographie
- **Titres** : Sora (Bold, Extrabold)
- **Corps** : Plus Jakarta Sans (Regular, Medium)

**Voir le fichier complet** : [`design-tokens.json`](./design-tokens.json)

---

## 🔄 Parcours de souscription (5 phases)

### Phase 1 : DEMANDE (`/souscription/demande`)
- Choix du produit (Éternité, Soutra, Doihô, Cadence Éducation)
- Formulaire d'identité
- Scan CNI avec OCR simulé
- Sauvegarde automatique offline

### Phase 2 : QUALIFICATION (`/souscription/qualification`)
- Vérification ONECI simulée
- Contrôle LCB/FT
- Enregistrement bénéficiaires/ayants droit
- Validation complétude

### Phase 3 : PROPOSITION (`/souscription/proposition`)
- Simulateur de prime en temps réel
- Personnalisation (capital, durée, fréquence)
- Comparaison de produits
- Récapitulatif visuel

### Phase 4 : VALIDATION (`/souscription/validation`)
- Récapitulatif complet
- Conditions générales (PDF simulé)
- OTP SMS à 6 chiffres (composant `input-otp`)
- Signature électronique simulée
- Option empreinte digitale

### Phase 5 : SOUSCRIPTION (`/souscription/paiement`)
- Paiement Mobile Money (Wave, Orange, MTN, Moov)
- Options bancaires (RIB, Djamo)
- Confirmation + reçu numérique
- Génération identifiant client
- Email de confirmation

---

## 🛠 Module Admin - Gestion des erreurs réseau

### Fonctionnalités principales

#### 📊 Métriques en temps réel
- Transactions totales
- Erreurs réseau actives
- En attente de synchronisation
- Finalisées aujourd'hui

#### 🚨 Détection automatique des erreurs
- **Timeout** : Pas de réponse après 30s
- **Connexion perdue** : Interruption pendant sync
- **Conflits** : Données en doublon (NNI, etc.)
- **Paiement échoué** : Rejet Mobile Money

#### 🔄 Retry automatique
1. Premier retry : après 5 minutes
2. Deuxième retry : après 15 minutes
3. Troisième retry : après 1 heure

#### ⚙️ Actions Admin
- **Forcer resync** : Relance immédiate
- **Finaliser** : Validation manuelle
- **Corriger** : Modifier les données
- **Annuler** : Suppression définitive
- **Export CSV** : Logs d'audit complets

### Timeline détaillée
Chaque transaction affiche une timeline visuelle complète :
- Horodatage précis
- Actions effectuées
- Statuts (succès/erreur/en attente)
- Détails des erreurs

**Documentation complète** : [`ADMIN_MODULE_README.md`](./ADMIN_MODULE_README.md)

---

## 📡 API Endpoints (simulés)

### Client & Souscription
- `POST /api/simulate-prime` - Calcul de prime
- `POST /api/create-subscription` - Création souscription
- `POST /api/send-otp` - Envoi OTP
- `POST /api/verify-otp` - Vérification OTP
- `POST /api/create-payment` - Initier paiement
- `POST /api/sync-offline` - Synchronisation offline

### Admin
- `GET /api/admin/subscriptions` - Liste transactions
- `GET /api/admin/subscription/:id` - Détail transaction
- `POST /api/admin/subscription/:id/finalize` - Finaliser
- `POST /api/admin/subscription/:id/correct` - Corriger
- `POST /api/admin/subscription/:id/cancel` - Annuler
- `POST /api/admin/subscription/:id/force-sync` - Resync forcé
- `GET /api/admin/logs/export` - Export logs

**Documentation API complète** : [`API_SPECIFICATION.md`](./API_SPECIFICATION.md)

---

## 💾 Architecture de données

### Stockage offline
Utilisation de `localStorage` pour :
- Souscriptions créées hors ligne
- Formulaires en cours
- Cache des données client

### Synchronisation
- Auto-sync dès connexion rétablie
- Détection de conflits
- Résolution manuelle ou automatique

**Schéma de base de données** : [`DATABASE_SCHEMA.md`](./DATABASE_SCHEMA.md)

---

## 🎭 Démo Hackathon - Scénarios recommandés

### Scénario 1 : Souscription complète réussie
1. Accueil → Choisir "YAKO Éternité"
2. Remplir formulaire (ou scanner CNI simulé)
3. Ajouter 2 bénéficiaires
4. Simuler prime mensuelle de 50 000 FCFA
5. Valider avec OTP (code : `123456`)
6. Payer avec Wave Mobile
7. Recevoir confirmation

**Temps estimé** : 3-4 minutes

### Scénario 2 : Erreur réseau et résolution Admin
1. Créer une souscription
2. Simuler timeout lors du paiement
3. Ouvrir `/admin`
4. Afficher la transaction en erreur
5. Forcer resync
6. Finaliser manuellement
7. Export logs CSV

**Temps estimé** : 2-3 minutes

### Scénario 3 : Conflit de synchronisation
1. Créer souscription offline (désactiver réseau)
2. Créer 2ème souscription avec même NNI
3. Réactiver réseau
4. Observer le conflit dans Admin
5. Résoudre manuellement

**Temps estimé** : 2-3 minutes

---

## 🔐 Sécurité et conformité

### Données sensibles
- NNI : Validation format `CI[0-9]{10}`
- OTP : 6 chiffres, validité 5 min
- Paiements : Simulation uniquement

### Audit
- Logs immuables de toutes les actions
- Timeline complète par transaction
- Export CSV pour conformité

### RGPD / Protection des données
- Consentement explicite
- Droit à l'oubli (simulation)
- Chiffrement des données sensibles (à implémenter en prod)

---

## 📂 Structure des fichiers

```
/
├── src/
│   ├── app/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── ui/            # Composants UI (shadcn/ui)
│   │   │   └── figma/         # Composants Figma
│   │   ├── pages/             # Pages de l'application
│   │   │   ├── HomePage.tsx
│   │   │   ├── AgentDashboard.tsx
│   │   │   ├── AdminDashboard.tsx  ⭐ NOUVEAU
│   │   │   ├── ClientDashboard.tsx
│   │   │   └── souscription/  # 5 phases
│   │   ├── utils/             # Utilitaires
│   │   │   └── offlineStorage.ts
│   │   ├── App.tsx
│   │   └── routes.ts
│   └── styles/
│       ├── fonts.css          # Imports Sora, Plus Jakarta Sans
│       ├── theme.css          # Design tokens CSS
│       ├── tailwind.css       # Configuration Tailwind
│       └── index.css
├── design-tokens.json         # Tokens exportables
├── README.md                  # Ce fichier
├── ADMIN_MODULE_README.md     # Documentation Admin
├── API_SPECIFICATION.md       # Spécifications API
├── DATABASE_SCHEMA.md         # Schéma de base de données
└── package.json
```

---

## 🚧 Limitations du prototype

### Non implémenté (MVP)
- ❌ Backend réel (tout est simulé)
- ❌ Authentification sécurisée
- ❌ OCR réel pour scan CNI
- ❌ Intégration Mobile Money réelle
- ❌ Signature électronique légale
- ❌ Envoi SMS réel

### Implémenté (Démo)
- ✅ UI/UX complète et responsive
- ✅ Parcours de souscription complet
- ✅ Gestion offline avec localStorage
- ✅ Module Admin avec gestion d'erreurs
- ✅ Timeline détaillée
- ✅ Export logs CSV
- ✅ QR code agent dynamique
- ✅ Charte graphique YAKO officielle

---

## 🔮 Roadmap post-hackathon

### Phase 2 (Q2 2026)
- Intégration backend Node.js + PostgreSQL
- API Mobile Money réelle (Wave, Orange, MTN, Moov)
- OCR CNI avec IA (Tesseract.js ou service cloud)
- Authentification 2FA
- Notifications push

### Phase 3 (Q3 2026)
- Application mobile native (React Native)
- Signature électronique certifiée
- Intégration ONECI officielle
- Dashboard analytics avancé
- Machine learning pour détection fraude

### Phase 4 (Q4 2026)
- Support multi-pays (Sénégal, Bénin, Togo)
- Multi-langue (FR, EN, Wolof, Yoruba)
- API partenaires (banques, fintechs)
- Programme ambassadeurs agents

---

## 🤝 Contribution

Ce projet est développé dans le cadre du Hackathon InsurTech 2026.

**Équipe** :
- Product Design : [Votre nom]
- Frontend Dev : [Votre nom]
- UX Research : [Votre nom]
- Business : [Votre nom]

---

## 📄 Licence

Propriété de **YAKO Africa Assurances Vie** © 2026
Tous droits réservés.

---

## 📞 Contact

**YAKO Africa Assurances Vie**
- 📧 Email : contact@yakoafrica.ci
- 📱 Téléphone : +225 XX XX XX XX XX
- 🌐 Web : https://yakoafrica.ci
- 💼 LinkedIn : /company/yako-africa

---

## 🏆 Hackathon InsurTech 2026

**Challenge** : Digitaliser le parcours de souscription d'assurance vie en Côte d'Ivoire
**Thème** : Accessibilité, inclusion financière, innovation mobile
**Jury** : [Critères d'évaluation]

### Points forts de notre solution
1. ✅ **Parcours 100% mobile** optimisé pour faible connexion
2. ✅ **Mode offline** avec synchronisation automatique
3. ✅ **Gestion d'erreurs robuste** via console Admin
4. ✅ **Paiement Mobile Money** (principal mode de paiement en CI)
5. ✅ **UX accessible** respectant les normes d'accessibilité
6. ✅ **Charte cohérente** AssuRStable × YAKO Africa
7. ✅ **Timeline transparente** pour confiance client

---

**Fait avec ❤️ en Côte d'Ivoire 🇨🇮**
