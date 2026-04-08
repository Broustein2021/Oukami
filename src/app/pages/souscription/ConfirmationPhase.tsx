import { useNavigate } from 'react-router';
import { CheckCircle, Download, Home, User, FileText, Calendar } from 'lucide-react';

export default function ConfirmationPhase() {
  const navigate = useNavigate();

  const contrat = {
    identifiant: 'YAK-2026-04-0001234',
    numeroContrat: 'CTR-2026-0407-001',
    dateEmission: '07 Avril 2026',
    heureEmission: '14:35',
    produit: 'Yako Éternité',
    client: 'KOUASSI Jean-Baptiste',
    capital: '10 000 000 FCFA',
    primeMensuelle: '41 667 FCFA',
    duree: '20 ans',
  };

  const paiement = {
    reference: 'PAY-2026-0407-789456',
    montant: '41 667 FCFA',
    methode: 'Orange Money',
    telephone: '+225 07 12 34 56 78',
    statut: 'Confirmé',
    date: '07 Avril 2026 14:35',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 shadow-lg">
        <div className="container mx-auto text-center">
          <CheckCircle className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-4xl mb-2">Souscription réussie !</h1>
          <p className="text-green-100 text-lg">Votre contrat d'assurance vie est maintenant actif</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="text-center mb-8">
              <div className="inline-block bg-green-100 rounded-full p-6 mb-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-3xl text-gray-900 mb-2">Félicitations !</h2>
              <p className="text-gray-600">Votre parcours de souscription est terminé</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg text-gray-900">Identifiant client</h3>
                </div>
                <p className="text-2xl text-indigo-600 mb-2">{contrat.identifiant}</p>
                <p className="text-sm text-gray-600">Conservez cet identifiant pour accéder à votre espace client</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg text-gray-900">N° Contrat</h3>
                </div>
                <p className="text-2xl text-purple-600 mb-2">{contrat.numeroContrat}</p>
                <p className="text-sm text-gray-600">Référence de votre contrat d'assurance vie</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg text-gray-900 mb-4">Détails du contrat</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Produit</p>
                    <p className="text-gray-900">{contrat.produit}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Souscripteur</p>
                    <p className="text-gray-900">{contrat.client}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Capital assuré</p>
                    <p className="text-gray-900">{contrat.capital}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Prime mensuelle</p>
                    <p className="text-gray-900">{contrat.primeMensuelle}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Durée</p>
                    <p className="text-gray-900">{contrat.duree}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Date d'émission</p>
                    <p className="text-gray-900">{contrat.dateEmission} à {contrat.heureEmission}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-gray-900 mb-4">Confirmation de paiement</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-900">Paiement {paiement.statut}</p>
                      <p className="text-sm text-green-700">Référence: {paiement.reference}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-700">Montant payé</p>
                      <p className="text-green-900">{paiement.montant}</p>
                    </div>
                    <div>
                      <p className="text-green-700">Méthode</p>
                      <p className="text-green-900">{paiement.methode}</p>
                    </div>
                    <div>
                      <p className="text-green-700">Téléphone</p>
                      <p className="text-green-900">{paiement.telephone}</p>
                    </div>
                    <div>
                      <p className="text-green-700">Date et heure</p>
                      <p className="text-green-900">{paiement.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg text-gray-900 mb-3">Documents envoyés</h3>
              <p className="text-sm text-blue-800 mb-4">
                Vous avez reçu les documents suivants par email et SMS :
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <button className="flex items-center gap-3 bg-white rounded-lg p-4 hover:bg-blue-50 transition-colors">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div className="text-left flex-1">
                    <p className="text-sm text-gray-900">Contrat d'assurance</p>
                    <p className="text-xs text-gray-600">PDF - 2.4 MB</p>
                  </div>
                  <Download className="w-4 h-4 text-indigo-600" />
                </button>
                <button className="flex items-center gap-3 bg-white rounded-lg p-4 hover:bg-blue-50 transition-colors">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div className="text-left flex-1">
                    <p className="text-sm text-gray-900">Reçu de paiement</p>
                    <p className="text-xs text-gray-600">PDF - 124 KB</p>
                  </div>
                  <Download className="w-4 h-4 text-indigo-600" />
                </button>
                <button className="flex items-center gap-3 bg-white rounded-lg p-4 hover:bg-blue-50 transition-colors">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div className="text-left flex-1">
                    <p className="text-sm text-gray-900">Conditions Générales</p>
                    <p className="text-xs text-gray-600">PDF - 1.8 MB</p>
                  </div>
                  <Download className="w-4 h-4 text-indigo-600" />
                </button>
                <button className="flex items-center gap-3 bg-white rounded-lg p-4 hover:bg-blue-50 transition-colors">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div className="text-left flex-1">
                    <p className="text-sm text-gray-900">Conditions Particulières</p>
                    <p className="text-xs text-gray-600">PDF - 856 KB</p>
                  </div>
                  <Download className="w-4 h-4 text-indigo-600" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/client')}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-lg"
              >
                <User className="w-5 h-5" />
                Accéder à mon espace client
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <Calendar className="w-8 h-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg text-gray-900 mb-2">Prochaines étapes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Votre prochaine échéance de paiement est le <strong>7 Mai 2026</strong> (41 667 FCFA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Vous recevrez un rappel par SMS et email 3 jours avant chaque échéance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Consultez votre espace client pour suivre vos paiements et télécharger vos documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>Notre service client est disponible au 225 XX XX XX XX pour toute question</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
