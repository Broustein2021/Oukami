import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { QrCode, Users, Clock, CheckCircle, XCircle, Bell, Home, TrendingUp } from 'lucide-react';
import QRCodeGenerator from 'qrcode';

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [agentId] = useState('AG-2026-0407');
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Générer le QR code pour l'agent
    if (qrCanvasRef.current) {
      const qrData = JSON.stringify({
        type: 'YAKO_AGENT',
        agentId: agentId,
        timestamp: new Date().toISOString()
      });
      
      QRCodeGenerator.toCanvas(qrCanvasRef.current, qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#076834',
          light: '#FFFFFF'
        }
      }).catch((err) => console.error('Erreur génération QR:', err));
    }
  }, [agentId]);

  const subscriptions = [
    { id: 'SUB001', client: 'Kouassi Jean', produit: 'Yako Éternité', statut: 'Complété', date: '2026-04-07 14:30', montant: '50 000 FCFA' },
    { id: 'SUB002', client: 'Traoré Aminata', produit: 'Soutra', statut: 'En cours', date: '2026-04-07 13:15', montant: '75 000 FCFA' },
    { id: 'SUB003', client: 'Diabaté Ibrahim', produit: 'Doihô', statut: 'Abandonné', date: '2026-04-07 10:45', montant: '100 000 FCFA' },
    { id: 'SUB004', client: 'Koné Marie', produit: 'Cadence Éducation', statut: 'Complété', date: '2026-04-06 16:20', montant: '120 000 FCFA' },
    { id: 'SUB005', client: 'Bamba Seydou', produit: 'Yako Éternité', statut: 'En cours', date: '2026-04-06 11:00', montant: '60 000 FCFA' },
  ];

  const stats = [
    { label: 'Souscriptions totales', value: '47', icon: Users, color: '#076834' },
    { label: 'En cours', value: '12', icon: Clock, color: '#F7A400' },
    { label: 'Complétées', value: '32', icon: CheckCircle, color: '#0D8E46' },
    { label: 'Abandonnées', value: '3', icon: XCircle, color: '#E53E3E' },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <div className="bg-[#076834] text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-['Sora'] text-3xl mb-1">Tableau de Bord Agent</h1>
            <p className="text-[#E8F5EE]">ID Agent: {agentId}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-[#076834] px-4 py-2 rounded-lg hover:bg-[#E8F5EE] flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Accueil
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${stat.color}15` }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <p className="text-[#6B7280] text-sm">{stat.label}</p>
                <p className="font-['Sora'] text-3xl text-[#1A1A1A] mt-1">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
                <h2 className="font-['Sora'] text-xl text-[#1A1A1A]">Souscriptions récentes</h2>
                <button className="text-[#076834] hover:text-[#0D8E46] text-sm">
                  Voir tout
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5EDE4]">
                    <tr>
                      <th className="text-left p-4 text-sm text-[#6B7280]">ID</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Client</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Produit</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Montant</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Statut</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="border-t border-[#F5EDE4] hover:bg-[#FDF8F2]">
                        <td className="p-4 text-sm">{sub.id}</td>
                        <td className="p-4 text-sm">{sub.client}</td>
                        <td className="p-4 text-sm">{sub.produit}</td>
                        <td className="p-4 text-sm font-['Sora'] text-[#F7A400]">{sub.montant}</td>
                        <td className="p-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                            sub.statut === 'Complété' ? 'bg-[#E8F5EE] text-[#076834]' :
                            sub.statut === 'En cours' ? 'bg-[#FFF4DC] text-[#F7A400]' :
                            'bg-red-50 text-red-700'
                          }`}>
                            {sub.statut}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-[#6B7280]">{sub.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#076834]" />
                QR Code Agent
              </h3>
              <div className="bg-[#F5EDE4] rounded-lg p-6 text-center">
                <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center border-2 border-[#C2E0CE]">
                  <canvas ref={qrCanvasRef} />
                </div>
                <p className="text-sm text-[#6B7280]">Scannez pour lier un client</p>
                <p className="text-xs text-[#6B7280] mt-1">{agentId}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#076834]" />
                Notifications
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#E8F5EE] rounded-lg border-l-4 border-[#076834]">
                  <p className="text-sm text-[#1A1A1A]">Souscription complétée</p>
                  <p className="text-xs text-[#6B7280] mt-1">Kouassi Jean - SUB001</p>
                </div>
                <div className="p-3 bg-[#FFF4DC] rounded-lg border-l-4 border-[#F7A400]">
                  <p className="text-sm text-[#1A1A1A]">En attente de paiement</p>
                  <p className="text-xs text-[#6B7280] mt-1">Traoré Aminata - SUB002</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <p className="text-sm text-[#1A1A1A]">Parcours abandonné</p>
                  <p className="text-xs text-[#6B7280] mt-1">Diabaté Ibrahim - SUB003</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#076834] to-[#0D8E46] rounded-xl shadow p-6 text-white">
              <TrendingUp className="w-8 h-8 mb-3" />
              <p className="text-sm opacity-90 mb-1">Performance du mois</p>
              <p className="font-['Sora'] text-3xl mb-2">+24%</p>
              <p className="text-xs opacity-75">Par rapport au mois dernier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}