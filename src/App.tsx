import { useState } from 'react';
import { UserData, NutritionResult } from './types';
import { calculateBMI, getBMICategory, calculateBMR, calculateTDEE } from './utils/calculations';
import { generateDietPlan } from './services/gemini';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Form } from './components/Form';
import { Results } from './components/Results';
import { DietPlan } from './components/DietPlan';

function App() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [dietPlan, setDietPlan] = useState<string | null>(null);
  const [isFollower, setIsFollower] = useState(false);

  const handleFormSubmit = async (data: UserData) => {
    const bmi = calculateBMI(data.weight, data.height);
    const bmiCategory = getBMICategory(bmi);
    const bmr = calculateBMR(data.weight, data.height, data.age, 'male');
    const tdee = calculateTDEE(bmr, data.trainingIntensity);

    const nutritionResult = {
      bmi,
      bmiCategory,
      bmr,
      tdee,
      recommendation: `Com base no seu IMC de ${bmi.toFixed(1)} (${bmiCategory}), 
        e seu objetivo de ${data.goal === 'lose' ? 'emagrecer' : data.goal === 'maintain' ? 'manter peso' : 'ganhar massa'}, 
        recomendamos uma ingestão diária de ${tdee.toFixed(0)} calorias.`
    };

    setResult(nutritionResult);
    setStep(2);

    try {
      const plan = await generateDietPlan({ ...data, ...nutritionResult });
      setDietPlan(plan);
      setStep(3);
    } catch (error) {
      console.error('Erro ao gerar plano:', error);
    }
  };

  const handleFollowConfirm = () => {
    setIsFollower(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Features />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {step === 1 && <Form onSubmit={handleFormSubmit} />}
        {step === 2 && result && <Results result={result} />}
        {step === 3 && dietPlan && (
          isFollower ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800">
                Seu Plano Alimentar Completo
              </h2>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700">{dietPlan}</pre>
                </div>
              </div>
            </div>
          ) : (
            <DietPlan plan={dietPlan} onFollowConfirm={handleFollowConfirm} />
          )
        )}
      </div>
    </div>
  );
}

export default App;