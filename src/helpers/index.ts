import { prisma } from '../config';
import { notFoundError } from '../errors';

export async function isUserEnrolled(userId: number) {
  try {
    return await prisma.enrollment.findFirst({ where: { userId } });
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

export async function hasUserTicket(enrollmentId: number) {
  try {
    return await prisma.ticket.findFirst({ where: { enrollmentId } });
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

export async function getTicketType(ticketTypeId: number) {
  try {
    const ticketType = await prisma.ticketType.findUnique({ where: { id: ticketTypeId } });
    if (!ticketType) throw notFoundError();
    return ticketType;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}
