import { useState, useEffect } from 'react';
import { NutritionResult } from '../types';
import { generateDietPlan } from '../services/gemini';

interface ResultsProps {
  result: NutritionResult;
  userData: any;
  onPlanGenerated: (plan: string) => void;
}

export function Results({ result, userData, onPlanGenerated }: ResultsProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generatePlan = async () => {
    if (hasGenerated) return;
    
    try {
      setIsGenerating(true);
      setError(null);
      const plan = await generateDietPlan(userData);
      onPlanGenerated(plan);
      setHasGenerated(true);
    } catch (err) {
      console.error('Erro ao gerar plano:', err);
      setError('Ocorreu um erro ao gerar o plano alimentar. Por favor, tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generatePlan();
  }, []);

  const handleRetry = () => {
    setHasGenerated(false);
    generatePlan();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Resultados da sua Avaliação
      </h2>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Seu IMC</h3>
            <p className="text-3xl font-bold text-blue-600">{result.bmi.toFixed(1)}</p>
            <p className="text-lg text-blue-800">{result.bmiCategory}</p>
          </div>
          
          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 mb-2">Taxa Metabólica Basal</h3>
            <p className="text-3xl font-bold text-green-600">{result.bmr.toFixed(0)}</p>
            <p className="text-lg text-green-800">calorias/dia</p>
          </div>
          
          <div className="p-6 bg-purple-50 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 mb-2">Gasto Calórico Total</h3>
            <p className="text-3xl font-bold text-purple-600">{result.tdee.toFixed(0)}</p>
            <p className="text-lg text-purple-800">calorias/dia</p>
          </div>
          
          <div className="p-6 bg-orange-50 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 mb-2">Recomendação</h3>
            <p className="text-lg text-orange-800">{result.recommendation}</p>
          </div>
        </div>
      </div>

      {isGenerating ? (
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-xl text-gray-600">
            Gerando seu plano alimentar personalizado...
          </p>
          <p className="text-sm text-gray-500">
            Isso pode levar alguns segundos
          </p>
        </div>
      ) : error ? (
        <div className="text-center space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-800 mb-2">{error}</p>
            <button
              onClick={handleRetry}
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}