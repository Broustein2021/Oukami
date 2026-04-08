# Guide de Démonstration Hackathon - YAKO Africa

## 🎯 Objectif de la démo

Montrer un parcours de souscription digitalisé complet avec gestion robuste des erreurs réseau, adapté aux réalités africaines (connectivité instable, Mobile Money, inclusion financière).

**Durée totale** : 10-12 minutes
**Points clés** : UX mobile, offline-ready, gestion erreurs, transparence

---

## 📋 Checklist pré-démo

### Technique
- [ ] Application démarrée et accessible
- [ ] Navigateur en mode mobile (responsive, 375px width)
- [ ] Extension réseau pour simuler déconnexions
- [ ] Onglets pré-ouverts : `/`, `/agent`, `/admin`
- [ ] Données de test prêtes

### Matériel
- [ ] Écran partagé/projeté
- [ ] Support de présentation (slides optionnels)
- [ ] Démo backup (vidéo/screenshots)

### Données de test

**Client fictif** :
- Nom : Kouassi Jean
- NNI : CI2026123456
- Téléphone : +2250708123456
- Email : kouassi.jean@demo.ci
- Âge : 38 ans

**OTP de test** : `123456`

---

## 🎬 Script de démonstration

### INTRO (1 min)

**"Bonjour, je suis [Nom] et je représente l'équipe AssuRStable × YAKO Africa.**

**Le défi** : En Côte d'Ivoire, 92% de la population n'a pas d'assurance vie. Pourquoi ?
- Processus complexe (2-3 semaines en agence)
- Coûts prohibitifs
- Méfiance envers les assureurs
- Manque d'accessibilité

**Notre solution** : Un parcours 100% digitalisé, optimisé mobile, avec paiement Mobile Money et gestion intelligente des erreurs réseau.

**Démontrons cela en 3 scénarios.**"

---

### SCÉNARIO 1 : Souscription réussie de bout en bout (4 min)

#### 1.1 Page d'accueil (30s)

**Narration** :
> "Voici la page d'accueil YAKO Africa. Notez la charte graphique : Vert Forêt pour l'identité, Or Akan uniquement pour les montants financiers. Tout est pensé pour mobile."

**Actions** :
- Montrer le header responsive
- Scroller pour afficher les 4 produits (Éternité, Soutra, Doihô, Cadence Éducation)
- Pointer le processus en 5 étapes

**Cliquer** : "Souscrire maintenant"

---

#### 1.2 Phase 1 - DEMANDE (45s)

**Narration** :
> "Phase 1 : Le client choisit son produit. Ici, YAKO Éternité, notre produit phare de prévoyance."

**Actions** :
- Sélectionner "YAKO Éternité"
- Montrer le bouton "Scan CNI" (simulé)
- Remplir rapidement :
  - Nom : Kouassi
  - Prénom : Jean
  - NNI : CI2026123456
  - Date naissance : 15/03/1985
  - Téléphone : +2250708123456

**Point clé** :
> "Notez la sauvegarde automatique. Si le réseau coupe ici, les données sont conservées localement. Une bannière 'Données sauvegardées localement' apparaîtrait."

**Cliquer** : "Continuer"

---

#### 1.3 Phase 2 - QUALIFICATION (30s)

**Narration** :
> "Phase 2 : Vérification d'identité et bénéficiaires. En production, on interroge l'ONECI (Office National d'État Civil). Ici, c'est simulé."

**Actions** :
- Observer la vérification ONECI (loader + succès)
- Ajouter bénéficiaire 1 :
  - Nom : Kouassi Marie
  - Relation : Épouse
  - Pourcentage : 60%
- Ajouter bénéficiaire 2 :
  - Nom : Kouassi Patrick
  - Relation : Fils
  - Pourcentage : 40%

**Point clé** :
> "Le système vérifie que le total = 100%. Conformité LCB/FT intégrée."

**Cliquer** : "Continuer"

---

#### 1.4 Phase 3 - PROPOSITION (45s)

**Narration** :
> "Phase 3 : Le simulateur calcule la prime en temps réel."

**Actions** :
- Capital souhaité : 5 000 000 FCFA
- Durée : 20 ans
- Fréquence : Mensuelle
- Observer le calcul automatique : **50 000 FCFA/mois**

**Point clé** :
> "Notez l'affichage en Or Akan pour tous les montants. C'est une règle de notre design system : Or uniquement pour le financier."

**Cliquer** : "Valider ma proposition"

---

#### 1.5 Phase 4 - VALIDATION (45s)

**Narration** :
> "Phase 4 : Récapitulatif et signature électronique."

**Actions** :
- Montrer le récapitulatif complet
- Cliquer "Voir les conditions générales" (PDF simulé)
- Cliquer "Envoyer OTP"
- Saisir OTP : `123456` (utilise le composant input-otp, 6 cases)
- Observer la validation

**Point clé** :
> "L'OTP est envoyé par SMS. En production, via Orange, MTN ou Moov. Le code expire après 5 minutes, max 3 tentatives."

**Cliquer** : "Signature électronique" → "Continuer"

---

#### 1.6 Phase 5 - PAIEMENT (45s)

**Narration** :
> "Phase 5 : Paiement Mobile Money. 78% des Ivoiriens utilisent le Mobile Money, contre 35% qui ont un compte bancaire."

**Actions** :
- Montrer les 4 options : Wave, Orange Money, MTN, Moov
- Sélectionner **Wave Mobile**
- Numéro : +2250708123456
- Confirmer

**Observer** :
- Loader "Traitement du paiement..."
- Page de confirmation
- Reçu numérique avec ID client : CLI-2026-XXX
- Bouton "Télécharger le contrat PDF"

**Point clé** :
> "Le client reçoit immédiatement :
> - Un ID client unique
> - Un reçu numérique
> - Son contrat par email
> - Un SMS de confirmation
>
> Tout en moins de 5 minutes."

---

### SCÉNARIO 2 : Erreur réseau et résolution Admin (3 min)

**Transition** :
> "Parfait. Mais que se passe-t-il si le réseau coupe pendant le paiement ? C'est LA réalité africaine. Voyons comment on gère ça."

---

#### 2.1 Simuler l'erreur (30s)

**Actions** :
- Revenir à `/souscription/demande`
- Remplir rapidement un nouveau formulaire :
  - Client : Traoré Aminata
  - NNI : CI2026789012
  - Produit : Soutra (retraite)
- Arriver à la phase Paiement
- **Activer la simulation de déconnexion réseau** (extension navigateur ou mode avion)
- Tenter le paiement

**Observer** :
- Timeout après 30 secondes
- Message d'erreur : "Erreur réseau - Votre transaction est sauvegardée"
- Bannière : "Mode offline - Les données seront synchronisées"

**Narration** :
> "Le paiement a échoué à cause du réseau. Mais la souscription n'est PAS perdue. Elle est en local, et le système va retenter automatiquement."

---

#### 2.2 Console Admin (1 min 30s)

**Actions** :
- Ouvrir `/admin`
- **Réactiver le réseau**

**Narration** :
> "Voici la console Admin. Regardez les métriques en haut :"

**Montrer** :
- Transactions totales : 1 247
- **Erreurs réseau : 23** ← Notre transaction est ici
- En attente sync : 45
- Finalisées aujourd'hui : 89

**Scroller vers le bas** :
> "Section critique : Transactions incomplètes. Voici notre transaction de Traoré Aminata."

**Montrer** :
- ID : TRX-2026-003
- Client : Traoré Aminata
- Erreur : Timeout après 30s
- 1 tentative de retry

**Cliquer** : "Détails"

---

#### 2.3 Timeline et résolution (1 min)

**Narration** :
> "La modal affiche la timeline complète de la transaction."

**Montrer** :
- 14:20 : Création souscription ✅
- 14:22 : Validation identité ✅
- 14:23 : Tentative paiement ❌ (Timeout 30s)
- 14:30 : Retry auto #1 ⏳

**Point clé** :
> "Le système a déjà tenté 1 resync automatique. On peut :
> - **Forcer resync** : Relance immédiatement
> - **Finaliser** : Si on confirme le paiement manuellement
> - **Corriger** : Si des données sont fausses
> - **Annuler** : Si irrécupérable"

**Cliquer** : "Forcer resync"

**Observer** :
- Loader "Resynchronisation en cours..."
- Succès : "Transaction finalisée"
- Timeline mise à jour avec nouvel événement

**Narration** :
> "Voilà. La transaction est sauvée. Le client reçoit sa confirmation. Zéro friction."

---

### SCÉNARIO 3 : Fonctionnalités Admin avancées (2 min)

#### 3.1 Filtres et recherche (30s)

**Narration** :
> "La console Admin permet de filtrer et rechercher toutes les transactions."

**Actions** :
- Barre de recherche : Taper "TRX-2026-001"
- Montrer le résultat
- Filtre : Sélectionner "Erreurs réseau"
- Montrer la liste filtrée

---

#### 3.2 Timeline dans le tableau (30s)

**Narration** :
> "Chaque transaction a une timeline dépliable directement dans le tableau."

**Actions** :
- Cliquer sur le chevron d'une transaction
- Montrer la timeline intégrée

---

#### 3.3 Export logs d'audit (30s)

**Narration** :
> "Pour la conformité, on peut exporter tous les logs d'audit en CSV."

**Actions** :
- Cliquer "Export CSV"
- Montrer le fichier téléchargé
- Ouvrir rapidement dans un tableur (optionnel)

**Point clé** :
> "Chaque action est journalisée de manière immuable. Essentiel pour la conformité CIMA (régulateur assurance Afrique)."

---

#### 3.4 Gestion des conflits (30s)

**Narration** :
> "Dernier cas : les conflits de synchronisation."

**Actions** :
- Montrer une transaction avec statut "Conflit"
- Cliquer "Détails"
- Afficher le message : "NNI déjà utilisé - CI2026123456"

**Point clé** :
> "Si 2 agents créent une souscription avec le même NNI offline, le système détecte le conflit. L'admin peut :
> - Fusionner si c'est le même client
> - Annuler si c'est une fraude
> - Alerter l'agent"

---

### CONCLUSION (1 min)

**Narration** :
> "Récapitulons. Notre solution YAKO Africa offre :
>
> **1. Accessibilité** : 100% mobile, 5 minutes de bout en bout
>
> **2. Inclusion** : Paiement Mobile Money (78% de pénétration), pas besoin de compte bancaire
>
> **3. Robustesse** : Mode offline, retry automatique, résolution intelligente des erreurs
>
> **4. Transparence** : Timeline complète, client informé en temps réel
>
> **5. Conformité** : Logs d'audit, gestion LCB/FT, respect CIMA
>
> **Impact attendu** : Faire passer le taux de couverture de 8% à 25% en 3 ans.
>
> **Next steps** : Pilote avec 100 agents, 3 régions, Q3 2026.
>
> Merci. Questions ?"

---

## 🎯 Points clés à retenir

### Messages à marteler
1. **Mobile-first** : 92% des connexions internet en CI sont mobiles
2. **Offline-ready** : Réseau instable = mode offline obligatoire
3. **Mobile Money** : 78% vs 35% bancarisés → pas le choix
4. **Transparence** : Timeline = confiance = adoption
5. **Scalabilité** : Architecture prête pour 10M d'utilisateurs

### Différenciateurs vs concurrence
- ✅ Seul à gérer vraiment l'offline
- ✅ Console Admin avec résolution erreurs
- ✅ Timeline transparente client
- ✅ Design system cohérent (pas de copié-collé)
- ✅ Pensé pour l'Afrique, pas adapté d'Europe

---

## 🔧 Trucs et astuces démo

### Si ça plante...
1. **Plan B** : Vidéo pré-enregistrée (5 min)
2. **Plan C** : Screenshots annotés
3. Rester calme, expliquer le concept

### Timing
- Répéter 3 fois minimum
- Chronomètre visible
- Buffer de 2 min pour questions

### Interaction jury
- Anticiper : "Et si le client perd son téléphone ?"
- Réponse : "Espace client avec login, récupération par email/SMS"

### Techniques de présentation
- **Pointer** ce qu'on montre (curseur)
- **Ralentir** les transitions
- **Répéter** les chiffres clés
- **Sourire** (confiance = adoption)

---

## 📊 Métriques à citer

### Marché
- **Population CI** : 28 millions
- **Taux de pénétration assurance vie** : 0,8% (vs 15% en Afrique du Sud)
- **Marché adressable** : 22M d'adultes non assurés
- **Revenu annuel potentiel** : 120 Mds FCFA

### Adoption Mobile Money
- **Wave** : 35% de part de marché
- **Orange Money** : 40%
- **MTN** : 20%
- **Moov** : 5%

### Benchmark
- **Temps moyen souscription physique** : 2-3 semaines
- **Temps YAKO** : 5 minutes
- **Taux d'abandon classique** : 60%
- **Taux d'abandon YAKO** : < 15% (offline-ready)

---

## ❓ Questions possibles du jury

### Q1 : "Comment gérez-vous la fraude ?"
**Réponse** :
- Vérification ONECI (état civil officiel)
- Contrôle LCB/FT intégré
- Détection doublons (NNI)
- Timeline d'audit immuable
- Signature électronique + OTP

### Q2 : "Quid de la sécurité des données ?"
**Réponse** :
- Chiffrement bout en bout (TLS 1.3)
- Stockage local sécurisé (encrypted localStorage en prod)
- Conformité RGPD adapté Afrique
- Hébergement local (Côte d'Ivoire Data Center)

### Q3 : "Modèle économique ?"
**Réponse** :
- Commission agents : 15% de la prime annuelle
- Frais plateforme YAKO : 2% du volume
- Revenus récurrents (primes mensuelles)
- Upsell produits complémentaires

### Q4 : "Scalabilité technique ?"
**Réponse** :
- Architecture microservices
- Base PostgreSQL avec sharding
- CDN Cloudflare pour l'Afrique
- Auto-scaling sur AWS/Azure
- Target : 10M users, 100K transactions/jour

### Q5 : "Différence avec Wave/Orange ?"
**Réponse** :
- Wave/Orange = paiement uniquement
- YAKO = parcours assurance complet
- Partenariat avec Mobile Money, pas concurrence
- Focus : simplifier l'assurance, pas réinventer le paiement

---

## 📝 Checklist post-démo

- [ ] Récupérer coordonnées jury intéressé
- [ ] Partager le repo GitHub (si demandé)
- [ ] Envoyer deck de présentation
- [ ] Noter les feedbacks
- [ ] Améliorer V2 selon retours

---

## 🏆 Critères de notation Hackathon

### Innovation (30%)
- Gestion offline-first
- Résolution intelligente erreurs réseau
- Timeline transparente

### Impact social (25%)
- Inclusion financière
- Accessibilité mobile
- Paiement Mobile Money

### Faisabilité technique (20%)
- Architecture scalable
- API bien conçues
- Code production-ready

### UX/Design (15%)
- Charte graphique cohérente
- Responsive mobile
- Clarté du parcours

### Modèle économique (10%)
- Marché adressable clair
- Revenus récurrents
- Scalabilité business

---

**Bonne chance ! 🚀**

**#YAKOAfrica #InsurTech #InclusionFinancière #MadeInCôtedIvoire 🇨🇮**
