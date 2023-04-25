import { NotFound } from '../errors/notFound.js';

export function handle404(_request, _response, next) {
  const error404 = new NotFound();
  next(error404);
}
