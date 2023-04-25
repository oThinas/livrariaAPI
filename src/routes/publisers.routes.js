import express from 'express';

import { PublisherController } from '../controllers/publishers.controller.js';
import { page } from '../middlewares/page.js';

export const publisherRouter = express.Router();

publisherRouter
  .get('/editoras', PublisherController.getAllPublishers, page)
  .get('/editoras/by', PublisherController.getPublisherByParam, page)
  .get('/editoras/:id', PublisherController.getPublisherById)
  .post('/editoras', PublisherController.createPublisher)
  .put('/editoras/:id', PublisherController.updatePublisher)
  .delete('/editoras/:id', PublisherController.deletePublisher);
