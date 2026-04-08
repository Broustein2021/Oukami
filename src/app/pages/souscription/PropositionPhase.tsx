import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Calculator, ArrowRight, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export default function PropositionPhase() {
  const navigate = useNavigate();
  const [capital, setCapital] = useState(10000000);
  const [duree, setDuree] = useState(20);
  const [frequence, setFrequence] = useState<'mensuelle' | 'trimestrielle' | 'semestrielle' | 'annuelle'>('mensuelle');
  const [prime, setPrime] = useState(0);

  const produits = [
    { id: 'eternite', nom: 'Yako Éternité', tauxBase: 0.05, selected: true },
    { id: 'soutra', nom: 'Soutra', tauxBase: 0.045, selected: false },
    { id: 'doiho', nom: 'Doihô', tauxBase: 0.055, selected: false },
    { id: 'cadence', nom: 'Cadence Éducation', tauxBase: 0.048, selected: false },
  ];

  useEffect(() => {
    const selectedProduct = produits.find(p => p.selected);
    if (selectedProduct) {
      const primeAnnuelle = capital * selectedProduct.tauxBase;
      let calculatedPrime = 0;

      switch (frequence) {
        case 'mensuelle':
          calculatedPrime = primeAnnuelle / 12;
          break;
        case 'trimestrielle':
          calculatedPrime = primeAnnuelle / 4;
          break;
        case 'semestrielle':
          calculatedPrime = primeAnnuelle / 2;
          break;
        case 'annuelle':
          calculatedPrime = primeAnnuelle;
          break;
      }

      setPrime(Math.round(calculatedPrime));
    }
  }, [capital, duree, frequence]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleContinue = () => {
    navigate('/souscription/validation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl mb-1">Phase 3: Proposition</h1>
          <p className="text-indigo-100">Simulation et personnalisation</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">1</div>
            <div className="flex-1 h-1 bg-indigo-600"></div>
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">2</div>
            <div className="flex-1 h-1 bg-indigo-600"></div>
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">3</div>
            <div className="flex-1 h-1 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">4</div>
            <div className="flex-1 h-1 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">5</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-8 h-8 text-indigo-600" />
                  <h2 className="text-2xl text-gray-900">Personnalisez votre assurance</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-gray-700">Capital assuré</label>
                      <span className="text-lg text-indigo-600">{formatCurrency(capital)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="50000000"
                      step="1000000"
                      value={capital}
                      onChange={(e) => setCapital(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1M FCFA</span>
                      <span>50M FCFA</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-gray-700">Durée du contrat</label>
                      <span className="text-lg text-indigo-600">{duree} ans</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="5"
                      value={duree}
                      onChange={(e) => setDuree(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 ans</span>
                      <span>40 ans</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Fréquence de paiement</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(['mensuelle', 'trimestrielle', 'semestrielle', 'annuelle'] as const).map((freq) => (
                        <button
                          key={freq}
                          onClick={() => setFrequence(freq)}
                          className={`py-3 rounded-lg border-2 ${
                            frequence === freq
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-700'
                          }`}
                        >
                          <span className="capitalize">{freq}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl text-gray-900 mb-4">Comparaison des produits</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 text-sm text-gray-600">Produit</th>
                        <th className="text-left p-4 text-sm text-gray-600">Taux</th>
                        <th className="text-left p-4 text-sm text-gray-600">Prime {frequence}</th>
                        <th className="text-left p-4 text-sm text-gray-600">Avantages</th>
                      </tr>
                    </thead>
                    <tbody>
                      {produits.map((produit) => {
                        const primeAnnuelle = capital * produit.tauxBase;
                        let primeCalculee = 0;
                        switch (frequence) {
                          case 'mensuelle': primeCalculee = primeAnnuelle / 12; break;
                          case 'trimestrielle': primeCalculee = primeAnnuelle / 4; break;
                          case 'semestrielle': primeCalculee = primeAnnuelle / 2; break;
                          case 'annuelle': primeCalculee = primeAnnuelle; break;
                        }

                        return (
                          <tr
                            key={produit.id}
                            className={`border-t border-gray-100 ${produit.selected ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                          >
                            <td className="p-4">
                              <span className={produit.selected ? 'text-indigo-600' : 'text-gray-900'}>
                                {produit.nom}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-gray-700">{(produit.tauxBase * 100).toFixed(1)}%</td>
                            <td className="p-4 text-sm text-gray-900">{formatCurrency(Math.round(primeCalculee))}</td>
                            <td className="p-4 text-sm text-gray-600">
                              {produit.id === 'eternite' && 'Capital garanti'}
                              {produit.id === 'soutra' && 'Rente viagère'}
                              {produit.id === 'doiho' && 'Protection famille'}
                              {produit.id === 'cadence' && 'Épargne éducation'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <DollarSign className="w-10 h-10 mb-3 opacity-90" />
                <p className="text-sm opacity-90 mb-1">Votre prime {frequence}</p>
                <p className="text-4xl mb-4">{formatCurrency(prime)}</p>
                <div className="border-t border-white/20 pt-4 space-y-2 text-sm opacity-90">
                  <div className="flex justify-between">
                    <span>Capital assuré:</span>
                    <span>{formatCurrency(capital)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durée:</span>
                    <span>{duree} ans</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fréquence:</span>
                    <span className="capitalize">{frequence}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <Calendar className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg text-gray-900 mb-3">Projection sur {duree} ans</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total versé:</span>
                    <span className="text-gray-900">
                      {formatCurrency(prime * (frequence === 'mensuelle' ? 12 : frequence === 'trimestrielle' ? 4 : frequence === 'semestrielle' ? 2 : 1) * duree)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capital garanti:</span>
                    <span className="text-gray-900">{formatCurrency(capital)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rendement estimé:</span>
                    <span className="text-green-600">+{((capital / (prime * (frequence === 'mensuelle' ? 12 : frequence === 'trimestrielle' ? 4 : frequence === 'semestrielle' ? 2 : 1) * duree) - 1) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg text-gray-900 mb-3">Garanties incluses</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>Garantie décès toutes causes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>Garantie invalidité permanente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>Exonération de primes en cas d'incapacité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>Avance sur contrat après 2 ans</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-lg"
              >
                Valider ma proposition
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
