# Database Schema - YAKO Africa

## Vue d'ensemble

Base de données PostgreSQL pour la gestion des souscriptions d'assurance vie YAKO Africa.

---

## Tables principales

### 1. clients

Stocke les informations des clients.

```sql
CREATE TABLE clients (
  id VARCHAR(50) PRIMARY KEY, -- CLI-YYYY-XXXXX
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  nni VARCHAR(20) UNIQUE NOT NULL, -- Numéro National d'Identification
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  address TEXT,
  profession VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB,

  INDEX idx_nni (nni),
  INDEX idx_phone (phone),
  INDEX idx_email (email)
);
```

**Règles métier** :
- NNI unique obligatoire
- Âge minimum : 18 ans
- Téléphone au format international (+225XXXXXXXXX)

---

### 2. agents

Stocke les informations des agents commerciaux.

```sql
CREATE TABLE agents (
  id VARCHAR(50) PRIMARY KEY, -- AG-YYYY-XXXXX
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  region VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active', -- active|inactive|suspended
  qr_token VARCHAR(255), -- Token unique pour QR code
  qr_token_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_email (email),
  INDEX idx_status (status)
);
```

**Règles métier** :
- Token QR renouvelé toutes les 48h
- Maximum 50 souscriptions actives par agent

---

### 3. transactions

Table centrale pour toutes les souscriptions.

```sql
CREATE TABLE transactions (
  id VARCHAR(50) PRIMARY KEY, -- TRX-YYYY-XXXXX
  client_id VARCHAR(50) NOT NULL,
  agent_id VARCHAR(50) NOT NULL,
  product VARCHAR(50) NOT NULL, -- eternite|soutra|doiho|cadence
  amount INTEGER NOT NULL, -- Montant en FCFA
  frequency VARCHAR(20), -- monthly|quarterly|annual
  duration INTEGER, -- Durée en années
  capital INTEGER, -- Capital assuré
  status VARCHAR(50) DEFAULT 'draft',

  -- Gestion des erreurs
  error_type VARCHAR(50), -- timeout|connection_lost|server_error|payment_failed
  retry_count INTEGER DEFAULT 0,
  last_retry TIMESTAMP,
  max_retries INTEGER DEFAULT 3,

  -- Métadonnées
  offline_created BOOLEAN DEFAULT false,
  local_id VARCHAR(50), -- ID local pour synchronisation offline
  sync_status VARCHAR(20), -- pending|synced|conflict

  -- Audit
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finalized_at TIMESTAMP,
  cancelled_at TIMESTAMP,

  -- Données supplémentaires
  metadata JSONB,

  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (agent_id) REFERENCES agents(id),

  INDEX idx_status (status),
  INDEX idx_error_type (error_type),
  INDEX idx_agent_id (agent_id),
  INDEX idx_created_at (created_at),
  INDEX idx_sync_status (sync_status)
);
```

**États possibles** :
- `draft` : Brouillon initial
- `pending_payment` : En attente de paiement
- `payment_confirmed` : Paiement confirmé
- `finalized` : Transaction finalisée
- `failed` : Échec définitif
- `cancelled` : Annulée
- `conflict` : Conflit de données
- `network_error` : Erreur réseau

**Règles métier** :
- Montant minimum : 3 000 FCFA
- Durée : 5 à 30 ans
- Maximum 3 tentatives de resync automatique
- Expiration après 48h si non finalisée

---

### 4. beneficiaries

Bénéficiaires d'un contrat.

```sql
CREATE TABLE beneficiaries (
  id SERIAL PRIMARY KEY,
  transaction_id VARCHAR(50) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  relationship VARCHAR(50) NOT NULL, -- Époux/Épouse, Fils, Fille, Parent, etc.
  percentage INTEGER NOT NULL, -- Pourcentage du capital
  date_of_birth DATE,
  phone VARCHAR(20),

  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,

  CHECK (percentage > 0 AND percentage <= 100)
);
```

**Règles métier** :
- Total des pourcentages = 100%
- Minimum 1 bénéficiaire
- Maximum 5 bénéficiaires

---

### 5. timeline_events

Historique complet de chaque transaction.

```sql
CREATE TABLE timeline_events (
  id SERIAL PRIMARY KEY,
  transaction_id VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  action VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL, -- success|error|pending
  actor VARCHAR(50), -- system|agent|admin|api_name
  details TEXT,
  metadata JSONB,

  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,

  INDEX idx_transaction_id (transaction_id),
  INDEX idx_timestamp (timestamp)
);
```

**Actions courantes** :
- `subscription_created`
- `identity_verified`
- `beneficiaries_added`
- `otp_sent`
- `otp_verified`
- `payment_attempt`
- `payment_confirmed`
- `auto_retry_1`, `auto_retry_2`, `auto_retry_3`
- `manual_resync`
- `admin_finalized`
- `admin_cancelled`
- `conflict_detected`

---

### 6. payments

Détails des paiements Mobile Money.

```sql
CREATE TABLE payments (
  id VARCHAR(50) PRIMARY KEY, -- PAY-YYYY-XXXXX
  transaction_id VARCHAR(50) NOT NULL,
  provider VARCHAR(20) NOT NULL, -- wave|orange|mtn|moov
  method VARCHAR(20), -- mobile|card|bank
  phone VARCHAR(20) NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'XOF',
  status VARCHAR(20) DEFAULT 'pending',

  -- IDs externes
  provider_transaction_id VARCHAR(100),
  provider_confirmation_code VARCHAR(50),

  -- Métadonnées
  initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  failed_at TIMESTAMP,
  failure_reason TEXT,

  FOREIGN KEY (transaction_id) REFERENCES transactions(id),

  INDEX idx_transaction_id (transaction_id),
  INDEX idx_status (status),
  INDEX idx_provider (provider)
);
```

**États de paiement** :
- `pending` : En attente de confirmation
- `processing` : En cours de traitement
- `completed` : Paiement réussi
- `failed` : Paiement échoué
- `refunded` : Remboursé

---

### 7. otp_codes

Codes OTP pour validation.

```sql
CREATE TABLE otp_codes (
  id SERIAL PRIMARY KEY,
  transaction_id VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  code VARCHAR(6) NOT NULL,
  purpose VARCHAR(20) NOT NULL, -- signature|payment
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,

  FOREIGN KEY (transaction_id) REFERENCES transactions(id),

  INDEX idx_transaction_id (transaction_id),
  INDEX idx_code (code),
  INDEX idx_expires_at (expires_at)
);
```

**Règles métier** :
- Code à 6 chiffres
- Validité : 5 minutes
- Maximum 3 tentatives
- Nouveau code après expiration

---

### 8. conflicts

Gestion des conflits de synchronisation.

```sql
CREATE TABLE conflicts (
  id SERIAL PRIMARY KEY,
  transaction_id VARCHAR(50), -- Peut être NULL si transaction non créée
  local_id VARCHAR(50) NOT NULL,
  conflict_type VARCHAR(50) NOT NULL, -- nni_duplicate|data_mismatch|version_conflict
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  resolution_type VARCHAR(50), -- auto_merge|manual_merge|keep_local|keep_server|cancelled
  resolved_by VARCHAR(50), -- ADMIN-XXX

  -- Données conflictuelles
  local_data JSONB,
  server_data JSONB,
  merged_data JSONB,

  INDEX idx_transaction_id (transaction_id),
  INDEX idx_local_id (local_id),
  INDEX idx_resolved_at (resolved_at)
);
```

**Types de conflit** :
- `nni_duplicate` : NNI déjà existant
- `data_mismatch` : Données différentes pour le même NNI
- `version_conflict` : Transaction modifiée côté serveur

**Résolutions** :
- `auto_merge` : Fusion automatique (données identiques)
- `manual_merge` : Fusion manuelle par admin
- `keep_local` : Garder la version locale
- `keep_server` : Garder la version serveur
- `cancelled` : Transaction annulée

---

### 9. audit_logs

Logs d'audit immuables.

```sql
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(50), -- Agent ou Admin
  user_type VARCHAR(20), -- agent|admin|system
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- transaction|client|payment|etc.
  entity_id VARCHAR(50),
  changes JSONB, -- Changements effectués
  ip_address VARCHAR(45),
  user_agent TEXT,

  INDEX idx_timestamp (timestamp),
  INDEX idx_user_id (user_id),
  INDEX idx_entity_id (entity_id),
  INDEX idx_action (action)
);
```

**Actions auditées** :
- Toutes les modifications de transactions
- Résolutions de conflits
- Finalisations manuelles
- Annulations
- Exports de données
- Connexions Admin

---

### 10. admin_users

Utilisateurs administrateurs.

```sql
CREATE TABLE admin_users (
  id VARCHAR(50) PRIMARY KEY, -- ADMIN-XXX
  email VARCHAR(100) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin', -- super_admin|admin|support
  status VARCHAR(20) DEFAULT 'active',

  -- Sécurité
  password_hash VARCHAR(255) NOT NULL,
  two_factor_enabled BOOLEAN DEFAULT false,
  two_factor_secret VARCHAR(100),

  -- Audit
  last_login_at TIMESTAMP,
  last_login_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status)
);
```

**Permissions par rôle** :
- `super_admin` : Tous les droits
- `admin` : Gestion transactions, résolution conflits
- `support` : Vue lecture seule, export logs

---

## Vues utiles

### vue_dashboard_metrics

```sql
CREATE VIEW vue_dashboard_metrics AS
SELECT
  COUNT(*) as total_transactions,
  COUNT(CASE WHEN status = 'network_error' THEN 1 END) as network_errors,
  COUNT(CASE WHEN sync_status = 'pending' THEN 1 END) as pending_sync,
  COUNT(CASE WHEN status = 'finalized' AND DATE(finalized_at) = CURRENT_DATE THEN 1 END) as finalized_today,
  SUM(CASE WHEN status = 'finalized' THEN amount ELSE 0 END) as total_revenue
FROM transactions;
```

### vue_agent_performance

```sql
CREATE VIEW vue_agent_performance AS
SELECT
  a.id as agent_id,
  CONCAT(a.first_name, ' ', a.last_name) as agent_name,
  COUNT(t.id) as total_subscriptions,
  COUNT(CASE WHEN t.status = 'finalized' THEN 1 END) as finalized_count,
  COUNT(CASE WHEN t.status = 'network_error' THEN 1 END) as error_count,
  SUM(CASE WHEN t.status = 'finalized' THEN t.amount ELSE 0 END) as total_revenue,
  ROUND(
    COUNT(CASE WHEN t.status = 'finalized' THEN 1 END)::NUMERIC /
    NULLIF(COUNT(t.id), 0) * 100,
    2
  ) as conversion_rate
FROM agents a
LEFT JOIN transactions t ON a.id = t.agent_id
GROUP BY a.id, a.first_name, a.last_name;
```

---

## Triggers

### 1. Mise à jour automatique de `updated_at`

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

### 2. Vérification des bénéficiaires

```sql
CREATE OR REPLACE FUNCTION check_beneficiary_percentages()
RETURNS TRIGGER AS $$
DECLARE
  total_percentage INTEGER;
BEGIN
  SELECT SUM(percentage) INTO total_percentage
  FROM beneficiaries
  WHERE transaction_id = NEW.transaction_id;

  IF total_percentage > 100 THEN
    RAISE EXCEPTION 'Total des pourcentages ne peut pas dépasser 100%%';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_beneficiary_percentages
BEFORE INSERT OR UPDATE ON beneficiaries
FOR EACH ROW
EXECUTE FUNCTION check_beneficiary_percentages();
```

### 3. Auto-création d'événement timeline

```sql
CREATE OR REPLACE FUNCTION auto_create_timeline_event()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    INSERT INTO timeline_events (transaction_id, action, status, actor)
    VALUES (NEW.id, 'status_changed_to_' || NEW.status, 'success', 'system');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER transaction_status_change
AFTER UPDATE ON transactions
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION auto_create_timeline_event();
```

---

## Index de performance

```sql
-- Index composites pour requêtes Admin
CREATE INDEX idx_transactions_status_created ON transactions(status, created_at DESC);
CREATE INDEX idx_transactions_agent_status ON transactions(agent_id, status);
CREATE INDEX idx_transactions_error_retry ON transactions(error_type, retry_count);

-- Index pour recherche full-text
CREATE INDEX idx_clients_search ON clients
USING gin(to_tsvector('french', first_name || ' ' || last_name));
```

---

## Contraintes de données

```sql
-- Vérifier que le montant est positif
ALTER TABLE transactions
ADD CONSTRAINT chk_amount_positive
CHECK (amount > 0);

-- Vérifier la durée du contrat
ALTER TABLE transactions
ADD CONSTRAINT chk_duration_range
CHECK (duration >= 5 AND duration <= 30);

-- Vérifier que retry_count ne dépasse pas max_retries
ALTER TABLE transactions
ADD CONSTRAINT chk_retry_limit
CHECK (retry_count <= max_retries);

-- Vérifier le format du NNI
ALTER TABLE clients
ADD CONSTRAINT chk_nni_format
CHECK (nni ~ '^CI[0-9]{10}$');
```

---

## Backup et archivage

### Politique de backup
- **Backup complet** : Quotidien à 2h00
- **Backup incrémental** : Toutes les 6h
- **Rétention** : 30 jours en ligne, 1 an en archive

### Archivage des transactions
Transactions de plus de 2 ans archivées dans `transactions_archive`:

```sql
CREATE TABLE transactions_archive (
  LIKE transactions INCLUDING ALL
);

-- Job quotidien d'archivage
INSERT INTO transactions_archive
SELECT * FROM transactions
WHERE finalized_at < NOW() - INTERVAL '2 years';

DELETE FROM transactions
WHERE id IN (SELECT id FROM transactions_archive);
```

---

**Version** : 1.0.0
**SGBD** : PostgreSQL 14+
**Dernière mise à jour** : 8 avril 2026
