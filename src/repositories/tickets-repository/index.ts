import { TicketType } from '@prisma/client';
import { prisma } from '../../config';

async function findMany(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

export const ticketsRepository = {
  findMany,
};
