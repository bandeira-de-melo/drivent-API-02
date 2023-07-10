import Joi from 'joi';
import { PaymentSchema } from '../protocols';

export const createPaymentSchema = Joi.object<PaymentSchema>({
  ticketId: Joi.string().required(),
  cardData: Joi.object({
    issuer: Joi.string().min(4).required(),
    number: Joi.number().required(),
    name: Joi.string().min(3).required(),
    expirationDate: Joi.string().min(5).required(),
    cvv: Joi.number().min(3).required(),
  }),
});
