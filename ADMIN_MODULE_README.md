# Module Admin YAKO Africa - Gestion des Erreurs Réseau

## Vue d'ensemble

Le module Admin est une console complète pour gérer les transactions YAKO Africa, avec un focus particulier sur la détection et la résolution des erreurs réseau et des transactions non finalisées.

## Accès au module

**URL**: `/admin`

Depuis la page d'accueil, cliquez sur le bouton "Console Admin" dans la section CTA.

---

## Fonctionnalités principales

### 1. Métriques en temps réel (KPIs)

Quatre indicateurs clés affichés en haut de la page :

- **Transactions totales** : Nombre total de souscriptions
- **Erreurs réseau** : Transactions bloquées par problème de connexion
- **En attente sync** : Transactions créées offline en attente de synchronisation
- **Finalisées aujourd'hui** : Transactions complétées dans les dernières 24h

Chaque métrique affiche :
- Valeur actuelle
- Variation en pourcentage
- Icône contextuelle

### 2. Section Erreurs Réseau Critiques

Zone prioritaire affichant uniquement les transactions nécessitant une intervention immédiate :

**Types d'erreurs détectées** :
- `timeout` : Délai d'attente dépassé (30s)
- `connection_lost` : Connexion interrompue pendant la synchronisation
- `conflict` : Conflit de données (ex: NNI déjà utilisé)
- `payment_failed` : Échec de paiement Mobile Money

**Actions rapides** :
- **Rejouer** : Relance automatique de la synchronisation
- **Détails** : Ouvre la vue détaillée de la transaction

### 3. Liste complète des transactions

Tableau avec toutes les transactions, filtrable et recherchable.

**Colonnes** :
- ID Transaction (cliquable pour déplier la timeline)
- Client (nom + NNI si disponible)
- Produit d'assurance
- Montant (stylisé en Or Akan)
- Statut (badge coloré)
- Date
- Actions

**Filtres disponibles** :
- **Recherche** : Par ID, nom client, ou NNI
- **Statut** :
  - Tous les statuts
  - Erreurs réseau
  - Conflits
  - En attente paiement
  - Échouées
  - Finalisées

**Timeline intégrée** :
Cliquez sur l'icône chevron pour déplier l'historique complet de la transaction directement dans le tableau.

### 4. Détails de transaction (Modal)

Cliquez sur "Voir" pour ouvrir une vue détaillée complète :

**Informations affichées** :
- Client (nom, NNI)
- Produit souscrit
- Montant de la prime
- Agent responsable
- Statut actuel

**Timeline complète** :
Historique visuel de tous les événements avec :
- Horodatage précis
- Action effectuée
- Statut (succès, erreur, en attente)
- Détails de l'erreur si applicable

**Actions disponibles** :
- **Forcer resync** : Relance la synchronisation manuellement
- **Finaliser** : Marque la transaction comme finalisée
- **Corriger** : Ouvre un formulaire de correction des données
- **Annuler** : Annule définitivement la transaction

### 5. Export des logs d'audit

Bouton "Export CSV" permettant de télécharger l'ensemble des transactions au format CSV pour analyse externe.

**Format du fichier** :
```csv
ID,Client,Statut,Date,Montant
TRX-2026-001,Kouassi Jean,network_error,2026-04-08 14:23,50 000 FCFA
...
```

---

## États des transactions

### Flux normal
```
draft → pending_payment → payment_confirmed → finalized
```

### États d'erreur
- **failed** : Échec final (ex: paiement refusé)
- **cancelled** : Annulée par un administrateur
- **conflict** : Conflit de données détecté
- **network_error** : Erreur de connectivité

---

## Gestion des erreurs réseau

### Détection automatique

Le système détecte automatiquement :
- **Timeouts** : Pas de réponse après 30 secondes
- **Connexion perdue** : Interruption pendant une opération
- **Conflits** : Données en doublon (NNI, etc.)

### Retry automatique

Pour les erreurs `timeout` et `connection_lost` :
1. Premier retry après 5 minutes
2. Deuxième retry après 15 minutes
3. Troisième retry après 1 heure

Après 3 tentatives échouées, une notification Admin est créée.

### Intervention manuelle

L'administrateur peut :
1. **Forcer resync** : Relancer immédiatement la synchronisation
2. **Corriger** : Modifier les données problématiques
3. **Finaliser** : Valider manuellement si les conditions sont remplies
4. **Annuler** : Supprimer la transaction si non récupérable

---

## Résolution des conflits

### Type de conflit : NNI déjà utilisé

**Scénario** :
Un client crée une souscription offline. Lors de la synchronisation, le système détecte que le NNI existe déjà dans la base.

**Options de résolution** :
1. **Fusion automatique** : Si les données sont identiques (même client, même produit)
2. **Alerte Agent** : Si les données diffèrent légèrement
3. **Escalade Admin** : Si conflit majeur (clients différents, même NNI)

**Actions Admin** :
- Comparer les deux versions
- Valider l'identité du client
- Choisir la version correcte
- Notifier l'agent concerné

---

## Points d'intégration API (simulés)

### Endpoints de gestion Admin

```javascript
// Liste des transactions avec filtre
GET /api/admin/subscriptions?status=network_error

// Détail d'une transaction
GET /api/admin/subscription/:id

// Finaliser manuellement
POST /api/admin/subscription/:id/finalize

// Corriger des données
POST /api/admin/subscription/:id/correct
{
  "field": "nni",
  "value": "CI2026123456"
}

// Annuler une transaction
POST /api/admin/subscription/:id/cancel
{
  "reason": "Erreur de saisie irréparable"
}

// Forcer resync
POST /api/admin/subscription/:id/force-sync

// Export logs
GET /api/admin/logs/export?format=csv&from=2026-04-01&to=2026-04-30
```

---

## Charte graphique

Le module Admin respecte strictement la charte YAKO Africa :

### Couleurs
- **Vert Forêt** `#076834` : Header, actions principales
- **Or Akan** `#F7A400` : Montants, badges en attente
- **Beige Wax** `#FDF8F2` : Fond de page
- **Rouge erreur** `#E53E3E` : Erreurs critiques
- **Vert succès** `#0D8E46` : Transactions finalisées

### Typographie
- **Titres** : Sora (Bold, Semibold)
- **Corps** : Plus Jakarta Sans (Regular, Medium)
- **Chiffres** : Sora (pour les montants et KPIs)

### Espacement
- Header : 160-200px mobile-optimized
- Zones tactiles : minimum 44px
- Grilles : 6 colonnes (gap: 1.5rem)

---

## Workflow de démonstration Hackathon

### Scénario 1 : Transaction avec timeout
1. Créer une souscription (Phase 1-4)
2. Simuler une perte de connexion lors du paiement
3. Afficher l'erreur dans la console Admin
4. Montrer le retry automatique
5. Forcer resync manuellement
6. Finaliser la transaction

### Scénario 2 : Conflit de NNI
1. Créer une souscription offline
2. Créer une deuxième souscription avec le même NNI
3. Afficher le conflit dans Admin
4. Comparer les deux versions
5. Résoudre le conflit (fusion ou annulation)

### Scénario 3 : Export logs d'audit
1. Afficher la liste complète des transactions
2. Filtrer par période ou statut
3. Exporter en CSV
4. Montrer l'utilisation externe (Excel, analyse)

---

## Optimisations techniques

### Performance
- Pagination côté serveur (50 transactions/page)
- Lazy loading de la timeline
- Debounce sur la recherche (300ms)

### Offline-ready
- Cache local des transactions récentes
- Synchronisation en arrière-plan
- Bannière de statut réseau

### Sécurité
- Authentification Admin requise (non implémentée en MVP)
- Logs d'audit immuables
- Historique complet des modifications

---

## Prochaines améliorations

### Phase 2
- [ ] Authentification Admin (2FA)
- [ ] Permissions granulaires (Super Admin, Agent Admin)
- [ ] Notifications push pour erreurs critiques
- [ ] Dashboard analytics avec graphiques
- [ ] Gestion batch des transactions

### Phase 3
- [ ] Machine learning pour détection d'anomalies
- [ ] Résolution automatique des conflits simples
- [ ] API webhooks pour systèmes externes
- [ ] Support multi-langue (FR, EN)

---

## Support technique

Pour toute question ou problème :
- **Email** : admin@yakoafrica.ci
- **Documentation** : https://docs.yakoafrica.ci/admin
- **Slack** : #yako-admin-support

---

**Version** : 1.0.0
**Dernière mise à jour** : 8 avril 2026
**Auteur** : Équipe AssuRStable × YAKO Africa
