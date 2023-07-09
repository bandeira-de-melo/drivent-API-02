import { EnrollmentRequiredError } from '../../errors/enrollment-required-error';
import { TicketRequiredError } from '../../errors/ticket-required-error';
import { isUserEnrolled } from '../../helpers';
import { ticketsRepository } from '../../repositories/tickets-repository';

async function getTicketTypes() {
  return await ticketsRepository.findMany();
}

async function getUserTicket(userId: number) {
  const isEnrolled = await isUserEnrolled(userId);
  if (!isEnrolled) throw EnrollmentRequiredError('Enrollment is required to get a ticket.');
  const ticket = await ticketsRepository.getUserTicket(isEnrolled.id);
  console.log(ticket);
  if (!ticket) throw TicketRequiredError('No ticket was found for related to this user');

  return ticket;
}

async function postUserTicket(userId: number, ticketTypeId: number) {
  const isEnrolled = await isUserEnrolled(userId);
  if (!isEnrolled) throw EnrollmentRequiredError('Enrollment is required to reserve a ticket.');
  return await ticketsRepository.createTicket(isEnrolled.id, ticketTypeId);
}

export const ticketsService = {
  getTicketTypes,
  getUserTicket,
  postUserTicket,
};
