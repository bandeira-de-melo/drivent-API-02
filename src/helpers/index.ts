import { prisma } from '../config';
import { notFoundError, unauthorizedError } from '../errors';

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

export async function checkForTicket(ticketId: number) {
  try {
    const ticket = await prisma.ticket.findFirst({ where: { id: ticketId }, include: { TicketType: true } });
    return ticket;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

export async function checkForUserTicket(enrollmentId: number) {
  try {
    const hasUserTicket = await prisma.enrollment.findFirst({ where: { id: enrollmentId } });
    return hasUserTicket;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}
