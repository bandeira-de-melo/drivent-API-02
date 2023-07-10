import { ApplicationError } from '../protocols';

export function ticketNotFoundError(): ApplicationError {
  return {
    name: 'ticketNotFoundError',
    message: 'No ticket found with given ticket id.',
  };
}
