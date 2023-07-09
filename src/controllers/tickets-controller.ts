import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import { ticketsService } from '../services/tickets-service';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const userTicket = await ticketsService.getUserTicket(userId);
    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    if (error.name === 'EnrollmentRequiredError' || error.name === 'TicketRequiredError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;
  const ticketTypeId = req.body.ticketTypeId as number;
  if (!ticketTypeId) return res.status(httpStatus.BAD_REQUEST).send('TicketTypeId is required');
  try {
    const postedTicket = await ticketsService.postUserTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(postedTicket);
  } catch (error) {
    if (error.name === 'EnrollmentRequiredError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
