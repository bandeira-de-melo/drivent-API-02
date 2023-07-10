import { EnrollmentRequiredError } from '../../errors/enrollment-required-error';
import { notUserTicketError } from '../../errors/not-user-ticket-error';
import { ticketNotFoundError } from '../../errors/ticket-not-found-error';
import { checkForTicket, checkForUserEnrollment, checkForUserTicket } from '../../helpers';
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

async function getPaymentInfo(ticketId: number, userId: number) {
  const isTicket = await checkForTicket(ticketId);
  if (!isTicket) throw ticketNotFoundError();
  const userEnrollment = await checkForUserEnrollment(userId);
  if (!userEnrollment) throw EnrollmentRequiredError('No User Enrolled With The Given Id.');

  if (isTicket.enrollmentId !== userEnrollment.id) throw notUserTicketError();

  const paymentInfo = await paymentRepository.getPayment(ticketId);
  return paymentInfo;
}

export const paymentsService = {
  getPaymentInfo,
  postPayment,
};
