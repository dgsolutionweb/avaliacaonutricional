export interface UserData {
  fullName: string;
  age: number;
  height: number;
  weight: number;
  goal: 'lose' | 'maintain' | 'gain';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  restrictions?: string;
}

export interface NutritionResult {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  recommendation: string;
}