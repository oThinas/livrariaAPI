import mongoose from 'mongoose';

import { BaseError } from '../errors/baseError.js';
import { IncorrectRequest } from '../errors/incorrectRequest.js';
import { ValidationError } from '../errors/validationError.js';

// eslint-disable-next-line no-unused-vars
export function handleErrors(error, _request, response, _next) {
  if (error instanceof mongoose.Error.CastError) new IncorrectRequest().sendError(response);
  else if (error instanceof mongoose.Error.ValidationError) new ValidationError(error).sendError(response);
  else if (error instanceof BaseError) error.sendError(response);
  else new BaseError().sendError(response);
}
