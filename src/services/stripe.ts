import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from './api';

// Use a variável de ambiente para a chave pública do Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const handlePayment = async (dietPlan: string, userEmail: string) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe não foi carregado corretamente');

    // Criar sessão de checkout através do backend
    const { sessionId } = await createCheckoutSession({
      dietPlan,
      userEmail,
    });

    // Redirecionar para o checkout do Stripe
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro no processo de pagamento:', error);
    throw error;
  }
};