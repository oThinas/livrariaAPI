import { authors } from '../models/index.js';

import { NotFound } from '../errors/notFound.js';

export class AuthorController {
  static async getAllAuthors(request, __, next) {
    try {
      const data = authors.find();
      request.result = data;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getAuthorById(request, response, next) {
    try {
      const id = request.params.id;
      const data = await authors.findById(id);

      if (data) response.status(200).json({ data });
      else next(new NotFound('Autor não encontrado!'));
    } catch (error) {
      next(error);
    }
  }

  static async getAuthorByParam(request, response, next) {
    try {
      const { nacionality, name } = request.query;
      const regex = {
        nacionality: new RegExp(nacionality, 'i'),
        name: new RegExp(name, 'i'),
      };

      const data = await authors.find({
        nacionality: { $regex: regex.nacionality },
        name: { $regex: regex.name },
      });

      if (data.length) response.status(200).json({ data });
      else next(new NotFound('Autor não encontrado!'));
    } catch (error) {
      next(error);
    }
  }

  static async createAuthor({ body }, response, next) {
    try {
      const author = new authors(body);
      const data = await author.save();
      response.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthor(request, response, next) {
    try {
      const id = request.params.id;
      await authors.findByIdAndUpdate(id, { $set: request.body });
      const data = await authors.findById(id);

      if (data) response.status(200).json({ data, message: 'Autor atualizado com sucesso!' });
      else next(new NotFound('Autor não encontrado!'));
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(request, response, next) {
    try {
      const id = request.params.id;
      const data = await authors.findByIdAndDelete(id);

      if (data) response.status(200).json({ data, message: 'Autor deletado com sucesso!' });
      else next(new NotFound('Autor não encontrado!'));
    } catch (error) {
      next(error);
    }
  }
}
