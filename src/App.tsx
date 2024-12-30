import { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Form } from './components/Form';
import { Results } from './components/Results';
import { DietPlan } from './components/DietPlan';
import { calculateNutrition } from './services/nutrition';
import { UserData, NutritionResult } from './types';

function App() {
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [plan, setPlan] = useState<string | null>(null);

  const handleFormSubmit = (data: UserData) => {
    const nutritionResult = calculateNutrition(data);
    setResult(nutritionResult);
    setUserData(data);
  };

  const handlePlanGenerated = (generatedPlan: string) => {
    setPlan(generatedPlan);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Features />
      {!result ? (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Form onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {userData && (
            <Results 
              result={result} 
              userData={userData}
              onPlanGenerated={handlePlanGenerated}
            />
          )}
          {plan && (
            <div className="mt-12">
              <DietPlan 
                plan={plan}
                onFollowConfirm={() => {}}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;