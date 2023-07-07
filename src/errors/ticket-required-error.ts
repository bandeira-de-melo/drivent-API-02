import { ApplicationError } from '../protocols';

export function TicketRequiredError(message: string): ApplicationError {
  return {
    name: 'TicketRequiredError',
    message,
  };
}
