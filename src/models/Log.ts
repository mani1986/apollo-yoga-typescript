import { Document, Schema, Types, Model, model } from 'mongoose';

export type LogDocument = Document & {
  person: Types.ObjectId,
  title: string
}

const logSchema = new Schema({
  title: String,
  user: String,
}, { timestamps: true })


export const Log:Model<LogDocument> = model<LogDocument>('Log', logSchema);
