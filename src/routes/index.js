import express from 'express';

import { bookRouter } from './books.routes.js';
import { authorRouter } from './authors.routes.js';
import { publisherRouter } from './publisers.routes.js';

export function routes(app) {
  app.route('/').get((__, response) => {
    response.status(200).send('Livraria API');
  });

  app.use(
    express.json(),
    bookRouter,
    authorRouter,
    publisherRouter,
  );
}
