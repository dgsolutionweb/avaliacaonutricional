import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCRCBePyZRoBbJtN9CYn9g4i2HxnVlo-N4');

// Função para traduzir os valores dos alimentos para nomes em português
const translateFoodValue = (value: string): string => {
  const translations: { [key: string]: string } = {
    // Carboidratos
    arroz_branco: 'Arroz Branco',
    arroz_integral: 'Arroz Integral',
    pao_frances: 'Pão Francês',
    pao_integral: 'Pão Integral',
    batata: 'Batata',
    batata_doce: 'Batata Doce',
    mandioca: 'Mandioca',
    macarrao: 'Macarrão',
    quinoa: 'Quinoa',
    aveia: 'Aveia',
    // Proteínas
    frango: 'Frango',
    peixe: 'Peixe',
    carne_vermelha: 'Carne Vermelha',
    ovos: 'Ovos',
    whey_protein: 'Whey Protein',
    proteina_soja: 'Proteína de Soja',
    atum: 'Atum',
    sardinha: 'Sardinha',
    // Gorduras
    azeite: 'Azeite',
    abacate: 'Abacate',
    castanhas: 'Castanhas',
    amendoas: 'Amêndoas',
    nozes: 'Nozes',
    chia: 'Chia',
    linhaca: 'Linhaça',
    amendoim: 'Amendoim',
    // Vegetais
    alface: 'Alface',
    rucula: 'Rúcula',
    brocolis: 'Brócolis',
    couve: 'Couve',
    espinafre: 'Espinafre',
    cenoura: 'Cenoura',
    beterraba: 'Beterraba',
    pepino: 'Pepino',
    // Frutas
    banana: 'Banana',
    maca: 'Maçã',
    laranja: 'Laranja',
    morango: 'Morango',
    abacaxi: 'Abacaxi',
    manga: 'Manga',
    uva: 'Uva',
    melancia: 'Melancia'
  };
  return translations[value] || value;
};

export const generateDietPlan = async (userData: any) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const goalTranslation = {
    lose: 'emagrecer',
    maintain: 'manter peso',
    gain: 'ganhar massa'
  };

  // Traduz as preferências alimentares
  const preferredFoods = {
    carbs: userData.preferredCarbs?.map(translateFoodValue).join(', '),
    proteins: userData.preferredProteins?.map(translateFoodValue).join(', '),
    fats: userData.preferredFats?.map(translateFoodValue).join(', '),
    vegetables: userData.preferredVegetables?.map(translateFoodValue).join(', '),
    fruits: userData.preferredFruits?.map(translateFoodValue).join(', ')
  };

  // Análise de restrições alimentares
  const hasRestrictions = userData.foodIntolerances || userData.hasPreDiabetes || userData.hasHighBloodPressure;
  
  const restrictionsAnalysis = `
ANÁLISE DE RESTRIÇÕES ALIMENTARES:
${userData.foodIntolerances ? `- Intolerâncias Alimentares: ${userData.foodIntolerances}
- Alimentos a serem TOTALMENTE evitados
- Riscos de contaminação cruzada a considerar
- Sintomas de reação alérgica a observar` : ''}

${userData.hasPreDiabetes ? `- Condição: Pré-diabetes
- Controle de índice glicêmico
- Monitoramento de carboidratos
- Alimentos que afetam a glicemia` : ''}

${userData.hasHighBloodPressure ? `- Condição: Pressão Alta
- Controle de sódio
- Alimentos anti-hipertensivos
- Minerais a serem priorizados` : ''}`;

  const prompt = `Crie um plano alimentar personalizado detalhado em português para uma pessoa com as seguintes características:
    
DADOS DO PACIENTE:
- IMC: ${userData.bmi}
- Categoria IMC: ${userData.bmiCategory}
- Objetivo: ${goalTranslation[userData.goal as keyof typeof goalTranslation]}
- Dias de treino por semana: ${userData.trainingDaysPerWeek}
- Intensidade do treino: ${userData.trainingIntensity === 'low' ? 'leve' : userData.trainingIntensity === 'medium' ? 'moderada' : 'alta'}
- Necessidade calórica diária: ${userData.tdee.toFixed(0)} calorias

PREFERÊNCIAS ALIMENTARES:
- Carboidratos preferidos: ${preferredFoods.carbs || 'Sem preferências específicas'}
- Proteínas preferidas: ${preferredFoods.proteins || 'Sem preferências específicas'}
- Gorduras boas preferidas: ${preferredFoods.fats || 'Sem preferências específicas'}
- Vegetais preferidos: ${preferredFoods.vegetables || 'Sem preferências específicas'}
- Frutas preferidas: ${preferredFoods.fruits || 'Sem preferências específicas'}

HORÁRIOS:
- Acorda: ${userData.mealTimeRestrictions?.wakingTime || 'Não informado'}
- Dorme: ${userData.mealTimeRestrictions?.bedTime || 'Não informado'}
- Treino: ${userData.mealTimeRestrictions?.workoutTime || 'Não informado'}
- Restrição almoço: ${userData.mealTimeRestrictions?.lunchTimeRestriction || 'Não informado'}

${hasRestrictions ? restrictionsAnalysis : ''}

Por favor, forneça um plano extremamente detalhado e SEGURO, considerando TODAS as preferências e restrições mencionadas:

1. ANÁLISE DE SEGURANÇA ALIMENTAR:
- Lista completa de alimentos PROIBIDOS
- Alimentos que requerem atenção especial
- Substitutos seguros para alimentos comuns
- Orientações para evitar contaminação cruzada

2. DISTRIBUIÇÃO DE MACRONUTRIENTES:
- Proteínas (g e % das calorias totais) - apenas de fontes preferidas e seguras
- Carboidratos (g e % das calorias totais) - adequados às restrições
- Gorduras (g e % das calorias totais) - fontes permitidas
- Fibras (g/dia) - considerando tolerância

3. PLANO ALIMENTAR DETALHADO:
Para cada refeição, forneça:
- Horário recomendado (baseado nos horários informados)
- Alimentos SEGUROS com quantidades exatas em gramas
- Medidas caseiras equivalentes (colheres, xícaras, etc.)
- Calorias por refeição
- Macronutrientes por refeição
- Observações específicas sobre segurança alimentar

4. TABELA DE SUBSTITUIÇÕES SEGURAS:
Para cada alimento preferido, liste 3 opções SEGURAS de substituição com:
- Garantia de adequação às restrições
- Quantidades em gramas
- Medidas caseiras
- Valor nutricional similar
- Observações sobre preparo seguro

5. RECOMENDAÇÕES ESPECÍFICAS:
- Alimentos preferidos a priorizar
- Alimentos TOTALMENTE proibidos
- Alimentos que requerem moderação
- Ajustes para dias de treino vs. dias sem treino
- Suplementação segura (se necessário)

6. HIDRATAÇÃO SEGURA:
- Quantidade diária recomendada de água
- Bebidas permitidas e proibidas
- Ajuste para dias de treino
- Dicas para hidratação segura

7. ORIENTAÇÕES PRÉ E PÓS TREINO:
- Opções seguras pré-treino usando alimentos preferidos (2-3 opções com horários)
- Opções seguras pós-treino usando alimentos preferidos (2-3 opções com horários)
- Ajustes baseados na intensidade do treino
- Considerações especiais para restrições

8. DICAS DE PREPARAÇÃO SEGURA:
- Como preparar as refeições evitando contaminação
- Utensílios e equipamentos recomendados
- Dicas de armazenamento seguro
- Lista de temperos permitidos
- Sugestões de lanches emergenciais seguros usando alimentos preferidos

9. ESTRATÉGIAS PARA SUCESSO:
- Como lidar com refeições fora de casa de forma segura
- Como comunicar suas restrições em restaurantes
- Dicas para manter a consistência
- Como monitorar o progresso
- Sinais de alerta para reações adversas
- Quando procurar ajuda médica

10. PLANO DE EMERGÊNCIA:
- O que fazer em caso de exposição acidental
- Sintomas a observar
- Contatos de emergência recomendados
- Kit de primeiros socorros alimentar

Por favor, formate a resposta de maneira clara e organizada, usando tópicos, subtópicos e tabelas quando apropriado. DESTAQUE em negrito todas as informações críticas relacionadas à segurança alimentar e use APENAS os alimentos preferidos indicados pelo usuário, fornecendo substituições adequadas quando necessário.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};