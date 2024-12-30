import { NutritionResult } from '../types';

interface ResultsProps {
  result: NutritionResult;
}

export function Results({ result }: ResultsProps) {
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
      <p className="text-center text-xl text-gray-600 animate-pulse">
        Gerando seu plano alimentar personalizado...
      </p>
    </div>
  );
}