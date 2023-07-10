import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { createPaymentSchema } from '../schemas/payments-schema';
import { postPayment } from '../controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/?ticketId')
  .post('/process', /*validateBody(createPaymentSchema),*/ postPayment);

export { paymentsRouter };
