import React, { useState } from 'react';
import { InstagramModal } from './InstagramModal';
import { PlanModal } from './PlanModal';

interface DietPlanProps {
  plan: string;
  onFollowConfirm: () => void;
}

export function DietPlan({ plan, onFollowConfirm }: DietPlanProps) {
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);

  const handleInstagramFollow = () => {
    window.open('https://instagram.com/dgsolutionweb', '_blank');
    setIsInstagramModalOpen(true);
  };

  const handleInstagramModalClose = () => {
    setIsInstagramModalOpen(false);
  };

  const handleInstagramModalConfirm = () => {
    setIsInstagramModalOpen(false);
    setHasFollowed(true);
    setIsPlanModalOpen(true);
    onFollowConfirm();
  };

  const handlePlanModalClose = () => {
    setIsPlanModalOpen(false);
  };

  const handleShowPlan = () => {
    if (hasFollowed) {
      setIsPlanModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Seu Plano Alimentar Personalizado
      </h2>
      
      {!hasFollowed ? (
        // Visualização antes de seguir
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700">
              {plan.split('\n').slice(0, 5).join('\n')}...
            </pre>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-center font-medium">
              Para ver seu plano alimentar completo, siga-nos no Instagram!
            </p>
          </div>

          <div className="mt-6 max-w-md mx-auto">
            <button
              onClick={handleInstagramFollow}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Seguir @dgsolutionweb
            </button>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Siga-nos para receber dicas diárias de nutrição e bem-estar
            </p>
          </div>
        </div>
      ) : (
        // Visualização após seguir
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Obrigado por nos seguir!
            </h3>
            <p className="text-gray-600">
              Seu plano alimentar completo está disponível. Clique no botão abaixo para visualizar.
            </p>
          </div>

          <button
            onClick={handleShowPlan}
            className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Visualizar Plano Completo
          </button>
        </div>
      )}

      <InstagramModal
        isOpen={isInstagramModalOpen}
        onClose={handleInstagramModalClose}
        onConfirm={handleInstagramModalConfirm}
      />

      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={handlePlanModalClose}
        plan={plan}
      />

      {/* Rodapé com créditos */}
      <div className="text-center pt-8 pb-4">
        <p className="text-sm text-gray-500">
          Site desenvolvido por{' '}
          <a
            href="https://instagram.com/dgsolutionweb"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            DGSolutionWEB
          </a>
        </p>
      </div>
    </div>
  );
}