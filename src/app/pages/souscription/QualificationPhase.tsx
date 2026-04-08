import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Shield, UserPlus, ArrowRight, Loader, AlertCircle } from 'lucide-react';

export default function QualificationPhase() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'validation' | 'conformite' | 'beneficiaires'>('validation');
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [beneficiaires, setBeneficiaires] = useState([
    { nom: '', prenoms: '', lien: '', pourcentage: '' }
  ]);

  const handleValidation = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setValidated(true);
      setTimeout(() => setStep('conformite'), 1500);
    }, 3000);
  };

  const handleConformite = () => {
    setStep('beneficiaires');
  };

  const addBeneficiaire = () => {
    setBeneficiaires([...beneficiaires, { nom: '', prenoms: '', lien: '', pourcentage: '' }]);
  };

  const removeBeneficiaire = (index: number) => {
    setBeneficiaires(beneficiaires.filter((_, i) => i !== index));
  };

  const updateBeneficiaire = (index: number, field: string, value: string) => {
    const updated = [...beneficiaires];
    updated[index] = { ...updated[index], [field]: value };
    setBeneficiaires(updated);
  };

  const handleContinue = () => {
    navigate('/souscription/proposition');
  };

  if (step === 'validation') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-indigo-600 text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-3xl mb-1">Phase 2: Qualification</h1>
            <p className="text-indigo-100">Validation de l'identité</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">1</div>
              <div className="flex-1 h-1 bg-indigo-600"></div>
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">2</div>
              <div className="flex-1 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">3</div>
              <div className="flex-1 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">4</div>
              <div className="flex-1 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">5</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center">
                <Shield className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
                <h2 className="text-2xl text-gray-900 mb-4">Validation via API ONECI</h2>
                <p className="text-gray-600 mb-8">
                  Vérification de l'authenticité de votre identité auprès de l'Office National d'État Civil et d'Identification
                </p>

                {!validating && !validated && (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
                      <h3 className="text-sm text-blue-900 mb-3">Données à vérifier :</h3>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li>• Numéro CNI: CI2024567890</li>
                        <li>• Nom: KOUASSI Jean-Baptiste</li>
                        <li>• Date de naissance: 15/03/1985</li>
                        <li>• Lieu de naissance: Abidjan</li>
                      </ul>
                    </div>

                    <button
                      onClick={handleValidation}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 inline-flex items-center gap-2"
                    >
                      Lancer la validation
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {validating && (
                  <div className="py-8">
                    <Loader className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-700">Validation en cours...</p>
                    <p className="text-sm text-gray-500 mt-2">Connexion à l'API ONECI</p>
                  </div>
                )}

                {validated && (
                  <div className="py-8">
                    <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                    <p className="text-xl text-green-700">Identité validée avec succès</p>
                    <p className="text-sm text-gray-600 mt-2">Redirection automatique...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'conformite') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-indigo-600 text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-3xl mb-1">Phase 2: Qualification</h1>
            <p className="text-indigo-100">Contrôle de conformité LCB/FT</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl text-gray-900">Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme</h2>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div className="text-sm text-yellow-800">
                    <p className="mb-2">Conformément à la réglementation LCB/FT, nous devons vérifier certaines informations.</p>
                    <p>Ces contrôles sont obligatoires pour toute souscription d'assurance.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1" required />
                      <span className="text-sm text-gray-700">
                        Je certifie que les fonds utilisés pour cette souscription proviennent de sources légitimes
                      </span>
                    </label>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1" required />
                      <span className="text-sm text-gray-700">
                        Je certifie ne pas être une personne politiquement exposée (PPE) ou agir pour le compte d'une PPE
                      </span>
                    </label>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1" required />
                      <span className="text-sm text-gray-700">
                        Je certifie ne pas faire l'objet de sanctions internationales ou de mesures restrictives
                      </span>
                    </label>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-3">Origine des fonds :</p>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                      <option value="">Sélectionnez...</option>
                      <option value="salaire">Salaire / Revenus professionnels</option>
                      <option value="epargne">Épargne personnelle</option>
                      <option value="heritage">Héritage / Donation</option>
                      <option value="vente">Vente de biens</option>
                      <option value="autre">Autre (à préciser)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div className="text-sm text-green-800">
                    <p>Contrôle de conformité LCB/FT effectué</p>
                    <p className="text-xs text-green-700 mt-1">Aucune anomalie détectée</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => navigate('/souscription/demande')}
                    className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleConformite}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                  >
                    Continuer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl mb-1">Phase 2: Qualification</h1>
          <p className="text-indigo-100">Bénéficiaires et ayants droit</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <UserPlus className="w-8 h-8 text-indigo-600" />
              <h2 className="text-2xl text-gray-900">Désignation des bénéficiaires</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Désignez les personnes qui recevront le capital en cas de sinistre. La somme des pourcentages doit être égale à 100%.
            </p>

            <div className="space-y-4 mb-6">
              {beneficiaires.map((beneficiaire, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm text-gray-900">Bénéficiaire {index + 1}</h3>
                    {beneficiaires.length > 1 && (
                      <button
                        onClick={() => removeBeneficiaire(index)}
                        className="text-red-600 text-sm hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Nom</label>
                      <input
                        type="text"
                        value={beneficiaire.nom}
                        onChange={(e) => updateBeneficiaire(index, 'nom', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Prénoms</label>
                      <input
                        type="text"
                        value={beneficiaire.prenoms}
                        onChange={(e) => updateBeneficiaire(index, 'prenoms', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Lien de parenté</label>
                      <select
                        value={beneficiaire.lien}
                        onChange={(e) => updateBeneficiaire(index, 'lien', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="conjoint">Conjoint(e)</option>
                        <option value="enfant">Enfant</option>
                        <option value="parent">Parent</option>
                        <option value="frere-soeur">Frère/Sœur</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Pourcentage (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={beneficiaire.pourcentage}
                        onChange={(e) => updateBeneficiaire(index, 'pourcentage', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addBeneficiaire}
              className="w-full py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 flex items-center justify-center gap-2 mb-6"
            >
              <UserPlus className="w-5 h-5" />
              Ajouter un bénéficiaire
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('conformite')}
                className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Retour
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                Passer à la proposition
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
