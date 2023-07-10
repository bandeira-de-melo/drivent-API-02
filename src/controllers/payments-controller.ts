import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import { PaymentSchema } from '../protocols';
import { paymentsService } from '../services/payments-service';

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const paymentData = req.body as PaymentSchema;
  if (!paymentData.ticketId || !paymentData.cardData) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'ticketId and cardDate are required' });
  }
  try {
    const paymentInfo = await paymentsService.postPayment(paymentData, userId);
    return res.status(httpStatus.OK).send(paymentInfo);
  } catch (error) {
    console.log(error);
    if (error.name === 'ticketNotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === 'notUserTicketError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
  }
}
