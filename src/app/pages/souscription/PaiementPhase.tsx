import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Smartphone, CreditCard, ArrowRight, Loader } from 'lucide-react';

export default function PaiementPhase() {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<'orange' | 'mtn' | 'wave' | 'moov' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  const providers = [
    { id: 'orange' as const, nom: 'Orange Money', color: 'from-orange-500 to-orange-600', icon: '🟠' },
    { id: 'mtn' as const, nom: 'MTN Money', color: 'from-yellow-400 to-yellow-500', icon: '🟡' },
    { id: 'wave' as const, nom: 'Wave', color: 'from-blue-500 to-blue-600', icon: '🔵' },
    { id: 'moov' as const, nom: 'Moov Money', color: 'from-sky-400 to-sky-500', icon: '🔷' },
  ];

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      navigate('/souscription/confirmation');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <div className="bg-[#076834] text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="font-['Sora'] text-3xl mb-1">Phase 5: Souscription</h1>
          <p className="text-[#E8F5EE]">Paiement Mobile Money</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Barre de progression */}
          <div className="mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">1</div>
            <div className="flex-1 h-1 bg-[#076834]"></div>
            <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">2</div>
            <div className="flex-1 h-1 bg-[#076834]"></div>
            <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">3</div>
            <div className="flex-1 h-1 bg-[#076834]"></div>
            <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">4</div>
            <div className="flex-1 h-1 bg-[#076834]"></div>
            <div className="w-8 h-8 bg-[#076834] text-white rounded-full flex items-center justify-center">5</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="w-8 h-8 text-[#F7A400]" />
                  <h2 className="font-['Sora'] text-2xl text-[#1A1A1A]">Paiement de la première prime</h2>
                </div>

                <div className="bg-[#FFF4DC] border border-[#F7A400] rounded-lg p-4 mb-6">
                  <p className="text-sm text-[#C47D00]">
                    Vous allez payer la première prime mensuelle pour activer votre contrat d'assurance vie.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg text-[#1A1A1A] mb-4">Choisissez votre moyen de paiement</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {providers.map((provider) => (
                      <button
                        key={provider.id}
                        onClick={() => setSelectedProvider(provider.id)}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          selectedProvider === provider.id
                            ? 'border-[#F7A400] bg-[#FFF4DC]'
                            : 'border-[#E5E7EB] bg-white hover:border-[#C2E0CE]'
                        }`}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-br ${provider.color} rounded-lg mx-auto mb-3 flex items-center justify-center text-3xl`}>
                          {provider.icon}
                        </div>
                        <p className={`text-center ${
                          selectedProvider === provider.id ? 'text-[#F7A400]' : 'text-[#1A1A1A]'
                        }`}>
                          {provider.nom}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedProvider && (
                  <div className="mb-6 animate-fadeIn">
                    <label className="block text-sm text-[#1A1A1A] mb-2">
                      Numéro de téléphone {providers.find(p => p.id === selectedProvider)?.nom}
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+225 XX XX XX XX XX"
                          className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#F7A400] focus:ring-2 focus:ring-[#FFF4DC] outline-none"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-2">
                      Vous recevrez une notification push pour confirmer le paiement
                    </p>
                  </div>
                )}

                {processing && (
                  <div className="bg-[#FFF4DC] border border-[#F7A400] rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Loader className="w-6 h-6 text-[#F7A400] animate-spin" />
                      <p className="text-[#C47D00]">Paiement en cours...</p>
                    </div>
                    <p className="text-sm text-[#C47D00]">
                      Veuillez confirmer la transaction sur votre téléphone en composant votre code PIN Mobile Money
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/souscription/validation')}
                    disabled={processing}
                    className="flex-1 py-3 border border-[#E5E7EB] rounded-lg text-[#1A1A1A] hover:bg-[#F5EDE4] disabled:opacity-50"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={!selectedProvider || !phoneNumber || processing}
                    className="flex-1 bg-[#F7A400] text-[#412402] py-3 rounded-lg hover:bg-[#C47D00] disabled:bg-[#E5E7EB] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      <>
                        Payer 41 667 FCFA
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-[#F7A400]" />
                  <h3 className="text-lg text-[#1A1A1A]">Détails du paiement</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Produit:</span>
                    <span className="text-[#1A1A1A]">Yako Éternité</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Fréquence:</span>
                    <span className="text-[#1A1A1A]">Mensuelle</span>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A]">Prime mensuelle:</span>
                      <span className="font-['Sora'] text-xl text-[#F7A400]">41 667 FCFA</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0D8E46] to-[#076834] rounded-xl shadow-lg p-6 text-white">
                <p className="text-sm opacity-90 mb-2">Paiement sécurisé</p>
                <p className="text-xs opacity-75">
                  Vos transactions sont protégées par un cryptage SSL et conformes aux normes PCI-DSS
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="text-sm text-[#1A1A1A] mb-3">Comment ça marche ?</h4>
                <ol className="space-y-2 text-xs text-[#6B7280]">
                  <li className="flex gap-2">
                    <span className="text-[#F7A400]">1.</span>
                    <span>Sélectionnez votre opérateur Mobile Money</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F7A400]">2.</span>
                    <span>Entrez votre numéro de téléphone</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F7A400]">3.</span>
                    <span>Confirmez la transaction avec votre code PIN</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F7A400]">4.</span>
                    <span>Recevez votre contrat et reçu par email/SMS</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}