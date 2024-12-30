export interface UserData {
  fullName: string;
  age: number;
  height: number;
  weight: number;
  hasPreDiabetes: boolean;
  hasHighBloodPressure: boolean;
  foodIntolerances: string;
  goal: 'lose' | 'maintain' | 'gain';
  trainingDaysPerWeek: number;
  trainingIntensity: 'low' | 'medium' | 'high';
  
  // Preferências de Carboidratos
  preferredCarbs: string[];
  // Exemplos: arroz branco, arroz integral, pão francês, pão integral, batata, 
  // batata doce, mandioca, macarrão, quinoa, aveia

  // Preferências de Proteínas
  preferredProteins: string[];
  // Exemplos: frango, peixe, carne vermelha, ovos, whey protein,
  // proteína de soja, atum, sardinha

  // Preferências de Gorduras Boas
  preferredFats: string[];
  // Exemplos: azeite, abacate, castanhas, amêndoas, nozes,
  // chia, linhaça, amendoim

  // Preferências de Vegetais
  preferredVegetables: string[];
  // Exemplos: alface, rúcula, brócolis, couve, espinafre,
  // cenoura, beterraba, pepino

  // Preferências de Frutas
  preferredFruits: string[];
  // Exemplos: banana, maçã, laranja, morango, abacaxi,
  // manga, uva, melancia

  // Restrições de horários para refeições
  mealTimeRestrictions?: {
    wakingTime: string; // Horário que acorda
    bedTime: string;    // Horário que vai dormir
    workoutTime?: string; // Horário do treino
    lunchTimeRestriction?: string; // Restrição de horário para almoço
  };
}

export interface NutritionResult {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  recommendation: string;
}