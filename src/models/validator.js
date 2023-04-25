import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
  validator(value) {
    return value.trim() !== '';
  },
  message: 'O campo <{PATH}> não pode ser vazio',
});
