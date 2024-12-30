import React from 'react';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-20"></div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
            <span className="block">Comece 2025</span>
            <span className="block text-blue-600">Com Saúde e Disposição</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500 sm:max-w-3xl">
            Transforme sua vida com um plano alimentar personalizado, 
            criado especialmente para você por nossa inteligência artificial avançada.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
              <a href="#avaliacao" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Começar Avaliação Gratuita
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}