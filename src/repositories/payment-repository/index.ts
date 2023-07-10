import { Payment } from '@prisma/client';
import { prisma } from '../../config';
import { PaymentSchema } from '../../protocols';

async function getPayment(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({ where: { ticketId } });
}

async function postPayment(paymentData: PaymentSchema, value: number): Promise<Payment> {
  const paymentInfo = await prisma.payment.create({
    data: {
      ticketId: paymentData.ticketId,
      value,
      cardIssuer: paymentData.cardData.issuer,
      cardLastDigits: paymentData.cardData.number.toString().slice(-4),
    },
    select: {
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return paymentInfo;
}

async function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({ where: { id: ticketId }, data: { status: 'PAID' } });
}

export const paymentRepository = {
  getPayment,
  postPayment,
  updateTicketStatus,
};
