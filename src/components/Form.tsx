import { useForm } from 'react-hook-form';
import { UserData } from '../types';

interface FormProps {
  onSubmit: (data: UserData) => void;
}

export function Form({ onSubmit }: FormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>();

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
                required: 'Idade é obrigatória',
                min: { value: 18, message: 'Idade mínima é 18 anos' },
                max: { value: 100, message: 'Idade máxima é 100 anos' }
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
                min: { value: 100, message: 'Altura mínima é 100cm' },
                max: { value: 250, message: 'Altura máxima é 250cm' }
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
                min: { value: 30, message: 'Peso mínimo é 30kg' },
                max: { value: 300, message: 'Peso máximo é 300kg' }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Seu peso em quilos"
            />
            {errors.weight && (
              <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Objetivo
            </label>
            <select
              {...register('goal', { required: 'Objetivo é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione seu objetivo</option>
              <option value="lose">Perder peso</option>
              <option value="maintain">Manter peso</option>
              <option value="gain">Ganhar massa</option>
            </select>
            {errors.goal && (
              <p className="mt-1 text-sm text-red-600">{errors.goal.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nível de Atividade
            </label>
            <select
              {...register('activityLevel', { required: 'Nível de atividade é obrigatório' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione seu nível de atividade</option>
              <option value="sedentary">Sedentário (pouco ou nenhum exercício)</option>
              <option value="light">Leve (exercício 1-3 vezes/semana)</option>
              <option value="moderate">Moderado (exercício 3-5 vezes/semana)</option>
              <option value="active">Ativo (exercício 6-7 vezes/semana)</option>
              <option value="very_active">Muito ativo (exercício intenso, 2x/dia)</option>
            </select>
            {errors.activityLevel && (
              <p className="mt-1 text-sm text-red-600">{errors.activityLevel.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Restrições Alimentares
            </label>
            <textarea
              {...register('restrictions')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Liste suas restrições alimentares (alergias, intolerâncias, etc.)"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Gerar Plano Alimentar
          </button>
        </div>
      </form>
    </div>
  );
}