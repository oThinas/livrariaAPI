import { NotFound } from '../errors/notFound.js';
import { IncorrectRequest } from '../errors/incorrectRequest.js';

export async function page(request, response, next) {
  try {
    const { dataPerPage = 15, page = 1, sortBy = '_id', sortOrder = 1 } = request.query;
    if (page < 1 || dataPerPage < 1) next(new IncorrectRequest('Página e quantidade de dados por página devem ser maiores que 0!'));

    const result = request.result;

    const data = await result.find()
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * dataPerPage)
      .limit(parseInt(dataPerPage));

    if (data.length) response.status(200).json({ data });
    else next(new NotFound());
  } catch (error) {
    next(error);
  }
}
