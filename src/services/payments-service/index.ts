import { notUserTicketError } from '../../errors/not-user-ticket-error';
import { ticketNotFoundError } from '../../errors/ticket-not-found-error';
import { checkForTicket, checkForUserTicket } from '../../helpers';
import { PaymentSchema } from '../../protocols';
import { paymentRepository } from '../../repositories/payment-repository';

async function postPayment(paymentData: PaymentSchema, userId: number) {
  const isTicket = await checkForTicket(paymentData.ticketId);
  if (!isTicket) throw ticketNotFoundError();

  const isUserTicket = await checkForUserTicket(isTicket.enrollmentId);
  if (!isUserTicket || isUserTicket.userId !== userId) throw notUserTicketError();
  const paymentInfo = await paymentRepository.postPayment(paymentData, isTicket.TicketType.price);
  await paymentRepository.updateTicketStatus(isTicket.id);
  return paymentInfo;
}

export const paymentsService = {
  postPayment,
};
