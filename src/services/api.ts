export interface CreateCheckoutSessionRequest {
  dietPlan: string;
  userEmail: string;
}

export async function createCheckoutSession(data: CreateCheckoutSessionRequest) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar sessão de pagamento');
  }

  return response.json();
}

export async function verifyPaymentStatus(sessionId: string) {
  const response = await fetch(`/api/verify-payment-status?session_id=${sessionId}`);
  
  if (!response.ok) {
    throw new Error('Erro ao verificar status do pagamento');
  }

  return response.json();
} 