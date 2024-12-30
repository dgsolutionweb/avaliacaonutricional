import React from 'react';
import { useForm } from 'react-hook-form';
import { UserData } from '../types';

interface FormProps {
  onSubmit: (data: UserData) => void;
}

// Opções de alimentos
const foodOptions = {
  carbs: [
    { value: 'arroz_branco', label: 'Arroz Branco' },
    { value: 'arroz_integral', label: 'Arroz Integral' },
    { value: 'pao_frances', label: 'Pão Francês' },
    { value: 'pao_integral', label: 'Pão Integral' },
    { value: 'batata', label: 'Batata' },
    { value: 'batata_doce', label: 'Batata Doce' },
    { value: 'mandioca', label: 'Mandioca' },
    { value: 'macarrao', label: 'Macarrão' },
    { value: 'quinoa', label: 'Quinoa' },
    { value: 'aveia', label: 'Aveia' }
  ],
  proteins: [
    { value: 'frango', label: 'Frango' },
    { value: 'peixe', label: 'Peixe' },
    { value: 'carne_vermelha', label: 'Carne Vermelha' },
    { value: 'ovos', label: 'Ovos' },
    { value: 'whey_protein', label: 'Whey Protein' },
    { value: 'proteina_soja', label: 'Proteína de Soja' },
    { value: 'atum', label: 'Atum' },
    { value: 'sardinha', label: 'Sardinha' }
  ],
  fats: [
    { value: 'azeite', label: 'Azeite' },
    { value: 'abacate', label: 'Abacate' },
    { value: 'castanhas', label: 'Castanhas' },
    { value: 'amendoas', label: 'Amêndoas' },
    { value: 'nozes', label: 'Nozes' },
    { value: 'chia', label: 'Chia' },
    { value: 'linhaca', label: 'Linhaça' },
    { value: 'amendoim', label: 'Amendoim' }
  ],
  vegetables: [
    { value: 'alface', label: 'Alface' },
    { value: 'rucula', label: 'Rúcula' },
    { value: 'brocolis', label: 'Brócolis' },
    { value: 'couve', label: 'Couve' },
    { value: 'espinafre', label: 'Espinafre' },
    { value: 'cenoura', label: 'Cenoura' },
    { value: 'beterraba', label: 'Beterraba' },
    { value: 'pepino', label: 'Pepino' }
  ],
  fruits: [
    { value: 'banana', label: 'Banana' },
    { value: 'maca', label: 'Maçã' },
    { value: 'laranja', label: 'Laranja' },
    { value: 'morango', label: 'Morango' },
    { value: 'abacaxi', label: 'Abacaxi' },
    { value: 'manga', label: 'Manga' },
    { value: 'uva', label: 'Uva' },
    { value: 'melancia', label: 'Melancia' }
  ]
};

export function Form({ onSubmit }: FormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<UserData>();
  const watchGoal = watch('goal');

  return (
    <div id="avaliacao" className="bg-white p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Avaliação Nutricional Gratuita
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Dados Pessoais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              {...register('fullName', { required: 'Nome é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Seu nome completo"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idade
            </label>
            <input
              type="number"
              {...register('age', { 
                required: 'Idade é obrigatória'
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Sua idade"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Altura (cm)
            </label>
            <input
              type="number"
              {...register('height', { 
                required: 'Altura é obrigatória',
                min: { value: 100, message: 'Altura mínima é 100cm' }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Sua altura em centímetros"
            />
            {errors.height && (
              <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Peso (kg)
            </label>
            <input
              type="number"
              {...register('weight', { 
                required: 'Peso é obrigatório',
                min: { value: 30, message: 'Peso mínimo é 30kg' }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Seu peso em quilos"
            />
            {errors.weight && (
              <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
            )}
          </div>
        </div>

        {/* Condições de Saúde */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tem pré-diabetes?
            </label>
            <input
              type="checkbox"
              {...register('hasPreDiabetes')}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tem pressão alta?
            </label>
            <input
              type="checkbox"
              {...register('hasHighBloodPressure')}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Intolerâncias */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Intolerâncias Alimentares
          </label>
          <textarea
            {...register('foodIntolerances')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Liste suas intolerâncias alimentares (se houver)"
            rows={3}
          />
        </div>

        {/* Objetivo e Treino */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Objetivo
            </label>
            <select
              {...register('goal')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="lose">Emagrecer</option>
              <option value="maintain">Manter peso</option>
              <option value="gain">Ganhar massa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dias de treino por semana
            </label>
            <input
              type="number"
              {...register('trainingDaysPerWeek', { 
                required: 'Número de dias é obrigatório',
                min: { value: 0, message: 'Mínimo 0 dias' },
                max: { value: 7, message: 'Máximo 7 dias' }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Quantidade de dias"
            />
            {errors.trainingDaysPerWeek && (
              <p className="mt-1 text-sm text-red-600">{errors.trainingDaysPerWeek.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Intensidade dos Treinos
            </label>
            <select
              {...register('trainingIntensity')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Leve (30-45 min, baixa intensidade)</option>
              <option value="medium">Moderada (45-60 min, intensidade média)</option>
              <option value="high">Alta (60+ min, alta intensidade)</option>
            </select>
          </div>
        </div>

        {/* Preferências Alimentares */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Preferências Alimentares</h3>
          
          {/* Carboidratos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carboidratos Preferidos (selecione até 5)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {foodOptions.carbs.map((carb) => (
                <label key={carb.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferredCarbs')}
                    value={carb.value}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{carb.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Proteínas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proteínas Preferidas (selecione até 5)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {foodOptions.proteins.map((protein) => (
                <label key={protein.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferredProteins')}
                    value={protein.value}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{protein.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gorduras */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gorduras Boas Preferidas (selecione até 4)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {foodOptions.fats.map((fat) => (
                <label key={fat.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferredFats')}
                    value={fat.value}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{fat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vegetais */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vegetais Preferidos (selecione até 6)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {foodOptions.vegetables.map((vegetable) => (
                <label key={vegetable.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferredVegetables')}
                    value={vegetable.value}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{vegetable.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Frutas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frutas Preferidas (selecione até 4)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {foodOptions.fruits.map((fruit) => (
                <label key={fruit.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferredFruits')}
                    value={fruit.value}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{fruit.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Horários */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Horários</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Horário que acorda
              </label>
              <input
                type="time"
                {...register('mealTimeRestrictions.wakingTime')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Horário que vai dormir
              </label>
              <input
                type="time"
                {...register('mealTimeRestrictions.bedTime')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Horário do treino (se houver)
              </label>
              <input
                type="time"
                {...register('mealTimeRestrictions.workoutTime')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Restrição de horário para almoço
              </label>
              <input
                type="time"
                {...register('mealTimeRestrictions.lunchTimeRestriction')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-3 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Calcular Meu Plano
        </button>
      </form>
    </div>
  );
}