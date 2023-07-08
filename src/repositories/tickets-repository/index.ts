import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '../../config';

async function findMany(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function getUserTicket(enrollmentId: number): Promise<Ticket & { TicketType: TicketType }> {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

export const ticketsRepository = {
  findMany,
  getUserTicket,
};
