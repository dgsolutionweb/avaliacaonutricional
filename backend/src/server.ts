import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY não encontrada nas variáveis de ambiente');
}

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

// Configuração do middleware
app.use(cors());
app.use(express.json());

// Rota para criar sessão de checkout
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { dietPlan, userEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Plano Alimentar Personalizado',
              description: 'Plano nutricional completo com acompanhamento'
            },
            unit_amount: 2000 // R$ 20,00 em centavos
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
      customer_email: userEmail,
      metadata: {
        dietPlan: dietPlan.substring(0, 500) // Limitando o tamanho dos metadados
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
    res.status(500).json({ error: 'Erro ao criar sessão de pagamento' });
  }
});

// Rota para verificar status do pagamento
app.get('/api/verify-payment-status', async (req, res) => {
  try {
    const { session_id } = req.query;
    
    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ error: 'ID da sessão não fornecido' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json({ status: session.payment_status });
  } catch (error) {
    console.error('Erro ao verificar status:', error);
    res.status(500).json({ error: 'Erro ao verificar status do pagamento' });
  }
});

// Webhook do Stripe
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).json({ error: 'STRIPE_WEBHOOK_SECRET não configurada' });
  }

  if (!sig) {
    return res.status(400).json({ error: 'Assinatura do webhook não encontrada' });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // Aqui você pode implementar o envio do email com o plano
        // e salvar as informações do pagamento no banco de dados
        console.log('Pagamento confirmado para a sessão:', session.id);
        break;
      
      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    const error = err as Error;
    console.error('Erro no webhook:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 