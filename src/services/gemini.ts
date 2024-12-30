import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserData } from '../types';

// Verifica se a chave da API está definida
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY não está definida nas variáveis de ambiente');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateDietPlan(userData: UserData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Atue como um nutricionista profissional e crie um plano alimentar simples e direto baseado nos seguintes dados:

Nome: ${userData.fullName}
Idade: ${userData.age} anos
Altura: ${userData.height} cm
Peso: ${userData.weight} kg
Objetivo: ${userData.goal}
Nível de Atividade: ${userData.activityLevel}
Restrições Alimentares: ${userData.restrictions || 'Nenhuma'}

Por favor, forneça um plano alimentar no seguinte formato:

**CARDÁPIO DIÁRIO**
(Liste 6 refeições com horários sugeridos e quantidades em gramas/medidas caseiras)

1. Café da Manhã (7h):
2. Lanche da Manhã (10h):
3. Almoço (13h):
4. Lanche da Tarde (16h):
5. Jantar (19h):
6. Ceia (21h30):

**PRÉ-TREINO**
(Liste 2-3 opções práticas de refeição pré-treino com horário sugerido)

**PÓS-TREINO**
(Liste 2-3 opções práticas de refeição pós-treino com horário sugerido)

**SUGESTÕES E DICAS**
- Liste 5 dicas práticas e objetivas para melhor aderência ao plano
- Inclua sugestões de substituições para os principais alimentos

Por favor, mantenha o plano simples, prático e fácil de seguir, com foco em alimentos comuns e facilmente encontrados.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text;
  } catch (error) {
    console.error('Erro ao gerar plano:', error);
    throw new Error('Não foi possível gerar o plano alimentar. Por favor, tente novamente.');
  }
}