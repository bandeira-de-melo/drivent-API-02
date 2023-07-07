import { ticketsRepository } from '../../repositories/tickets-repository';

async function getTicketTypes() {
  return await ticketsRepository.findMany();
}

export const ticketsService = {
  getTicketTypes,
};
