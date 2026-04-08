import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Home, FileText, CreditCard, Bell, Download, Calendar, Shield, MessageCircle, X, Send, Newspaper } from 'lucide-react';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [clientId] = useState('CL-2026-0407-001');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Bonjour ! Je suis l\'assistant virtuel YAKO. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const contrats = [
    {
      id: 'CTR-001',
      produit: 'Yako Éternité',
      statut: 'Actif',
      capital: '10 000 000 FCFA',
      primeAnnuelle: '500 000 FCFA',
      dateDebut: '2026-01-15',
      prochainePrime: '2027-01-15'
    },
  ];

  const paiements = [
    { date: '2026-04-07', montant: '50 000 FCFA', methode: 'Orange Money', statut: 'Réussi', reference: 'PAY-001' },
    { date: '2026-03-07', montant: '50 000 FCFA', methode: 'MTN Money', statut: 'Réussi', reference: 'PAY-002' },
    { date: '2026-02-07', montant: '50 000 FCFA', methode: 'Wave', statut: 'Réussi', reference: 'PAY-003' },
    { date: '2026-01-15', montant: '500 000 FCFA', methode: 'Orange Money', statut: 'Réussi', reference: 'PAY-004' },
  ];

  const notifications = [
    { type: 'success', message: 'Paiement de 50 000 FCFA réussi', date: '2026-04-07 14:30' },
    { type: 'info', message: 'Prochaine échéance: 7 Mai 2026', date: '2026-04-01 09:00' },
    { type: 'info', message: 'Votre contrat a été renouvelé', date: '2026-01-15 10:00' },
  ];

  const documents = [
    { nom: 'Contrat Yako Éternité', type: 'PDF', date: '2026-01-15', taille: '2.4 MB' },
    { nom: 'Conditions Générales', type: 'PDF', date: '2026-01-15', taille: '1.8 MB' },
    { nom: 'Conditions Particulières', type: 'PDF', date: '2026-01-15', taille: '856 KB' },
    { nom: 'Reçu Paiement Avril 2026', type: 'PDF', date: '2026-04-07', taille: '124 KB' },
  ];

  const actualites = [
    {
      titre: 'Nouveau produit YAKO Santé+',
      date: '5 Avril 2026',
      description: 'Découvrez notre nouvelle assurance santé complémentaire avec couverture hospitalisation.',
      image: '🏥'
    },
    {
      titre: 'Promotion Cadence Éducation',
      date: '1 Avril 2026',
      description: '15% de réduction sur la prime annuelle jusqu\'au 30 avril 2026.',
      image: '🎓'
    },
    {
      titre: 'Application mobile disponible',
      date: '25 Mars 2026',
      description: 'Gérez vos contrats depuis votre smartphone avec notre nouvelle app.',
      image: '📱'
    }
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = { sender: 'user', text: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    
    // Simuler une réponse du bot
    setTimeout(() => {
      let botResponse = '';
      const input = chatInput.toLowerCase();
      
      if (input.includes('prime') || input.includes('paiement')) {
        botResponse = 'Votre prochaine prime de 50 000 FCFA est due le 7 Mai 2026. Vous pouvez payer via Mobile Money directement depuis votre espace client.';
      } else if (input.includes('contrat') || input.includes('document')) {
        botResponse = 'Vous pouvez télécharger tous vos documents contractuels dans la section "Documents" de votre espace client.';
      } else if (input.includes('capital') || input.includes('couverture')) {
        botResponse = 'Votre contrat Yako Éternité vous couvre pour un capital de 10 000 000 FCFA avec garantie décès toutes causes.';
      } else if (input.includes('beneficiaire')) {
        botResponse = 'Pour modifier vos bénéficiaires, veuillez contacter notre service client au +225 XX XX XX XX.';
      } else {
        botResponse = 'Je suis là pour répondre à vos questions sur votre contrat, vos paiements, ou nos produits. Comment puis-je vous aider ?';
      }
      
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);

    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <div className="bg-[#076834] text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-['Sora'] text-3xl mb-1">Mon Espace Client</h1>
            <p className="text-[#E8F5EE]">ID Client: {clientId}</p>
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
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#076834] to-[#0D8E46] rounded-xl shadow-lg p-6 text-white">
            <Shield className="w-10 h-10 mb-3 opacity-90" />
            <p className="text-sm opacity-90 mb-1">Contrats actifs</p>
            <p className="font-['Sora'] text-4xl mb-2">1</p>
            <p className="text-sm opacity-75">Yako Éternité</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <Calendar className="w-10 h-10 text-[#076834] mb-3" />
            <p className="text-sm text-[#6B7280] mb-1">Prochaine échéance</p>
            <p className="font-['Sora'] text-2xl text-[#1A1A1A] mb-1">7 Mai 2026</p>
            <p className="text-sm text-[#F7A400]">50 000 FCFA</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <CreditCard className="w-10 h-10 text-[#F7A400] mb-3" />
            <p className="text-sm text-[#6B7280] mb-1">Dernier paiement</p>
            <p className="font-['Sora'] text-2xl text-[#1A1A1A] mb-1">50 000 FCFA</p>
            <p className="text-sm text-[#6B7280]">7 Avril 2026</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-[#E5E7EB]">
                <h2 className="font-['Sora'] text-xl text-[#1A1A1A]">Mes Contrats</h2>
              </div>
              <div className="p-6">
                {contrats.map((contrat) => (
                  <div key={contrat.id} className="border border-[#E5E7EB] rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-['Sora'] text-lg text-[#1A1A1A] mb-1">{contrat.produit}</h3>
                        <p className="text-sm text-[#6B7280]">Contrat N° {contrat.id}</p>
                      </div>
                      <span className="bg-[#E8F5EE] text-[#076834] px-3 py-1 rounded-full text-sm">
                        {contrat.statut}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#6B7280]">Capital assuré</p>
                        <p className="font-['Sora'] text-[#1A1A1A]">{contrat.capital}</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280]">Prime annuelle</p>
                        <p className="font-['Sora'] text-[#F7A400]">{contrat.primeAnnuelle}</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280]">Date de début</p>
                        <p className="text-[#1A1A1A]">{contrat.dateDebut}</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280]">Prochaine échéance</p>
                        <p className="text-[#1A1A1A]">{contrat.prochainePrime}</p>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-[#F7A400] text-[#412402] py-3 rounded-lg hover:bg-[#C47D00] flex items-center justify-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payer ma prime
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-[#E5E7EB]">
                <h2 className="font-['Sora'] text-xl text-[#1A1A1A]">Historique des Paiements</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5EDE4]">
                    <tr>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Date</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Montant</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Méthode</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Référence</th>
                      <th className="text-left p-4 text-sm text-[#6B7280]">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paiements.map((paiement) => (
                      <tr key={paiement.reference} className="border-t border-[#F5EDE4] hover:bg-[#FDF8F2]">
                        <td className="p-4 text-sm">{paiement.date}</td>
                        <td className="p-4 text-sm font-['Sora'] text-[#F7A400]">{paiement.montant}</td>
                        <td className="p-4 text-sm">{paiement.methode}</td>
                        <td className="p-4 text-sm text-[#6B7280]">{paiement.reference}</td>
                        <td className="p-4">
                          <span className="bg-[#E8F5EE] text-[#076834] px-3 py-1 rounded-full text-xs">
                            {paiement.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section Actualités */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-[#E5E7EB] flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-[#076834]" />
                <h2 className="font-['Sora'] text-xl text-[#1A1A1A]">Actualités YAKO</h2>
              </div>
              <div className="p-6 space-y-4">
                {actualites.map((actu, index) => (
                  <div key={index} className="border border-[#E5E7EB] rounded-lg p-4 hover:border-[#076834] transition-colors cursor-pointer">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-[#E8F5EE] rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                        {actu.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[#1A1A1A] mb-1">{actu.titre}</h3>
                        <p className="text-xs text-[#6B7280] mb-2">{actu.date}</p>
                        <p className="text-sm text-[#6B7280]">{actu.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#076834]" />
                Documents
              </h3>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-[#F5EDE4] rounded-lg hover:bg-[#E8F5EE] cursor-pointer">
                    <div className="flex-1">
                      <p className="text-sm text-[#1A1A1A]">{doc.nom}</p>
                      <p className="text-xs text-[#6B7280] mt-1">{doc.date} • {doc.taille}</p>
                    </div>
                    <Download className="w-4 h-4 text-[#076834] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#076834]" />
                Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((notif, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      notif.type === 'success' ? 'bg-[#E8F5EE] border-[#076834]' : 'bg-[#FFF4DC] border-[#F7A400]'
                    }`}
                  >
                    <p className="text-sm text-[#1A1A1A]">{notif.message}</p>
                    <p className="text-xs text-[#6B7280] mt-1">{notif.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/souscription/demande')}
              className="w-full bg-[#076834] text-white py-3 rounded-lg hover:bg-[#0D8E46]"
            >
              Nouvelle souscription
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot flottant */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl border-2 border-[#076834] flex flex-col max-h-[600px]">
          <div className="bg-[#076834] text-white p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-['Sora']">Assistant YAKO</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-[#0D8E46] p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDF8F2]">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-[#076834] text-white' 
                    : 'bg-white text-[#1A1A1A] border border-[#E5E7EB]'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-[#E5E7EB] bg-white rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#076834] text-white p-2 rounded-lg hover:bg-[#0D8E46]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bouton du chatbot */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-[#076834] text-white p-4 rounded-full shadow-lg hover:bg-[#0D8E46] transition-all"
      >
        {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
