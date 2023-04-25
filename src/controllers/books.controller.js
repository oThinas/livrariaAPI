import { authors, books, publishers } from '../models/index.js';

import { NotFound } from '../errors/notFound.js';

export class BookController {
  static async getAllBooks(request, __, next) {
    try {
      const data = books.find({}, '-__v');

      request.result = data;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(request, response, next) {
    try {
      const id = request.params.id;
      const data = await books.findById(id, {}, { autopopulate: false })
        .populate('author')
        .populate('publisher');

      if (data) response.status(200).json({ data });
      else next(new NotFound('Livro não encontrado!'));
    } catch (error) {
      next(error);
    }
  }

  static async getBookByParam(request, __, next) {
    try {
      const { author, minPages, maxPages, publisher, title } = request.query;
      const regex = {
        author: new RegExp(author, 'i'),
        publisher: new RegExp(publisher, 'i'),
        title: new RegExp(title, 'i'),
      };

      const filters = {};
      if (author) filters.author = await authors.findOne({ name: { $regex: regex.author } }, '_id');
      if (publisher) filters.publisher = await publishers.findOne({ name: { $regex: regex.publisher } }, '_id');
      if (title) filters.title = { $regex: regex.title };
      if (minPages || maxPages) {
        filters.pages = {};

        if (minPages) filters.pages.$gte = minPages;
        if (maxPages) filters.pages.$lte = maxPages;
      }

      Object.values(filters).forEach((filter) => {
        if (filter === null) throw new NotFound('Livro não encontrado!');
      });

      const data = books.find(filters);

      request.result = data;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createBook({ body }, response, next) {
    try {
      const book = new books(body);
      const data = await book.save();
      response.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(request, response, next) {
    try {
      const id = request.params.id;
      await books.findByIdAndUpdate(id, { $set: request.body });
      const data = await books.findById(id)
        .populate('author')
        .populate('publisher');

      if (data) response.status(200).json({ data, message: 'Livro atualizado com sucesso!' });
      else next(new NotFound('Livro não encontrado!'));
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(request, response, next) {
    try {
      const id = request.params.id;
      const data = await books.findByIdAndDelete(id)
        .populate('author')
        .populate('publisher');

      if (data) response.status(200).json({ data, message: 'Livro deletado com sucesso!' });
      else next(new NotFound('Livro não encontrado!'));
    } catch (error) {
      next(error);
    }
  }
}
