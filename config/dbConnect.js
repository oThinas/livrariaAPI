import mongoose from 'mongoose';

mongoose.connect(process.env.STRING_CONNECT_DB);
export const db = mongoose.connection;
