import { ApplicationError } from '../protocols';

export function notUserTicketError(): ApplicationError {
  return {
    name: 'notUserTicketError',
    message: 'This ticket is not related to the user',
  };
}
