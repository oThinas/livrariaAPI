import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O campo <title> é obrigatório'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'autores',
    required: [true, 'O campo <author> é obrigatório'],
    autopopulate: { select: 'name' },
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'editoras',
    required: [true, 'O campo <publisher> é obrigatório'],
    autopopulate: { select: 'name' },
  },
  pages: {
    type: Number,
    required: [true, 'O campo <pages> é obrigatório'],
    min: [1, 'O campo <pages> deve ser maior que 0 (recebido {VALUE})'],
    max: [9999, 'O campo <pages> deve ser menor que 9999 (recebido {VALUE})'],

    /* Validadores personalizados
    validate: {
      validator: (value) => {
        return value > 0 && value < 9999;
      },
      message: 'O campo <pages> deve ser maior que 0 e menor que 9999 (recebido {VALUE})',
    }, */
  },
});

bookSchema.plugin(mongooseAutoPopulate);
export const books = mongoose.model('livros', bookSchema);
