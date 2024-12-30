import React from 'react';

export function Features() {
  const features = [
    {
      title: 'Avaliação Completa',
      description: 'Análise detalhada do seu perfil, incluindo IMC, taxa metabólica e necessidades nutricionais.',
      icon: '📊'
    },
    {
      title: 'Plano Personalizado',
      description: 'Cardápio adaptado às suas preferências, restrições alimentares e objetivos.',
      icon: '🎯'
    },
    {
      title: 'Suporte Científico',
      description: 'Recomendações baseadas em dados científicos e adaptadas ao seu estilo de vida.',
      icon: '🔬'
    },
    {
      title: 'Resultados Reais',
      description: 'Acompanhamento do seu progresso com metas alcançáveis e sustentáveis.',
      icon: '📈'
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Por que escolher nosso plano?
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Desenvolvido por especialistas para garantir seus resultados
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg text-4xl">
                      {feature.icon}
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}