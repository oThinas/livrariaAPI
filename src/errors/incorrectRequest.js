import { BaseError } from './baseError.js';

export class IncorrectRequest extends BaseError {
  constructor(message = 'Dados fornecidos inválidos!') {
    super(message, 400);
  }
}
