import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getPaymentByTicketId, postPayment } from '../controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPaymentByTicketId)
  .post('/process', /*validateBody(createPaymentSchema),*/ postPayment);

export { paymentsRouter };
