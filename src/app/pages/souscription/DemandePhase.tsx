import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Camera, Upload, ArrowRight, CheckCircle, Home, Users, Briefcase, GraduationCap, WifiOff } from 'lucide-react';

export default function DemandePhase() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'choix-produit' | 'formulaire' | 'verification'>('choix-produit');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [scanMode, setScanMode] = useState<'ocr' | 'manuel'>('ocr');
  const [isOffline, setIsOffline] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    dateNaissance: '',
    lieuNaissance: '',
    numeroIdentite: '',
    telephone: '',
    email: '',
    adresse: '',
    profession: '',
  });

  const produits = [
    {
      id: 'eternite',
      nom: 'Yako Éternité',
      description: 'Assurance vie entière avec garantie décès',
      caracteristiques: ['Capital garanti', 'Transmission patrimoine', 'Prime fixe'],
      icon: Shield,
      color: '#076834'
    },
    {
      id: 'soutra',
      nom: 'Soutra',
      description: 'Épargne retraite complémentaire',
      caracteristiques: ['Rente viagère', 'Épargne progressive', 'Avantages fiscaux'],
      icon: Users,
      color: '#0D8E46'
    },
    {
      id: 'doiho',
      nom: 'Doihô',
      description: 'Protection familiale complète',
      caracteristiques: ['Couverture famille', 'Capital éducation', 'Assistance'],
      icon: Briefcase,
      color: '#076834'
    },
    {
      id: 'cadence',
      nom: 'Cadence Éducation',
      description: 'Financement études enfants',
      caracteristiques: ['Capital études', 'Versements programmés', 'Garantie décès'],
      icon: GraduationCap,
      color: '#076834'
    },
  ];

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    // Sauvegarder en mode offline si nécessaire
    if (isOffline) {
      localStorage.setItem('yako_offline_product', productId);
    }
    setStep('formulaire');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sauvegarder les données en mode offline
    if (isOffline) {
      const offlineData = {
        product: selectedProduct,
        formData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('yako_offline_data', JSON.stringify(offlineData));
    }
    setStep('verification');
  };

  const handleContinue = () => {
    navigate('/souscription/qualification');
  };

  const simulateScan = () => {
    setTimeout(() => {
      setFormData({
        nom: 'KOUASSI',
        prenoms: 'Jean-Baptiste',
        dateNaissance: '1985-03-15',
        lieuNaissance: 'Abidjan',
        numeroIdentite: 'CI2024567890',
        telephone: '+225 07 12 34 56 78',
        email: 'jb.kouassi@example.com',
        adresse: 'Cocody Riviera, Abidjan',
        profession: 'Ingénieur commercial',
      });
    }, 2000);
  };

  if (step === 'choix-produit') {
    return (
      <div className="min-h-screen bg-[#FDF8F2]">
        {/* Indicateur mode offline */}
        {isOffline && (
          <div className="bg-[#F7A400] text-[#412402] p-3 text-center">
            <div className="container mx-auto flex items-center justify-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">Mode hors ligne - Vos données seront synchronisées dès que la connexion sera rétablie</span>
            </div>
          </div>
        )}

        <div className="bg-[#076834] text-white p-6 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h1 className="font-['Sora'] text-3xl mb-1">Phase 1: Demande</h1>
              <p className="text-[#E8F5EE]">Choisissez votre produit d'assurance</p>
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
          <div className="max-w-5xl mx-auto">
            {/* Barre de progression */}
            <div className="mb-8 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#076834] text-white rounded-full flex items-center justify-center">1</div>
              <div className="flex-1 h-1 bg-[#E5E7EB]"></div>
              <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">2</div>
              <div className="flex-1 h-1 bg-[#E5E7EB]"></div>
              <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">3</div>
              <div className="flex-1 h-1 bg-[#E5E7EB]"></div>
              <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">4</div>
              <div className="flex-1 h-1 bg-[#E5E7EB]"></div>
              <div className="w-8 h-8 bg-[#E5E7EB] text-[#6B7280] rounded-full flex items-center justify-center">5</div>
            </div>

            <h2 className="font-['Sora'] text-2xl text-[#1A1A1A] mb-6">Sélectionnez votre produit</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {produits.map((produit) => {
                const Icon = produit.icon;
                return (
                  <button
                    key={produit.id}
                    onClick={() => handleProductSelect(produit.id)}
                    className={`bg-white rounded-xl shadow-lg p-6 text-left hover:shadow-xl transition-all hover:scale-105 border-2 ${
                      selectedProduct === produit.id ? 'border-[#076834]' : 'border-transparent'
                    }`}
                  >
                    <div className="w-16 h-16 bg-[#E8F5EE] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-[#076834]" />
                    </div>
                    <h3 className="font-['Sora'] text-xl text-[#1A1A1A] mb-2">{produit.nom}</h3>
                    <p className="text-[#6B7280] mb-4 text-sm">{produit.description}</p>
                    <ul className="space-y-2">
                      {produit.caracteristiques.map((car, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                          <CheckCircle className="w-4 h-4 text-[#076834] flex-shrink-0" />
                          {car}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'formulaire') {
    return (
      <div className="min-h-screen bg-[#FDF8F2]">
        {isOffline && (
          <div className="bg-[#F7A400] text-[#412402] p-3 text-center">
            <div className="container mx-auto flex items-center justify-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">Mode hors ligne - Vos données seront synchronisées automatiquement</span>
            </div>
          </div>
        )}

        <div className="bg-[#076834] text-white p-6 shadow-lg">
          <div className="container mx-auto">
            <h1 className="font-['Sora'] text-3xl mb-1">Phase 1: Demande</h1>
            <p className="text-[#E8F5EE]">Informations d'identité</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="font-['Sora'] text-2xl text-[#1A1A1A] mb-6">Identification du souscripteur</h2>

              <div className="mb-6 flex gap-4">
                <button
                  onClick={() => setScanMode('ocr')}
                  className={`flex-1 py-3 rounded-lg border-2 ${
                    scanMode === 'ocr'
                      ? 'bg-[#E8F5EE] border-[#076834] text-[#076834]'
                      : 'bg-white border-[#E5E7EB] text-[#6B7280]'
                  }`}
                >
                  <Camera className="w-6 h-6 mx-auto mb-2" />
                  Scanner CNI (OCR)
                </button>
                <button
                  onClick={() => setScanMode('manuel')}
                  className={`flex-1 py-3 rounded-lg border-2 ${
                    scanMode === 'manuel'
                      ? 'bg-[#E8F5EE] border-[#076834] text-[#076834]'
                      : 'bg-white border-[#E5E7EB] text-[#6B7280]'
                  }`}
                >
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  Saisie manuelle
                </button>
              </div>

              {scanMode === 'ocr' && (
                <div className="mb-6 p-6 border-2 border-dashed border-[#C2E0CE] rounded-lg text-center bg-[#F5F5F5]">
                  <Camera className="w-16 h-16 text-[#076834] mx-auto mb-4" />
                  <p className="text-[#1A1A1A] mb-4">Positionnez votre Carte Nationale d'Identité</p>
                  <button
                    onClick={simulateScan}
                    className="bg-[#076834] text-white px-6 py-3 rounded-lg hover:bg-[#0D8E46]"
                  >
                    Lancer le scan
                  </button>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">Nom *</label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">Prénoms *</label>
                    <input
                      type="text"
                      value={formData.prenoms}
                      onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">Date de naissance *</label>
                    <input
                      type="date"
                      value={formData.dateNaissance}
                      onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">Lieu de naissance *</label>
                    <input
                      type="text"
                      value={formData.lieuNaissance}
                      onChange={(e) => setFormData({ ...formData, lieuNaissance: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#1A1A1A] mb-2">Numéro CNI *</label>
                  <input
                    type="text"
                    value={formData.numeroIdentite}
                    onChange={(e) => setFormData({ ...formData, numeroIdentite: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#1A1A1A] mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#1A1A1A] mb-2">Adresse *</label>
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#1A1A1A] mb-2">Profession *</label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#076834] focus:ring-2 focus:ring-[#E8F5EE] outline-none"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('choix-produit')}
                    className="flex-1 py-3 border border-[#E5E7EB] rounded-lg text-[#1A1A1A] hover:bg-[#F5EDE4]"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#076834] text-white py-3 rounded-lg hover:bg-[#0D8E46] flex items-center justify-center gap-2"
                  >
                    Continuer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
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
          <h1 className="font-['Sora'] text-3xl mb-1">Phase 1: Demande</h1>
          <p className="text-[#E8F5EE]">Vérification des données</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-[#0D8E46]" />
              <h2 className="font-['Sora'] text-2xl text-[#1A1A1A]">Vérification de complétude</h2>
            </div>

            <div className="bg-[#E8F5EE] border border-[#C2E0CE] rounded-lg p-6 mb-6">
              <p className="text-[#076834]">Toutes les données obligatoires ont été renseignées avec succès.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-[#1A1A1A]">Récapitulatif des informations</h3>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-[#F5EDE4] rounded-lg">
                  <p className="text-[#6B7280]">Produit sélectionné</p>
                  <p className="text-[#1A1A1A]">{produits.find(p => p.id === selectedProduct)?.nom}</p>
                </div>
                <div className="p-3 bg-[#F5EDE4] rounded-lg">
                  <p className="text-[#6B7280]">Nom complet</p>
                  <p className="text-[#1A1A1A]">{formData.nom} {formData.prenoms}</p>
                </div>
                <div className="p-3 bg-[#F5EDE4] rounded-lg">
                  <p className="text-[#6B7280]">Date de naissance</p>
                  <p className="text-[#1A1A1A]">{formData.dateNaissance}</p>
                </div>
                <div className="p-3 bg-[#F5EDE4] rounded-lg">
                  <p className="text-[#6B7280]">N° CNI</p>
                  <p className="text-[#1A1A1A]">{formData.numeroIdentite}</p>
                </div>
                <div className="p-3 bg-[#F5EDE4] rounded-lg">
                  <p className="text-[#6B7280]">Téléphone</p>
                  <p className="text-[#1A1A1A]">{formData.telephone}</p>
                </div>
                <div className="p-3 bg-[#F5EDE4] rounded-lg">
                  <p className="text-[#6B7280]">Profession</p>
                  <p className="text-[#1A1A1A]">{formData.profession}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep('formulaire')}
                className="flex-1 py-3 border border-[#E5E7EB] rounded-lg text-[#1A1A1A] hover:bg-[#F5EDE4]"
              >
                Modifier
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 bg-[#076834] text-white py-3 rounded-lg hover:bg-[#0D8E46] flex items-center justify-center gap-2"
              >
                Passer à la qualification
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}