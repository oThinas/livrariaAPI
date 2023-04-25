import { IncorrectRequest } from './incorrectRequest.js';

export class ValidationError extends IncorrectRequest {
  constructor(error, message = 'Erro na validação dos dados') {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join('; ');
    super(`${message}: ${errorMessages}`, 400);
  }
}
