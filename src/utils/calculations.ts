export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 24.9) return 'Peso normal';
  if (bmi < 29.9) return 'Sobrepeso';
  if (bmi < 34.9) return 'Obesidade grau 1';
  if (bmi < 39.9) return 'Obesidade grau 2';
  return 'Obesidade grau 3';
};

export const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  // Fórmula de Harris-Benedict
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  }
  return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
};

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  // Mapeamento dos níveis de atividade para os fatores correspondentes
  const factors: { [key: string]: number } = {
    'low': 1.375,      // Atividade leve
    'medium': 1.55,    // Atividade moderada
    'high': 1.725      // Atividade intensa
  };
  
  // Se o nível de atividade não for encontrado, usa o fator para atividade leve como padrão
  const factor = factors[activityLevel] || 1.375;
  
  return bmr * factor;
};