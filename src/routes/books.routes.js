import express from 'express';

import { BookController } from '../controllers/books.controller.js';
import { page } from '../middlewares/page.js';

export const bookRouter = express.Router();

bookRouter
  .get('/livros', BookController.getAllBooks, page)
  .get('/livros/by', BookController.getBookByParam, page)
  .get('/livros/:id', BookController.getBookById)
  .post('/livros', BookController.createBook)
  .put('/livros/:id', BookController.updateBook)
  .delete('/livros/:id', BookController.deleteBook);
