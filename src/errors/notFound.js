import { BaseError } from './baseError.js';

export class NotFound extends BaseError {
  constructor(message = 'Nenhum registro encontrado!') {
    super(message, 404);
  }
}
