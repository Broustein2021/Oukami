# API Specification - YAKO Africa Backend

## Base URL
```
Production: https://api.yakoafrica.ci/v1
Staging: https://staging-api.yakoafrica.ci/v1
Development: http://localhost:3000/api/v1
```

---

## Authentication

Toutes les requêtes nécessitent un token JWT dans le header :
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Simulation de prime

**Endpoint** : `POST /simulate-prime`

**Description** : Calcule la prime d'assurance en temps réel

**Payload** :
```json
{
  "product": "eternite|soutra|doiho|cadence",
  "capital": 5000000,
  "duration": 20,
  "age": 35,
  "frequency": "monthly|quarterly|annual"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "monthlyPrime": 50000,
    "quarterlyPrime": 145000,
    "annualPrime": 560000,
    "totalCapital": 5000000,
    "totalPaid": 12000000,
    "roi": 2.4
  }
}
```

---

### 2. Création de souscription

**Endpoint** : `POST /create-subscription`

**Description** : Crée une nouvelle souscription (Phase 1-3)

**Payload** :
```json
{
  "agentId": "AG-2026-0407",
  "product": "eternite",
  "clientData": {
    "firstName": "Kouassi",
    "lastName": "Jean",
    "nni": "CI2026123456",
    "dateOfBirth": "1985-03-15",
    "phone": "+2250708123456",
    "email": "kouassi.jean@email.ci",
    "address": "Abidjan, Cocody",
    "profession": "Enseignant"
  },
  "beneficiaries": [
    {
      "firstName": "Kouassi",
      "lastName": "Marie",
      "relationship": "Épouse",
      "percentage": 60
    },
    {
      "firstName": "Kouassi",
      "lastName": "Patrick",
      "relationship": "Fils",
      "percentage": 40
    }
  ],
  "propositionData": {
    "capital": 5000000,
    "duration": 20,
    "frequency": "monthly",
    "monthlyPrime": 50000
  },
  "offline": false
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "transactionId": "TRX-2026-001",
    "clientId": "CLI-2026-456",
    "status": "pending_payment",
    "createdAt": "2026-04-08T14:23:00Z",
    "expiresAt": "2026-04-10T14:23:00Z"
  }
}
```

**Erreurs possibles** :
- `400` : Données invalides
- `409` : NNI déjà existant (conflit)
- `503` : Service temporairement indisponible

---

### 3. Envoi OTP

**Endpoint** : `POST /send-otp`

**Description** : Envoie un code OTP à 6 chiffres par SMS

**Payload** :
```json
{
  "phone": "+2250708123456",
  "transactionId": "TRX-2026-001",
  "purpose": "signature|payment"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "otpSent": true,
    "expiresIn": 300,
    "remainingAttempts": 3
  }
}
```

---

### 4. Vérification OTP

**Endpoint** : `POST /verify-otp`

**Description** : Vérifie le code OTP saisi

**Payload** :
```json
{
  "phone": "+2250708123456",
  "transactionId": "TRX-2026-001",
  "otp": "123456"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "verified": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Erreurs** :
- `400` : OTP invalide
- `429` : Trop de tentatives

---

### 5. Création de paiement

**Endpoint** : `POST /create-payment`

**Description** : Initie un paiement Mobile Money

**Payload** :
```json
{
  "transactionId": "TRX-2026-001",
  "provider": "wave|orange|mtn|moov",
  "method": "mobile|card|bank",
  "phone": "+2250708123456",
  "amount": 50000,
  "currency": "XOF"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "paymentId": "PAY-2026-789",
    "status": "pending",
    "provider": "wave",
    "confirmationUrl": "https://wave.com/confirm/xyz",
    "expiresIn": 600
  }
}
```

**Workflow** :
1. Client initie le paiement
2. API retourne une URL de confirmation
3. Client valide sur l'app Mobile Money
4. Webhook notifie le statut
5. API met à jour la transaction

---

### 6. Synchronisation offline

**Endpoint** : `POST /sync-offline`

**Description** : Synchronise les transactions créées offline

**Payload** :
```json
{
  "agentId": "AG-2026-0407",
  "transactions": [
    {
      "localId": "LOCAL-001",
      "timestamp": "2026-04-08T10:30:00Z",
      "product": "eternite",
      "clientData": { ... },
      "beneficiaries": [ ... ],
      "propositionData": { ... }
    }
  ]
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "synced": 1,
    "conflicts": 0,
    "failed": 0,
    "results": [
      {
        "localId": "LOCAL-001",
        "transactionId": "TRX-2026-002",
        "status": "synced"
      }
    ]
  }
}
```

**Cas de conflit** :
```json
{
  "success": false,
  "data": {
    "synced": 0,
    "conflicts": 1,
    "failed": 0,
    "results": [
      {
        "localId": "LOCAL-001",
        "status": "conflict",
        "reason": "NNI_ALREADY_EXISTS",
        "existingTransactionId": "TRX-2026-003",
        "conflictDetails": {
          "field": "nni",
          "localValue": "CI2026123456",
          "serverValue": "CI2026123456",
          "existingClient": "Traoré Aminata"
        }
      }
    ]
  }
}
```

---

## Admin Endpoints

### 7. Liste des souscriptions

**Endpoint** : `GET /admin/subscriptions`

**Query params** :
- `status` : draft|pending_payment|payment_confirmed|finalized|failed|cancelled|conflict|network_error
- `agentId` : Filtre par agent
- `dateFrom` : Date de début (ISO 8601)
- `dateTo` : Date de fin (ISO 8601)
- `page` : Numéro de page (défaut: 1)
- `limit` : Résultats par page (défaut: 50, max: 100)
- `search` : Recherche par ID, NNI, nom

**Response** :
```json
{
  "success": true,
  "data": {
    "total": 1247,
    "page": 1,
    "limit": 50,
    "pages": 25,
    "transactions": [
      {
        "id": "TRX-2026-001",
        "client": {
          "firstName": "Kouassi",
          "lastName": "Jean",
          "nni": "CI2026123456"
        },
        "product": "eternite",
        "amount": 50000,
        "status": "network_error",
        "errorType": "timeout",
        "retryCount": 3,
        "lastRetry": "2026-04-08T14:45:00Z",
        "agentId": "AG-2026-0407",
        "createdAt": "2026-04-08T14:23:00Z",
        "updatedAt": "2026-04-08T14:45:00Z"
      }
    ]
  }
}
```

---

### 8. Détail d'une souscription

**Endpoint** : `GET /admin/subscription/:id`

**Response** :
```json
{
  "success": true,
  "data": {
    "id": "TRX-2026-001",
    "client": {
      "firstName": "Kouassi",
      "lastName": "Jean",
      "nni": "CI2026123456",
      "phone": "+2250708123456",
      "email": "kouassi.jean@email.ci"
    },
    "product": "eternite",
    "amount": 50000,
    "status": "network_error",
    "errorType": "timeout",
    "retryCount": 3,
    "lastRetry": "2026-04-08T14:45:00Z",
    "agentId": "AG-2026-0407",
    "timeline": [
      {
        "timestamp": "2026-04-08T14:20:00Z",
        "action": "subscription_created",
        "status": "success",
        "actor": "system",
        "details": null
      },
      {
        "timestamp": "2026-04-08T14:22:00Z",
        "action": "identity_verified",
        "status": "success",
        "actor": "oneci_api",
        "details": null
      },
      {
        "timestamp": "2026-04-08T14:23:00Z",
        "action": "payment_attempt",
        "status": "error",
        "actor": "wave_api",
        "details": "Timeout après 30s - Connexion instable"
      },
      {
        "timestamp": "2026-04-08T14:30:00Z",
        "action": "auto_retry_1",
        "status": "error",
        "actor": "system",
        "details": "Échec - Serveur non accessible"
      }
    ],
    "metadata": {
      "userAgent": "Mozilla/5.0...",
      "ipAddress": "41.203.XXX.XXX",
      "deviceType": "mobile"
    }
  }
}
```

---

### 9. Finaliser une transaction

**Endpoint** : `POST /admin/subscription/:id/finalize`

**Description** : Finalise manuellement une transaction

**Payload** :
```json
{
  "reason": "Paiement confirmé manuellement",
  "adminId": "ADMIN-001"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "transactionId": "TRX-2026-001",
    "previousStatus": "network_error",
    "newStatus": "finalized",
    "finalizedAt": "2026-04-08T15:00:00Z",
    "finalizedBy": "ADMIN-001"
  }
}
```

---

### 10. Corriger une transaction

**Endpoint** : `POST /admin/subscription/:id/correct`

**Description** : Corrige des données erronées

**Payload** :
```json
{
  "corrections": {
    "clientData.nni": "CI2026654321",
    "amount": 55000
  },
  "reason": "Correction suite à erreur de saisie",
  "adminId": "ADMIN-001"
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "transactionId": "TRX-2026-001",
    "correctedFields": ["clientData.nni", "amount"],
    "correctedAt": "2026-04-08T15:10:00Z",
    "correctedBy": "ADMIN-001"
  }
}
```

---

### 11. Annuler une transaction

**Endpoint** : `POST /admin/subscription/:id/cancel`

**Payload** :
```json
{
  "reason": "Erreur irréparable - Client a déjà un contrat actif",
  "adminId": "ADMIN-001",
  "notifyAgent": true,
  "notifyClient": false
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "transactionId": "TRX-2026-001",
    "status": "cancelled",
    "cancelledAt": "2026-04-08T15:20:00Z",
    "cancelledBy": "ADMIN-001"
  }
}
```

---

### 12. Forcer resync

**Endpoint** : `POST /admin/subscription/:id/force-sync`

**Description** : Force la resynchronisation immédiate

**Payload** :
```json
{
  "adminId": "ADMIN-001",
  "skipValidation": false
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "transactionId": "TRX-2026-001",
    "syncStatus": "in_progress",
    "syncId": "SYNC-456",
    "estimatedTime": 30
  }
}
```

**Webhook callback** :
```json
{
  "event": "sync_completed",
  "transactionId": "TRX-2026-001",
  "syncId": "SYNC-456",
  "status": "success|failed",
  "completedAt": "2026-04-08T15:25:00Z",
  "details": "Transaction synchronisée avec succès"
}
```

---

### 13. Export logs d'audit

**Endpoint** : `GET /admin/logs/export`

**Query params** :
- `format` : csv|json|xlsx
- `dateFrom` : Date de début
- `dateTo` : Date de fin
- `status` : Filtre par statut
- `agentId` : Filtre par agent

**Response** :
```
Content-Type: text/csv
Content-Disposition: attachment; filename="yako_audit_logs_2026-04-08.csv"

ID,Client,NNI,Produit,Montant,Statut,Agent,Date Création,Dernière MAJ
TRX-2026-001,Kouassi Jean,CI2026123456,YAKO Éternité,50000,network_error,AG-2026-0407,2026-04-08 14:23,2026-04-08 14:45
...
```

---

## Webhooks

### Configuration
```json
{
  "webhookUrl": "https://client.yakoafrica.ci/api/webhook",
  "events": [
    "payment.completed",
    "payment.failed",
    "sync.completed",
    "conflict.detected"
  ],
  "secret": "whsec_xxx"
}
```

### Payload exemple
```json
{
  "event": "payment.completed",
  "timestamp": "2026-04-08T15:30:00Z",
  "data": {
    "transactionId": "TRX-2026-001",
    "paymentId": "PAY-2026-789",
    "amount": 50000,
    "provider": "wave",
    "status": "completed"
  },
  "signature": "sha256_signature_here"
}
```

---

## Codes d'erreur

| Code | Description |
|------|-------------|
| 400 | Bad Request - Données invalides |
| 401 | Unauthorized - Token manquant/invalide |
| 403 | Forbidden - Permissions insuffisantes |
| 404 | Not Found - Ressource introuvable |
| 409 | Conflict - Conflit de données (ex: NNI existant) |
| 429 | Too Many Requests - Rate limit dépassé |
| 500 | Internal Server Error |
| 503 | Service Unavailable - Service temporairement indisponible |

---

## Rate Limiting

- **Publiques** : 100 requêtes/minute
- **Admin** : 500 requêtes/minute
- **Webhooks** : Illimité

Header de réponse :
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1712582400
```

---

## Database Schema (résumé)

### Table: transactions
```sql
CREATE TABLE transactions (
  id VARCHAR(50) PRIMARY KEY,
  client_id VARCHAR(50),
  agent_id VARCHAR(50),
  product VARCHAR(50),
  amount INTEGER,
  status VARCHAR(50),
  error_type VARCHAR(50),
  retry_count INTEGER DEFAULT 0,
  last_retry TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  metadata JSONB
);
```

### Table: timeline_events
```sql
CREATE TABLE timeline_events (
  id SERIAL PRIMARY KEY,
  transaction_id VARCHAR(50),
  timestamp TIMESTAMP,
  action VARCHAR(100),
  status VARCHAR(20),
  actor VARCHAR(50),
  details TEXT,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);
```

---

**Version** : 1.0.0
**Dernière mise à jour** : 8 avril 2026
