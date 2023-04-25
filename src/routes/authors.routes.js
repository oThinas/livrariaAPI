import express from 'express';

import { AuthorController } from '../controllers/authors.controller.js';
import { page } from '../middlewares/page.js';

export const authorRouter = express.Router();

authorRouter
  .get('/autores', AuthorController.getAllAuthors, page)
  .get('/autores/by', AuthorController.getAuthorByParam, page)
  .get('/autores/:id', AuthorController.getAuthorById)
  .post('/autores', AuthorController.createAuthor)
  .put('/autores/:id', AuthorController.updateAuthor)
  .delete('/autores/:id', AuthorController.deleteAuthor);
