Objectif  
Créer un prototype cliquable complet pour le parcours de souscription digitalisé YAKO Africa Assurances Vie, conforme au cahier des charges et à la charte AssuRStable × YAKO, en intégrant toutes les modifications demandées et la possibilité d’intégrer des API réelles ou simulées.

1 Spécifications visuelles et responsive
Charte : Vert Forêt #076834, Or Akan #F7A400, Beige Terre #FDF8F2.

Polices : Sora pour titres (grands titres : Sora Bold, tailles responsive H1/H2/H3), Plus Jakarta Sans pour corps. Revoir la police des grands titres : proposer Sora 36/32/28 selon breakpoint.

Logo : fournir SVG transparent + version sur fond blanc.

Header : image de fond pour chaque phase (optimisée web, légère). Hauteur responsive : mobile (360px width) → header height 160–200px; tablette/desktop → proportionnelle.

Accessibilité : zones tactiles ≥44px, contraste conforme, optimisation faible data.

2 Parcours et navigation (règles globales)
Couvrir les 5 phases : DEMANDE, QUALIFICATION, PROPOSITION, VALIDATION, SOUSCRIPTION.

Scénarios A et B : Agent (remplit sur son appareil) et Client (QR / lien tokenisé).

Navigation obligatoire : chaque écran doit proposer Retour, Modifier, Continuer selon le contexte. Corriger les écrans où il manque le bouton Retour (notamment Phase 3 et Phase 4). Le bouton Modifier renvoie au formulaire précédent et conserve les données.

Persistances : sauvegarde automatique locale des données saisies (état visible) pour éviter toute perte en cas de coupure réseau ou courant.

Offline : mode hors‑ligne complet pour les étapes autorisées, file locale de synchronisation, écran état offline, bouton “Synchroniser maintenant”.

3 Détails par phase et composants clés
Phase 1 DEMANDE

Écran d’accueil : logo transparent sur fond blanc, choix produit (YAKO Éternité, Yako Soutra, Doihoo corrigé), CTA principal vert.

Formulaire identité : Scan CNI (OCR) + saisie manuelle alternative ; préremplissage ; vérification complétude.

Header image, responsive; actions : Retour / Continuer / Sauvegarder hors‑ligne.

Phase 2 QUALIFICATION (visuel identique à Phase 1)

Validation identité via API ONECI simulée ; contrôle LCB/FT ; enregistrement bénéficiaires/ayants droit.

Badges statut (Contrat actif / En attente / Paiement échoué).

Navigation : Retour / Modifier / Continuer.

Phase 3 PROPOSITION (visuel identique à Phase 1)

Simulateur prime en temps réel (capital, durée, âge) ; montants en Or Akan #F7A400.

Personnalisation (sliders/inputs) ; comparaison produits.

Ajouter bouton Retour et bouton Valider.

Phase 4 VALIDATION

Récapitulatif complet ; CG/CP PDF simulé ; consentement via OTP SMS (composant OTP 6 cases vert forêt) ; option empreinte digitale ; signature électronique simulée.

Ajouter bouton Retour en plus de Modifier/Continuer.

Option “Recevoir le contrat par email” (aperçu email simulé).

Phase 5 SOUSCRIPTION

Paiement Mobile Money : logos Wave, Orange, MTN, Moov (SVG).

Wave : choix méthode → Wave Mobile, Carte Visa Wave, Carte bancaire Wave.

Ajouter options : Paiement par RIB et Paiement via Djamo.

Confirmation paiement + reçu numérique ; génération identifiant client unique ; envoi contrat PDF ; email de confirmation paiement.

Composants transverses

OTP (6 cases), empreinte digitale (modal simulé), badges statut, cartes contrat, boutons (primaire vert, action or), champs formulaires, nav bottom.

Admin : vue Admin distincte (gestion produits, revue manuelle, logs, export CSV).

Double vue dashboard : Agent / Client / Admin, accès strict selon rôle.

4 Offline, synchronisation et gestion des conflits
Étapes offline-ready : DEMANDE, QUALIFICATION (pré‑validation locale), PROPOSITION, VALIDATION (préparation signature locale), SOUSCRIPTION (création locale du dossier).

Étapes nécessitant connexion : envoi OTP, paiement Mobile Money, vérification ONECI (si indisponible → marquer “à valider à la sync”).

Stratégie sync : automatique au retour réseau + bouton “Synchroniser maintenant”.

Gestion conflits : détection par NNI / nom+dob → options : fusion automatique si NNI identique, alerte agent pour choix manuel, ou création de doublon marqué “à revoir”.

UI offline : bannière “Hors‑ligne — données sauvegardées localement”, liste éléments en attente, écran conflits.

5 Intégration API et endpoints recommandés (placeholders pour dev)
Prévoir champs d’intégration dans le prototype (indicateurs d’appel API, console/log simulé).

Endpoints suggérés (simulés ou réels) :

POST /api/simulate-prime → payload {product, age, capital, duration} → response {prime, breakdown}

POST /api/create-subscription → payload {client, agentCode, product} → response {subscriptionId, clientId}

POST /api/send-otp → payload {phone} → response {otpId, expiresIn}

POST /api/verify-otp → payload {otpId, code} → response {verified:true}

POST /api/create-payment → payload {subscriptionId, method, details} → response {paymentId, status}

POST /api/sync-offline → payload {localRecords[]} → response {synced:true, conflicts:[]}

GET /api/oneci-verify → payload {nni} → response {valid:true, data}

Indiquer dans Figma où chaque appel est attendu et afficher l’état (pending/success/error).

Masquer toute donnée sensible (PIN Mobile Money) dans l’UI.

6 Assets, exports et livrables pour handoff
Assets à exporter : logo SVG transparent + fond blanc; icônes paiement SVG (Wave, MTN, Orange, Moov, Djamo); empreinte digitale SVG; QR placeholder; images header webp/avif (1x/2x).

Design tokens JSON : couleurs, fonts, sizes, spacing, radii.

Composants : boutons, champs, OTP boxes, badges, cards, nav.

Frames nommés : hiérarchie claire (Onboarding/ScanCNI, Qualification/VerifyONECI, Proposal/Simulator, Validation/OTP, Payment/WaveOptions, Agent/Dashboard, Admin/Backoffice).

Interactions à inclure : Retour / Modifier / Continuer, états offline, sync, OTP flow, empreinte, paiement success/fail, email preview.

Livrables : lien prototype Figma cliquable, 6–8 captures exportées (Onboarding, Simulation, OTP, Paiement, Reçu, Dashboard Agent, Offline sync), design tokens JSON, schéma d’architecture PNG.

Consignes finales pour le designer et l’équipe dev
Appliquer la correction orthographique : Doihoo → Doihoo partout.

Vérifier que toutes les parties ont bien pris les modifications (police, boutons retour, header image, offline states, admin view).

Documenter dans Figma les points d’intégration API (endpoint, payload attendu, état).

Préparer un petit README handoff listant assets, tokens, endpoints simulés et interactions pour l’équipe Flutter/React.