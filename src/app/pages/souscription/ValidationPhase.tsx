import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FileText, Download, ArrowRight, Check, Smartphone, Edit } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../components/ui/input-otp';

export default function ValidationPhase() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'recapitulatif' | 'documents' | 'otp' | 'signature'>('recapitulatif');
  const [acceptedCG, setAcceptedCG] = useState(false);
  const [acceptedCP, setAcceptedCP] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [signatureDrawn, setSignatureDrawn] = useState(false);

  const souscription = {
    produit: 'Yako Éternité',
    client: 'KOUASSI Jean-Baptiste',
    dateNaissance: '15/03/1985',
    numeroIdentite: 'CI2024567890',
    telephone: '+225 07 12 34 56 78',
    email: 'jb.kouassi@example.com',
    capital: '10 000 000 FCFA',
    duree: '20 ans',
    frequence: 'Mensuelle',
    prime: '41 667 FCFA',
    beneficiaires: [
      { nom: 'KOUASSI Aya', lien: 'Conjoint(e)', pourcentage: '60%' },
      { nom: 'KOUASSI Emmanuel', lien: 'Enfant', pourcentage: '40%' },
    ],
  };

  const sendOTP = () => {
    setOtpSent(true);
  };

  const handleContinue = () => {
    if (step === 'recapitulatif') {
      setStep('documents');
    } else if (step === 'documents') {
      setStep('otp');
    } else if (step === 'otp') {
      setStep('signature');
    } else {
      navigate('/souscription/paiement');
    }
  };

  if (step === 'recapitulatif') {
    return (
      <div className="min-h-screen bg-[#FDF8F2]">
        <div className="bg-[#076834] text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="font-['Sora'] text-3xl mb-1">Phase 4: Validation</h1>
            <p className="text-[#E8F5EE]">Récapitulatif de votre souscription</p>
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
              <div className="w-8 h-8 bg-[#076834] text-white rounded-full flex items-center justify-center">4</div>
              <div className="flex-1 h-1 bg-[#E5E7EB]"></div>
              <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">5</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="font-['Sora'] text-2xl text-[#1A1A1A] mb-6">Récapitulatif complet</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#076834]" />
                    Produit sélectionné
                  </h3>
                  <div className="bg-[#E8F5EE] rounded-lg p-4">
                    <p className="text-xl text-[#076834]">{souscription.produit}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-[#1A1A1A] mb-3">Informations personnelles</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-[#F5EDE4] rounded-lg p-4">
                      <p className="text-sm text-[#6B7280] mb-1">Nom complet</p>
                      <p className="text-[#1A1A1A]">{souscription.client}</p>
                    </div>
                    <div className="bg-[#F5EDE4] rounded-lg p-4">
                      <p className="text-sm text-[#6B7280] mb-1">Date de naissance</p>
                      <p className="text-[#1A1A1A]">{souscription.dateNaissance}</p>
                    </div>
                    <div className="bg-[#F5EDE4] rounded-lg p-4">
                      <p className="text-sm text-[#6B7280] mb-1">N° CNI</p>
                      <p className="text-[#1A1A1A]">{souscription.numeroIdentite}</p>
                    </div>
                    <div className="bg-[#F5EDE4] rounded-lg p-4">
                      <p className="text-sm text-[#6B7280] mb-1">Téléphone</p>
                      <p className="text-[#1A1A1A]">{souscription.telephone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-[#1A1A1A] mb-3">Détails du contrat</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-[#FFF4DC] rounded-lg p-4">
                      <p className="text-sm text-[#6B7280] mb-1">Capital assuré</p>
                      <p className="font-['Sora'] text-xl text-[#1A1A1A]">{souscription.capital}</p>
                    </div>
                    <div className="bg-[#FFF4DC] rounded-lg p-4">
                      <p className="text-sm text-[#6B7280] mb-1">Prime {souscription.frequence.toLowerCase()}</p>
                      <p className="font-['Sora'] text-xl text-[#F7A400]">{souscription.prime}</p>
                    </div>
                    <div className="bg-[#F5EDE4] rounded-lg p-4">
                      <p className="text-sm text-[#6B7280] mb-1">Durée</p>
                      <p className="text-[#1A1A1A]">{souscription.duree}</p>
                    </div>
                    <div className="bg-[#F5EDE4] rounded-lg p-4">
                      <p className="text-sm text-[#6B7280] mb-1">Fréquence de paiement</p>
                      <p className="text-[#1A1A1A]">{souscription.frequence}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-[#1A1A1A] mb-3">Bénéficiaires</h3>
                  <div className="space-y-3">
                    {souscription.beneficiaires.map((ben, index) => (
                      <div key={index} className="bg-[#F5EDE4] rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <p className="text-[#1A1A1A]">{ben.nom}</p>
                          <p className="text-sm text-[#6B7280]">{ben.lien}</p>
                        </div>
                        <span className="text-lg text-[#076834]">{ben.pourcentage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => navigate('/souscription/proposition')}
                  className="flex-1 py-3 border border-[#E5E7EB] rounded-lg text-[#1A1A1A] hover:bg-[#F5EDE4] flex items-center justify-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Modifier
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 bg-[#076834] text-white py-3 rounded-lg hover:bg-[#0D8E46] flex items-center justify-center gap-2"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'documents') {
    return (
      <div className="min-h-screen bg-[#FDF8F2]">
        <div className="bg-[#076834] text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="font-['Sora'] text-3xl mb-1">Phase 4: Validation</h1>
            <p className="text-[#E8F5EE]">Conditions générales et particulières</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-[#076834]" />
                <h2 className="font-['Sora'] text-2xl text-[#1A1A1A]">Documents contractuels</h2>
              </div>

              <p className="text-[#6B7280] mb-6">
                Veuillez prendre connaissance et accepter les documents suivants avant de continuer.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border border-[#E5E7EB] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg text-[#1A1A1A] mb-2">Conditions Générales (CG)</h3>
                      <p className="text-sm text-[#6B7280]">
                        Ensemble des clauses standard applicables au contrat d'assurance vie
                      </p>
                    </div>
                    <button className="bg-[#E8F5EE] text-[#076834] px-4 py-2 rounded-lg hover:bg-[#C2E0CE] flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>

                  <div className="bg-[#F5EDE4] rounded-lg p-4 mb-4 max-h-40 overflow-y-auto text-sm text-[#1A1A1A]">
                    <p className="mb-2">Article 1 - Objet du contrat</p>
                    <p className="mb-2">Le présent contrat a pour objet de garantir le paiement d'un capital ou d'une rente...</p>
                    <p className="mb-2">Article 2 - Durée du contrat</p>
                    <p className="mb-2">Le contrat est conclu pour la durée mentionnée aux Conditions Particulières...</p>
                    <p className="mb-2">Article 3 - Garanties</p>
                    <p>Les garanties accordées sont définies dans les Conditions Particulières...</p>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedCG}
                      onChange={(e) => setAcceptedCG(e.target.checked)}
                      className="w-5 h-5 accent-[#076834]"
                    />
                    <span className="text-[#1A1A1A]">J'ai lu et j'accepte les Conditions Générales</span>
                  </label>
                </div>

                <div className="border border-[#E5E7EB] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg text-[#1A1A1A] mb-2">Conditions Particulières (CP)</h3>
                      <p className="text-sm text-[#6B7280]">
                        Clauses spécifiques à votre contrat personnalisé
                      </p>
                    </div>
                    <button className="bg-[#E8F5EE] text-[#076834] px-4 py-2 rounded-lg hover:bg-[#C2E0CE] flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>

                  <div className="bg-[#F5EDE4] rounded-lg p-4 mb-4 max-h-40 overflow-y-auto text-sm text-[#1A1A1A]">
                    <p className="mb-2">Souscripteur: {souscription.client}</p>
                    <p className="mb-2">Produit: {souscription.produit}</p>
                    <p className="mb-2">Capital assuré: {souscription.capital}</p>
                    <p className="mb-2">Prime {souscription.frequence.toLowerCase()}: {souscription.prime}</p>
                    <p className="mb-2">Durée du contrat: {souscription.duree}</p>
                    <p>Bénéficiaires désignés: {souscription.beneficiaires.map(b => b.nom).join(', ')}</p>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedCP}
                      onChange={(e) => setAcceptedCP(e.target.checked)}
                      className="w-5 h-5 accent-[#076834]"
                    />
                    <span className="text-[#1A1A1A]">J'ai lu et j'accepte les Conditions Particulières</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('recapitulatif')}
                  className="flex-1 py-3 border border-[#E5E7EB] rounded-lg text-[#1A1A1A] hover:bg-[#F5EDE4]"
                >
                  Retour
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!acceptedCG || !acceptedCP}
                  className="flex-1 bg-[#076834] text-white py-3 rounded-lg hover:bg-[#0D8E46] disabled:bg-[#E5E7EB] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-[#FDF8F2]">
        <div className="bg-[#076834] text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="font-['Sora'] text-3xl mb-1">Phase 4: Validation</h1>
            <p className="text-[#E8F5EE]">Consentement par OTP SMS</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Smartphone className="w-20 h-20 text-[#076834] mx-auto mb-6" />
              <h2 className="font-['Sora'] text-2xl text-[#1A1A1A] mb-4">Vérification par SMS</h2>
              <p className="text-[#6B7280] mb-8">
                Pour confirmer votre consentement, nous allons envoyer un code de vérification au numéro :
              </p>

              <div className="bg-[#E8F5EE] rounded-lg p-4 mb-8 inline-block">
                <p className="font-['Sora'] text-xl text-[#076834]">{souscription.telephone}</p>
              </div>

              {!otpSent ? (
                <button
                  onClick={sendOTP}
                  className="bg-[#076834] text-white px-8 py-3 rounded-lg hover:bg-[#0D8E46]"
                >
                  Envoyer le code OTP
                </button>
              ) : (
                <div>
                  <p className="text-[#1A1A1A] mb-6">Entrez le code à 6 chiffres reçu par SMS</p>
                  <div className="flex justify-center mb-6">
                    <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="border-[#076834] focus:ring-[#076834]" />
                        <InputOTPSlot index={1} className="border-[#076834] focus:ring-[#076834]" />
                        <InputOTPSlot index={2} className="border-[#076834] focus:ring-[#076834]" />
                        <InputOTPSlot index={3} className="border-[#076834] focus:ring-[#076834]" />
                        <InputOTPSlot index={4} className="border-[#076834] focus:ring-[#076834]" />
                        <InputOTPSlot index={5} className="border-[#076834] focus:ring-[#076834]" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <p className="text-sm text-[#6B7280] mb-6">
                    Vous n'avez pas reçu le code ?{' '}
                    <button className="text-[#076834] hover:text-[#0D8E46]">Renvoyer</button>
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep('documents')}
                      className="flex-1 py-3 border border-[#E5E7EB] rounded-lg text-[#1A1A1A] hover:bg-[#F5EDE4]"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleContinue}
                      disabled={otpValue.length !== 6}
                      className="flex-1 bg-[#076834] text-white py-3 rounded-lg hover:bg-[#0D8E46] disabled:bg-[#E5E7EB] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Vérifier
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <div className="bg-[#076834] text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="font-['Sora'] text-3xl mb-1">Phase 4: Validation</h1>
          <p className="text-[#E8F5EE]">Signature électronique</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="font-['Sora'] text-2xl text-[#1A1A1A] mb-6 text-center">Apposez votre signature</h2>

            <div className="bg-[#F5EDE4] border-2 border-dashed border-[#C2E0CE] rounded-lg p-8 mb-6">
              <div
                className="bg-white rounded-lg h-48 flex items-center justify-center cursor-crosshair"
                onClick={() => setSignatureDrawn(true)}
              >
                {!signatureDrawn ? (
                  <p className="text-[#6B7280]">Cliquez pour tracer votre signature</p>
                ) : (
                  <div className="text-center">
                    <p className="font-['Sora'] text-4xl text-[#076834] italic">J.-B. Kouassi</p>
                  </div>
                )}
              </div>
            </div>

            {signatureDrawn && (
              <div className="bg-[#E8F5EE] border border-[#C2E0CE] rounded-lg p-4 mb-6 flex items-center gap-3">
                <Check className="w-6 h-6 text-[#076834]" />
                <p className="text-[#076834]">Signature enregistrée</p>
              </div>
            )}

            <div className="text-sm text-[#6B7280] mb-6">
              <p className="mb-2">En apposant ma signature électronique, je certifie que :</p>
              <ul className="list-disc list-inside space-y-1 ml-3">
                <li>J'ai lu et accepté les Conditions Générales et Particulières</li>
                <li>Toutes les informations fournies sont exactes et complètes</li>
                <li>Je consens à la souscription de ce contrat d'assurance vie</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('otp')}
                className="flex-1 py-3 border border-[#E5E7EB] rounded-lg text-[#1A1A1A] hover:bg-[#F5EDE4]"
              >
                Retour
              </button>
              <button
                onClick={handleContinue}
                disabled={!signatureDrawn}
                className="flex-1 bg-[#076834] text-white py-3 rounded-lg hover:bg-[#0D8E46] disabled:bg-[#E5E7EB] disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Passer au paiement
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}