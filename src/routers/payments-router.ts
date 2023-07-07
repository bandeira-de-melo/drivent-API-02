import { Router } from 'express';
import { authenticateToken } from '../middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/?ticketId').post('/process');

export { paymentsRouter };
