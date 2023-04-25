import moongose from 'mongoose';

const authorSchema = new moongose.Schema({
  name: {
    type: String,
    required: [true, 'O campo <name> é obrigatório'],
    validate: {
      validator(value) {
        const pattern = /\b[a-zA-Z]+\.?\s+[a-zA-Z]+\.?\b/g;
        const matches = value.match(pattern);

        return matches !== null && matches.length > 0;
      },
      message: 'O campo <name> deve conter pelo menos 2 palavras com 2 caracteres cada (recebido {VALUE})',
    },
  },
  nacionality: { type: String },
}, { versionKey: false });

export const authors = moongose.model('autores', authorSchema);
