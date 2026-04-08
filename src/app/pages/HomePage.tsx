import { useNavigate } from 'react-router';
import { Shield, Users, Briefcase, GraduationCap, ArrowRight, Check, Phone, Mail } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const produits = [
    {
      id: 'eternite',
      nom: 'YAKO Éternité',
      icone: Shield,
      description: 'Prévoyance & épargne',
      details: 'Protection vie entière avec transmission de patrimoine',
      primeMin: '3 000 FCFA/mois',
      avantages: ['Capital garanti', 'Transmission patrimoine', 'Prime fixe'],
      color: 'bg-[#076834]'
    },
    {
      id: 'soutra',
      nom: 'Soutra',
      icone: Users,
      description: 'Épargne retraite',
      details: 'Complément retraite avec rente viagère garantie',
      primeMin: '5 000 FCFA/mois',
      avantages: ['Rente viagère', 'Épargne progressive', 'Avantages fiscaux'],
      color: 'bg-[#0D8E46]'
    },
    {
      id: 'doiho',
      nom: 'Doihô',
      icone: Briefcase,
      description: 'Protection familiale',
      details: 'Couverture complète pour toute la famille',
      primeMin: '7 500 FCFA/mois',
      avantages: ['Couverture famille', 'Capital éducation', 'Assistance'],
      color: 'bg-[#F7A400]'
    },
    {
      id: 'cadence',
      nom: 'Cadence Éducation',
      icone: GraduationCap,
      description: 'Épargne scolaire',
      details: 'Financement des études de vos enfants garanti',
      primeMin: '4 000 FCFA/mois',
      avantages: ['Capital études', 'Versements programmés', 'Garantie décès'],
      color: 'bg-[#076834]'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      {/* Hero Section */}
      <div className="bg-[#076834] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#F7A400] opacity-10"></div>
        <div className="absolute left-1/3 bottom-0 w-48 h-48 rounded-full bg-[#F7A400] opacity-5"></div>

        <div className="container mx-auto px-6 py-16 relative">
          <div className="inline-block bg-[#F7A400]/25 border border-[#F7A400]/40 rounded-full px-4 py-1 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[#FFDA80]">
              AssuRStable × YAKO Africa
            </span>
          </div>

          <h1 className="font-['Sora'] text-5xl font-extrabold mb-4 leading-tight max-w-3xl">
            Votre assurance vie,<br />
            <span className="text-[#F7A400]">en toute confiance</span>
          </h1>

          <p className="text-lg opacity-80 max-w-2xl mb-8 leading-relaxed">
            Protégez votre famille, préparez votre retraite, financez l'éducation de vos enfants.
            Souscrivez en quelques minutes depuis votre téléphone.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => navigate('/souscription/demande')}
              className="bg-[#F7A400] text-[#412402] px-8 py-4 rounded-xl font-bold hover:bg-[#C47D00] transition-all shadow-lg flex items-center gap-2"
            >
              Souscrire maintenant
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/client')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Espace client
            </button>
          </div>

          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#F7A400]" />
              <span>Souscription 100% digitale</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#F7A400]" />
              <span>Paiement Mobile Money</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#F7A400]" />
              <span>Accessible dès 3 000 FCFA/mois</span>
            </div>
          </div>
        </div>
      </div>

      {/* Produits Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[#076834] mb-3">
            Nos Produits
          </div>
          <h2 className="font-['Sora'] text-4xl font-bold text-[#1A1A1A] mb-4">
            Choisissez la protection adaptée à vos besoins
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            4 produits d'assurance vie conçus pour répondre aux besoins de toutes les familles ivoiriennes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {produits.map((produit) => {
            const Icone = produit.icone;
            return (
              <div
                key={produit.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate('/souscription/demande')}
              >
                <div className={`${produit.color} text-white p-6 flex items-center justify-between`}>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{produit.nom}</h3>
                    <p className="text-sm opacity-90">{produit.description}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icone className="w-8 h-8" />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[#6B7280] mb-4">{produit.details}</p>

                  <div className="mb-4">
                    <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">À partir de</span>
                    <p className="font-['Sora'] text-2xl font-bold text-[#F7A400]">
                      {produit.primeMin}
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {produit.avantages.map((avantage, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                        <Check className="w-4 h-4 text-[#076834] flex-shrink-0" />
                        {avantage}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-3 bg-[#E8F5EE] text-[#076834] rounded-xl font-bold hover:bg-[#C2E0CE] transition-all flex items-center justify-center gap-2">
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Processus Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest uppercase text-[#076834] mb-3">
              Comment ça marche
            </div>
            <h2 className="font-['Sora'] text-4xl font-bold text-[#1A1A1A] mb-4">
              Souscrivez en 5 étapes simples
            </h2>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 max-w-5xl mx-auto">
            {[
              { num: '01', titre: 'Demande', desc: 'Choisissez votre produit et remplissez vos informations', icon: '📝' },
              { num: '02', titre: 'Qualification', desc: 'Validation d\'identité et enregistrement bénéficiaires', icon: '✓' },
              { num: '03', titre: 'Proposition', desc: 'Simulez votre prime et personnalisez votre contrat', icon: '💰' },
              { num: '04', titre: 'Validation', desc: 'Signez électroniquement et confirmez par OTP', icon: '✍️' },
              { num: '05', titre: 'Paiement', desc: 'Payez par Mobile Money et recevez votre contrat', icon: '📱' },
            ].map((etape, index) => (
              <div key={index} className="flex-shrink-0 w-64 relative">
                <div className="bg-[#E8F5EE] border-2 border-[#C2E0CE] rounded-2xl p-6 h-full">
                  <div className="w-14 h-14 bg-[#076834] text-white rounded-full flex items-center justify-center text-2xl mb-4">
                    {etape.icon}
                  </div>
                  <div className="text-xs font-bold text-[#076834] tracking-wide mb-2">
                    ÉTAPE {etape.num}
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{etape.titre}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{etape.desc}</p>
                </div>
                {index < 4 && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-[#F7A400] text-2xl font-bold z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#076834] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-['Sora'] text-3xl font-bold mb-4">
            Prêt à protéger votre famille ?
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de familles ivoiriennes qui ont fait confiance à YAKO Africa pour sécuriser leur avenir.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/souscription/demande')}
              className="bg-[#F7A400] text-[#412402] px-8 py-4 rounded-xl font-bold hover:bg-[#C47D00] transition-all shadow-lg flex items-center gap-2"
            >
              Commencer ma souscription
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/agent')}
              className="bg-white text-[#076834] px-8 py-4 rounded-xl font-bold hover:bg-[#E8F5EE] transition-all"
            >
              Espace Agent
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="bg-white/10 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Console Admin
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#1A1A1A] text-white/70 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-['Sora'] text-xl font-bold text-white mb-4">
                YAKO Africa
              </h3>
              <p className="text-sm leading-relaxed">
                Assurance vie accessible à tous. Protection, épargne, transmission de patrimoine.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
                Produits
              </h4>
              <ul className="space-y-2 text-sm">
                <li>YAKO Éternité</li>
                <li>Soutra</li>
                <li>Doihô</li>
                <li>Cadence Éducation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+225 XX XX XX XX XX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@yakoafrica.ci</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm">
            <p className="opacity-50">
              © 2026 YAKO Africa Assurances Vie — Hackathon InsurTech Challenge
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
