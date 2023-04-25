import { publishers } from '../models/index.js';

import { NotFound } from '../errors/notFound.js';

export class PublisherController {
  static getAllPublishers(request, __, next) {
    try {
      const data = publishers.find();
      request.result = data;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getPublisherById(request, response, next) {
    try {
      const id = request.params.id;
      const data = await publishers.findById(id);

      if (!data) next(new NotFound('Editora não encontrada!'));
      else response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static getPublisherByParam(request, __, next) {
    try {
      const { name } = request.query;
      const regex = { name: new RegExp(name, 'i') };

      const data = publishers.find({ name: { $regex: regex.name } });
      request.result = data;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async createPublisher({ body }, response, next) {
    try {
      const publisher = new publishers(body);
      const data = await publisher.save();
      response.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async updatePublisher(request, response, next) {
    try {
      const id = request.params.id;
      await publishers.findByIdAndUpdate(id, { $set: request.body });
      const data = await publishers.findById(id);

      if (!data) next(new NotFound('Editora não encontrada!'));
      else response.status(200).json({ data, message: 'Editora atualizada com sucesso!' });
    } catch (error) {
      next(error);
    }
  }

  static async deletePublisher(request, response, next) {
    try {
      const id = request.params.id;
      const data = await publishers.findByIdAndDelete(id);

      if (!data) next(new NotFound('Editora não encontrada!'));
      else response.status(200).json({ data, message: 'Editora excluída com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}
