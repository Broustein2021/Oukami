import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Download,
  Home,
  Filter,
  Search,
  Activity,
  Database,
  Wifi,
  WifiOff,
  Play,
  Trash2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';

type TransactionStatus =
  | 'draft'
  | 'pending_payment'
  | 'payment_confirmed'
  | 'finalized'
  | 'failed'
  | 'cancelled'
  | 'conflict'
  | 'network_error';

interface Transaction {
  id: string;
  client: string;
  nni?: string;
  produit: string;
  montant: string;
  statut: TransactionStatus;
  date: string;
  agentId: string;
  errorType?: 'timeout' | 'connection_lost' | 'server_error' | 'payment_failed';
  retryCount?: number;
  lastRetry?: string;
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  timestamp: string;
  action: string;
  status: 'success' | 'error' | 'pending';
  details?: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<string[]>([]);

  // Métriques principales
  const metrics = [
    {
      label: 'Transactions totales',
      value: '1,247',
      change: '+12%',
      icon: Database,
      color: '#076834',
    },
    {
      label: 'Erreurs réseau',
      value: '23',
      change: '-8%',
      icon: WifiOff,
      color: '#E53E3E',
    },
    {
      label: 'En attente sync',
      value: '45',
      change: '+5%',
      icon: RefreshCw,
      color: '#F7A400',
    },
    {
      label: 'Finalisées aujourd\'hui',
      value: '89',
      change: '+24%',
      icon: CheckCircle2,
      color: '#0D8E46',
    },
  ];

  // Données simulées de transactions
  const transactions: Transaction[] = [
    {
      id: 'TRX-2026-001',
      client: 'Kouassi Jean',
      nni: 'CI2026123456',
      produit: 'Yako Éternité',
      montant: '50 000 FCFA',
      statut: 'network_error',
      date: '2026-04-08 14:23',
      agentId: 'AG-2026-0407',
      errorType: 'timeout',
      retryCount: 3,
      lastRetry: '2026-04-08 14:45',
      timeline: [
        {
          timestamp: '2026-04-08 14:20',
          action: 'Création souscription',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 14:22',
          action: 'Validation identité',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 14:23',
          action: 'Tentative paiement',
          status: 'error',
          details: 'Timeout après 30s - Connexion instable',
        },
        {
          timestamp: '2026-04-08 14:30',
          action: 'Retry automatique #1',
          status: 'error',
          details: 'Échec - Serveur non accessible',
        },
        {
          timestamp: '2026-04-08 14:40',
          action: 'Retry automatique #2',
          status: 'error',
        },
        {
          timestamp: '2026-04-08 14:45',
          action: 'Retry automatique #3',
          status: 'pending',
        },
      ],
    },
    {
      id: 'TRX-2026-002',
      client: 'Traoré Aminata',
      nni: 'CI2026789012',
      produit: 'Soutra',
      montant: '75 000 FCFA',
      statut: 'pending_payment',
      date: '2026-04-08 13:15',
      agentId: 'AG-2026-0408',
      timeline: [
        {
          timestamp: '2026-04-08 13:10',
          action: 'Création souscription',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 13:13',
          action: 'Validation identité',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 13:15',
          action: 'En attente paiement',
          status: 'pending',
        },
      ],
    },
    {
      id: 'TRX-2026-003',
      client: 'Diabaté Ibrahim',
      nni: 'CI2026345678',
      produit: 'Doihô',
      montant: '100 000 FCFA',
      statut: 'network_error',
      date: '2026-04-08 10:45',
      agentId: 'AG-2026-0409',
      errorType: 'connection_lost',
      retryCount: 1,
      lastRetry: '2026-04-08 11:00',
      timeline: [
        {
          timestamp: '2026-04-08 10:40',
          action: 'Création souscription',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 10:45',
          action: 'Tentative sync',
          status: 'error',
          details: 'Connexion perdue pendant la synchronisation',
        },
        {
          timestamp: '2026-04-08 11:00',
          action: 'Retry automatique #1',
          status: 'pending',
        },
      ],
    },
    {
      id: 'TRX-2026-004',
      client: 'Koné Marie',
      produit: 'Cadence Éducation',
      montant: '120 000 FCFA',
      statut: 'finalized',
      date: '2026-04-08 09:20',
      agentId: 'AG-2026-0407',
      timeline: [
        {
          timestamp: '2026-04-08 09:15',
          action: 'Création souscription',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 09:17',
          action: 'Validation identité',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 09:18',
          action: 'Paiement confirmé',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 09:20',
          action: 'Transaction finalisée',
          status: 'success',
        },
      ],
    },
    {
      id: 'TRX-2026-005',
      client: 'Bamba Seydou',
      nni: 'CI2026567890',
      produit: 'Yako Éternité',
      montant: '60 000 FCFA',
      statut: 'conflict',
      date: '2026-04-08 08:30',
      agentId: 'AG-2026-0410',
      timeline: [
        {
          timestamp: '2026-04-08 08:25',
          action: 'Création souscription offline',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 08:30',
          action: 'Tentative sync',
          status: 'error',
          details: 'Conflit détecté - NNI déjà utilisé',
        },
      ],
    },
    {
      id: 'TRX-2026-006',
      client: 'N\'Guessan Aïcha',
      produit: 'Soutra',
      montant: '85 000 FCFA',
      statut: 'failed',
      date: '2026-04-08 07:15',
      agentId: 'AG-2026-0411',
      errorType: 'payment_failed',
      retryCount: 0,
      timeline: [
        {
          timestamp: '2026-04-08 07:10',
          action: 'Création souscription',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 07:13',
          action: 'Validation identité',
          status: 'success',
        },
        {
          timestamp: '2026-04-08 07:15',
          action: 'Paiement échoué',
          status: 'error',
          details: 'Solde insuffisant',
        },
      ],
    },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesStatus = filterStatus === 'all' || tx.statut === filterStatus;
    const matchesSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.nni?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const networkErrorTransactions = transactions.filter(
    (tx) => tx.statut === 'network_error' || tx.statut === 'conflict'
  );

  const getStatusConfig = (status: TransactionStatus) => {
    const configs = {
      draft: { label: 'Brouillon', bg: '#F4F4F4', text: '#6B7280', icon: Clock },
      pending_payment: { label: 'En attente paiement', bg: '#FFF4DC', text: '#F7A400', icon: Clock },
      payment_confirmed: { label: 'Paiement confirmé', bg: '#E8F5EE', text: '#076834', icon: CheckCircle2 },
      finalized: { label: 'Finalisée', bg: '#E8F5EE', text: '#0D8E46', icon: CheckCircle2 },
      failed: { label: 'Échouée', bg: '#FEE2E2', text: '#E53E3E', icon: XCircle },
      cancelled: { label: 'Annulée', bg: '#F4F4F4', text: '#6B7280', icon: XCircle },
      conflict: { label: 'Conflit', bg: '#FFF4DC', text: '#F7A400', icon: AlertTriangle },
      network_error: { label: 'Erreur réseau', bg: '#FEE2E2', text: '#E53E3E', icon: WifiOff },
    };
    return configs[status];
  };

  const handleRetryTransaction = (txId: string) => {
    console.log('Retry transaction:', txId);
    alert(`Tentative de resynchronisation de la transaction ${txId}...`);
  };

  const handleFinalizeTransaction = (txId: string) => {
    console.log('Finalize transaction:', txId);
    alert(`Transaction ${txId} finalisée manuellement.`);
  };

  const handleCancelTransaction = (txId: string) => {
    console.log('Cancel transaction:', txId);
    if (confirm(`Êtes-vous sûr de vouloir annuler la transaction ${txId} ?`)) {
      alert(`Transaction ${txId} annulée.`);
    }
  };

  const handleCorrectTransaction = (txId: string) => {
    console.log('Correct transaction:', txId);
    alert(`Ouvrir le formulaire de correction pour ${txId}...`);
  };

  const exportLogs = () => {
    const csv = transactions
      .map((tx) => `${tx.id},${tx.client},${tx.statut},${tx.date},${tx.montant}`)
      .join('\n');
    const blob = new Blob([`ID,Client,Statut,Date,Montant\n${csv}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yako_audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleLogExpand = (txId: string) => {
    setExpandedLogs((prev) =>
      prev.includes(txId) ? prev.filter((id) => id !== txId) : [...prev, txId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      {/* Header */}
      <div className="bg-[#076834] text-white px-6 py-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-['Sora'] text-4xl mb-2">Console Admin</h1>
            <p className="text-[#E8F5EE]">Gestion des transactions et résolution des erreurs</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-[#076834] px-6 py-3 rounded-xl hover:bg-[#E8F5EE] flex items-center gap-2 transition-all"
          >
            <Home className="w-5 h-5" />
            Accueil
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Métriques KPIs */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${metric.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      metric.change.startsWith('+') ? 'text-[#0D8E46]' : 'text-[#E53E3E]'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <p className="text-[#6B7280] text-sm mb-1">{metric.label}</p>
                <p className="font-['Sora'] text-4xl text-[#1A1A1A]">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* Section Erreurs Réseau Critiques */}
        {networkErrorTransactions.length > 0 && (
          <div className="bg-white border-l-4 border-[#E53E3E] rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FEE2E2] rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-[#E53E3E]" />
              </div>
              <div className="flex-1">
                <h2 className="font-['Sora'] text-xl text-[#1A1A1A] mb-2">
                  Transactions incomplètes ({networkErrorTransactions.length})
                </h2>
                <p className="text-[#6B7280] mb-4">
                  Transactions bloquées par erreur réseau ou conflit nécessitant une intervention
                </p>
                <div className="space-y-3">
                  {networkErrorTransactions.map((tx) => {
                    const StatusIcon = getStatusConfig(tx.statut).icon;
                    return (
                      <div
                        key={tx.id}
                        className="bg-[#FDF8F2] border border-[#E5E7EB] rounded-lg p-4 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <StatusIcon className="w-5 h-5 text-[#E53E3E]" />
                          <div>
                            <p className="font-bold text-[#1A1A1A]">
                              {tx.id} — {tx.client}
                            </p>
                            <p className="text-sm text-[#6B7280]">
                              {tx.errorType === 'timeout' && 'Timeout après 30s'}
                              {tx.errorType === 'connection_lost' && 'Connexion perdue'}
                              {tx.statut === 'conflict' && 'Conflit de données'}
                              {tx.retryCount !== undefined && ` • ${tx.retryCount} tentatives`}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleRetryTransaction(tx.id)}
                            className="bg-[#076834] text-white px-4 py-2 rounded-lg hover:bg-[#0D8E46] flex items-center gap-2 text-sm transition-all"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Rejouer
                          </button>
                          <button
                            onClick={() => setSelectedTransaction(tx)}
                            className="bg-[#F5EDE4] text-[#1A1A1A] px-4 py-2 rounded-lg hover:bg-[#E5E7EB] text-sm transition-all"
                          >
                            Détails
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl p-6 mb-6 border border-[#E5E7EB]">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Rechercher par ID, client, NNI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7A400] bg-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#6B7280]" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7A400] bg-white"
              >
                <option value="all">Tous les statuts</option>
                <option value="network_error">Erreurs réseau</option>
                <option value="conflict">Conflits</option>
                <option value="pending_payment">En attente paiement</option>
                <option value="failed">Échouées</option>
                <option value="finalized">Finalisées</option>
              </select>
            </div>
            <button
              onClick={exportLogs}
              className="bg-[#076834] text-white px-6 py-3 rounded-xl hover:bg-[#0D8E46] flex items-center gap-2 transition-all"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Liste des transactions */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          <div className="p-6 border-b border-[#E5E7EB]">
            <h2 className="font-['Sora'] text-xl text-[#1A1A1A]">
              Toutes les transactions ({filteredTransactions.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5EDE4]">
                <tr>
                  <th className="text-left p-4 text-sm text-[#6B7280] font-bold">ID Transaction</th>
                  <th className="text-left p-4 text-sm text-[#6B7280] font-bold">Client</th>
                  <th className="text-left p-4 text-sm text-[#6B7280] font-bold">Produit</th>
                  <th className="text-left p-4 text-sm text-[#6B7280] font-bold">Montant</th>
                  <th className="text-left p-4 text-sm text-[#6B7280] font-bold">Statut</th>
                  <th className="text-left p-4 text-sm text-[#6B7280] font-bold">Date</th>
                  <th className="text-left p-4 text-sm text-[#6B7280] font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => {
                  const statusConfig = getStatusConfig(tx.statut);
                  const StatusIcon = statusConfig.icon;
                  const isExpanded = expandedLogs.includes(tx.id);

                  return (
                    <>
                      <tr
                        key={tx.id}
                        className="border-t border-[#F5EDE4] hover:bg-[#FDF8F2] transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleLogExpand(tx.id)}
                              className="text-[#6B7280] hover:text-[#076834]"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                            <span className="font-mono text-sm font-bold">{tx.id}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-bold text-[#1A1A1A]">{tx.client}</p>
                          {tx.nni && <p className="text-xs text-[#6B7280]">{tx.nni}</p>}
                        </td>
                        <td className="p-4 text-sm">{tx.produit}</td>
                        <td className="p-4">
                          <span className="font-['Sora'] text-[#F7A400] font-bold">{tx.montant}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: statusConfig.bg,
                              color: statusConfig.text,
                            }}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-[#6B7280]">{tx.date}</td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedTransaction(tx)}
                            className="text-[#076834] hover:text-[#0D8E46] text-sm font-bold flex items-center gap-1"
                          >
                            Voir
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-[#F5EDE4]">
                          <td colSpan={7} className="p-6">
                            <div className="space-y-3">
                              <p className="text-sm font-bold text-[#1A1A1A] mb-3">
                                Timeline de la transaction
                              </p>
                              {tx.timeline.map((event, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div
                                    className={`w-2 h-2 rounded-full mt-2 ${
                                      event.status === 'success'
                                        ? 'bg-[#0D8E46]'
                                        : event.status === 'error'
                                        ? 'bg-[#E53E3E]'
                                        : 'bg-[#F7A400]'
                                    }`}
                                  />
                                  <div className="flex-1">
                                    <p className="text-sm font-bold text-[#1A1A1A]">{event.action}</p>
                                    <p className="text-xs text-[#6B7280]">{event.timestamp}</p>
                                    {event.details && (
                                      <p className="text-xs text-[#E53E3E] mt-1">{event.details}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Détails Transaction */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-[#076834] text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-['Sora'] text-2xl mb-2">Détails de la transaction</h3>
                  <p className="text-[#E8F5EE] font-mono">{selectedTransaction.id}</p>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-white hover:text-[#F7A400] transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations principales */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wide mb-1">Client</p>
                  <p className="font-bold text-[#1A1A1A]">{selectedTransaction.client}</p>
                  {selectedTransaction.nni && (
                    <p className="text-sm text-[#6B7280]">NNI: {selectedTransaction.nni}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wide mb-1">Produit</p>
                  <p className="font-bold text-[#1A1A1A]">{selectedTransaction.produit}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wide mb-1">Montant</p>
                  <p className="font-['Sora'] text-2xl font-bold text-[#F7A400]">
                    {selectedTransaction.montant}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wide mb-1">Agent</p>
                  <p className="font-bold text-[#1A1A1A]">{selectedTransaction.agentId}</p>
                </div>
              </div>

              {/* Statut et erreur */}
              {(selectedTransaction.statut === 'network_error' ||
                selectedTransaction.statut === 'conflict') && (
                <div className="bg-[#FEE2E2] border border-[#E53E3E] rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#E53E3E] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#E53E3E] mb-1">
                        {selectedTransaction.errorType === 'timeout' && 'Timeout de connexion'}
                        {selectedTransaction.errorType === 'connection_lost' && 'Connexion perdue'}
                        {selectedTransaction.statut === 'conflict' && 'Conflit de données détecté'}
                      </p>
                      <p className="text-sm text-[#1A1A1A]">
                        {selectedTransaction.retryCount} tentatives de resynchronisation
                      </p>
                      {selectedTransaction.lastRetry && (
                        <p className="text-xs text-[#6B7280] mt-1">
                          Dernière tentative: {selectedTransaction.lastRetry}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <p className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#076834]" />
                  Timeline complète
                </p>
                <div className="space-y-4 border-l-2 border-[#E5E7EB] pl-6 ml-2">
                  {selectedTransaction.timeline.map((event, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[29px] w-4 h-4 rounded-full border-2 border-white ${
                          event.status === 'success'
                            ? 'bg-[#0D8E46]'
                            : event.status === 'error'
                            ? 'bg-[#E53E3E]'
                            : 'bg-[#F7A400]'
                        }`}
                      />
                      <p className="text-sm font-bold text-[#1A1A1A]">{event.action}</p>
                      <p className="text-xs text-[#6B7280]">{event.timestamp}</p>
                      {event.details && (
                        <p className="text-sm text-[#E53E3E] mt-1 bg-[#FEE2E2] px-3 py-2 rounded-lg inline-block">
                          {event.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-[#E5E7EB]">
                {(selectedTransaction.statut === 'network_error' ||
                  selectedTransaction.statut === 'conflict') && (
                  <button
                    onClick={() => {
                      handleRetryTransaction(selectedTransaction.id);
                      setSelectedTransaction(null);
                    }}
                    className="flex-1 bg-[#076834] text-white px-6 py-3 rounded-xl hover:bg-[#0D8E46] flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Forcer resync
                  </button>
                )}
                {selectedTransaction.statut !== 'finalized' && (
                  <>
                    <button
                      onClick={() => {
                        handleFinalizeTransaction(selectedTransaction.id);
                        setSelectedTransaction(null);
                      }}
                      className="flex-1 bg-[#0D8E46] text-white px-6 py-3 rounded-xl hover:bg-[#076834] flex items-center justify-center gap-2 transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Finaliser
                    </button>
                    <button
                      onClick={() => {
                        handleCorrectTransaction(selectedTransaction.id);
                        setSelectedTransaction(null);
                      }}
                      className="flex-1 bg-[#F7A400] text-white px-6 py-3 rounded-xl hover:bg-[#C47D00] flex items-center justify-center gap-2 transition-all"
                    >
                      <Play className="w-5 h-5" />
                      Corriger
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    handleCancelTransaction(selectedTransaction.id);
                    setSelectedTransaction(null);
                  }}
                  className="bg-[#E53E3E] text-white px-6 py-3 rounded-xl hover:bg-[#DC2626] flex items-center gap-2 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
