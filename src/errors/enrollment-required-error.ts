import { ApplicationError } from '../protocols';

export function EnrollmentRequiredError(message: string): ApplicationError {
  return {
    name: 'EnrollmentRequiredError',
    message,
  };
}
