import mongoose from 'mongoose';

const publisherSchema = new mongoose.Schema(
  { name: { type: String, required: [true, 'O campo <name> é obrigatório'] } },
  { versionKey: false },
);

export const publishers = mongoose.model('editoras', publisherSchema);
